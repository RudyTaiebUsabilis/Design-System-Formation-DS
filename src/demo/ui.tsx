import * as React from "react"
import { cn } from "@/lib/utils"

export function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-(--color-border-default) py-(--spacing-3xl) first:border-t-0">
      <p className="font-mono text-caption text-(--color-text-brand) uppercase">{eyebrow}</p>
      <h2 className="mt-(--spacing-xs) text-h2">{title}</h2>
      {intro && <p className="mt-(--spacing-sm) max-w-[48rem] text-body-default text-(--color-text-muted)">{intro}</p>}
      <div className="mt-(--spacing-xl) space-y-(--spacing-2xl)">{children}</div>
    </section>
  )
}
export function Sub({ title, hint, children }: { title: string; hint?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-(--spacing-md) flex flex-wrap items-baseline justify-between gap-(--spacing-xs)">
        <h3 className="text-h4">{title}</h3>
        {hint && <div className="text-body-small text-(--color-text-muted)">{hint}</div>}
      </div>
      {children}
    </div>
  )
}
export function Card({ className, ...p }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-(--radius-card) border border-(--color-border-default) bg-(--color-bg-default)", className)} {...p} />
}
export function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded-(--radius-badge) bg-(--color-bg-muted) px-(--spacing-2xs) font-mono text-[0.85em]">{children}</code>
}
export function Mono({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return <span className={cn("font-mono text-caption font-normal tracking-normal", muted ? "text-(--color-text-subtle)" : "text-(--color-text-default)")}>{children}</span>
}
export const checker = "bg-[conic-gradient(var(--color-bg-muted)_25%,transparent_0_50%,var(--color-bg-muted)_0_75%,transparent_0)] bg-[length:10px_10px]"
export function Swatch({ color, className }: { color: string; className?: string }) {
  return (
    <span className={cn("relative block overflow-hidden rounded-(--radius-control) border border-(--color-border-subtle)", checker, className)}>
      <span className="absolute inset-0" style={{ background: color }} />
    </span>
  )
}
/** Grille d'états façon Figma : libellés de colonnes en haut, de lignes à droite. */
export function Matrix({ cols, rows, render, rowLabel }: { cols: string[]; rows: string[]; render: (row: string, col: string) => React.ReactNode; rowLabel?: (r: string) => string }) {
  return (
    <Card className="overflow-x-auto p-(--spacing-lg)">
      <table className="w-full border-separate border-spacing-y-(--spacing-sm)">
        <thead><tr>{cols.map((c) => <th key={c} className="pb-(--spacing-xs) text-left text-body-small font-semibold text-(--color-text-muted)">{c}</th>)}<th /></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r}>
              {cols.map((c) => <td key={c} className="pr-(--spacing-lg) align-middle">{render(r, c)}</td>)}
              <td className="border-l border-(--color-border-strong) pl-(--spacing-sm) text-body-small font-semibold whitespace-nowrap text-(--color-text-muted)">{rowLabel ? rowLabel(r) : r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
