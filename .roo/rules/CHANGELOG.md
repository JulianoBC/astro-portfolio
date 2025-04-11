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

### Added
- New FeaturedPost component to highlight important blog posts
- BlogFeatured component to manage featured post selection and display
- NewsletterSignup component for newsletter email capture with validation and user feedback
- Featured post integration in both index.astro and blog/index.astro pages
- Stylish featured post design with gradient background and hover effects
- Comprehensive blog styling system:
  - New blog.css with improved typography and spacing
  - Enhanced markdown content rendering
  - Better visual hierarchy for headings
  - Improved readability with optimized line heights and margins
  - Styled blockquotes and lists
  - Responsive content width adjustments

### Changed
- Created `suggestions.md` file with a list of suggestions for the project
- Initialized a git repository in the `astro-portfolio` directory
- Removed the `.git` directory that was created by mistake
- Initialized a new git repository in the `astro-portfolio` directory using the user's repository URL
- Updated Layout.astro to use the site description from siteConfig instead of default "Astro description" in meta tags
- Refactored `HeaderNavMenu.astro` and `LanguageToggle.astro` to use navigation links and supported languages from `siteConfig` (src/config/site.ts) instead of hardcoded values
- Improved maintainability and scalability of header navigation and language toggle
- Fixed TypeScript issues in `LanguageToggle.astro` related to type safety and null checks
- Added three new blog posts about Astro:
  - "Astro in 2025: The Perfect Balance of Performance and Developer Experience"
  - "Mastering SEO with Astro: A 2025 Guide to Modern Web Integration"
  - "Astro's Market Dominance: 2025 Adoption Trends and Future Outlook"
- Fixed blog post display by:
  - Added required 'tags' field to all blog posts to match the schema
  - Created dynamic route [slug].astro for individual blog post pages
  - Ensured proper rendering of blog posts with markdown content
- Enhanced blog text readability:
  - Updated prose styles with proper text colors (gray-700/gray-200) for better contrast
  - Added specific color styles for headings, paragraphs, lists, and strong text
  - Improved dark mode text visibility with lighter shades
  - Optimized content width and spacing
  - Added decorative elements to improve content hierarchy
- Updated third project in Projects.astro:
  - Changed project title to "Luciano Marcucci"
  - Updated URL to "https://lucianomarcucci.vercel.app"
  - Added description "Site de um profissional de informatica"
- Added new Portuguese blog post:
  - "Por que escolher Astro.js para seu próximo site?"
  - Focused on explaining Astro.js benefits to non-technical audience
  - Written in accessible Portuguese language
  - Added proper schema with required tags field

### Improved
- Blog post layout and typography:
  - Increased content area width for better readability
  - Added styled borders and decorative elements
  - Enhanced spacing between elements
  - Improved heading hierarchy and visual weight
- Accessibility and code clarity in header navigation and language toggle:
  - Navigation and language options now use configuration, reducing hardcoding
  - Improved ARIA labeling and dynamic rendering for language toggle