import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PiSpinnerGapBold } from "react-icons/pi";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-bold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amaranth-8 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-1 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-amaranth-9 text-amaranth-contrast hover:bg-amaranth-10 active:bg-amaranth-10 active:brightness-[1.08] disabled:bg-amaranth-a3 disabled:text-amaranth-a8",
        outline:
          "text-amaranth-9 border border-amaranth-a8 bg-transparent hover:bg-amaranth-a2 active:border-amaranth-8 active:bg-amaranth-a3 disabled:border-amaranth-a7 disabled:text-amaranth-a8",
        bezel:
          "text-amaranth-contrast bg-linear-to-b from-amaranth-9 to-amaranth-600 hover:from-amaranth-600 hover:to-amaranth-700 active:from-amaranth-700 active:to-amaranth-800 disabled:text-amaranth-400 disabled:bg-amaranth-100",
        destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90",
        secondary: "bg-amaranth-3 text-amaranth-12 hover:bg-amaranth-a4 active:bg-amaranth-5 disabled:text-amaranth-8",
        ghost: "text-gray-12 hover:bg-amaranth-a3",
        link: "text-amaranth-9 underline-offset-4 hover:underline"
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
  const styles = cn(buttonVariants({ variant, size, className }), isLoading && "cursor-not-allowed");

  return (
    <Comp className={styles} {...props} disabled={props.disabled ?? isLoading}>
      {isLoading && <PiSpinnerGapBold className="animate-spin" />}
      {props.children}
    </Comp>
  );
};
Button.displayName = "Button";

export { Button, buttonVariants };
