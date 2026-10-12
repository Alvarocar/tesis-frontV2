# Tesis UI — Agent Guide

React 18 + Vite 6 + TypeScript SPA for a job-board thesis project. Uses `wouter` (not react-router), `swr` for data, `react-hook-form` for forms, and shadcn/ui (new-york, zinc) on Tailwind 3.

## Commands

- `pnpm install` — install. Lockfile is `pnpm-lock.yaml`; **do not mix npm/yarn**.
- `pnpm dev` — Vite dev server on port **5173**.
- `pnpm build` — `tsc -b && vite build`. `tsc -b` runs project references (`tsconfig.json` + `tsconfig.node.json`).
- `pnpm lint` — ESLint flat config over `.` (ignores `dist`).
- `pnpm preview` — preview the production build.

There is **no test script, no test files, and no CI workflow** in the repo. Do not invent one without asking.

## Path aliases

- `@app/*` → `src/*` (set in both `tsconfig.json` `paths` and `vite.config.ts` `resolve.alias`).
- shadcn aliases (from `components.json`): components → `@app/components`, ui → `@app/components/ui`, utils → `@app/lib/utils`, hooks → `@app/hooks`.
- Whenever adding a tsconfig path, also update the Vite alias or HMR/build will diverge.

## Environment

- Env prefix is **`TESIS_`** (see `vite.config.ts` `envPrefix`). Variables are exposed via `import.meta.env`.
- Required vars (see `.env.example`): `TESIS_HOST_API`, `TESIS_APP_NAME`, `MODE`.
- Consumed in `src/constants/env.constants.ts` as the `ENV` object (`API_HOST`, `APP_NAME`, `MODE`).
- `.env` is gitignored; copy `.env.example` to bootstrap.

## Source layout (`src/`)

- `main.tsx` → mounts `<App />` in StrictMode.
- `App.tsx` → wires `AuthProvider` → `ErrorBoundary` → `Suspense` → `CustomRouter(schema={routesSchema})` + `<Toaster />`.
- `router/` — `routes.ts` (lazy-loaded page map), `routes.schema.ts` (path + component + middleware arrays), `router.tsx` (wouter `<Switch>` + middleware composer). To add a route: declare the lazy import in `routes.ts`, add an entry to `routesSchema`, and add the path string to `src/constants/routes.constant.ts` (`ROUTES_PATHS`).
- `pages/<Page>/` — route-level screens, one folder per route, lazy-loaded. Aliases like `@app/pages/Vacante/[id]` are real folders.
- `modules/<feature>/` — feature-scoped UI building blocks (e.g., `modules/job/JobCard`, `modules/signin/signinForm`). Pages compose modules.
- `components/ui/` — generated shadcn primitives (Radix-based). Treat as vendored; avoid hand-editing beyond what shadcn would emit.
- `components/Modal.tsx` — hand-rolled modal wrapper.
- `repositories/` — `BaseRepository` (fetch wrapper, JSON headers, 204 handling, Spanish error messages) plus one class per domain. Exported as **singletons** (`export default new XRepository()`).
- `decorators/repository.decorator.ts` — `@addToken()` reads `token` cookie and injects `Authorization: Bearer …`. Uses `//@ts-nocheck`; copy the pattern, don't refactor unless the user asks.
- `middlewares/` — route guards; one folder per role (applicant, recruiter, admin, public).
- `hooks/` — SWR queries (`useGetResumes`, `useEmployeeFilter`, `useJobFilters`, `useAuth`) and `useMutate` for imperative mutations.
- `context/auth/` — `AuthProvider` uses SWR key `'check-auth'` against `authRepository.check`.
- `util/` — `token/decodeToken` (decode role from JWT), `date`, `regex`, `string`, `stub`, `toast`, `url`.
- `@types/` — ambient TS types (`schema.d.ts`, `auth.d.ts`, `middleware.d.ts`, domain types).
- `enums/`, `constants/` — small constants; `constants/index.ts` is a barrel, but **`routes.constant.ts` is imported directly via its path**, do not assume it's re-exported there.

## Conventions

- Router is **wouter**, not react-router-dom. Use `<Route path=... component={...}>` inside `<Switch>`. Use `useLocation` / `useRoute` from `wouter` — do not import from `react-router-dom`.
- Data fetching uses **SWR**; mutations go through `useMutate` (`src/hooks/useMutation.hook.ts`) which returns `[data, error]`.
- Auth token lives in a **cookie named `token`** (read via `js-cookie`). JWT payload's `role` is normalized to `userType` in `decodeToken`.
- ESM throughout (`"type": "module"`). ESLint flat config: `@typescript-eslint/no-explicit-any` is disabled, `react-refresh/only-export-components` is warn-only.
- Comments and error strings in repositories are in **Spanish** — keep them Spanish when editing nearby code.
- Roles in code: `applicant`, `recruiter`, `admin` (see `routesSchema` middlewares and `useAuth`).

## Common gotchas

- `decorator.ts` is `//@ts-nocheck` — TypeScript won't catch errors there; be careful when changing `addToken`.
- `BaseRepository._handleResponse` expects `data.message` on errors; backend responses must include that field for meaningful messages.
- `CustomRouter` keys routes by `path`; if you reuse a path string, wouter will warn.
- `vercel.json` rewrites everything to `/` (SPA fallback). `nginx.conf` does the same with `try_files $uri /index.html`. New hosting setups need an equivalent fallback or deep links 404.
- `vite.config.ts` and `vite.config.d.ts` both exist — `vite.config.ts` is the source; the `.d.ts` is a leftover artifact and is gitignored indirectly via the `dist`/`*.local` patterns only loosely. Don't delete without confirming.
- `package.json` `name` is still `"test-1"` — boilerplate leftover. Don't rename it as part of unrelated work.

## Repo skills

`.agents/skills/` contains project-scoped skills (not auto-loaded):

- `building-components` — composable component patterns.
- `frontend-design` — visual/aesthetic guidance.
- `vercel-react-best-practices` — React/Next.js performance rules (Next-specific guidance does **not** apply; this is a Vite SPA).

Load via the `skill` tool when working on UI components or rendering performance.
