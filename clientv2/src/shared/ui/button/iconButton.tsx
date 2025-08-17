import { cn } from "@/shared/lib/utils/twMerge";
import React, { forwardRef } from "react";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ariaLabel: string;
  size?: "sm" | "md" | "lg";
  variant?: "neutral" | "primary" | "ghost";
  asChild?: boolean;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      ariaLabel,
      className,
      size = "md",
      variant = "neutral",
      children,
      ...props
    },
    ref
  ) => {
    const sizeCls = {
      sm: "p-1",
      md: "p-2",
      lg: "p-3",
    }[size];

    const variantCls = {
      neutral: "bg-zinc-800 hover:bg-neutral-700",
      primary: "bg-[#3361EC] hover:bg-[#2a51c5]",
      ghost: "bg-transparent hover:bg-white/10",
    }[variant];

    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-white/30",
          sizeCls,
          variantCls,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";
