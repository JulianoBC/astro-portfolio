# Future Improvements

This document outlines potential future improvements and enhancements for the Astro Portfolio project. Items are grouped by category and marked with a status:
- `[ ]` Planned
- `[x]` Done
- `[~]` Partially Done
- `[-]` Dropped / Not Applicable

*Note: Status is based on initial analysis and may need updates based on project history.*

---

## ✅ Done (Assumed based on typical setup)

- `[x]` Initial project setup (as per basic CHANGELOG.md)
- `[x]` Basic component structure (e.g., Header, Hero, Projects)
- `[x]` Basic styling setup (Tailwind likely configured)
- `[x]` Basic routing (Astro file-based routing)
- `[x]` Implement newsletter signup (Component and test exist: `src/components/NewsletterSignup.astro`)
- `[x]` Refactor CSS to use variables and consistent patterns (see `src/styles/global.css`)
- `[x]` Use configuration files for all dynamic/static content (see `src/config/site.ts`)

---

## 🚀 Features

- `[ ]` Add blog post search functionality
- `[x]` Implement newsletter signup
- `[ ]` Enable comments on blog posts (e.g., via GitHub)
- `[ ]` Add project filtering by technology
- `[ ]` Integrate GitHub API for project stats
- `[ ]` Add modal with project details
- `[ ]` Create a timeline for professional experience
- `[ ]` Add certifications section

---

## 🎨 UI/UX

- `[ ]` Add typing animation to hero section skills
- `[x]` Implement parallax scroll and interactive particles in hero background
- `[ ]` Improve avatar responsiveness
- `[ ]` Add gallery of technologies with tooltips
- `[ ]` Add preview on project hover
- `[ ]` Add lightbox for portfolio images
- `[ ]` Add micro-interactions and loading states
- `[ ]` Improve mobile menu and adaptive layouts

---

## 🌎 Internationalization

- `[ ]` Add support for more languages
- `[ ]` Implement automatic language detection
- `[ ]` Localize URLs and region-specific content

---

## ♿ Accessibility

- `[ ]` Expand ARIA labels and roles
- `[ ]` Improve keyboard navigation
- `[ ]` Add skip links and high-contrast mode
- `[ ]` Test with screen readers

---

## ⚡ Performance

- `[ ]` Implement lazy loading for images
- `[ ]` Optimize assets and fonts
- `[ ]` Add service worker for offline support
- `[ ]` Improve caching and prefetching

---

## 🔍 SEO

- `[ ]` Expand meta tags and Open Graph support
- `[ ]` Add sitemap.xml and RSS feed
- `[ ]` Implement schema.org markup

---

## 🛠️ Technical

- `[x]` Refactor CSS to use variables and consistent patterns (see `src/styles/global.css`)
- `[~]` Extract complex logic into utility modules (e.g., `src/store/language.ts` exists; review for further opportunities)
- `[x]` Use configuration files for all dynamic/static content (see `src/config/site.ts`)

---

## 📊 Analytics & Monitoring

- `[ ]` Integrate Google Analytics and Hotjar
- `[ ]` Add error tracking and performance metrics

---

> This list is a living document and should be updated as new ideas and priorities emerge. Please update item statuses (`[ ]` to `[x]`) as features are completed.