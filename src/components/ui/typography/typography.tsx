import classNames from "classnames";
import { TypographyProps } from "./interface";

const Typography: React.FC<TypographyProps> = ({
  className,
  children,
  as: Tag = "p",
  noMargin,
}) => (
  <Tag
    className={classNames(
      "leading-7",
      { "[&:not(:first-child)]:mt-6": !noMargin },
      className
    )}
  >
    {children}
  </Tag>
);

export default Typography;
