# System Patterns

**How the system is built:**
The website is built using Astro, a modern JavaScript framework for building fast, static websites. The project follows a standard Astro project structure:
- `src/components`: Contains reusable UI components.
- `src/layouts`: Defines the overall structure and layout of pages.
- `src/pages`: Holds the individual pages of the website.
- `src/content`: Stores content, such as blog posts written in Markdown.
- `public`: Contains static assets like images and favicons.

**Key technical decisions:**
- **Astro Framework:** The decision to use Astro likely stems from the need for a performant website with good SEO, as Astro excels at building static sites with minimal JavaScript.
- **Markdown for Blog Content:** Using Markdown for blog posts simplifies content creation and management.

**Architecture patterns:**
The website employs a component-based architecture, where the UI is broken down into independent, reusable components. This promotes modularity, maintainability, and code reuse. The use of Astro also implies a server-side rendering (SSR) or static site generation (SSG) approach, enhancing performance.
