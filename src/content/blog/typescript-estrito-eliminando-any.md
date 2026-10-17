---
title: "TypeScript Estrito na Prática: Como Eliminar o any e Blindar Contratos de API"
description: "Estratégias práticas para erradicar o uso de 'any', implementar validação rigorosa nas bordas da aplicação com esquemas em runtime e construir código previsível."
pubDate: "2026-08-10"
tags: ["TypeScript", "Boas Práticas", "Tipagem", "Clean Code", "APIs"]
---

# TypeScript Estrito na Prática: Como Eliminar o any e Blindar Contratos de API

Quando o TypeScript foi adotado em larga escala pela indústria, uma promessa central era garantir previsibilidade e eliminar erros em tempo de execução (*runtime*). No entanto, em muitos projetos, o uso indiscriminado do tipo `any` cria uma **falsa sensação de segurança**:

> *Usar `any` no TypeScript é como desligar o alarme de incêndio porque o barulho incomoda.*

O tipo `any` não apenas silencia erros no ponto onde é declarado: ele se propaga viralmente por todas as funções que recebem aquele dado, desativando o compilador justamente onde você mais precisava dele.

Abaixo estão as técnicas fundamentais para construir uma base de código **Zero Any** e blindar seus contratos de API.

---

## 1. Substitua `any` por `unknown`

Sempre que você receber dados cuja estrutura ainda não é conhecida em tempo de compilação (como a resposta de um `fetch`, um payload de webhook ou leitura de localStorage), nunca use `any`. Use **`unknown`**.

A diferença crucial:
- Com `any`, o TypeScript permite chamar qualquer método ou acessar qualquer propriedade sem checagem.
- Com `unknown`, o TypeScript **bloqueia** qualquer operação até que você comprove o tipo do dado através de afunilamento (*type narrowing*).

```typescript
// ❌ Inseguro: compila sem erros, mas quebra em runtime
function processarDadosInseguro(dado: any) {
  return dado.usuario.nome.toUpperCase(); // TypeError se usuario for undefined
}

// ✅ Seguro: o compilador força você a validar antes de acessar
function processarDadosSeguro(dado: unknown): string {
  if (
    typeof dado === 'object' && 
    dado !== null && 
    'usuario' in dado &&
    typeof (dado as { usuario: unknown }).usuario === 'object'
  ) {
    const usuario = (dado as { usuario: { nome?: unknown } }).usuario;
    if (typeof usuario.nome === 'string') {
      return usuario.nome.toUpperCase();
    }
  }
  throw new Error('Payload com formato inválido');
}
```

---

## 2. Validação nas Bordas com Zod (Runtime + Compile-Time)

O TypeScript é completamente apagado durante a transpilação para JavaScript. Isso significa que tipos TypeScript **não protegem** sua aplicação contra respostas mal formatadas da rede.

A solução profissional é validar os dados na entrada utilizando esquemas em runtime que inferem os tipos estáticos automaticamente:

```typescript
import { z } from 'zod';

// 1. Define o contrato de validação em tempo de execução
export const RespostaApiSchema = z.object({
  id: z.string().uuid(),
  txNome: z.string().min(2),
  vlProcedimento: z.number().positive(),
  stAtivo: z.boolean().default(true),
});

// 2. O TypeScript infere o tipo estático sem duplicar código
export type RespostaApi = z.infer<typeof RespostaApiSchema>;

// 3. Função de consumo blindada
async function buscarPaciente(id: string): Promise<RespostaApi> {
  const res = await fetch(`/api/pacientes/${id}`);
  const json: unknown = await res.json();
  
  // Lança erro legível se a API alterar o contrato inesperadamente
  return RespostaApiSchema.parse(json);
}
```

---

## 3. Branded Types (Tipagem Nominal)

Por padrão, o TypeScript utiliza um sistema de tipos estrutural. Isso significa que duas propriedades com o mesmo tipo primitivo são intercambiáveis, o que abre margem para erros graves:

```typescript
type ClienteId = string;
type PedidoId = string;

function cancelarPedido(cliente: ClienteId, pedido: PedidoId) { /* ... */ }

const clienteId: ClienteId = "cli_123";
const pedidoId: PedidoId = "ped_456";

// O compilador aceita isso silenciosamente! Erro difícil de rastrear:
cancelarPedido(pedidoId, clienteId);
```

Podemos criar **Branded Types** para simular tipagem nominal:

```typescript
type Brand<K, T> = K & { __brand: T };

type ClienteId = Brand<string, 'ClienteId'>;
type PedidoId = Brand<string, 'PedidoId'>;

const criarClienteId = (id: string) => id as ClienteId;
const criarPedidoId = (id: string) => id as PedidoId;

const cId = criarClienteId("cli_123");
const pId = criarPedidoId("ped_456");

// ❌ Erro de compilação imediato: Type 'PedidoId' is not assignable to type 'ClienteId'
cancelarPedido(pId, cId);
```

---

## 4. Discriminated Unions para Estados de UI

Evite estados confusos com múltiplos booleanos (`isLoading`, `isError`, `data`). Utilize união discriminada para garantir que a aplicação nunca entre em estados impossíveis:

```typescript
type EstadoRequisicao<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; dados: T }
  | { status: 'error'; mensagem: string; codigoErro: number };

function renderizarConteudo(estado: EstadoRequisicao<string[]>) {
  switch (estado.status) {
    case 'idle':
      return null;
    case 'loading':
      return '<p>Carregando...</p>';
    case 'error':
      return `<p class="erro">${estado.mensagem} (Código: ${estado.codigoErro})</p>`;
    case 'success':
      // Aqui o TypeScript sabe com certeza absoluta que 'dados' existe
      return `<ul>${estado.dados.map(item => `<li>${item}</li>`).join('')}</ul>`;
  }
}
```

---

## Conclusão

Erradicar o `any` e adotar tipagem estrita com validação nas bordas não é perfeccionismo teórico: é a diferença entre uma aplicação que falha silenciosamente em produção e um sistema resiliente onde **refatorar dezenas de arquivos é uma tarefa tranquila e confiável**.
