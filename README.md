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
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── assets/
│   └── gwkb-grey.png   # Logo
├── serve.sh            # Local server script
└── README.md           # This file
```

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scrolling navigation
- ✅ Contact form
- ✅ Modern, professional design
- ✅ SEO-friendly structure

## Deployment

This repository is set up for GitHub Pages. Simply push your changes to the `main` branch and your site will be available at:
`https://goodworks-kb.github.io`
