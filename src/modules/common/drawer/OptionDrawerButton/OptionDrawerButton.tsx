import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import { Button } from "@app/components/ui/button";

type OptionDrawerProps = React.ComponentProps<typeof Button>;

export const OptionDrawerButton = ({
  children,
  ...props
}: OptionDrawerProps) => (
  <Button
    {...props}
    className={classNames(
      "flex gap-1 items-center w-full py-2 px-1 mt-4 transition-colors hover:bg-gray-100",
      (props as any).className,
    )}
  >
    {children}
  </Button>
);
