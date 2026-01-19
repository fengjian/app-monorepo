# Repository Guidelines

## Project Structure & Module Organization
- `apps/` hosts platform apps (desktop, mobile, web, extension). Each app is a workspace package.
- `packages/` contains shared libraries and feature modules (e.g., `components`, `kit`, `core`, `shared`, `kit-bg`).
- `docs/` holds contributor and policy docs; `development/` contains scripts and tooling helpers.
- `__mocks__/` stores Jest mocks; `patches/` contains Yarn patch files; `@types/` holds custom type stubs.
- Tests generally live next to source files as `*.test.ts(x)` or under `__tests__/`.

## Build, Test, and Development Commands
Run commands from the repo root:
- `yarn`: install workspace dependencies.
- `yarn app:desktop`, `yarn app:web:no-proxy`, `yarn app:ext`: start desktop/web/extension dev servers.
- `yarn app:desktop:build`, `yarn app:web:build`, `yarn app:ext:build`: build platform bundles.
- `yarn lint`: run TypeScript checks plus ESLint/oxlint and workspace validators.
- `yarn test`: run Jest test suite.

## Coding Style & Naming Conventions
- Primary languages: TypeScript and React/React Native; follow existing patterns in each package.
- Formatting and linting are enforced via ESLint, oxlint, and Prettier (see root `package.json`).
- Use `PascalCase` for React components and `useX` for hooks; keep file names aligned with existing module naming.
- Import hierarchy is strict: `shared` → `components` → `kit-bg` → `kit` → apps. Never import in the opposite direction.

## Testing Guidelines
- Jest is the default test runner (`jest.config.js`).
- Name tests `*.test.ts`/`*.test.tsx` or place them in `__tests__/` directories.
- Run a single test file with `yarn test path/to/file.test.ts` or `yarn jest path/to/file.test.ts`.

## Commit & Pull Request Guidelines
- Base branch is `x`; create feature branches for work.
- Commit messages follow `type: short description` (e.g., `feat: add swap banner`).
- PRs should include a clear summary, linked issues, and screenshots/GIFs for UI changes.
- Do not add Claude co-author signatures; avoid committing generated or secret files.

## Security & Sensitive Changes
- Never commit secrets, mnemonics, or private keys; avoid logging sensitive data.
- Crypto or hardware wallet changes require extra scrutiny and cross-platform impact checks.
- Maintain extension CSP and existing security validations.
