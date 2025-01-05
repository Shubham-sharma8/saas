import { SelectPrimitive } from "@/components/ui/select";
import { cn } from "@/lib/utilsAdvace";

function Select({ className, position, ...props }: { className?: string; position?: "item-aligned" | "popper"; [key: string]: any }) {
  return (
    <div className={cn("relative", className)}>
      <SelectPrimitive.Root>
        <SelectPrimitive.Trigger {...props} />
        <SelectPrimitive.Content
          className={cn(
            "relative z-50 max-h-[300px] min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          position={position}
          {...props}
        />
      </SelectPrimitive.Root>
    </div>
  );
}

export default Select;

