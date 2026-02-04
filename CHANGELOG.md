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

## [Unreleased]

### Planned Features
- Additional language support (if needed)
- Enhanced analytics and tracking
- Performance optimizations
- Accessibility improvements

---

[0.1.0]: https://github.com/goodworks-kb/goodworks-kb.github.io/releases/tag/v0.1.0
