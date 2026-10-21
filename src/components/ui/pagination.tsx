import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@app/lib/utils"
import { ButtonProps, buttonVariants } from "@app/components/ui/button"
import { Link } from "wouter"

const SCROLL_TARGET_ID = "main"

/**
 * Wouter's <Link> renders a plain <a>. We need an onClick hook to:
 *  1. Scroll the page landmark back to the top so the user lands on the
 *     new page's first row, not wherever they were in the previous list.
 *  2. Move keyboard focus to the landmark so screen readers announce
 *     "main, region" after the page change (WCAG 2.4.3 + 2.4.1).
 *  3. Respect `prefers-reduced-motion` so we don't trigger vestibular
 *     symptoms in users who opt out of motion.
 */
type ScrollOnNavigateProps = {
  href: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  className?: string
  children?: React.ReactNode
  "aria-label"?: string
  "aria-current"?: React.AriaAttributes["aria-current"]
}

const ScrollOnNavigate: React.FC<ScrollOnNavigateProps> = ({
  href,
  onClick,
  className,
  children,
  ...aria
}) => {

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event)
    // Let the browser handle modifier-clicks, new tabs, etc.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    // wouter's <Link> intercepts the click; we just need to fire the
    // scroll + focus as a side effect, so it's safe to schedule.
    queueMicrotask(() => {
      const target = document.getElementById(SCROLL_TARGET_ID)
      if (!target) return

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      })

      // Make the landmark programmatically focusable without showing
      // a focus ring on the layout itself (the :focus-visible rule in
      // index.css won't apply because we set tabIndex programmatically).
      target.setAttribute("tabindex", "-1")
      ;(target as HTMLElement).focus({ preventScroll: true })
    })
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      {...aria}
    >
      {children}
    </Link>
  )
}

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="paginación"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  href: string
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <ScrollOnNavigate
    aria-current={isActive ? "page" : undefined}
    aria-label={
      isActive ? `Página ${props.children} (actual)` : `Ir a la página ${props.children}`
    }
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Ir a la página anterior"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
    <span>Anterior</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Ir a la página siguiente"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Siguiente</span>
    <ChevronRight className="h-4 w-4" aria-hidden="true" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">Más páginas</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
