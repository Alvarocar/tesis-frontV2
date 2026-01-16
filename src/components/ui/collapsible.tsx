import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@app/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent: React.FC<
  React.ComponentPropsWithRef<typeof CollapsiblePrimitive.CollapsibleContent>
> = ({ className, ...props }) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      {...props}
      className={cn(
        "overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className,
      )}
    />
  );
};
CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
