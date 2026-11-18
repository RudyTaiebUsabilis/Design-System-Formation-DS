import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * Switch — bascule entre activé et désactivé, avec effet immédiat (shadcn/ui Switch).
 * Doc : docs/components/switch.md · Figma : composant « Switch »
 */
function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-(--size-switch-height) w-(--size-switch-width) shrink-0 cursor-pointer items-center rounded-(--radius-pill) px-(--spacing-3xs) shadow-xs transition-colors outline-none",
        "data-[state=checked]:bg-(--color-bg-brand) data-[state=unchecked]:bg-(--color-bg-toggle-off)",
        "focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)",
        "disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-(--size-switch-thumb) rounded-(--radius-pill) bg-(--color-bg-toggle-thumb) transition-transform duration-200",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-[calc(var(--size-switch-width)-var(--size-switch-thumb)-2*var(--spacing-3xs))]"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
