# 🚀 Portfolio Website - Juliano BC

> Portfolio profissional e blog técnico construído com Astro 5, TypeScript, Tailwind CSS e Alpine.js

[![Live](https://img.shields.io/badge/live-astro--website--chi--orcin.vercel.app-0b1120?style=for-the-badge&logo=vercel)](https://astro-website-chi-orcin.vercel.app)
[![Playwright Tests](https://github.com/JulianoBC/astro-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/JulianoBC/astro-portfolio/actions/workflows/playwright.yml)
[![GitHub stars](https://img.shields.io/github/stars/JulianoBC/astro-portfolio?style=social)](https://github.com/JulianoBC/astro-portfolio)

## 🌟 Visão Geral

Este é meu portfolio profissional, desenvolvido com tecnologias modernas e boas práticas de desenvolvimento. O site apresenta minha experiência, artigos técnicos e habilidades como Desenvolvedor FullStack.

- **Site no ar:** https://astro-website-chi-orcin.vercel.app
- **Versão atual:** `0.1.0` (ver [CHANGELOG.md](./CHANGELOG.md))

### ✨ Features

- 🎨 Design moderno com glassmorphism, paleta slate/zinc e tipografia Plus Jakarta Sans + JetBrains Mono
- 🌙 Modo escuro/claro (Alpine.js, preferência salva em `localStorage`, sem FOUC)
- ✨ Hero animado com canvas de partículas e efeito parallax (respeita `prefers-reduced-motion`, 30 FPS, desativado no mobile)
- 📝 Blog com **12+ artigos técnicos** em MDX/Markdown: busca em tempo real, filtro por tags, tempo de leitura, barra de progresso de leitura, copiar código e compartilhamento
- 🌐 Internacionalização pt-BR / EN com seletor de idioma no header
- 📄 Página 404 personalizada
- 📬 Página de contato com formulário validado no cliente
- ⚡ Build estático com Astro 5 (ilhas interativas)
- 📱 Mobile-first e ♿ acessível
- 🔍 SEO otimizado com meta tags e Open Graph

## 🛠️ Tecnologias

| Área | Ferramentas |
|------|-------------|
| Framework | [Astro 5](https://astro.build/) (output `static`) |
| Estilização | [Tailwind CSS 3](https://tailwindcss.com/) + `@tailwindcss/typography` |
| Interatividade | [Alpine.js 3](https://alpinejs.dev/) via `@astrojs/alpinejs` |
| Linguagem | [TypeScript 5](https://www.typescriptlang.org/) |
| Conteúdo | `@astrojs/mdx` (coleção `blog` com schema Zod) |
| Deploy | [Vercel](https://vercel.com/) via adaptador oficial `@astrojs/vercel` |
| Testes | [Vitest 3](https://vitest.dev/) + [Playwright](https://playwright.dev/) |
| Container | Docker + docker-compose |

## 🚀 Quick Start

```bash
# Clone o repositório
git clone https://github.com/JulianoBC/astro-portfolio.git

# Entre no diretório
cd astro-portfolio

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Astro) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Visualiza o build localmente |
| `npm test` | Roda a suíte de testes unitários (Vitest) |
| `npx playwright test` | Testes E2E (Playwright) |

## 🗂️ Estrutura do Projeto

```
src/
├── components/      # Componentes Astro (header, hero, about, blog, footer, project)
├── config/          # siteConfig (links sociais, navegação, idiomas)
├── content/         # Coleção "blog" + schemas (config.ts/js/mjs)
├── layouts/         # Layout.astro (site) e LayoutBlog.astro (artigos)
├── locales/         # Traduções en.json / pt-BR.json
├── pages/           # /, /blog, /blog/[slug], /contact, /404
├── store/           # Estado compartilhado (Alpine)
├── styles/          # Estilos globais
└── test/            # Setup dos testes (setupTests.js)
tests/               # Testes E2E Playwright
.github/workflows/   # CI: Playwright Tests
```

## ✅ Testes e CI

- **Unitários:** Vitest (`src/**/*.test.ts`) — atualmente `2` testes passando via `npm test`
- **E2E:** Playwright (`tests/example.spec.ts`) com `playwright.config.ts`
- **CI:** GitHub Actions roda o Playwright em push/PR para `main` ([playwright.yml](./.github/workflows/playwright.yml)) e publica o relatório como artefato

## 📦 Deploy

- **Vercel:** build `npm run build` com o adaptador `@astrojs/vercel` (saída estática, [vercel.json](./vercel.json))
- **Docker:** `Dockerfile` + `docker-compose.yml` para rodar o site containerizado

## 📋 Roadmap e Documentação

O backlog e as melhorias futuras estão em [FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md) e o histórico de versões em [CHANGELOG.md](./CHANGELOG.md). Destaques do roadmap:

### Em andamento
- ⚡ Otimização contínua de performance
- 📬 Envio real do formulário de contato (hoje validação client-side)
- 🎨 Seção de projetos (componente `Projects.astro` pronto, ainda não publicada na home)

### Planejado
- 🌎 Internacionalização completa do conteúdo do blog
- 📊 Analytics (scripts de tracking já presentes, com IDs placeholder)
- 🤝 Integrações sociais e comentários

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

Antes de abrir o PR, garanta que `npm test` e `npm run build` passem.

## 📝 Licença

Este projeto está sob a licença MIT — o arquivo `LICENSE` ainda precisa ser adicionado ao repositório.

## 📬 Contato

Juliano BC - [@JulianoBC](https://github.com/JulianoBC)

Project Link: [https://github.com/JulianoBC/astro-portfolio](https://github.com/JulianoBC/astro-portfolio)

## 🙏 Agradecimentos

- [Astro.js](https://astro.build/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Alpine.js](https://alpinejs.dev/)
- [GitHub](https://github.com/)

---

⭐️ From [JulianoBC](https://github.com/JulianoBC)
