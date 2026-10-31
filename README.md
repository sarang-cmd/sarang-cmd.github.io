# Sarang Batra personal site

A responsive static website built with React, TypeScript, Vite, and Tailwind CSS. The opening deck and halftone footer are in `components/ui`. Global styles are in `src/index.css`, and page content is in `src/main.tsx`.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

The build writes the static site to `dist`. The source `index.html` loads the React app and is not a standalone upload. Upload the contents of `dist` to your static host, or use the included GitHub Actions workflow.

## GitHub Pages

Push the project to the `sarang-cmd.github.io` repository on the `main` branch. In the repository settings, set Pages source to GitHub Actions. The included workflow builds and deploys the site on each push to `main`. If your repository uses another branch, edit `.github/workflows/deploy.yml` first. This workflow publishes only the build output, so check any other files currently hosted by the repository before enabling it.

## Components

`components.json` configures the shadcn-compatible aliases. Shared UI components live in `components/ui`, so future shadcn additions and the `@/components/ui` alias resolve consistently. The project already includes TypeScript, Tailwind, and the component directories. To add a shadcn component, run `npx shadcn@latest add button` and review the generated files.

The footer wordmark is set to `sarang` in `src/main.tsx`. Footer links, projects, contact links, and bio are editable in the same file. The opening animation runs once per page load, supports a skip button, and is skipped when reduced motion is requested.

The terminal shows illustrative commands. It never runs commands on a visitor’s device. Allow only this time runs the current illustrated command. Always allow continues through the remaining commands for the current page visit. Deny skips the current command. Other accepts a message and explains that custom requests cannot be processed. Output pauses while offscreen. Reduced-motion visitors see each approved command’s output immediately. The social icon bar uses the profile links from the supplied README.

The toolkit icons are stored locally in `public/tech-icons`, preloaded, and presented in a muted shared palette. The self-hosted Manrope Variable font is bundled through `@fontsource-variable/manrope`.

The vector brand mark and matching favicon are in `public/sarang-logo.svg` and `public/favicon.svg`.

## Vercel backup

Import the GitHub repository into Vercel and select the Vite framework preset. Use `npm run build` as the build command and `dist` as the output directory. Deploy the production branch. The Vercel site is separate from the GitHub Pages site.

## Repository details

Suggested description: Personal website for Sarang Batra, featuring projects, a toolkit, and ways to connect.

Suggested topics: `personal-website`, `portfolio`, `react`, `typescript`, `vite`, `tailwindcss`, `github-pages`, `neobrutalism`.
