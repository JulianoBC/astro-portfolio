# Como Aproveitar Alpine.js no Projeto Astro Portfolio

Este documento apresenta ideias e exemplos práticos de como Alpine.js pode ser utilizado para melhorar a interatividade e a experiência do usuário no projeto Astro Portfolio.

---

## 1. Menus e Navegação

### Menu Mobile Responsivo

Permite abrir/fechar o menu em dispositivos móveis de forma simples e reativa.

```html
<nav x-data="{ open: false }">
  <button @click="open = !open">☰</button>
  <ul x-show="open" x-transition>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/projects">Projetos</a></li>
  </ul>
</nav>
```

---

## 2. Alternância de Tema (Dark/Light Mode)

Botão para alternar entre temas claro e escuro, com persistência no localStorage.

```html
<button
  x-data="{ dark: localStorage.theme === 'dark' }"
  @click="dark = !dark; localStorage.theme = dark ? 'dark' : 'light'; document.documentElement.classList.toggle('dark', dark)"
  x-text="dark ? '🌙' : '☀️'"
>
</button>
```

---

## 3. Accordions e FAQs

Expanda e contraia seções de perguntas frequentes ou detalhes de projetos.

```html
<div x-data="{ open: false }">
  <button @click="open = !open">O que é Astro?</button>
  <div x-show="open" x-transition>
    Astro é um framework moderno para sites estáticos e dinâmicos.
  </div>
</div>
```

---

## 4. Modais e Popups

Exiba modais para newsletter, contato ou avisos.

```html
<div x-data="{ show: false }">
  <button @click="show = true">Assinar Newsletter</button>
  <div x-show="show" x-transition class="modal-bg">
    <div class="modal-content" @click.away="show = false">
      <h2>Assine nossa newsletter!</h2>
      <button @click="show = false">Fechar</button>
    </div>
  </div>
</div>
```

---

## 5. Filtros Dinâmicos em Listas

Permite filtrar projetos, posts ou skills em tempo real.

```html
<div x-data="{ filtro: '', projetos: ['Astro', 'React', 'Vue'] }">
  <input x-model="filtro" placeholder="Filtrar projetos...">
  <ul>
    <template x-for="p in projetos.filter(prj => prj.toLowerCase().includes(filtro.toLowerCase()))" :key="p">
      <li x-text="p"></li>
    </template>
  </ul>
</div>
```

---

## 6. Feedback Visual em Formulários

Exiba mensagens de sucesso, erro ou loading sem recarregar a página.

```html
<form x-data="{ enviado: false }" @submit.prevent="enviado = true">
  <input type="email" required>
  <button type="submit">Enviar</button>
  <span x-show="enviado" x-transition>Enviado com sucesso!</span>
</form>
```

---

## 7. Animações e Transições

Use `x-transition` para suavizar a entrada/saída de elementos, melhorando a experiência visual.

---

## 8. Tabs e Conteúdo Dinâmico

Implemente abas para separar conteúdos em uma mesma página.

```html
<div x-data="{ tab: 'sobre' }">
  <button @click="tab = 'sobre'">Sobre</button>
  <button @click="tab = 'skills'">Skills</button>
  <div x-show="tab === 'sobre'">Conteúdo Sobre</div>
  <div x-show="tab === 'skills'">Conteúdo Skills</div>
</div>
```

---

## 9. Tooltips e Dicas

Exiba dicas ao passar o mouse sobre elementos.

```html
<span x-data="{ show: false }" @mouseenter="show = true" @mouseleave="show = false">
  ?
  <span x-show="show" class="tooltip">Dica extra!</span>
</span>
```

---

## 10. Outras Ideias

- Carrosséis de imagens simples
- Loading spinners em botões
- Controle de visibilidade de banners/avisos
- Campos de busca instantânea

---

## Como Integrar

- Use Alpine.js diretamente nos componentes Astro (`.astro`) ou em páginas.
- Não é necessário importar scripts, pois a integração já está configurada.
- Combine Alpine.js com Tailwind CSS para estilização rápida e responsiva.

---

## Conclusão

Alpine.js permite adicionar interatividade moderna ao projeto Astro Portfolio de forma leve, declarativa e sem dependências pesadas. Use este guia como referência para implementar melhorias práticas e elevar a experiência do usuário.