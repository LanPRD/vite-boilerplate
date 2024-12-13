import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input">;

const Input = ({ className, type, ...props }: InputProps) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2 text-base ring-offset-neutral-500 file:border-0 file:bg-transparent file:text-sm file:font-medium text-neutral-800 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
};
Input.displayName = "Input";

export { Input };
