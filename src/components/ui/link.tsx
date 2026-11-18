import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ExternalLinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Link — lien de navigation (élément <a>).
 * shadcn/ui n'a pas de composant Link : c'est le style « link » du Button appliqué à un <a>.
 * Doc : docs/components/link.md · Figma : composant « Link »
 *   type="standalone" : lien isolé, souligné au survol
 *   type="inline"     : lien dans un texte, toujours souligné (WCAG 1.4.1)
 */
const linkVariants = cva(
  [
    "cursor-pointer rounded-(--radius-badge) font-medium text-(--color-text-link) underline-offset-4 transition-colors",
    "hover:text-(--color-text-link-hover) [&_svg]:shrink-0 [&_svg]:text-(--color-icon-link)",
    "outline-none focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)",
  ],
  {
    variants: {
      type: {
        standalone: "inline-flex items-center gap-(--spacing-2xs) hover:underline",
        inline: "inline underline",
      },
      size: {
        default: "text-body-default [&_svg]:size-(--size-icon-md)",
        sm: "text-body-small [&_svg]:size-(--size-icon-sm)",
      },
    },
    defaultVariants: { type: "standalone", size: "default" },
  }
)

export interface LinkProps extends Omit<React.ComponentProps<"a">, "type">, VariantProps<typeof linkVariants> {
  /** Lien vers un autre site : nouvel onglet, icône et mention pour les lecteurs d'écran. */
  external?: boolean
  /** Rend l'enfant unique (ex : `<RouterLink>`) en gardant le style. */
  asChild?: boolean
}

function Link({ className, type, size, external = false, asChild = false, children, ...props }: LinkProps) {
  const Comp = asChild ? Slot : "a"
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}
  return (
    <Comp data-slot="link" className={cn(linkVariants({ type, size }), className)} {...externalProps} {...props}>
      {asChild ? children : <>{children}
      {external && (
        <>
          <ExternalLinkIcon aria-hidden className="ml-(--spacing-2xs) inline align-[-0.125em]" />
          <span className="sr-only"> (nouvel onglet)</span>
        </>
      )}</>}
    </Comp>
  )
}

export { Link, linkVariants }
