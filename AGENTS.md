# Repository Guidelines

## Project Structure & Module Organization
Source lives under `src/`. The `app/` directory uses the Next.js App Router; each subfolder (e.g., `certificate/`, `schedule/`, `speakers/`) owns its route and colocated `page.tsx` or API handlers. Shared UI sits in `src/components/`, typed data in `src/data/`, and utilities in `src/lib/`. Global styles reside in `src/app/globals.css`. Static assets and fonts should be placed in `public/`, while deployment metadata is tracked in `open-next.config.ts`, `wrangler.jsonc`, and `cloudflare-env.d.ts`.

## Build, Test, and Development Commands
- `npm run dev`: start the Next.js dev server on http://localhost:3000.
- `npm run build`: produce the optimized production bundle.
- `npm run start`: serve the built app locally to mirror production behaviour.
- `npm run lint`: run Next.js ESLint rules; required before opening a PR.
- `npm run preview`: build with OpenNext and launch the Cloudflare preview worker.
- `npm run deploy` / `npm run upload`: build via OpenNext and push to Cloudflare (deploy immediately vs. upload only).
- `npm run cf-typegen`: regenerate the Cloudflare environment type definitions.

## Coding Style & Naming Conventions
Use TypeScript with strict mode; avoid `any`. Prefer functional React components in PascalCase and colocate helper hooks in the same folder when scoped. Shared utilities belong under `src/lib/` and use camelCase exports. Stick to Tailwind for layout; extend tokens in `tailwind.config.ts`. Format files with the project ESLint config; run `npm run lint -- --fix` for auto-fixes. Indent with two spaces and keep files ASCII.

## Testing Guidelines
No automated tests exist yet; new code should add component or integration tests before landing. Place Vitest or Testing Library specs alongside the component (`ComponentName.test.tsx`) or under a dedicated `tests/` folder. Ensure routes with dynamic data include regression tests covering Cloudflare-specific edge cases. Run the full suite (`npm test`, once introduced) locally and document any gaps in the PR.

## Commit & Pull Request Guidelines
Follow the conventional commit pattern used in history (`feat(scope): message`). Commits must be focused and linted. Pull requests should describe the change, link related issues, and attach screenshots for UI updates. Mention any Cloudflare secret or worker changes and confirm `npm run build` and `npm run preview` both succeed.

## Cloudflare Deployment Notes
Secrets are managed through Wrangler; update `cloudflare-env.d.ts` and `wrangler.jsonc` together. Use `npx wrangler secret put <NAME>` for new secrets and note required bindings in the PR. Validate edge behaviour with `npm run preview` before requesting deploy approval.
