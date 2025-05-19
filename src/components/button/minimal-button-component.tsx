"use client";

import { ReactNode } from "react";

interface MinimalButtonProps {
    children: ReactNode;
    onClick?: () => void;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    textSize?: "sm" | "base" | "lg" | "xl";
    className?: string;
    isLoading?: boolean;
}

export default function MinimalButton({
                                          children,
                                          onClick,
                                          iconLeft,
                                          iconRight,
                                          textSize = "base",
                                          className = "",
                                          isLoading = false,
                                      }: MinimalButtonProps) {
    const textSizeClass = {
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold
        hover:shadow-md hover:shadow-orange-300  transition-all duration-500 ease-in-out
        animate-fade-in-down
        ${textSizeClass[textSize]} ${className}`}
        >
            {isLoading ? (
                <span className="w-20 h-4 bg-white/40 rounded animate-pulse" />
            ) : (
                <>
                    {iconLeft && <span className="flex items-center">{iconLeft}</span>}
                    <span>{children}</span>
                    {iconRight && <span className="flex items-center">{iconRight}</span>}
                </>
            )}
        </button>
    );
}
