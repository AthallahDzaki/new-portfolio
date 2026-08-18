import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-mono font-medium uppercase tracking-wider transition-all duration-200 select-none min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none rounded-none";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-6 py-3 text-xs md:text-sm gap-2.5",
    lg: "px-8 py-4 text-sm md:text-base gap-3",
  };

  const variantStyles = {
    primary:
      "bg-white text-black hover:bg-[#00F0FF] hover:text-black border border-white hover:border-[#00F0FF] shadow-sm active:bg-[#00F0FF]/90",
    secondary:
      "bg-[#121212] text-white hover:bg-[#1a1a1a] hover:border-[#00F0FF]/50 border border-white/10",
    outline:
      "bg-transparent text-white border border-white/20 hover:border-[#00F0FF] hover:text-[#00F0FF] hover:bg-[#00F0FF]/5",
    ghost:
      "bg-transparent text-white/80 hover:text-white hover:bg-white/5 border border-transparent",
  };

  const combinedClasses = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
