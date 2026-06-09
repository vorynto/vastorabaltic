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
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_ACCESS_CODE=choose-a-private-admin-code
```

`ADMIN_ACCESS_CODE` is sent from the admin panel to protect write actions and enquiry reads.

## Assets

- Logo: `public/images/vastorabaltic-logo.jpg`
- Generated hero image: `public/images/recruitment-hero.png`
- Uploaded reference image: `public/images/job-opportunities-reference.jpeg`
