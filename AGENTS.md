# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a React 18 + TypeScript application built with Vite, using Tailwind CSS for styling and a custom component library based on Radix UI. The project follows a modular architecture with clear separation of concerns.

## Build & Development Commands

```bash
# Development
npm run dev              # Start dev server on port 5173

# Build & Type Checking  
npm run build            # TypeScript compile + Vite build
npm run lint             # Run ESLint
npm run preview          # Preview production build

# Testing
# No test framework configured yet - add testing setup as needed
```

## Code Style Guidelines

### Imports & Dependencies
- Use `@app/*` path alias for all internal imports (configured in vite.config.ts and tsconfig.json)
- Group imports in order: React → Third-party → Internal (`@app/*`)
- Example:
  ```tsx
  import { useState } from 'react'
  import { Button } from '@radix-ui/react-button'
  import { cn } from '@app/lib/utils'
  import { Button } from '@app/components/ui/button'
  ```

### TypeScript & Types
- Strict TypeScript enabled (`"strict": true`)
- Use interfaces for object shapes, types for unions/primitives
- Prefer explicit typing over `any` (ESLint rule disabled but avoid when possible)
- Use generic types for repositories and utilities

### Component Architecture
- Use Radix UI primitives with custom styling via class-variance-authority (CVA)
- Forward refs for all UI components
- Use `cn()` utility for conditional class merging (clsx + tailwind-merge)
- Follow pattern: `src/components/ui/[component].tsx` with index barrel exports

### File Naming & Structure
- Components: PascalCase (e.g., `Button.tsx`, `ProcessCard.tsx`)
- Utilities: camelCase (e.g., `dateParser.util.ts`)
- Types: camelCase with `.d.ts` extension (e.g., `auth.d.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.hook.ts`)
- Repositories: camelCase with `.repository.ts` suffix

### Styling Guidelines
- Use Tailwind CSS classes exclusively
- Dark mode support via `dark:` prefixes
- Custom CSS variables for theming (defined in tailwind.config.js)
- Component variants via CVA pattern (see `button.tsx` for reference)

### State Management
- Context API for global state (see `src/context/`)
- Custom hooks for complex logic (see `src/hooks/`)
- SWR for data fetching and caching
- React Hook Form for form management

### Error Handling
- Error boundaries for component-level error handling
- Generic error handling in base repository
- Toast notifications for user feedback
- Console errors for debugging (dev only)

### API & Data Layer
- Repository pattern with base class (`BaseRepository`)
- All repositories extend `BaseRepository`
- Use decorators for repository configuration
- Centralized type definitions in `src/@types/`

### Routing
- Wouter for routing (lightweight alternative to React Router)
- Route schema validation
- Middleware for authentication and authorization
- Lazy loading with Suspense

### Development Practices
- Use forwardRef for composable components
- Implement proper loading states
- Add accessibility attributes (ARIA labels, etc.)
- Follow React best practices (key props, proper dependency arrays)

### Linting & Code Quality
- ESLint with TypeScript support
- React hooks and refresh plugins enabled
- No explicit `any` rule disabled but avoid when possible
- Consistent code formatting enforced

## Key Libraries & Patterns

### UI Components
- Radix UI: Unstyled, accessible primitives
- Tailwind CSS: Utility-first styling
- CVA: Component variant management
- Lucide React: Icon library

### Data & State
- SWR: Data fetching and caching
- React Hook Form: Form management
- Context API: Global state
- Cookies: Token persistence

### Development Tools
- Vite: Build tool and dev server
- TypeScript: Type safety
- ESLint: Code linting
- Path aliases: Clean imports

## Common Patterns

### Custom Hook Pattern
```tsx
export const useCustomHook = () => {
  // Logic here
  return { /* return values */ }
}
```

### Repository Pattern
```tsx
export default class ExampleRepository extends BaseRepository {
  constructor() {
    super(import.meta.env.TESIS_API_URL, '/example')
  }
  
  async getExample() {
    return this.get<ExampleType>('/')
  }
}
```

### Component Pattern
```tsx
export interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  // Props here
}

const Component = React.forwardRef<HTMLElementRef, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <Element
        className={cn(baseClasses, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"
```

## Environment Variables
- Use `TESIS_` prefix for all environment variables
- Access via `import.meta.env.TESIS_*`
- Configure in `.env` files (not committed to repo)