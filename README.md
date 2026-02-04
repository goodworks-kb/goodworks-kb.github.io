# Good Works KB - Landing Page

A modern, responsive landing page for Good Works KB website building services.

## Running Locally

### Option 1: Using the Shell Script (Recommended)

Simply run:
```bash
./serve.sh
```

Or specify a custom port:
```bash
./serve.sh 3000
```

The server will start on `http://localhost:8000` (or your specified port) and you can view the site in your browser.

### Option 2: Using Python

If you have Python 3 installed:
```bash
python3 -m http.server 8000
```

Or Python 2:
```bash
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

### Option 3: Using Node.js

If you have Node.js installed:
```bash
npm install
npm start
```

Or directly with npx:
```bash
npx http-server -p 8000 -o
```

The `-o` flag automatically opens your browser.

## Project Structure

```
goodworks-kb.github.io/
├── index.html              # Main HTML file
├── privacy.html            # Privacy Policy page
├── terms.html             # Terms of Service page
├── styles.css             # Stylesheet
├── script.js              # JavaScript functionality
├── translations.js        # Multi-language translations
├── language-switcher.js   # Language switching functionality
├── consent.js             # GDPR cookie consent system
├── assets/                # Images and assets
│   ├── logo-wide.png
│   ├── logo-square-*.png
│   ├── headshot-*.PNG
│   └── ...
├── serve.sh               # Local server script
├── CHANGELOG.md           # Version history
└── README.md              # This file
```

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scrolling navigation
- ✅ Contact form with Supabase integration
- ✅ Modern, professional design
- ✅ SEO-friendly structure
- ✅ Multi-language support (English, Korean, Spanish)
- ✅ Language switcher with dropdown menu
- ✅ Privacy Policy and Terms of Service pages
- ✅ GDPR-compliant cookie consent
- ✅ Google Analytics integration (with consent)

## Deployment

This repository is set up for GitHub Pages. Simply push your changes to the `main` branch and your site will be available at:
`https://goodworks-kb.github.io`
Automated cursor-agent change test.
Automated cursor-agent change test.
