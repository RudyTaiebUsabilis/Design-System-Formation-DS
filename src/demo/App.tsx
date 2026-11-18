import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Button, Link } from "@/components/ui"
import { Foundations } from "./Foundations"
import { Components, SignupExample } from "./Components"
import { Section } from "./ui"
import { L, P, S } from "./tokens"

type Theme = "light" | "dark"
function useTheme() {
  const [theme, setTheme] = React.useState<Theme>(() => {
    try { const s = localStorage.getItem("ds-j3-theme"); if (s === "light" || s === "dark") return s } catch { /* stockage indisponible */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  })
  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem("ds-j3-theme", theme) } catch { /* ignore */ }
  }, [theme])
  return [theme, setTheme] as const
}

const NAV = [["#fondations", "Fondations"], ["#composants", "Composants"], ["#exemple", "Exemple"]]

export function App() {
  const [theme, setTheme] = useTheme()
  const stats = [
    ["Primitives", P.length], ["Couleurs sémantiques", L.length], ["Autres sémantiques", S.filter((t) => !t.path.startsWith("text-style")).length], ["Composants", 7],
  ]
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-(--color-border-default) bg-(--color-bg-default)/90 backdrop-blur-[var(--blur-backdrop)]">
        <div className="mx-auto flex h-16 max-w-[72rem] items-center gap-(--spacing-lg) px-(--spacing-md)">
          <a href="#" className="flex items-center gap-(--spacing-xs) text-body-default font-semibold">
            <span className="grid size-8 place-items-center rounded-(--radius-control) bg-(--color-bg-brand) text-caption text-(--color-text-on-brand)">J3</span>
            <span className="hidden sm:inline">Design System J3</span>
          </a>
          <nav className="flex gap-(--spacing-2xs)">
            {NAV.map(([h, l]) => <Button key={h} variant="ghost" size="sm" asChild><a href={h}>{l}</a></Button>)}
          </nav>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun /> : <Moon />}{theme === "dark" ? "Light" : "Dark"}
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-[72rem] px-(--spacing-md)">
        <div className="py-(--spacing-3xl)">
          <div className="mb-(--spacing-lg) h-2 w-32 rounded-(--radius-pill) bg-[linear-gradient(90deg,var(--color-dataviz-categorical-1),var(--color-dataviz-categorical-6))]" />
          <p className="font-mono text-caption text-(--color-text-brand)">Formation Design System & IA · Jour 3</p>
          <h1 className="mt-(--spacing-xs) text-display">Design System J3</h1>
          <p className="mt-(--spacing-md) max-w-[48rem] text-body-large text-(--color-text-muted)">
            Tokens W3C (primitives, sémantiques, thèmes Light / Dark), composants React basés sur shadcn/ui et Tailwind v4, documentation lisible par les humains et les agents IA. Source : le fichier Figma de la formation.
          </p>
          <dl className="mt-(--spacing-xl) flex flex-wrap gap-x-(--spacing-2xl) gap-y-(--spacing-md)">
            {stats.map(([l, n]) => <div key={l}><dt className="text-body-small text-(--color-text-muted)">{l}</dt><dd className="text-h3">{n}</dd></div>)}
          </dl>
          <p className="mt-(--spacing-lg) text-body-small text-(--color-text-muted)">Basé sur <Link size="sm" href="https://ui.shadcn.com" external>shadcn/ui</Link> · tokens au format <Link size="sm" href="https://www.designtokens.org/tr/drafts/format/" external>W3C Design Tokens</Link></p>
        </div>
        <Section id="fondations" eyebrow="01 · Fondations" title="Tokens" intro="Primitives → sémantiques → composants. Les sémantiques de couleur ont les mêmes noms en Light et en Dark : seul l’alias change. Chaque nom correspond à une variable Figma et à une variable CSS.">
          <Foundations />
        </Section>
        <Section id="composants" eyebrow="02 · Composants" title="Composants" intro="Les 7 composants de la page « Composants J3 » du fichier Figma, développés à partir de shadcn/ui. Les grilles montrent les états (colonnes) et les variantes (lignes) comme dans Figma ; Hover et Focus sont simulés pour être visibles côte à côte.">
          <Components />
        </Section>
        <Section id="exemple" eyebrow="03 · Assemblage" title="Exemple : formulaire d’inscription" intro="Le même écran que le prototype Figma, entièrement interactif.">
          <SignupExample />
        </Section>
      </main>
      <footer className="border-t border-(--color-border-default) py-(--spacing-lg) text-center text-caption text-(--color-text-subtle)">© 2026 Usabilis · Design System J3 v1.0.0</footer>
    </div>
  )
}
