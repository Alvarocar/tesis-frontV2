import React from "react";
import { Link, useLocation } from "wouter";
import classNames from "classnames";

type OptionDrawerLinkProps = Omit<React.ComponentProps<typeof Link>, "children" | "href" | "asChild"> & {
  to: string;
  className?: string;
  "aria-label": string;
  children: React.ReactNode;
};

export const OptionDrawerLink = ({
  children,
  "aria-label": ariaLabel,
  to,
  ...props
}: OptionDrawerLinkProps) => {
  const [location] = useLocation();
  // Treat "/" as exact; other routes use prefix match so /vacante/123 still
  // marks the "Mis vacantes" link as current when present.
  const isActive =
    to === "/"
      ? location === "/"
      : location === to || location.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}
      className={classNames(
        "flex w-full items-center gap-2 px-2 py-2 mt-4 rounded-md transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        isActive && "bg-brand-soft text-brand",
        (props as any).className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
