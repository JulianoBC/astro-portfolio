# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## **IMPORTANT: PROJECT CONTINUITY**
To maintain project context across conversations, always start a new chat with the following instructions:

```
You are working on the (project name here)
Read CHANGELOG.md and PROJECT_SCOPE.md now, report your findings, and strictly follow all instructions found in these documents.
You must complete the check-in process before proceeding with any task.

Begin check-in process and document analysis.
```

---

## **IMPORTANT: SELF-MAINTENANCE INSTRUCTIONS**

### **Before Taking Any Action or Making Suggestions**
1. **Read Both Files**:
   - Read `CHANGELOG.md` and `PROJECT_SCOPE.md`.
   - Briefly report:
      ```
      Read [filename]: [key points relevant to current task]
      ```

2. **Review Context**:
   - Assess existing features, known issues, and architectural decisions.

3. **Inform Responses**:
   - Use the gathered context to guide your suggestions or actions.

4. **Proceed Only After Context Review**:
   - Ensure all actions align with the project's scope and continuity requirements.

---

### **After Making ANY Code Changes**
1. **Update Documentation Immediately**:
   - Add new features/changes to the `[Unreleased]` section of `CHANGELOG.md`.
   - Update `PROJECT_SCOPE.md` if there are changes to architecture, features, or limitations.

2. **Report Documentation Updates**:
   - Use the following format to report updates:
      ```
      Updated CHANGELOG.md: [details of what changed]
      Updated PROJECT_SCOPE.md: [details of what changed] (if applicable)
      ```

3. **Ensure Alignment**:
   - Verify that all changes align with existing architecture and features.

4. **Document All Changes**:
   - Include specific details about:
      - New features or improvements
      - Bug fixes
      - Error handling changes
      - UI/UX updates
      - Technical implementation details

---

### **Documentation Update Protocol**
1. **Never Skip Documentation Updates**:
   - Always update documentation, even for minor changes.

2. **Update Before Responding to the User**:
   - Ensure documentation is complete before providing feedback or solutions.

3. **For Multiple Changes**:
   - Document each change separately.
   - Maintain chronological order.
   - Group related changes together.

4. **For Each Feature/Change, Document**:
   - What was changed.
   - Why it was changed.
   - How it works.
   - Any limitations or considerations.

5. **If Unsure About Documentation**:
   - Err on the side of over-documenting.
   - Include all relevant details.
   - Maintain consistent formatting.

---

### **Log Analysis Protocol**
1. **When Reviewing Conversation Logs**:
   - Briefly report findings using this format:
      ```
      Analyzed conversation: [key points relevant to task]
      ```

2. **When Examining Code or Error Logs**:
   - Report findings using this format:
      ```
      Reviewed [file/section]: [relevant findings]
      ```

3. **Include Minimal Context for Current Task**:
   - Ensure findings directly inform the current task at hand.

---

### **Critical Notes**
- This read-first, write-after approach ensures consistency and continuity across conversations.
- Documentation updates and log analysis reports are mandatory and must be completed before responding to the user.

---

## [Unreleased]

## [0.1.0] - 2026-10-16

### Added
- **Footer Profissional**: Componente global com layout responsivo, links rápidos, redes sociais (GitHub e LinkedIn com ícones SVG), status "Disponível para novos projetos" e botão "Voltar ao Topo" com scroll suave.
- **Tipografia Moderna**: Integração de Google Fonts com *Plus Jakarta Sans* para textos e *JetBrains Mono* para código e habilidades técnicas.
- **Hero Badge & Novos CTAs**: Badge com indicador pulsante de disponibilidade e botões direcionados para "Sobre Mim" (#about), "Ver Artigos" (/blog) e "Entre em Contato" (/contact).

### Changed
- **Paleta Dark Mode Sofisticada**: Transição de fundos pretos estáticos para tons neutros slate/zinc (#0b1120 / #0f172a), bordas sutis translúcidas (gba(255,255,255,0.08)) e tipografia de alto contraste.
- **Header Glassmorphism**: Cabeçalho fixo com ackdrop-blur-md e transparência suave, unificando a identidade visual ao rolar a página.
- **Hero Acessibilidade & Canvas**: Verificação estrita de prefers-reduced-motion no canvas de partículas e efeito parallax, otimizando CPU e acessibilidade.

### Fixed
- **FOUC no Tema**: Script inline de alta prioridade adicionado ao <head> de Layout.astro para carregar imediatamente a preferência do localStorage sem piscadas na tela.
- **Duplicação de Logotipo**: Removido o logo redundante em HeaderNavMenu.astro, consolidando o HeaderLogo.astro como marca única no desktop e mobile.
- **Navegação Acidental por Teclado**: Removido o listener de teclas de seta (ArrowLeft / ArrowRight) que trocava de página involuntariamente durante a navegação.
- **Remoção de Banner Invasivo**: Eliminada a faixa fixa de construção que cobria diagonalmente a tela.

### Added
- Initial project setup.
- Added Google Analytics and Hotjar tracking scripts to `src/layouts/Layout.astro`.
  - Scripts use placeholder IDs (`G-XXXXXXXXXX` for Google Analytics, `YOUR_HOTJAR_ID` and `YOUR_HJ_VERSION` for Hotjar). Replace these with your actual IDs to enable tracking.
  - Scripts are injected at the end of the `<head>` for site-wide analytics and user behavior tracking.
- Marked "Implement newsletter signup" as done in FUTURE_IMPROVEMENTS.md (component and test exist).
### Changed
- Menu mobile do HeaderNavMenu.astro agora utiliza Alpine.js para controlar abertura/fechamento, removendo o script JS manual e tornando o menu mais declarativo, acessível e responsivo para dispositivos móveis.
- Overlay e animações do menu mobile agora são controlados por Alpine.js, melhorando a experiência do usuário mobile.
- ThemeToggle.astro migrado de JavaScript vanilla para Alpine.js, mantendo toda funcionalidade (detecção de preferência do sistema, persistência no localStorage, transições suaves) mas com consistência arquitetural e melhor integração com o resto do projeto.


### Fixed
- Fixed import path for `PostPreview.astro` in `src/pages/blog/index.astro` to `../../components/blog/PostPreview.astro` to resolve build error caused by missing file at previous location.
- Fixed import path for `BlogFeatured.astro` in `src/pages/blog/index.astro` to `../../components/blog/BlogFeatured.astro` to resolve build error caused by missing file at previous location.
- Fixed contact page internationalization: All text content now properly switches between Portuguese and English based on language selection. Added comprehensive translation keys for all contact page elements including form labels, validation messages, and content sections.
- Enhanced contact page user experience: Added visual loading indicator when switching languages, smooth transitions for translated content, dynamic page title updates, and improved integration with the language toggle system for a more polished multilingual experience.
- Improved contact page language approach: Changed default content to Portuguese (more appropriate for Brazilian portfolio) with English available via language toggle. Users now see Portuguese content by default and can switch to English if needed, providing a better user experience for the primary audience.
- Enhanced contact page visual design: Replaced simple placeholder images with professional SVG icons featuring modern gradients, shadows, and hover animations. Created custom icons for "Velocidade" (speedometer), "E-commerce" (shopping cart), and "Responsivo" (multi-device) with smooth transitions and interactive effects that improve the overall visual appeal and user engagement.
- Implemented blog search functionality: Added real-time search capability to the blog page using Alpine.js. Users can search through post titles, descriptions, and tags with instant results. Features include search results counter, clear search button, no results state, and the featured post is hidden during search to focus on results. Search is case-insensitive and provides smooth user experience with proper loading states.
- Fixed blog page JavaScript errors: Corrected Alpine.js implementation by properly passing server-side data to client-side script using Astro's define:vars directive. Fixed duplicate x-data declarations, corrected HTML structure issues, and ensured proper separation between server-rendered posts (default view) and client-side filtered results (search mode).
- Optimized site performance to resolve slow loading issues: Disabled placeholder analytics scripts that were causing failed requests, reduced Hero particle count from 30 to 12, limited particle animation to 30 FPS instead of 60, disabled particles on mobile devices, added 1-second delay before starting animations to prevent blocking initial page load, disabled profile image float animation by default (enabled after page load), and added proper cleanup for intervals and animation frames to prevent memory leaks.
- Fixed 404 error for missing project images: Created professional SVG placeholder images for projects section. Added `/projects/coming-soon.svg` with animated loading design and `/projects/portfolio.svg` with browser mockup design. Updated all project references to use the new SVG images, eliminating console 404 errors and improving visual consistency across the projects section.
- Enhanced contact page visual design: Replaced placeholder images with professional SVG icons featuring colorful gradients for each service section (Speed/Velocidade, E-commerce, Mobile/Responsivo). Icons are fully responsive and improve the overall visual appeal and user understanding of services offered.