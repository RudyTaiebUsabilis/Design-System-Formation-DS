import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button — affiche un bouton ou un composant qui a l'apparence d'un bouton.
 * Doc : docs/components/button.md · Figma : composant « Button » (page Composants J3)
 * Base : shadcn/ui Button. Toutes les valeurs passent par les tokens J3 (variables CSS générées depuis tokens/).
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--spacing-xs) whitespace-nowrap select-none",
    "rounded-(--radius-control) text-body-small font-medium transition-[color,background-color,box-shadow]",
    "[&_svg]:pointer-events-none [&_svg]:size-(--size-icon-md) [&_svg]:shrink-0",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)",
    "disabled:pointer-events-none disabled:opacity-(--opacity-disabled) aria-disabled:pointer-events-none aria-disabled:opacity-(--opacity-disabled)",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-(--color-bg-brand) text-(--color-text-on-brand) shadow-xs hover:bg-(--color-bg-brand-hover) [&_svg]:text-(--color-icon-on-brand)",
        secondary:
          "bg-(--color-bg-secondary) text-(--color-text-default) shadow-xs hover:bg-(--color-bg-secondary-hover) [&_svg]:text-(--color-icon-default)",
        outline:
          "border border-(--color-border-default) bg-(--color-bg-default) text-(--color-text-default) shadow-xs hover:bg-(--color-bg-muted) focus-visible:border-(--color-border-focus) [&_svg]:text-(--color-icon-default)",
        ghost:
          "bg-transparent text-(--color-text-default) hover:bg-(--color-bg-muted) [&_svg]:text-(--color-icon-default)",
        destructive:
          "bg-(--color-bg-error) text-(--color-text-on-status) shadow-xs hover:bg-(--color-bg-error-hover) focus-visible:ring-(--color-border-error-ring) [&_svg]:text-(--color-icon-on-status)",
        link:
          "bg-transparent text-(--color-text-link) underline-offset-4 hover:text-(--color-text-link-hover) hover:underline [&_svg]:text-(--color-icon-link)",
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

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Rend l'enfant unique (ex : `<a>`) à la place du `<button>`, en gardant le style. */
  asChild?: boolean
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
