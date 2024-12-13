import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PiSpinnerGapBold } from "react-icons/pi";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-amaranth-500 text-amaranth-contrast hover:bg-amaranth-600 active:bg-amaranth-700 disabled:bg-amaranth-950 disabled:text-amaranth-700 disabled:text-amaranth-400 disabled:bg-amaranth-100",
        outline:
          "text-amaranth-500 border border-amaranth-500 bg-neutral-50 hover:border-amaranth-700 hover:text-amaranth-700 active:border-amaranth-800 active:text-amaranth-800 disabled:border-amaranth-200 disabled:text-amaranth-200",
        bezel:
          "text-amaranth-contrast bg-gradient-to-b from-amaranth-500 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 active:from-amaranth-700 active:to-amaranth-800 disabled:text-amaranth-400 disabled:bg-amaranth-100",
        destructive: "bg-red-500 text-neutral-50 hover:bg-red-500/90",
        secondary: "bg-amaranth-100 text-amaranth-900 hover:bg-amaranth-300 active:bg-amaranth-400",
        ghost: "text-amaranth-contrast hover:bg-amaranth-100",
        link: "text-amaranth-900 underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  asChild?: boolean;
}

const Button = ({ className, variant, size, isLoading = false, asChild = false, ...props }: ButtonProps) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {isLoading && <PiSpinnerGapBold className="animate-spin" />}
      {props.children}
    </Comp>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
