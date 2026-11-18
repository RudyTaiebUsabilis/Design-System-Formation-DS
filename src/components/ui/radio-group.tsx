import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

/**
 * RadioGroup / RadioGroupItem — ensemble d'options dont une seule peut être cochée (shadcn/ui Radio Group).
 * Doc : docs/components/radio-group.md · Figma : composant « Radio »
 */
function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root data-slot="radio-group" className={cn("grid gap-(--spacing-sm)", className)} {...props} />
}

function RadioGroupItem({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "peer group aspect-square size-(--size-radio) shrink-0 cursor-pointer rounded-(--radius-pill) border border-(--color-border-strong) bg-(--color-bg-default) shadow-xs transition-shadow outline-none",
        "focus-visible:border-(--color-border-focus) focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)",
        "aria-invalid:border-(--color-border-error) aria-invalid:ring-[3px] aria-invalid:ring-(--color-border-error-ring)",
        "disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className="flex size-full items-center justify-center">
        <span className="size-(--size-radio-dot) rounded-(--radius-pill) bg-(--color-bg-brand) group-aria-invalid:bg-(--color-bg-error)" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
