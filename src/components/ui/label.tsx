import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

/**
 * Label — libellé accessible d'un contrôle de formulaire (shadcn/ui Label).
 * Utilisé par Input, Checkbox, Radio Group et Switch. Style Figma : Body/Small/Medium.
 */
function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-(--spacing-xs) text-body-small font-medium text-(--color-text-default) select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-(--opacity-disabled)",
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    />
  )
}

export { Label }
