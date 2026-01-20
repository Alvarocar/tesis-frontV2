import React from "react";
import { Link } from "wouter";
import classNames from "classnames";

type OptionDrawerLinkProps = Omit<React.ComponentProps<typeof Link>, "children" | "href"> & {
  to: string;
  className?: string;
  "aria-label": string;
  children: React.ReactNode;
};

export const OptionDrawerLink = ({
  children,
  "aria-label": ariaLabel,
  ...props
}: OptionDrawerLinkProps) => (
  <Link
    {...props}
    className={classNames(
      "flex gap-1 items-center w-full py-2 px-1 mt-4 transition-colors hover:bg-gray-100",
      (props as any).className
    )}
    aria-label={ariaLabel}
  >
    <>
      {children}
    </>
  </Link>
);
