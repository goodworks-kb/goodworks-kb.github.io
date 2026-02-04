# Good Works KB - Website

A modern, responsive website for Good Works KB website building services, built with Vite + React + TypeScript.

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
- ✅ Blog powered by Supabase

## Tech Stack

- **Vite** - Build tool and dev server
- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing (HashRouter for GitHub Pages compatibility)
- **Supabase** - Backend for blog posts and contact form
- **react-markdown** - Safe markdown rendering for blog posts

## Local Development

### Prerequisites

- Node.js 18+ and npm

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
   
   **Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:5173` (or the port Vite assigns).

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

## Project Structure

```
goodworks-kb.github.io/
├── public/                 # Static assets (served as-is)
│   ├── assets/            # Images and assets
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/        # React components
│   │   ├── ConsentBar.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── Layout.tsx
│   │   └── Navbar.tsx
│   ├── lib/                # Utilities and configurations
│   │   ├── language.ts     # Language switching logic
│   │   ├── supabase.ts     # Supabase client
│   │   └── translations.ts # Translation strings
│   ├── pages/              # Page components
│   │   ├── BlogList.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Home.tsx
│   │   ├── Privacy.tsx
│   │   └── Terms.tsx
│   ├── App.tsx             # Main app component with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Routing

This site uses **HashRouter** (hash-based routing) instead of BrowserRouter to ensure compatibility with GitHub Pages, which doesn't support server-side routing. URLs will look like:
- `/#/` - Home
- `/#/blog` - Blog list
- `/#/blog/post-slug` - Individual blog post
- `/#/privacy` - Privacy Policy
- `/#/terms` - Terms of Service

## Blog

The blog is powered by Supabase. Blog posts are stored in the `blog_posts` table with the following schema:

```sql
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  author_id UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Important:** Ensure Row Level Security (RLS) is configured to allow anonymous SELECT access only for posts where `published = true`.

### Blog Features

- Blog list page shows all published posts ordered by `published_at` (descending)
- Blog detail pages render markdown content safely using `react-markdown` with `rehype-sanitize`
- Featured images are displayed when available
- Excerpts are auto-generated from content if not provided

## GitHub Pages Deployment

### Configuration

The Vite config is set up for GitHub Pages deployment with:
- `base: '/goodworks-kb.github.io/'` - Matches the repository name
- HashRouter - Ensures routing works without server configuration

### Deployment Methods

#### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Add your Supabase credentials as GitHub Secrets:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

#### Option 2: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy the contents of `dist/` to your `gh-pages` branch or use a tool like `gh-pages`:
   ```bash
   npx gh-pages -d dist
   ```

3. Configure GitHub Pages to serve from the `gh-pages` branch (or `main` branch `/docs` folder).

### Important Notes

- **Base Path:** The Vite config uses `base: '/goodworks-kb.github.io/'`. If your repository name is different, update this in `vite.config.ts`.
- **HashRouter:** Hash-based routing (`/#/blog` instead of `/blog`) is required for GitHub Pages compatibility.
- **Environment Variables:** For GitHub Actions deployment, add Supabase credentials as repository secrets.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

These variables are prefixed with `VITE_` so they're exposed to the client-side code. Never commit sensitive keys - use `.env.local` for local development and GitHub Secrets for CI/CD.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- IE11 is not supported

## License

MIT
