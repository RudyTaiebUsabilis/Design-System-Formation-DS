import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input — affiche un champ de saisie de formulaire.
 * Doc : docs/components/input.md · Figma : composant « Input »
 * Base : shadcn/ui Input. Extension J3 : prop `icon` (propriété Figma « Icon »).
 * États : Focus = :focus-visible ; Error = aria-invalid ; Disabled = disabled.
 */
export interface InputProps extends React.ComponentProps<"input"> {
  /** Icône décorative placée à gauche du texte (ex : `<Search />`). */
  icon?: React.ReactNode
}

function Input({ className, type, icon, ...props }: InputProps) {
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-(--size-control-md) w-full min-w-0 rounded-(--radius-control) border border-(--color-border-default) bg-(--color-bg-default) px-(--spacing-sm)",
        "text-body-small text-(--color-text-default) shadow-xs transition-[color,box-shadow] outline-none",
        "placeholder:text-(--color-text-muted) selection:bg-(--color-bg-brand) selection:text-(--color-text-on-brand)",
        "file:inline-flex file:h-full file:border-0 file:bg-transparent file:text-body-small file:font-medium file:text-(--color-text-default)",
        "focus-visible:border-(--color-border-focus) focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)",
        "aria-invalid:border-(--color-border-error) aria-invalid:ring-[3px] aria-invalid:ring-(--color-border-error-ring)",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-(--opacity-disabled)",
        icon && "pl-[calc(var(--spacing-sm)+var(--size-icon-md)+var(--spacing-xs))]",
        className
      )}
      {...props}
    />
  )
  if (!icon) return input
  return (
    <div data-slot="input-wrapper" className="relative w-full">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-(--spacing-sm) flex -translate-y-1/2 text-(--color-icon-muted) [&_svg]:size-(--size-icon-md)"
      >
        {icon}
      </span>
      {input}
    </div>
  )
}

export { Input }
