# Vastorabaltic Website

Modern recruitment agency website for Vastorabaltic, built with Next.js and Supabase-ready API routes.

## Pages

- `/` Home
- `/about` About us
- `/solutions` Our Solutions
- `/contact` Contact form and enquiry submission
- `/admin` Admin panel for settings, content, colors, logo URL, font family, and enquiries

## Local Setup

```bash
npm install --cache .npm-cache
cp .env.example .env.local
npm run dev
```

The app can run without Supabase keys during development. In that mode, content changes and enquiries use `local-data.json`, which is ignored by git.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Add these values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-secret-key
```

Keys are found in your Supabase dashboard under **Settings → API**.
Admin login uses Supabase Auth — create an admin user under **Authentication → Users**.

## Assets

- Logo: `public/images/vastorabaltic-logo.jpg`
- Generated hero image: `public/images/recruitment-hero.png`
- Uploaded reference image: `public/images/job-opportunities-reference.jpeg`
