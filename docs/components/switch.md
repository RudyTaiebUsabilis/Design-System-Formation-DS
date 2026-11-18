---
name: Switch
description: Active ou désactive un réglage, avec effet immédiat.
status: stable
category: forms
code: src/components/ui/switch.tsx
shadcn: https://ui.shadcn.com/docs/components/switch
figma:
  file: S5w6gdpuYhKzlqm0WW1Xu9
  page: Composants J3
  node: "231:172"
variants:
  checked: [false, true]
props:
  - { name: checked, type: boolean }
  - { name: defaultChecked, type: boolean, default: false }
  - { name: onCheckedChange, type: function }
  - { name: disabled, type: boolean, default: false }
  - { name: required, type: boolean, default: false }
states: [default, focus, disabled, checked]
tokens:
  - color.bg.brand
  - color.bg.toggle-off
  - color.bg.toggle-thumb
  - color.border.focus-ring
  - color.text.default
  - color.text.muted
  - size.switch-width
  - size.switch-height
  - size.switch-thumb
  - spacing.3xs
  - spacing.xs
  - radius.pill
  - opacity.disabled
  - shadow.xs
  - text-style.body.small.medium
related: [Checkbox, Label]
updated: 2026-11-18
---

# Switch

Active ou désactive un réglage dont l'effet est **immédiat** : notifications, mode sombre, synchronisation.

## Installation

```bash
npx shadcn@latest add switch label
```

Dans ce dépôt : `import { Switch, Label } from "@/components/ui"`. Dépendance : `@radix-ui/react-switch`.

## Usage

**Utiliser quand :**

- **Réglage appliqué sans validation** : le changement prend effet au clic, sans bouton « Enregistrer », car le switch imite un interrupteur physique.
- **Liste de préférences** : un switch par ligne, libellé à gauche et switch aligné à droite, car l'œil compare plus vite des contrôles alignés.
- **Libellé = l'option** (« Mode avion »), avec une description si l'effet n'est pas évident.

**Ne pas utiliser quand :**

- Le choix est validé par un bouton d'envoi → alternative : `Checkbox`. Raison : un switch laisse croire que c'est déjà enregistré.
- C'est une action ponctuelle (« Synchroniser maintenant ») → alternative : `Button`. Raison : un switch exprime un état durable.
- Plus de deux états → alternative : `RadioGroup`. Raison : un switch est binaire.
- Le changement est risqué ou irréversible → alternative : `Button` + confirmation. Raison : un switch se bascule par erreur.

## Variantes et états

| Variante (Figma `Checked`) | Rôle | Règle |
|---|---|---|
| `False` | Réglage désactivé : piste `color.bg.toggle-off`, pastille à gauche | — |
| `True` | Réglage activé : piste `color.bg.brand`, pastille à droite | — |

| État | Comportement |
|---|---|
| Repos | Piste 32 × 20 px, pastille 16 px. Clic sur le switch ou son libellé. |
| Focus | Anneau 3 px `color.border.focus-ring`. Espace bascule. |
| Désactivé | 50 % d'opacité, non focusable. Expliquer pourquoi à proximité (« Géré par votre administrateur »). |
| Transition | La pastille glisse en 200 ms (Smart animate dans Figma, `transition-transform` en CSS). |

## API

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `checked` | `boolean` | — | État contrôlé. |
| `defaultChecked` | `boolean` | `false` | État initial non contrôlé. |
| `onCheckedChange` | `(checked: boolean) => void` | — | Appelé à chaque bascule : appliquer l'effet ici. |
| `disabled` | `boolean` | `false` | Désactive le switch. |
| `id` | `string` | — | À relier au `Label`. |

## Tokens utilisés

| Partie | État | Tokens |
|---|---|---|
| `track` | toutes | largeur `size.switch-width` ; hauteur `size.switch-height` ; marge `spacing.3xs` ; arrondi `radius.pill` ; ombre `shadow.xs` |
| `track` | off / on | fond `color.bg.toggle-off` / `color.bg.brand` |
| `thumb` | toutes | taille `size.switch-thumb` ; arrondi `radius.pill` ; fond `color.bg.toggle-thumb` |
| `track` | focus | anneau `color.border.focus-ring` |
| `label` | toutes | `text-style.body.small.medium`, `color.text.default` ; écart `spacing.xs` |
| tout | désactivé | opacité `opacity.disabled` |

## Accessibilité

- Élément : Radix rend `<button role="switch" aria-checked>`.
- Clavier : Tab pour atteindre, Espace (ou Entrée) pour basculer.
- Libellé : `Label htmlFor` qui décrit l'option, jamais l'état (« Activé » / « Désactivé »).
- Effet immédiat : si le résultat n'est pas visible, l'annoncer (toast ou zone `aria-live`).
- Contraste : piste ≥ 3:1 avec le fond dans les deux états ; la position de la pastille porte aussi l'information.

## Exemples

```tsx
import { Label, Switch } from "@/components/ui"

// Simple
<div className="flex items-center gap-(--spacing-xs)">
  <Switch id="avion" />
  <Label htmlFor="avion">Mode avion</Label>
</div>

// Liste de réglages
<div className="flex items-center justify-between gap-(--spacing-md)">
  <Label htmlFor="alertes">Alertes de sécurité</Label>
  <Switch id="alertes" checked={alertes} onCheckedChange={setAlertes} />
</div>

// Désactivé, avec explication
<Switch id="sso" disabled defaultChecked aria-describedby="sso-info" />
<p id="sso-info" className="text-body-small text-(--color-text-muted)">Géré par votre administrateur.</p>
```

## Do et Don't

- **Do :** un réglage appliqué immédiatement.
- **Don't :** un switch dans un formulaire validé par un bouton (préférer `Checkbox`).
- **Do :** un libellé court, à l'affirmatif, toujours du même côté.
- **Don't :** « Oui / Non » dans la piste, ou un libellé qui change avec l'état.

---

Les sections suivantes complètent le template de la formation.

## Anatomie

| Partie | Rôle |
|---|---|
| `track` | La piste cliquable (32 × 20 px). |
| `thumb` | La pastille de 16 px qui glisse. |
| `label` / `description` | Libellé et aide optionnelle. |

## Correspondance avec Figma

| Dans Figma | Dans le code |
|---|---|
| Composant `Switch` (6 variantes) | `<Switch>` + `<Label>` |
| `Checked=False` · `True` | `checked={false}` · `{true}` |
| `State=Focus` | `:focus-visible` |
| `State=Disabled` | `disabled` |
| Calques `Track` / `Thumb` | `SwitchPrimitive.Root` / `SwitchPrimitive.Thumb` |

## Prototype Figma

| Déclencheur | Depuis | Vers |
|---|---|---|
| Clic | `Checked=False` | `Checked=True` (Smart animate 200 ms, la pastille glisse) |
| Clic | `Checked=True` | `Checked=False` |

## Limites connues

- Pas de taille `sm` / `lg`.
- Pas d'état erreur : un switch n'est normalement pas « requis ».
- Piste agrandie à 20 px de haut (shadcn : 18,4 px) pour s'aligner sur l'interligne de `Body/Small`.

## Implémentation de référence

[`src/components/ui/switch.tsx`](../../src/components/ui/switch.tsx)
