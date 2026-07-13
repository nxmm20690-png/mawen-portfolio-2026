# Ma Wen Portfolio 2026 - Project Handoff

This document records how to continue editing and publishing the portfolio after switching Codex accounts or computers.

## Public website

- Primary domain: https://mawen-portfolio-2026.click
- Cloudflare Worker URL: https://mawen-portfolio-2026.nxmm20690.workers.dev/
- GitHub repository: https://github.com/nxmm20690-png/mawen-portfolio-2026

## Local project

- Current local folder: `C:\Users\Administrator\Documents\个人作品集`
- Node.js version: `22.13.0` or newer
- Framework: React + Vinext, deployed as a Cloudflare Worker

## Important folders

- `app/`: website pages, sections, styles, and animations.
- `public/`: images, GIFs, logos, and other website materials.
- `worker/`: Worker-related source files.

## Local preview and verification

1. Open this project folder in Codex or an editor.
2. Install dependencies once with `npm install`.
3. Run `npm run dev` for a local preview.
4. Run `npm run build` before publishing changes to confirm the production build succeeds.

## Publishing updates

1. Edit the text, images, styles, or animations in the project.
2. Verify locally in desktop and mobile viewport sizes.
3. Commit and push the change to the `main` branch of GitHub.
4. Cloudflare automatically builds and deploys the latest GitHub commit.
5. Check https://mawen-portfolio-2026.click after deployment completes.

## Cloudflare deployment configuration

- Project name: `mawen-portfolio-2026`
- Production branch: `main`
- Build command: `npm run build`
- Deploy command:
  `npx wrangler deploy --config dist/server/wrangler.json --name mawen-portfolio-2026`
- Environment variable:
  `NODE_VERSION=22.13.0`
- Custom domain: `mawen-portfolio-2026.click`

The project is not a plain static Vite site. Do not deploy only the `dist/client` folder to Pages, because this project also needs the generated Worker in `dist/server`.

## If the local folder is moved

Moving or renaming the local project folder does not affect the public website or the GitHub repository. It only makes GitHub Desktop lose the link to the old folder location.

To continue after moving it, open GitHub Desktop and use `File` -> `Add local repository`, then select the new project folder. Alternatively, clone the GitHub repository into a new folder. Do not move only individual files: move or copy the whole project folder so `.git`, `app`, and `public` stay together.

## Continuing in a new Codex account

Give Codex this repository link and upload or point it to this `PROJECT-HANDOFF.md` file. The new conversation will then have the required project, deployment, and editing context.
