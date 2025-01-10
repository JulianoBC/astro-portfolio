.gitignore                                         |   2 +
 FreeCodeCamp/CatPhotoApp/.gitignore                |   2 +
 aqui.txt                                           |   0
 cline_docs/activeContext.md                        |  12 +
 cline_docs/productContext.md                       |  10 +
 cline_docs/progress.md                             |  14 +
 cline_docs/systemPatterns.md                       |  16 +
 cline_docs/techContext.md                          |  21 +
 improvements.md                                    |  35 +
package-lock.json                                  | 945 ++++++++++++++++++++-  // Updated package-lock.json with new dependencies and versions. This file tracks the exact versions of dependencies used in the project.
 package.json                                       |  14 +-
 src/__tests__/index.test.ts                        |  44 +
 src/api/contact.ts                                 | 100 +++
 src/components/ContactForm.astro                   | 186 ++++
src/components/Header.astro                        | 462 +--------- // Major changes in Header component. This includes restructuring the header and navigation.
 src/components/HeaderLogo.astro                    | 111 +++
 src/components/HeaderNav.astro                     |  81 ++
src/components/LanguageSwitcher.astro              | 173 ++++ // Added Language Switcher component. This allows users to switch between different languages.
 src/components/PostPreview.astro                   |  10 +-
 src/components/ProjectFilters.astro                |  15 +
 src/components/Projects.astro                      |  20 +-
 src/components/SkillsGraph.astro                   |  59 ++
 src/components/TechGallery.astro                   |  41 +
 src/components/ThemeToggle.astro                   |  96 +++
 src/components/Timeline.astro                      |  33 +
 src/content/blog/2025-ai-agents.md                 |  79 ++
 .../blog/getting-started-with-web-development.md   | 130 +++
 src/content/blog/teste.mdx                         |  48 +-
 src/data/projects.js                               |  74 ++
 src/env.d.ts                                       |  26 +-
 src/layouts/Layout.astro                           |  35 +-
 src/layouts/LayoutBlog.astro                       | 116 ++-
 src/pages/about.astro                              |  17 +
 src/pages/api/contact.ts                           | 118 +++
 src/pages/blog/[...slug].astro                     | 102 ++-
 src/pages/contact.astro                            |  15 +
 src/scripts/projectFilters.js                      | 129 +++
 src/styles/global.css                              | 116 +++
src/styles/loading.css                             | 182 ++++ // Added loading styles. This includes styles for loading animations and indicators.
 src/styles/projectFilters.css                      | 107 +++
src/utils/i18n.ts                                  | 205 +++++ // Added i18n utility. This provides internationalization support for the website.
 src/utils/theme.ts                                 |  47 +
 src/utils/validation.ts                            | 143 ++++
 thoughts.md                                        |  90 ++
 44 files changed 3718 insertions(+) 563 deletions(-)
