import { cn } from "@/lib/css";
import React from "react";
import type { IconType } from "react-icons";

type InputProps = React.ComponentProps<"input">;
type InputIcon = {
  Icon: IconType;
  iconProps?: React.ComponentProps<"svg">;
};
type InputContainer = React.ComponentProps<"div">;

function Icon({ Icon, iconProps }: InputIcon) {
  return (
    <div className="self-center">
      <Icon {...iconProps} />
    </div>
  );
}
Icon.displayName = "Icon";

function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-a9 focus:outline-none",
        "file:mr-4 file:rounded-full file:border-0 file:bg-accent-9 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-accent-contrast",
        className
      )}
      {...props}
    />
  );
}
Input.displayName = "Input";

function Container({ children, ...props }: InputContainer) {
  const isDisabled = React.Children.toArray(children).some(
    child => React.isValidElement(child) && (child as React.ReactElement<{ disabled?: boolean }>).props.disabled
  );

  const isFile = React.Children.toArray(children).some(
    child => React.isValidElement(child) && (child as React.ReactElement<HTMLInputElement>).props.type === "file"
  );

  return (
    <div
      {...props}
      className={cn(
        "text-base text-gray-12 md:text-sm",
        !isFile && "flex gap-1 rounded-md border border-gray-7 bg-gray-2 px-3 py-2 h-10 ring-offset-gray-1",
        isDisabled && "cursor-not-allowed opacity-50",
        !isFile && "focus-within:border-2 focus-within:border-accent-8",
        "focus-within:outline-hidden focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-12",
        props.className
      )}
    >
      {children}
    </div>
  );
}

export const CustomInput = {
  Root: Container,
  Icon: Icon,
  Input: Input
};
