# Project Explanation

This project is an AstroJS website. Here's a breakdown of the file structure:

-   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
-   `public/`: Contains static assets like images, favicons, and flags.
-   `src/`: Contains the source code for the website.
    -   `env.d.ts`: TypeScript environment declaration file.
    -   `components/`: Contains reusable UI components.
        -   `About.astro`: Component for the "About" section.
        -   `header/`: Contains header-related components.
            -   `Header.astro`: Main header component.
    -   `config/`: Contains configuration files.
        -   `site.ts`: Configuration file for site metadata.
    -   `content/`: Contains content files.
        -   `config.js`: Configuration file for content collections.
        -   `blog/`: Contains blog post files.
            -   `astro-5-instalacao-otimizacao.md`: Example blog post.
    -   `layouts/`: Contains layout components.
        -   `Layout.astro`: Main layout component.
    -   `pages/`: Contains page components.
        -   `index.astro`: Home page.
        -   `blog/`: Contains blog page components.
            -   `index.astro`: Blog index page.
        -   `contact/`: Contains contact page components.
            -   `index.astro`: Contact page.
    -   `store/`: Contains state management files.
        -   `language.ts`: State management for language.
    -   `styles/`: Contains CSS files.
        -   `global.css`: Global CSS file.

## Key Concepts

-   **AstroJS:** A static site generator that allows for building fast and performant websites.
-   **Components:** Reusable UI elements that can be composed to build complex interfaces.
-   **Layouts:** Templates that define the structure of pages.
-   **Pages:** Individual pages of the website.
-   **Content Collections:** A way to manage content like blog posts.
-   **State Management:** A way to manage the state of the application, such as the selected language.

This project uses AstroJS to create a portfolio website with a blog and a contact page. The website is designed to be fast, performant, and easy to maintain.