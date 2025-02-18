import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PiSpinnerGapBold } from "react-icons/pi";

import { cn } from "@/lib/css";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-bold transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent-8 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-1 disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent-9 text-accent-contrast hover:bg-accent-10 active:bg-accent-10 active:brightness-[1.08] disabled:bg-accent-a3 disabled:text-accent-a8",
        outline:
          "text-accent-9 border border-accent-a8 bg-transparent hover:bg-accent-a2 active:border-accent-8 active:bg-accent-a3 disabled:border-accent-a7 disabled:text-accent-a8",
        bezel:
          "text-accent-contrast bg-linear-to-b from-accent-9 to-accent-10 hover:from-accent-10 hover:to-accent-11 active:from-accent-11 active:to-accent-11 disabled:opacity-50",
        destructive: "bg-red-500 text-gray-50 hover:bg-red-500/90",
        secondary: "bg-accent-3 text-accent-12 hover:bg-accent-a4 active:bg-accent-5 disabled:text-accent-8",
        ghost: "text-gray-12 hover:bg-accent-a3 active:bg-accent-a4",
        link: "text-accent-9 underline-offset-4 hover:underline"
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
