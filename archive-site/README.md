# Cool Dairy Archive — Vercel Site

A new Vercel-deployable site for the cool dairy archive, featuring iconic women's outfits from writers, activists, politicians, actresses, and musicians.

## Features

- **36 iconic moments** (30 new + 6 extra for existing icons)
- **Category filtering**: writers, activists, politicians, actresses, musicians
- **Region filtering**: North America, Europe, East Asia, South Asia, Southeast Asia, Oceania
- **Asian women filter**: 14 moments featuring Asian women
- **Rich media**: YouTube embeds, Instagram/Threads link cards, public-domain images
- **Clean, Notion-like UI**: Built with Next.js 14+ and Tailwind CSS
- **Static export**: Deployable on Vercel and GitHub Pages

## Deploy on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/cool-dairy-archive)

### Manual Deploy

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd archive-site
   vercel
   ```

3. Follow the prompts to link your project

### Configuration

- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (default)
- **Output Directory**: `out`
- **Install Command**: `npm install` (default)

## Local Development

```bash
cd archive-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

The static site will be generated in the `out` directory.

## Project Structure

```
archive-site/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with navigation
│   ├── page.tsx      # Homepage
│   ├── moments/      # Moments listing and detail pages
│   ├── icons/        # Icons listing page
│   └── about/        # About page
├── components/       # React components
│   ├── YouTubeEmbed.tsx
│   ├── InstagramEmbed.tsx
│   └── ThreadsEmbed.tsx
├── lib/              # Data utilities
│   └── data.ts       # Data loading and filtering
├── data/             # JSON data files
│   ├── moments.json  # New moments data
│   └── content/      # Existing icons data
└── public/           # Static assets
```

## Data Sources

- **New moments**: `data/moments.json` (30 new + 6 existing icon extras)
- **Existing icons**: `data/content/icons/*.json`
- Research notes: See original `uploads/research-2026-11.md`

## Content Guidelines

- Designers and seasons are listed only when sources verify them
- Public-domain/CC images are hosted with attribution
- Copyrighted images are linked to credited sources, not rehosted
- Official embeds for YouTube, Instagram, Threads
- Sensitive content is flagged with warnings

## GitHub Pages (Optional)

To deploy to GitHub Pages alongside Vercel:

1. Add to `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [main]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: cd archive-site && npm ci
         - run: cd archive-site && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./archive-site/out
   ```

2. Enable GitHub Pages in repo settings → Pages → Source: gh-pages branch

## License

Content and research © Cool Dairy / Huiru Huang
