# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-30

### Added

#### Legal Pages
- **Privacy Policy** (`privacy.html`)
  - Comprehensive privacy policy covering data collection, usage, and user rights
  - GDPR-compliant cookie consent integration
  - CCPA (California Consumer Privacy Act) rights section
  - Information about data security and third-party services
  - Links to privacy policy in footer and cookie consent banner

- **Terms of Service** (`terms.html`)
  - Complete terms of service document
  - Service descriptions and client responsibilities
  - Payment terms and service agreements
  - Warranties, disclaimers, and limitation of liability
  - Intellectual property rights and termination clauses
  - Links to terms in footer

#### Internationalization (i18n)
- **Multi-language Support**
  - Added Korean (한국어) language support
  - Added Spanish (Español) language support
  - English remains the default language

- **Translation System**
  - Created `translations.js` with comprehensive translations for all three languages
  - Implemented `data-i18n` attribute system for dynamic content translation
  - Automatic language detection based on browser preferences
  - Language preference persistence using localStorage
  - URL parameter support (`?lang=ko` or `?lang=es`)

- **Language Switcher**
  - Dropdown menu with globe icon in navigation bar
  - Displays current language code (EN/한/ES)
  - Shows native language names in dropdown (English, 한국어, Español)
  - Visual indicator (checkmark) for active language
  - Responsive design for mobile and desktop
  - Integrated seamlessly into navigation menu

- **Font Support**
  - Added Noto Sans KR font for improved Korean text rendering
  - Automatic font switching based on selected language

#### SEO Enhancements
- Added hreflang tags for multi-language SEO
- Updated meta tags for language-specific content
- Proper HTML lang attribute management

### Changed

- **Navigation**
  - Language switcher integrated as a menu item with dropdown functionality
  - Improved mobile navigation styling and consistency
  - Better alignment and spacing for menu items

- **Footer**
  - Added links to Privacy Policy and Terms of Service
  - Footer links are now translatable

- **Contact Form**
  - Form messages (success/error) are now translatable
  - Form labels and placeholders support multiple languages

- **Mobile Experience**
  - Improved language switcher rendering on mobile devices
  - Better integration with mobile navigation menu
  - Consistent styling across all menu items

### Fixed

- Fixed duplicate variable declarations in language switcher JavaScript
- Fixed timing issues with language switcher initialization
- Fixed mobile menu styling inconsistencies
- Improved error handling for language detection
- Fixed dropdown positioning and visibility issues

### Technical Details

#### New Files
- `privacy.html` - Privacy Policy page
- `terms.html` - Terms of Service page
- `translations.js` - Translation data for all supported languages
- `language-switcher.js` - Language switching functionality
- `CHANGELOG.md` - This changelog file

#### Modified Files
- `index.html` - Added i18n attributes, language switcher integration, footer links
- `privacy.html` - Added language switcher support
- `terms.html` - Added language switcher support
- `styles.css` - Added language switcher styles, mobile improvements, Korean font support
- `script.js` - Added translation support for form messages
- `consent.js` - Updated to link to privacy policy page

### Documentation

- Updated README.md with new features and project structure
- Added comprehensive inline code comments
- Improved code organization and maintainability

---

## [0.2.0] - 2026-02-04

### Added

#### Major Architecture Migration
- **Vite + React + TypeScript**
  - Migrated from static HTML to modern React application
  - Full TypeScript support for type safety
  - Vite build system for fast development and optimized production builds
  - Component-based architecture for better maintainability

#### Blog Functionality
- **Supabase-Backed Blog**
  - Blog list page displaying all published posts
  - Individual blog post pages with slug-based routing
  - Integration with Supabase `blog_posts` table
  - Featured image support for blog posts
  - Auto-generated excerpts from content when not provided
  - Published date display with proper formatting
  - Query filtering for only published posts (`published = true`)
  - Proper ordering by `published_at` (descending) with fallback to `created_at`

- **Enhanced Markdown Rendering**
  - Full markdown support with `react-markdown`
  - Safe HTML sanitization with `rehype-sanitize` to prevent XSS
  - Custom styled components for all markdown elements:
    - Headings (h1-h6) with visual hierarchy and borders
    - Paragraphs with proper spacing
    - Ordered and unordered lists with nesting support
    - Links with external link detection (opens in new tab)
    - Images with rounded corners and shadows
    - Code blocks and inline code with syntax highlighting support
    - Blockquotes with styled borders and backgrounds
    - Tables with hover effects and responsive design
    - Horizontal rules
    - Strong and emphasis styling
  - Responsive markdown styles for mobile devices

#### Routing System
- **React Router with HashRouter**
  - Hash-based routing (`/#/blog`) for GitHub Pages compatibility
  - Smooth anchor link scrolling for homepage sections
  - Proper navigation between pages
  - Blog routes: `/blog` (list) and `/blog/:slug` (detail)

#### Component Architecture
- **Reusable Components**
  - `Layout` - Main layout wrapper with navbar and footer
  - `Navbar` - Navigation bar with language switcher and mobile menu
  - `Footer` - Site footer with links and version
  - `LanguageSwitcher` - Language dropdown component
  - `ConsentBar` - GDPR cookie consent banner
  - Page components: `Home`, `BlogList`, `BlogPost`, `Privacy`, `Terms`

#### Development Experience
- **TypeScript Configuration**
  - Strict type checking enabled
  - Proper type definitions for all components
  - Environment variable types for Vite
  - Type-safe Supabase client integration

- **Build System**
  - Vite dev server with hot module replacement
  - Optimized production builds
  - Conditional base path for dev vs production
  - GitHub Pages deployment configuration

#### GitHub Actions CI/CD
- **Automated Deployment**
  - GitHub Actions workflow for automatic deployment
  - Builds on push to main branch
  - Deploys to GitHub Pages automatically
  - Environment variable support via GitHub Secrets

### Changed

- **Project Structure**
  - Moved from flat HTML files to organized React component structure
  - `src/` directory with `components/`, `pages/`, and `lib/` folders
  - `public/` directory for static assets
  - TypeScript configuration files

- **Styling**
  - Migrated CSS to `src/index.css`
  - Added comprehensive blog and markdown styles
  - Enhanced responsive design for blog pages
  - Improved mobile experience across all pages

- **Language System**
  - Migrated translations to TypeScript (`src/lib/translations.ts`)
  - Improved language switching with React state management
  - Better integration with React Router

- **Contact Form**
  - Migrated to React component with proper state management
  - Improved error handling and user feedback
  - Maintained Supabase Edge Function integration

- **Navigation**
  - Added Blog link to navigation menu
  - Improved anchor link handling for HashRouter
  - Better mobile menu integration

### Fixed

- **Asset Loading**
  - Fixed asset paths for Vite development server
  - Conditional base path configuration (dev vs production)
  - Proper public asset serving

- **Routing**
  - Fixed anchor link scrolling with HashRouter
  - Proper navigation between pages
  - Correct handling of external vs internal links

### Technical Details

#### New Dependencies
- `react` ^18.2.0 - UI framework
- `react-dom` ^18.2.0 - React DOM rendering
- `react-router-dom` ^6.20.0 - Client-side routing
- `@supabase/supabase-js` ^2.38.4 - Supabase client
- `react-markdown` ^9.0.1 - Markdown rendering
- `rehype-sanitize` ^6.0.0 - HTML sanitization
- `@types/react` ^18.2.43 - React TypeScript types
- `@types/react-dom` ^18.2.17 - React DOM TypeScript types
- `@vitejs/plugin-react` ^4.2.1 - Vite React plugin
- `typescript` ^5.3.3 - TypeScript compiler
- `vite` ^5.0.8 - Build tool

#### New Files
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.node.json` - TypeScript config for Node
- `src/main.tsx` - React entry point
- `src/App.tsx` - Main app component
- `src/index.css` - Global styles
- `src/vite-env.d.ts` - Vite environment types
- `src/lib/supabase.ts` - Supabase client
- `src/lib/language.ts` - Language utilities
- `src/lib/translations.ts` - Translation data
- `src/components/` - All React components
- `src/pages/` - Page components
- `.env.example` - Environment variable template
- `.github/workflows/deploy.yml` - GitHub Actions workflow

#### Modified Files
- `package.json` - Updated with new dependencies and scripts
- `index.html` - Converted to Vite template
- `README.md` - Complete rewrite with migration guide
- `.gitignore` - Updated for Vite/React project

#### Removed Files
- `script.js` - Migrated to React components
- `translations.js` - Migrated to TypeScript
- `language-switcher.js` - Migrated to React component
- `consent.js` - Migrated to React component
- `privacy.html` - Migrated to React component
- `terms.html` - Migrated to React component
- `styles.css` - Migrated to `src/index.css`

### Documentation

- **README.md**
  - Complete migration guide
  - Local development instructions
  - GitHub Pages deployment guide
  - Environment variable setup
  - Project structure documentation
  - Blog schema documentation

- **Code Comments**
  - Comprehensive inline documentation
  - TypeScript type annotations
  - Component prop interfaces

### Migration Notes

This is a **major version update** that migrates the entire codebase from static HTML to a modern React application. Key migration points:

1. **Breaking Changes**: The site structure has changed significantly. All HTML files have been converted to React components.

2. **Deployment**: The deployment process now requires:
   - Node.js and npm for building
   - Environment variables for Supabase
   - GitHub Actions for automated deployment (recommended)

3. **Development**: Local development now uses `npm run dev` instead of static file serving.

4. **Routing**: URLs now use hash-based routing (`/#/blog`) instead of direct paths for GitHub Pages compatibility.

---

## [Unreleased]

### Planned Features
- Additional language support (if needed)
- Enhanced analytics and tracking
- Performance optimizations
- Accessibility improvements
- Syntax highlighting for code blocks
- Blog post search functionality
- RSS feed generation

---

[0.2.0]: https://github.com/goodworks-kb/goodworks-kb.github.io/releases/tag/v0.2.0
[0.1.0]: https://github.com/goodworks-kb/goodworks-kb.github.io/releases/tag/v0.1.0
