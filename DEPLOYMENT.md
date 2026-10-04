# Deploy Pixora to GitHub Pages

This package is arranged for the ReactProject repository on its main branch.

1. Copy the contents into your existing repository root. Merge Pixora with your existing Pixora folder; do not create Pixora/Pixora. Put .github at the repository root. Keep your existing .git folder and local Pixora/.env.local.
2. GitHub: Settings > Pages > Source > GitHub Actions.
3. Settings > Secrets and variables > Actions: add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY with your existing values.
4. Commit and push. The workflow builds Pixora and publishes Pixora/dist.
5. Check Actions > Deploy Pixora, then Settings > Pages > Visit site.
6. Test images, login, photo CRUD, and refreshing routes. Add the working URL to your README.

Expected URL: https://dobriyan-atanasov.github.io/ReactProject/

Changes: Vite base, HashRouter, local image URL helper, photo and About image paths, deployment workflow, and an environment example. Application styles and database configuration were not changed.

The archive excludes .env.local, node_modules and dist. For a fresh local copy, copy .env.example to .env.local and fill in your existing values, then run npm ci and npm run dev inside Pixora.

If the repository name changes, update base in Pixora/vite.config.js. If the branch name changes, update the branch in .github/workflows/deploy.yml.
