import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Checkbox — contrôle qui bascule entre coché et non coché (shadcn/ui Checkbox).
 * Doc : docs/components/checkbox.md · Figma : composant « Checkbox »
 * checked = false | true | "indeterminate" ; Error = aria-invalid ; Disabled = disabled.
 */
function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer group size-(--size-checkbox) shrink-0 cursor-pointer rounded-(--radius-badge) border border-(--color-border-strong) bg-(--color-bg-default) shadow-xs transition-shadow outline-none",
        "data-[state=checked]:border-(--color-border-brand) data-[state=checked]:bg-(--color-bg-brand)",
        "data-[state=indeterminate]:border-(--color-border-brand) data-[state=indeterminate]:bg-(--color-bg-brand)",
        "focus-visible:border-(--color-border-focus) focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)",
        "aria-invalid:border-(--color-border-error) aria-invalid:ring-[3px] aria-invalid:ring-(--color-border-error-ring)",
        "disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-(--color-icon-on-brand)"
      >
        <CheckIcon className="size-(--size-icon-sm) group-data-[state=indeterminate]:hidden" />
        <MinusIcon className="hidden size-(--size-icon-sm) group-data-[state=indeterminate]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
