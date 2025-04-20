import classNames from "classnames";
import { TypographyProps } from "./interface";

export const H1: React.FC<TypographyProps> = ({ children, className }) => (
  <h1
    className={classNames(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className
    )}
  >
    {children}
  </h1>
);

export const H2: React.FC<TypographyProps> = ({ children, className }) => (
  <h2
    className={classNames(
      "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      className
    )}
  >
    {children}
  </h2>
);

export const H3: React.FC<TypographyProps> = ({ children, className }) => (
  <h3
    className={classNames(
      "scroll-m-20 text-2xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h3>
);

export const H4: React.FC<TypographyProps> = ({ children, className }) => (
  <h4
    className={classNames(
      "scroll-m-20 text-xl font-semibold tracking-tight",
      className
    )}
  >
    {children}
  </h4>
);

export const H5: React.FC<TypographyProps> = ({ children, className }) => (
  <h5 className={classNames("text-base font-semibold", className)}>{children}</h5>
);
