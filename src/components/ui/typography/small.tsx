import classNames from "classnames";
import { TypographyProps } from "./interface";

export const Small: React.FC<TypographyProps> = ({ className, children }) => (
  <small className={classNames("text-sm font-medium leading-none", className)}
  >
    {children}
  </small>
)
