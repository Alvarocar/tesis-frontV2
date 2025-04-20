import classNames from "classnames";
import { TypographyProps } from "./interface";

const Typography: React.FC<TypographyProps & { noMargin?: boolean }> = ({ className, children, noMargin }) => (
  <p className={classNames("leading-7", {"[&:not(:first-child)]:mt-6": !noMargin }, className)}
  >
    {children}
  </p>
)

export default Typography;
