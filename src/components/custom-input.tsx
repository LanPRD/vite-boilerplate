import { cn } from "@/lib/css";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ type, ...rest }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border bg-white/10 px-3 py-2 text-sm ring-offset-background text-custom-neutral-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-neutral-400 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        rest.className
      )}
      ref={ref}
      {...rest}
    />
  );
});
Input.displayName = "Input";

export { Input };
