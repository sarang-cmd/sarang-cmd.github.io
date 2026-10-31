# Deployment

Run `npm ci` and `npm run build` to check the production build. The output is `dist`.

The GitHub Actions workflow builds and publishes `dist` to GitHub Pages when `main` is pushed. Set the repository Pages source to GitHub Actions. For a Vercel backup, import the repository, select Vite, and use `npm run build` and `dist`.

The site uses root-relative asset paths and is configured for the `sarang-cmd.github.io` root domain. Update the base path and asset URLs before hosting it under a repository subdirectory.
