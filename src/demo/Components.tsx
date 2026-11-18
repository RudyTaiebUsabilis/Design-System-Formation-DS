import * as React from "react"
import { ArrowRight, Check, Info, Loader2, Mail, Plus, Search, Trash2 } from "lucide-react"
import { Button, Checkbox, Input, Label, Link, RadioGroup, RadioGroupItem, Switch, Tag } from "@/components/ui"
import { Card, Code, Matrix, Sub } from "./ui"

/** Simule les états CSS (:hover, :focus-visible) pour les montrer côte à côte. */
const STATE: Record<string, string> = {
  Hover: "pointer-events-none",
  Focus: "pointer-events-none ring-[3px] ring-(--color-border-focus-ring)",
}

function Doc({ name, file }: { name: string; file: string }) {
  return <p className="text-body-small text-(--color-text-muted)">Doc : <Code>docs/components/{file}.md</Code> · Code : <Code>src/components/ui/{name}.tsx</Code></p>
}

function ButtonDemo() {
  const variants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const
  const hoverBg: Record<string, string> = { default: "bg-(--color-bg-brand-hover)", secondary: "bg-(--color-bg-secondary-hover)", outline: "bg-(--color-bg-muted)", ghost: "bg-(--color-bg-muted)", destructive: "bg-(--color-bg-error-hover)", link: "underline text-(--color-text-link-hover)" }
  return (
    <Sub title="Button" hint={<Doc name="button" file="button" />}>
      <div className="space-y-(--spacing-md)">
        <Matrix
          cols={["Default", "Hover", "Focus", "Disabled"]}
          rows={[...variants]}
          rowLabel={(r) => r[0].toUpperCase() + r.slice(1)}
          render={(v, s) => (
            <Button variant={v as any} disabled={s === "Disabled"} className={s === "Hover" ? `${STATE.Hover} ${hoverBg[v]}` : s === "Focus" ? `${STATE.Focus} ${v === "destructive" ? "ring-(--color-border-error-ring)" : ""} ${v === "outline" ? "border-(--color-border-focus)" : ""}` : ""}>
              Button
            </Button>
          )}
        />
        <Card className="flex flex-wrap items-center gap-(--spacing-sm) p-(--spacing-lg)">
          <Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button>
          <span className="mx-(--spacing-xs) h-6 w-px bg-(--color-border-default)" />
          <Button><Plus /> Nouveau projet</Button>
          <Button variant="outline"><Mail /> Par e-mail</Button>
          <Button disabled><Loader2 className="animate-spin" /> Patientez…</Button>
          <Button variant="destructive"><Trash2 /> Supprimer</Button>
          <Button variant="link" asChild><a href="#composants">asChild → lien</a></Button>
        </Card>
      </div>
    </Sub>
  )
}

function InputDemo() {
  return (
    <Sub title="Input" hint={<Doc name="input" file="input" />}>
      <Matrix
        cols={["Default", "Focus", "Error", "Disabled"]}
        rows={["Placeholder", "Filled"]}
        render={(c, s) => (
          <Input
            className={s === "Focus" ? "border-(--color-border-focus) ring-[3px] ring-(--color-border-focus-ring)" : ""}
            aria-invalid={s === "Error" || undefined}
            disabled={s === "Disabled"}
            placeholder="email@exemple.fr"
            defaultValue={c === "Filled" ? "rudy@usabilis.com" : undefined}
            readOnly={s === "Focus"}
          />
        )}
      />
      <Card className="mt-(--spacing-md) grid gap-(--spacing-lg) p-(--spacing-lg) md:grid-cols-3">
        <div className="grid gap-(--spacing-xs)"><Label htmlFor="d-email">E-mail</Label><Input id="d-email" type="email" placeholder="email@exemple.fr" aria-describedby="d-email-help" /><p id="d-email-help" className="text-body-small text-(--color-text-muted)">Nous ne partagerons jamais votre adresse.</p></div>
        <div className="grid gap-(--spacing-xs)"><Label htmlFor="d-search">Recherche</Label><Input id="d-search" icon={<Search />} placeholder="Rechercher…" /></div>
        <div className="grid gap-(--spacing-xs)"><Label htmlFor="d-err">E-mail</Label><Input id="d-err" aria-invalid defaultValue="rudy@usabilis" aria-describedby="d-err-msg" /><p id="d-err-msg" className="text-body-small text-(--color-text-error)">Saisissez une adresse e-mail valide.</p></div>
      </Card>
    </Sub>
  )
}

function ToggleRow({ children, label, desc, id }: { children: React.ReactNode; label: string; desc?: string; id: string }) {
  return (
    <div className="flex items-start gap-(--spacing-xs)">
      <span className="flex h-5 items-center">{children}</span>
      <div className="grid gap-(--spacing-2xs)">
        <Label htmlFor={id}>{label}</Label>
        {desc && <p className="text-body-small text-(--color-text-muted)">{desc}</p>}
      </div>
    </div>
  )
}

function CheckboxDemo() {
  return (
    <Sub title="Checkbox" hint={<Doc name="checkbox" file="checkbox" />}>
      <Matrix
        cols={["Default", "Focus", "Error", "Disabled"]}
        rows={["Non coché", "Coché", "Indéterminé"]}
        render={(r, s) => {
          const id = `cb-${r}-${s}`
          const checked = r === "Coché" ? true : r === "Indéterminé" ? "indeterminate" : false
          return (
            <ToggleRow id={id} label="Accepter les conditions">
              <Checkbox id={id} defaultChecked={checked} aria-invalid={s === "Error" || undefined} disabled={s === "Disabled"} className={s === "Focus" ? STATE.Focus + " border-(--color-border-focus)" : ""} />
            </ToggleRow>
          )
        }}
      />
    </Sub>
  )
}

function RadioDemo() {
  const [plan, setPlan] = React.useState("mensuel")
  return (
    <Sub title="Radio Group" hint={<Doc name="radio-group" file="radio-group" />}>
      <div className="grid gap-(--spacing-md) lg:grid-cols-[2fr_1fr]">
        <Matrix
          cols={["Default", "Focus", "Error", "Disabled"]}
          rows={["Non coché", "Coché"]}
          render={(r, s) => (
            <RadioGroup value={r === "Coché" ? "a" : ""} disabled={s === "Disabled"}>
              <ToggleRow id={`r-${r}-${s}`} label="Option">
                <RadioGroupItem id={`r-${r}-${s}`} value="a" aria-invalid={s === "Error" || undefined} className={s === "Focus" ? STATE.Focus + " border-(--color-border-focus)" : ""} />
              </ToggleRow>
            </RadioGroup>
          )}
        />
        <Card className="p-(--spacing-lg)">
          <p className="mb-(--spacing-sm) text-body-small font-semibold" id="plan-label">Formule</p>
          <RadioGroup value={plan} onValueChange={setPlan} aria-labelledby="plan-label">
            <ToggleRow id="p-m" label="Mensuel" desc="9 € / mois, résiliable à tout moment."><RadioGroupItem id="p-m" value="mensuel" /></ToggleRow>
            <ToggleRow id="p-a" label="Annuel" desc="90 € / an, 2 mois offerts."><RadioGroupItem id="p-a" value="annuel" /></ToggleRow>
          </RadioGroup>
        </Card>
      </div>
    </Sub>
  )
}

function SwitchDemo() {
  return (
    <Sub title="Switch" hint={<Doc name="switch" file="switch" />}>
      <div className="grid gap-(--spacing-md) lg:grid-cols-[2fr_1fr]">
        <Matrix
          cols={["Default", "Focus", "Disabled"]}
          rows={["Off", "On"]}
          render={(r, s) => (
            <ToggleRow id={`s-${r}-${s}`} label="Mode avion">
              <Switch id={`s-${r}-${s}`} defaultChecked={r === "On"} disabled={s === "Disabled"} className={s === "Focus" ? STATE.Focus : ""} />
            </ToggleRow>
          )}
        />
        <Card className="space-y-(--spacing-md) p-(--spacing-lg)">
          {[["E-mails marketing", false], ["Alertes de sécurité", true], ["Mode sombre", false]].map(([l, c]) => (
            <div key={l as string} className="flex items-center justify-between gap-(--spacing-md)">
              <Label htmlFor={`sw-${l}`}>{l}</Label><Switch id={`sw-${l}`} defaultChecked={c as boolean} />
            </div>
          ))}
        </Card>
      </div>
    </Sub>
  )
}

function TagDemo() {
  const [filters, setFilters] = React.useState(["Design", "Paris", "Moins de 30 j"])
  return (
    <Sub title="Tag" hint={<Doc name="tag" file="tag" />}>
      <Card className="space-y-(--spacing-md) p-(--spacing-lg)">
        <div className="flex flex-wrap gap-(--spacing-xs)">
          <Tag>Nouveau</Tag><Tag variant="secondary">Brouillon</Tag><Tag variant="outline">Archivé</Tag><Tag variant="destructive">Supprimé</Tag>
          <Tag variant="success"><Check /> Publié</Tag><Tag variant="warning">En attente</Tag><Tag variant="info"><Info /> Bêta</Tag>
        </div>
        <div className="flex flex-wrap items-center gap-(--spacing-xs)">
          <span className="text-body-small text-(--color-text-muted)">Filtres actifs :</span>
          {filters.map((f) => <Tag key={f} variant="secondary" onRemove={() => setFilters((x) => x.filter((y) => y !== f))}>{f}</Tag>)}
          {filters.length === 0 && <Button size="sm" variant="ghost" onClick={() => setFilters(["Design", "Paris", "Moins de 30 j"])}>Réinitialiser</Button>}
        </div>
      </Card>
    </Sub>
  )
}

function LinkDemo() {
  return (
    <Sub title="Link" hint={<Doc name="link" file="link" />}>
      <Card className="grid gap-(--spacing-lg) p-(--spacing-lg) md:grid-cols-3">
        <div className="grid gap-(--spacing-xs)"><p className="text-caption text-(--color-text-muted)">Standalone</p><Link href="#composants">En savoir plus</Link><Link size="sm" href="#composants">Voir tous les projets</Link></div>
        <div className="grid gap-(--spacing-xs)"><p className="text-caption text-(--color-text-muted)">Externe</p><Link href="https://ui.shadcn.com" external>Documentation shadcn</Link></div>
        <div className="grid gap-(--spacing-xs)"><p className="text-caption text-(--color-text-muted)">Inline</p><p className="text-body-default">En continuant, vous acceptez nos <Link type="inline" href="#exemple">conditions d’utilisation</Link>.</p></div>
      </Card>
    </Sub>
  )
}

export function Components() {
  return (
    <>
      <ButtonDemo /><InputDemo /><CheckboxDemo /><RadioDemo /><SwitchDemo /><TagDemo /><LinkDemo />
    </>
  )
}

export function SignupExample() {
  const [sent, setSent] = React.useState(false)
  return (
    <div className="flex justify-center rounded-(--radius-modal) bg-(--color-bg-subtle) p-(--spacing-2xl)">
      <Card className="w-full max-w-[28rem] space-y-(--spacing-lg) p-(--spacing-xl) shadow-sm">
        <div className="space-y-(--spacing-2xs)">
          <div className="flex gap-(--spacing-2xs)"><Tag variant="success"><Check /> Essai gratuit</Tag><Tag variant="secondary">Sans engagement</Tag></div>
          <h3 className="text-h3">Créer un compte</h3>
          <p className="text-body-small text-(--color-text-muted)">Tous les composants assemblés, uniquement avec les tokens J3.</p>
        </div>
        <form className="space-y-(--spacing-lg)" onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <div className="grid gap-(--spacing-xs)"><Label htmlFor="f-name">Nom complet</Label><Input id="f-name" placeholder="Camille Martin" autoComplete="name" /></div>
          <div className="grid gap-(--spacing-xs)"><Label htmlFor="f-mail">E-mail</Label><Input id="f-mail" type="email" icon={<Mail />} placeholder="camille@exemple.fr" autoComplete="email" /></div>
          <fieldset className="grid gap-(--spacing-xs)">
            <legend className="mb-(--spacing-xs) text-body-small font-medium">Formule</legend>
            <RadioGroup defaultValue="m">
              <ToggleRow id="f-m" label="Mensuel" desc="9 € / mois"><RadioGroupItem id="f-m" value="m" /></ToggleRow>
              <ToggleRow id="f-a" label="Annuel" desc="90 € / an, 2 mois offerts"><RadioGroupItem id="f-a" value="a" /></ToggleRow>
            </RadioGroup>
          </fieldset>
          <div className="flex items-center gap-(--spacing-xs)"><Switch id="f-news" /><Label htmlFor="f-news">Recevoir la newsletter</Label></div>
          <div className="flex items-start gap-(--spacing-xs)"><span className="flex h-5 items-center"><Checkbox id="f-cgu" required /></span><Label htmlFor="f-cgu" className="block">J’accepte les <Link type="inline" size="sm" href="#exemple">conditions d’utilisation</Link></Label></div>
          <div className="flex justify-end gap-(--spacing-xs)">
            <Button type="reset" variant="outline" onClick={() => setSent(false)}>Annuler</Button>
            <Button type="submit">Créer le compte <ArrowRight /></Button>
          </div>
          {sent && <p role="status" className="rounded-(--radius-control) bg-(--color-bg-success-subtle) p-(--spacing-sm) text-body-small text-(--color-text-success)">Compte créé (démo).</p>}
        </form>
        <p className="text-center text-body-small text-(--color-text-muted)">Déjà un compte ? <Link size="sm" href="#exemple">Se connecter</Link></p>
      </Card>
    </div>
  )
}
