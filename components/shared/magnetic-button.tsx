"use client";

import type { ComponentType, MouseEvent } from "react";
import Link from "next/link";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type MagneticButtonBaseProps = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  variant?: "primary" | "ghost";
  className?: string;
};

type MagneticButtonLinkProps = MagneticButtonBaseProps & {
  href: string;
  download?: string | boolean;
  onClick?: never;
  type?: never;
};

type MagneticButtonActionProps = MagneticButtonBaseProps & {
  href?: never;
  download?: never;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
};

type MagneticButtonProps = MagneticButtonLinkProps | MagneticButtonActionProps;

export function MagneticButton({
  label,
  icon: Icon,
  variant = "primary",
  className,
  ...props
}: MagneticButtonProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const node = elementRef.current;
    if (!node) {
      return;
    }

    node.style.transform = "translate(0px, 0px)";
  };

  const reset = () => {
    const node = elementRef.current;
    if (!node) {
      return;
    }

    node.style.transform = "translate(0px, 0px)";
  };

  const buttonClassName = cn(
    "inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-semibold uppercase tracking-wider justify-center",
    "transition duration-200 will-change-transform border",
    variant === "primary"
      ? "bg-accent-blue border-accent-blue text-white shadow-sm hover:bg-accent-blue/90 hover:border-accent-blue/90 active:scale-95"
      : "border-border bg-bg-surface/30 text-text-primary hover:border-accent-blue/45 hover:bg-accent-blue/[0.04] active:scale-95",
  );

  if ("href" in props && props.href) {
    const isExternal = props.href.startsWith("http");
    return (
      <Link
        href={props.href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        download={!isExternal ? props.download : undefined}
        className={cn("inline-flex", className)}
      >
        <span
          ref={(node) => {
            elementRef.current = node;
          }}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          className={cn(buttonClassName, "w-full")}
        >
          <span>{label}</span>
          <Icon className="size-4" />
        </span>
      </Link>
    );
  }

  return (
    <button
      ref={(node) => {
        elementRef.current = node;
      }}
      type={props.type ?? "button"}
      onClick={props.onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(buttonClassName, className)}
    >
      <span>{label}</span>
      <Icon className="size-4" />
    </button>
  );
}
