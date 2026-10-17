---
title: "Arquitetura Offline-First: Sincronizando SQLite Local com Nuvem via Outbox Pattern"
description: "Como projetar sistemas de alta disponibilidade que operam com zero latência localmente e sincronizam dados com a nuvem de forma resiliente usando SQLite e Transactional Outbox."
pubDate: "2026-10-15"
tags: ["Arquitetura", "SQLite", "Go", "Offline-First", "PostgreSQL"]
---

# Arquitetura Offline-First: Sincronizando SQLite Local com Nuvem via Outbox Pattern

Em ambientes corporativos e pontos de operação física — como clínicas, galpões e pontos de venda —, a conexão com a internet nunca deve ser um ponto único de falha. Se o link cair ou sofrer oscilações de latência, o operador não pode ser impedido de trabalhar.

A abordagem tradicional de fazer a interface web ou desktop conversar diretamente com uma API em nuvem resulta em:
1. **Latência perceptível**: cada clique e formulário aguarda o round-trip de rede (100ms a 500ms).
2. **Fragilidade operacional**: uma falha temporária de DNS ou da nuvem interrompe imediatamente as operações locais.
3. **Desperdício de recursos**: requisições contínuas mantêm instâncias em nuvem ativas sem necessidade real.

A solução definitiva para esse cenário é a **Arquitetura Offline-First** ancorada no padrão **Transactional Outbox**.

---

## 1. SQLite Local como Fonte Primária da Verdade

No modelo local-first, o banco de dados principal de escrita da aplicação fica na própria máquina do usuário ou no servidor local da rede. Para isso, o **SQLite em modo WAL (Write-Ahead Logging)** é imbatível:

- **Velocidade de microssegundos**: leituras e escritas acontecem na memória e no disco local via mmap, sem overhead de TCP/IP.
- **Concorrência eficiente**: múltiplos leitores simultâneos não bloqueiam o escritor único.
- **Zero manutenção de infraestrutura**: um único arquivo de banco, com backup trivial e sem processos externos para gerenciar.

```sql
-- Configuração de alta performance para SQLite local
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;
PRAGMA temp_store = MEMORY;
```

---

## 2. O Padrão Transactional Outbox

O maior desafio de sistemas locais é garantir que as alterações sejam propagadas para o banco central na nuvem (por exemplo, PostgreSQL) sem perder eventos e sem duplicar dados.

Se você atualizar o banco local e tentar fazer uma chamada HTTP logo em seguida, a rede pode falhar **após** a gravação local, criando uma inconsistência irreversível.

O **Transactional Outbox** resolve isso integrando a fila de sincronização à mesma transação ACID do banco local:

```sql
-- Tabela de outbox transacional no SQLite
CREATE TABLE sync_outbox (
    id TEXT PRIMARY KEY,
    entity_type TEXT NOT NULL,      -- Ex: 'cliente', 'atendimento'
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL,           -- 'INSERT', 'UPDATE', 'DELETE'
    payload TEXT NOT NULL,          -- JSON com os dados alterados
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'PENDING',  -- 'PENDING', 'PROCESSING', 'SYNCED', 'FAILED'
    retry_count INTEGER DEFAULT 0
);
CREATE INDEX idx_sync_outbox_pending ON sync_outbox (status, created_at);
```

### Escrita Atômica (Exemplo em Go):

```go
func SalvarRegistroLocal(tx *sql.Tx, registro Registro) error {
    // 1. Persistir o dado de negócio
    query := `INSERT INTO registros (id, nome, valor, atualizado_em) 
              VALUES (?, ?, ?, ?) 
              ON CONFLICT(id) DO UPDATE SET nome=excluded.nome, valor=excluded.valor`
    if _, err := tx.Exec(query, registro.ID, registro.Nome, registro.Valor, time.Now()); err != nil {
        return err
    }

    // 2. Na MESMA transação, registrar o evento de outbox
    payload, _ := json.Marshal(registro)
    outboxQuery := `INSERT INTO sync_outbox (id, entity_type, entity_id, action, payload) 
                   VALUES (?, 'registro', ?, 'UPDATE', ?)`
    if _, err := tx.Exec(outboxQuery, uuid.NewString(), registro.ID, payload); err != nil {
        return err
    }

    // Ao comitar a transação, se o dado foi gravado, o outbox OBRIGATORIAMENTE também foi!
    return tx.Commit()
}
```

---

## 3. Worker de Sincronização e Respeito à Nuvem

O envio dos dados do outbox para o PostgreSQL remoto é realizado por um worker em background. Esse worker segue três regras de ouro:

1. **Zero Polling Desnecessário**: Se o outbox estiver vazio, o worker não abre conexões na nuvem. Isso permite que instâncias serverless (como o Neon Postgres) entrem em suspensão (*auto-suspend*), economizando horas de computação.
2. **Envio em Lotes (Batching)**: Os eventos pendentes são agrupados em pacotes de 50 a 100 itens por requisição, reduzindo o custo de conexões HTTP/gRPC.
3. **Idempotência**: Cada registro possui um UUID e um timestamp/versão. No destino (PostgreSQL), uma operação `ON CONFLICT (id) DO UPDATE` garante que, caso um lote seja reenviado por oscilação de rede, os dados permaneçam íntegros.

```
[ Interface Web / Desktop ]
            │ (Escrita instantânea < 1ms)
            ▼
┌───────────────────────────────┐
│   SQLite Local (WAL Mode)     │
│  - Tabelas de Domínio         │
│  - sync_outbox (Transacional) │
└──────────────┬────────────────┘
               │ (Leitura pelo Worker)
               ▼
┌───────────────────────────────┐
│  Worker Assíncrono (Go)       │
│  - Agrupa lotes               │
│  - Trata falhas e retentativas│
└──────────────┬────────────────┘
               │ (Conexão pontual / sob demanda)
               ▼
┌───────────────────────────────┐
│  PostgreSQL Remoto (Nuvem)    │
│  - Réplica consolidada        │
│  - Backup centralizado        │
└───────────────────────────────┘
```

---

## Conclusão

Adotar o modelo Offline-First com SQLite e Outbox Pattern não é apenas uma garantia contra quedas de rede: é uma **transformação radical na percepção de velocidade** da aplicação. A interface responde de forma instantânea, as falhas de conexão tornam-se invisíveis para o operador e a nuvem trabalha apenas quando há dados reais a processar.
