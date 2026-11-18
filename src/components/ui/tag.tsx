import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Tag — étiquette courte : statut, catégorie, filtre actif.
 * Base : shadcn/ui Badge (default, secondary, outline, destructive). Extension J3 : success, warning, info, onRemove.
 * Doc : docs/components/tag.md · Figma : composant « Tag »
 */
const tagVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-(--spacing-2xs) overflow-hidden whitespace-nowrap",
    "rounded-(--radius-badge) border border-transparent px-(--spacing-xs) py-(--spacing-3xs) text-caption transition-[color,box-shadow]",
    "[&>svg]:pointer-events-none [&>svg]:size-(--size-icon-xs)",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)",
  ],
  {
    variants: {
      variant: {
        default: "bg-(--color-bg-brand) text-(--color-text-on-brand) [&_svg]:text-(--color-icon-on-brand)",
        secondary: "bg-(--color-bg-secondary) text-(--color-text-default) [&_svg]:text-(--color-icon-default)",
        outline: "border-(--color-border-default) text-(--color-text-default) [&_svg]:text-(--color-icon-default)",
        destructive: "bg-(--color-bg-error) text-(--color-text-on-status) [&_svg]:text-(--color-icon-on-status)",
        success: "bg-(--color-bg-success-subtle) text-(--color-text-success) [&_svg]:text-(--color-icon-success)",
        warning: "bg-(--color-bg-warning-subtle) text-(--color-text-warning) [&_svg]:text-(--color-icon-warning)",
        info: "bg-(--color-bg-info-subtle) text-(--color-text-info) [&_svg]:text-(--color-icon-info)",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface TagProps extends React.ComponentProps<"span">, VariantProps<typeof tagVariants> {
  asChild?: boolean
  /** Affiche une croix (propriété Figma « Removable ») et appelle cette fonction au clic. */
  onRemove?: () => void
  /** Nom lu par les lecteurs d'écran sur la croix : « Retirer <removeLabel> ». Par défaut : le texte du tag. */
  removeLabel?: string
}

function Tag({ className, variant, asChild = false, onRemove, removeLabel, children, ...props }: TagProps) {
  const Comp = asChild ? Slot : "span"
  return (
    <Comp data-slot="tag" data-variant={variant ?? "default"} className={cn(tagVariants({ variant }), className)} {...props}>
      {asChild ? children : <>{children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Retirer ${removeLabel ?? (typeof children === "string" ? children : "")}`.trim()}
          className="-mr-(--spacing-3xs) inline-flex cursor-pointer rounded-(--radius-badge) outline-none hover:opacity-70 focus-visible:ring-2 focus-visible:ring-(--color-border-focus-ring)"
        >
          <XIcon className="size-(--size-icon-xs)" />
        </button>
      )}</>}
    </Comp>
  )
}

export { Tag, tagVariants }
