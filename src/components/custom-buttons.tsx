import { cn } from "@/lib/css";
import { forwardRef } from "react";
import { IconType } from "react-icons";

type CustomButtons = {
  label?: string;
  Icon?: IconType;
  iconCss?: string;
  img?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
  isLoading?: boolean;
} & React.ComponentProps<"button">;

export const OutlinedButton = forwardRef<any, CustomButtons>(
  ({ Icon, img, label, iconCss, isLoading, children, ...rest }, forwardedRef) => {
    return (
      <button
        {...rest}
        ref={forwardedRef}
        disabled={isLoading || rest.disabled}
        className={cn(
          "cursor-pointer tracking-tight text-base text-custom-neutral-400",
          "flex items-center justify-center gap-1 py-2 px-4",
          "border rounded border-custom-neutral-400",
          "hover:border-custom-neutral-500 hover:text-custom-neutral-500",
          "active:border-custom-neutral-600 active:hover:text-custom-neutral-600",
          "disabled:border-custom-neutral-200 disabled:text-custom-neutral-200",
          rest.className
        )}
      >
        {isLoading ? <SpinnerLoading className="h-3 w-3" /> : <></>}
        {Icon && !isLoading ? <Icon className={iconCss} /> : <></>}
        {img && !isLoading ? <>{img}</> : <></>}
        {label ? <span>{label}</span> : <></>}
        {children ? children : <></>}
      </button>
    );
  }
);

export const ElevatedButton = forwardRef<any, CustomButtons>(
  ({ Icon, isLoading, children, label, ...rest }, forwardedRef) => {
    return (
      <button
        {...rest}
        ref={forwardedRef}
        disabled={isLoading || rest.disabled}
        className={cn(
          "cursor-pointer tracking-tight text-base text-custom-neutral-50",
          "flex items-center justify-center gap-1 py-2 px-4",
          "border-none rounded",
          "bg-gradient-to-b from-custom-neutral-500 from-0% to-custom-neutral-600 to-100%",
          "hover:from-custom-neutral-600 hover:to-custom-neutral-700",
          "active:from-custom-neutral-700 active:to-custom-neutral-800",
          "disabled:bg-custom-neutral-100 disabled:text-custom-neutral-400",
          rest.className
        )}
      >
        {isLoading ? <SpinnerLoading className="h-3 w-3 text-custom-neutral-50 fill-blue900" /> : <></>}
        {Icon && !isLoading ? <Icon /> : <></>}
        {label ? <span>{label}</span> : <></>}
        {children ? children : <></>}
      </button>
    );
  }
);

type SpinnerLoadingProps = React.ComponentProps<"div">;

function SpinnerLoading({ className }: SpinnerLoadingProps) {
  return (
    <div
      role="status"
      className={cn(
        "w-3 h-3 rounded-full animate-spin border-2 border-solid border-inherit border-t-[transparent]",
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
