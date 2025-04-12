# Alpine.js: Guia Completo

## O que é Alpine.js?

Alpine.js é um micro-framework JavaScript reativo para adicionar interatividade leve diretamente no HTML. Ele oferece uma sintaxe declarativa inspirada em Vue.js, mas com um bundle extremamente pequeno (~10kB), ideal para projetos estáticos, sites gerados por Astro, Hugo, Jekyll, etc.

---

## Instalação

### Com Astro

Após rodar:

```
npx astro add alpinejs
```

O Alpine.js já estará disponível globalmente no seu projeto Astro. Não é necessário importar scripts manualmente.

---

## Conceitos Básicos

### x-data

Define o escopo reativo de dados para um elemento e seus filhos.

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Conteúdo</div>
</div>
```

### x-show

Mostra ou esconde um elemento com base em uma expressão booleana.

```html
<div x-show="open">Visível quando open = true</div>
```

### x-on / @

Escuta eventos do DOM.

```html
<button @click="open = !open">Abrir</button>
```

### x-model

Vincula o valor de um input a uma propriedade reativa.

```html
<input x-model="nome">
<p x-text="nome"></p>
```

### x-text e x-html

Define o texto ou HTML interno de um elemento.

```html
<span x-text="mensagem"></span>
<span x-html="htmlContent"></span>
```

### x-for

Renderiza listas dinamicamente.

```html
<ul>
  <template x-for="item in itens" :key="item">
    <li x-text="item"></li>
  </template>
</ul>
```

### x-transition

Adiciona transições animadas na entrada/saída de elementos.

```html
<div x-show="open" x-transition>Animado!</div>
```

### x-cloak

Oculta elementos até que Alpine.js esteja pronto (evita flicker).

```html
<div x-cloak x-show="open">...</div>
```

---

## Recursos Avançados

### Computed Properties

Use getters dentro de x-data.

```html
<div x-data="{
  search: '',
  items: ['foo', 'bar', 'baz'],
  get filtered() {
    return this.items.filter(i => i.includes(this.search))
  }
}">
  <input x-model="search">
  <ul>
    <template x-for="item in filtered" :key="item">
      <li x-text="item"></li>
    </template>
  </ul>
</div>
```

### Stores Globais

Compartilhe estado entre componentes.

```js
Alpine.store('user', { name: 'Maria', loggedIn: false });
```
```html
<div x-data>
  <span x-text="$store.user.name"></span>
</div>
```

### Plugins Oficiais

- Mask: Máscaras de input
- Intersect: Detecção de interseção (ex: lazy load)
- Persist: Persistência de estado no localStorage
- Focus: Gerenciamento de foco
- Collapse: Animação de collapse/expand

Instale via npm e registre no setup do Alpine.

---

## Magias ($)

- `$el`: Elemento atual
- `$refs`: Referências a elementos
- `$store`: Acesso a stores globais
- `$watch`: Observa mudanças em propriedades
- `$dispatch`: Dispara eventos customizados
- `$nextTick`: Executa após o próximo ciclo de renderização

---

## Boas Práticas

- Use Alpine para interatividade leve e componentes isolados.
- Prefira lógica declarativa no HTML.
- Para lógica complexa, considere frameworks maiores (React, Vue, etc).
- Combine Alpine com Astro para sites rápidos e interativos.

---

## Exemplos Comuns

### Dropdown

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Menu</button>
  <div x-show="open" @click.outside="open = false">Opções...</div>
</div>
```

### Modal

```html
<div x-data="{ show: false }">
  <button @click="show = true">Abrir Modal</button>
  <div x-show="show" x-transition>
    <div @click.away="show = false">Conteúdo do Modal</div>
  </div>
</div>
```

### Tabs

```html
<div x-data="{ tab: 'a' }">
  <button @click="tab = 'a'">Tab A</button>
  <button @click="tab = 'b'">Tab B</button>
  <div x-show="tab === 'a'">Conteúdo A</div>
  <div x-show="tab === 'b'">Conteúdo B</div>
</div>
```

---

## Links Úteis

- [Documentação Oficial](https://alpinejs.dev/)
- [Astro + Alpine.js](https://docs.astro.build/en/guides/integrations-guide/alpinejs/)
- [Plugins Alpine.js](https://alpinejs.dev/plugins)