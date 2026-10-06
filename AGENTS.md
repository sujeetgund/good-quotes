# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router project. Page and layout code lives in `app/` (`page.tsx`, `layout.tsx`, and global styles in `globals.css`). Put reusable route components and server/client UI modules alongside the route that owns them unless they are shared broadly. Static files such as images and icons belong in `public/` and are referenced with root-relative paths. `DESIGN.md` is the visual and interaction reference; consult it before changing the interface. Generated output in `.next/` is not source code and must not be committed.

## Build, Test, and Development Commands

Use the pinned package manager (`pnpm@10.34.1`):

```bash
pnpm dev       # Start the local development server at http://localhost:3000
pnpm lint      # Run ESLint with the Next.js and TypeScript rules
pnpm test      # Run the Vitest unit test suite
pnpm build     # Create a production build and catch build-time errors
pnpm start     # Serve the production build locally
```

There is currently no automated test suite or test script. Run `pnpm lint` and `pnpm build` before opening a pull request.

## Coding Style & Naming Conventions

Use TypeScript and functional React components. Follow the existing two-space indentation, double-quoted imports/strings, semicolons, and trailing commas. Name components and types in PascalCase, functions and variables in camelCase, and files with lowercase names unless a framework convention requires otherwise. Prefer Tailwind utility classes for styling and keep global CSS limited to shared foundations. Follow the current Next.js conventions and read the relevant installed documentation under `node_modules/next/dist/docs/` before introducing unfamiliar APIs.

## Testing Guidelines

Until a test framework is added, manually verify changed flows in `pnpm dev` at desktop and mobile widths, then run `pnpm lint` and `pnpm build`. If tests are introduced, colocate them with the feature and use descriptive names such as `page.test.tsx`.

## Commit & Pull Request Guidelines

The history currently contains only the Create Next App bootstrap commit, so no established message convention exists. Use short, imperative subjects (for example, `Add quote card layout`). Pull requests should explain the user-visible change, mention validation commands, link any issue, and include screenshots or a short recording for visual changes.

## Security & Configuration

Do not commit secrets, local environment files, or generated artifacts. Keep configuration in the appropriate Next.js config files and document any required environment variables in the pull request or README.
