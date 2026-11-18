import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button — déclenche une action immédiate sur la page ou dans un formulaire.
 * Base : shadcn/ui Button. Couleurs, tailles et marges branchées sur les tokens sémantiques J3.
 * Doc : docs/components/button.md · Figma : composant « Button » (229:434)
 * États : Hover = :hover ; Focus = :focus-visible ; Disabled = disabled.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--spacing-xs) whitespace-nowrap",
    "rounded-(--radius-control) text-body-small font-medium transition-[color,background-color,border-color,box-shadow]",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-(--size-icon-md)",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-(--color-bg-brand) text-(--color-text-on-brand) shadow-xs hover:bg-(--color-bg-brand-hover) [&_svg]:text-(--color-icon-on-brand)",
        secondary:
          "bg-(--color-bg-secondary) text-(--color-text-default) shadow-xs hover:bg-(--color-bg-secondary-hover) [&_svg]:text-(--color-icon-default)",
        outline: [
          "border border-(--color-border-default) bg-(--color-bg-default) text-(--color-text-default) shadow-xs",
          "hover:bg-(--color-bg-muted) focus-visible:border-(--color-border-focus) [&_svg]:text-(--color-icon-default)",
        ],
        ghost: "text-(--color-text-default) hover:bg-(--color-bg-muted) [&_svg]:text-(--color-icon-default)",
        destructive: [
          "bg-(--color-bg-error) text-(--color-text-on-status) shadow-xs hover:bg-(--color-bg-error-hover)",
          "focus-visible:ring-(--color-border-error-ring) [&_svg]:text-(--color-icon-on-status)",
        ],
        link: "text-(--color-text-link) underline-offset-4 hover:text-(--color-text-link-hover) hover:underline [&_svg]:text-(--color-icon-link)",
      },
      size: {
        sm: "h-(--size-control-sm) px-(--spacing-sm)",
        default: "h-(--size-control-md) px-(--spacing-md)",
        lg: "h-(--size-control-lg) px-(--spacing-lg)",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  /** Rend l'enfant unique (`<a>`, `Link` de routeur) avec le style du bouton. */
  asChild?: boolean
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
