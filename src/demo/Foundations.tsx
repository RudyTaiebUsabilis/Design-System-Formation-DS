import { P, S, L, D, aliasOf, resolve, cssVar, group, type Token } from "./tokens"
import { Card, Mono, Sub, Swatch } from "./ui"
import { cn } from "@/lib/utils"

const darkByPath = new Map(D.map((t) => [t.path, t]))

function PrimitiveColors() {
  const fams = group(P.filter((t) => t.type === "color"), 1)
  return (
    <div className="space-y-(--spacing-lg)">
      {[...fams].map(([fam, list]) => (
        <div key={fam} className="grid gap-(--spacing-sm) md:grid-cols-[140px_1fr]">
          <div>
            <p className="text-h5 capitalize">{fam}</p>
            <Mono muted>color.{fam}.*</Mono>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-(--spacing-xs)">
            {list.map((t) => (
              <div key={t.path}>
                <Swatch color={resolve(t.value)} className="h-12" />
                <p className="mt-(--spacing-2xs) font-mono text-caption">{t.path.split(".").pop()}</p>
                <p className="font-mono text-[11px] text-(--color-text-subtle)">{String(t.value)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const GROUPS: Record<string, string> = { bg: "Fonds", text: "Textes", icon: "Icônes", border: "Contours", shadow: "Ombres" }

function Preview({ t, mode }: { t: Token; mode: "light" | "dark" }) {
  const g = t.path.split(".")[1]
  const name = `var(${cssVar(t)})`
  return (
    <div data-theme={mode} className="flex h-12 w-20 items-center justify-center rounded-(--radius-control) border border-(--color-border-default) bg-(--color-bg-default)">
      {g === "text" && <span className="text-h5" style={{ color: name }}>Aa</span>}
      {g === "icon" && <span className="size-4 rounded-full" style={{ background: name }} />}
      {g === "border" && <span className="h-6 w-12 rounded-(--radius-badge) border-2" style={{ borderColor: name }} />}
      {g === "shadow" && <span className="h-5 w-10 rounded-(--radius-badge) bg-(--color-bg-default)" style={{ boxShadow: `0 4px 10px ${name}` }} />}
      {g === "bg" && <span className="size-full rounded-[7px]"style={{ background: name }} />}
    </div>
  )
}

function SemanticColors() {
  const groups = group(L.filter((t) => !t.path.startsWith("color.dataviz")), 1)
  return (
    <div className="space-y-(--spacing-lg)">
      {[...groups].map(([g, list]) => (
        <Card key={g} className="overflow-x-auto">
          <div className="p-(--spacing-lg) pb-(--spacing-sm)">
            <h4 className="text-h5">{GROUPS[g]} · color.{g}.* <span className="text-(--color-text-muted)">({list.length})</span></h4>
          </div>
          <table className="w-full min-w-[820px] text-left">
            <thead className="bg-(--color-bg-subtle) text-caption text-(--color-text-muted)">
              <tr><th className="px-(--spacing-lg) py-(--spacing-xs)">Light</th><th>Dark</th><th>Token</th><th>Usage</th><th>Alias Light → Dark</th></tr>
            </thead>
            <tbody>
              {list.map((t) => (
                <tr key={t.path} className="border-t border-(--color-border-subtle)">
                  <td className="px-(--spacing-lg) py-(--spacing-xs)"><Preview t={t} mode="light" /></td>
                  <td className="py-(--spacing-xs)"><Preview t={t} mode="dark" /></td>
                  <td className="pr-(--spacing-md)"><Mono>{t.path}</Mono><br /><Mono muted>{t.web}</Mono></td>
                  <td className="pr-(--spacing-md) text-body-small">{t.description}</td>
                  <td className="pr-(--spacing-lg)"><Mono muted>{aliasOf(t.value)} → {aliasOf(darkByPath.get(t.path)?.value)}</Mono></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      ))}
    </div>
  )
}

function DataViz() {
  const cat = Array.from({ length: 8 }, (_, i) => `--color-dataviz-categorical-${i + 1}`)
  const data = [72, 54, 88, 40, 63, 30, 47, 22]
  return (
    <div className="grid gap-(--spacing-md) lg:grid-cols-2">
      <Card className="space-y-(--spacing-md) p-(--spacing-lg)">
        <h4 className="text-h5">Catégorielle · séquentielle · divergente</h4>
        <div className="flex gap-(--spacing-2xs)">{cat.map((c) => <span key={c} className="h-10 flex-1 rounded-(--radius-badge)" style={{ background: `var(${c})` }} />)}</div>
        <div className="flex">{[1, 2, 3, 4, 5].map((i) => <span key={i} className="h-8 flex-1" style={{ background: `var(--color-dataviz-sequential-${i})` }} />)}</div>
        <div className="flex">{["negative", "neutral", "positive"].map((i) => <span key={i} className="h-8 flex-1" style={{ background: `var(--color-dataviz-${i})` }} />)}</div>
        <p className="text-body-small text-(--color-text-muted)">Ordre fixe des séries ; pas de couleur système pour une catégorie ; étiqueter directement.</p>
      </Card>
      <Card className="p-(--spacing-lg)">
        <h4 className="mb-(--spacing-md) text-h5">Ventes par canal</h4>
        <div className="relative flex h-48 items-end gap-(--spacing-sm) border-b border-(--color-dataviz-axis)">
          {[0, 1, 2, 3].map((i) => <span key={i} className="absolute inset-x-0 border-t border-(--color-dataviz-grid)" style={{ bottom: `${(i + 1) * 25}%` }} />)}
          {data.map((d, i) => <span key={i} className="relative flex-1 rounded-t-(--radius-badge)" style={{ height: `${d}%`, background: `var(${cat[i]})` }} />)}
        </div>
      </Card>
    </div>
  )
}

const TEXT_CLASS: Record<string, string> = {
  display: "text-display", h1: "text-h1", h2: "text-h2", h3: "text-h3", h4: "text-h4", h5: "text-h5",
  large: "text-body-large", default: "text-body-default", small: "text-body-small", caption: "text-caption",
}
const WEIGHT: Record<string, string> = { regular: "font-normal", medium: "font-medium", semibold: "font-semibold", "medium-underline": "font-medium underline" }

function Typography() {
  const styles = S.filter((t) => t.path.startsWith("text-style."))
  return (
    <Card className="divide-y divide-(--color-border-subtle)">
      {styles.map((t) => {
        const parts = t.path.split(".").slice(1)
        const role = parts[0] === "body" ? parts[1] : parts[0] === "heading" ? parts[1] : parts[0]
        const cls = cn(TEXT_CLASS[role], parts[0] === "body" && WEIGHT[parts[2]])
        const v = t.value as Record<string, string>
        return (
          <div key={t.path} className="grid items-center gap-(--spacing-md) p-(--spacing-lg) md:grid-cols-[320px_1fr]">
            <div>
              <Mono>{t.path.replace("text-style.", "")}</Mono>
              <p className="text-body-small text-(--color-text-muted)">{resolve(v.fontSize)} / {resolve(v.lineHeight)} · {resolve(v.fontWeight)} · tracking {resolve(v.letterSpacing)}</p>
              <p className="text-caption text-(--color-text-subtle)">classe <code>{cls}</code></p>
            </div>
            <p className={cn(cls, "truncate")}>{parts[0] === "body" || parts[0] === "caption" ? "Le design system, lisible par les humains et les IA." : "Design System J3"}</p>
          </div>
        )
      })}
    </Card>
  )
}

function Dimensions() {
  const sp = S.filter((t) => t.path.startsWith("spacing."))
  const sz = S.filter((t) => t.path.startsWith("size."))
  const rad = S.filter((t) => t.path.startsWith("radius."))
  const bw = S.filter((t) => t.path.startsWith("border-width."))
  return (
    <div className="grid gap-(--spacing-md) lg:grid-cols-2">
      <Card className="space-y-(--spacing-sm) p-(--spacing-lg)">
        <h4 className="text-h5">Espacements · spacing.*</h4>
        {sp.map((t) => (
          <div key={t.path} className="grid grid-cols-[110px_60px_1fr] items-center gap-(--spacing-sm)">
            <Mono>{t.path}</Mono><Mono muted>{resolve(t.value)}</Mono>
            <span className="h-4 rounded-sm bg-(--color-bg-brand)" style={{ width: `var(${cssVar(t)})` }} />
          </div>
        ))}
      </Card>
      <Card className="space-y-(--spacing-sm) p-(--spacing-lg)">
        <h4 className="text-h5">Tailles · size.*</h4>
        <div className="grid grid-cols-2 gap-(--spacing-sm) sm:grid-cols-3">
          {sz.map((t) => (
            <div key={t.path} className="rounded-(--radius-control) bg-(--color-bg-subtle) p-(--spacing-sm)">
              <div className="flex h-11 items-center"><span className="rounded-(--radius-badge) border border-(--color-border-brand) bg-(--color-bg-brand-subtle)" style={{ width: t.path.includes("control") ? 64 : `var(${cssVar(t)})`, height: t.path.includes("width") ? 20 : `var(${cssVar(t)})` }} /></div>
              <Mono>{t.path.replace("size.", "")}</Mono> <Mono muted>{resolve(t.value)}</Mono>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-(--spacing-lg)">
        <h4 className="mb-(--spacing-md) text-h5">Rayons · radius.*</h4>
        <div className="grid grid-cols-3 gap-(--spacing-md) sm:grid-cols-6">
          {rad.map((t) => (
            <div key={t.path} className="text-center">
              <span className="mx-auto block h-14 w-16 border-2 border-(--color-border-brand) bg-(--color-bg-brand-subtle)" style={{ borderRadius: `var(${cssVar(t)})` }} />
              <Mono>{t.path.replace("radius.", "")}</Mono><br /><Mono muted>{resolve(t.value)}</Mono>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-(--spacing-lg)">
        <h4 className="mb-(--spacing-md) text-h5">Bordures & opacité</h4>
        <div className="flex flex-wrap gap-(--spacing-lg)">
          {bw.map((t) => (
            <div key={t.path} className="text-center">
              <span className="block h-12 w-20 rounded-(--radius-control) border-(--color-border-strong)" style={{ borderWidth: `var(${cssVar(t)})` }} />
              <Mono>{t.path.replace("border-width.", "")}</Mono> <Mono muted>{resolve(t.value)}</Mono>
            </div>
          ))}
          <div className="text-center"><span className="flex h-12 w-24 items-center justify-center rounded-(--radius-control) bg-(--color-bg-brand) text-body-small text-(--color-text-on-brand) opacity-(--opacity-disabled)">50 %</span><Mono>opacity.disabled</Mono></div>
        </div>
      </Card>
    </div>
  )
}

function Effects() {
  const items = [
    ["shadow-xs", "shadow.xs"], ["shadow-sm", "shadow.sm"], ["shadow-md", "shadow.md"], ["shadow-lg", "shadow.lg"], ["shadow-xl", "shadow.xl"],
  ]
  return (
    <div className="grid grid-cols-2 gap-(--spacing-lg) rounded-(--radius-card) bg-(--color-bg-subtle) p-(--spacing-xl) sm:grid-cols-4 lg:grid-cols-7">
      {items.map(([cls, p]) => (
        <div key={p} className={cn("rounded-(--radius-card) bg-(--color-bg-default) p-(--spacing-md)", cls)}>
          <Mono>{p}</Mono><p className="text-caption text-(--color-text-muted)">{S.find((t) => t.path === p)?.description}</p>
        </div>
      ))}
      <div className="rounded-(--radius-card) border border-(--color-border-focus) bg-(--color-bg-default) p-(--spacing-md) shadow-[var(--focus-ring)]"><Mono>focus.ring</Mono><p className="text-caption text-(--color-text-muted)">Anneau 3 px</p></div>
      <div className="rounded-(--radius-card) border border-(--color-border-error) bg-(--color-bg-default) p-(--spacing-md) shadow-[var(--focus-ring-error)]"><Mono>focus.ring-error</Mono><p className="text-caption text-(--color-text-muted)">Erreur, destructif</p></div>
    </div>
  )
}

export function Foundations() {
  return (
    <>
      <Sub title="Couleurs primitives" hint="tokens/primitives.tokens.json · jamais utilisées directement"><PrimitiveColors /></Sub>
      <Sub title="Couleurs sémantiques" hint="tokens/themes/light|dark.tokens.json"><SemanticColors /></Sub>
      <Sub title="Data viz" hint="color.dataviz.* · s'adapte au thème"><DataViz /></Sub>
      <Sub title="Typographie" hint="semantic.tokens.json → text-style.* · Fira Sans"><Typography /></Sub>
      <Sub title="Espacements, tailles, formes"><Dimensions /></Sub>
      <Sub title="Effets" hint="shadow.* · focus.*"><Effects /></Sub>
    </>
  )
}
