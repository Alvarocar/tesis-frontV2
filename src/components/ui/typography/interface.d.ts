import { ElementType, ReactNode } from "react";

export interface TypographyProps {
  children?: ReactNode;
  className?: string;
  as?: ElementType;
  noMargin?: boolean;
}
