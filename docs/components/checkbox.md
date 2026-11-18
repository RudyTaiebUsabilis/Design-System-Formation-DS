---
name: Checkbox
description: Permet de cocher ou décocher une option, seule ou dans une liste à choix multiples.
status: stable
category: forms
code: src/components/ui/checkbox.tsx
shadcn: https://ui.shadcn.com/docs/components/checkbox
figma:
  file: S5w6gdpuYhKzlqm0WW1Xu9
  page: Composants J3
  node: "231:78"
variants:
  checked: [false, true, indeterminate]
props:
  - { name: checked, type: enum, values: [false, true, indeterminate] }
  - { name: defaultChecked, type: enum, values: [false, true, indeterminate], default: false }
  - { name: onCheckedChange, type: function }
  - { name: disabled, type: boolean, default: false }
  - { name: required, type: boolean, default: false }
  - { name: aria-invalid, type: boolean, default: false }
states: [default, focus, error, disabled, checked, indeterminate]
tokens:
  - color.bg.default
  - color.bg.brand
  - color.icon.on-brand
  - color.border.strong
  - color.border.brand
  - color.border.focus
  - color.border.focus-ring
  - color.border.error
  - color.border.error-ring
  - color.text.default
  - color.text.muted
  - size.checkbox
  - size.icon-sm
  - spacing.xs
  - spacing.2xs
  - radius.badge
  - opacity.disabled
  - shadow.xs
  - text-style.body.small.medium
  - text-style.body.small.regular
related: [Label, Switch, RadioGroup]
updated: 2026-11-18
---

# Checkbox

Permet de cocher ou décocher une option : une option indépendante (accepter les conditions) ou plusieurs choix dans une liste.

## Installation

```bash
npx shadcn@latest add checkbox label
```

Dans ce dépôt : `import { Checkbox, Label } from "@/components/ui"`. Dépendance : `@radix-ui/react-checkbox`.

## Usage

**Utiliser quand :**

- **Option indépendante** : accepter des conditions, se souvenir de moi. Le libellé est formulé à l'affirmatif, car « Ne pas recevoir… » oblige à une double négation.
- **Liste à choix multiples** : l'utilisateur peut cocher zéro, une ou plusieurs options. La liste a un intitulé (`fieldset` + `legend`), car sans lui les options n'ont pas de contexte pour un lecteur d'écran.
- **Sélection partielle** : un parent dont seuls certains enfants sont cochés passe en `indeterminate`, car il résume l'état du groupe.
- **Choix validé par un bouton** : le changement ne prend effet qu'à l'envoi du formulaire.

**Ne pas utiliser quand :**

- Le réglage s'applique immédiatement → alternative : `Switch`. Raison : une case laisse attendre un bouton de validation.
- Une seule option parmi plusieurs → alternative : `RadioGroup`. Raison : des cases laissent croire que plusieurs choix sont possibles.
- L'action est une commande (« Supprimer ») → alternative : `Button`. Raison : une case exprime un état, pas une action.
- Le consentement est pré-coché → alternative : case décochée par défaut. Raison : le RGPD exige un consentement actif.

## Variantes et états

| Variante (Figma `Checked`) | Rôle | Règle |
|---|---|---|
| `False` | Non coché | État par défaut d'un consentement. |
| `True` | Coché : fond `color.bg.brand`, coche `color.icon.on-brand` | — |
| `Indeterminate` | Sélection partielle d'un groupe : tiret | Uniquement pour un parent. Un clic le passe à `True`. |

| État | Comportement |
|---|---|
| Repos | Case 16 px, contour `color.border.strong`. Le libellé entier est cliquable. |
| Focus | Contour `color.border.focus` + anneau 3 px. Espace coche et décoche. |
| Erreur | `aria-invalid` : contour et anneau rouges ; message d'erreur sous le groupe. |
| Désactivé | 50 % d'opacité sur la case et le libellé (`peer-disabled`), non focusable. |

## API

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `checked` | `boolean \| "indeterminate"` | — | État contrôlé. |
| `defaultChecked` | `boolean \| "indeterminate"` | `false` | État initial non contrôlé. |
| `onCheckedChange` | `(checked) => void` | — | Appelé à chaque changement. |
| `disabled` | `boolean` | `false` | Désactive la case. |
| `required` | `boolean` | `false` | Requis dans un formulaire. |
| `aria-invalid` | `boolean` | — | État erreur. |
| `id` | `string` | — | À relier au `Label` (`htmlFor`). |

## Tokens utilisés

| Partie | État | Tokens |
|---|---|---|
| `box` | toutes | taille `size.checkbox` ; arrondi `radius.badge` ; ombre `shadow.xs` |
| `box` | non coché / coché | fond `color.bg.default` → `color.bg.brand` ; contour `color.border.strong` → `color.border.brand` |
| `box` | focus / erreur | contour `color.border.focus` / `color.border.error` ; anneau `color.border.focus-ring` / `color.border.error-ring` |
| `indicator` | coché / indéterminé | icône `size.icon-sm`, `color.icon.on-brand` |
| `label` | toutes | `text-style.body.small.medium`, `color.text.default` ; écart `spacing.xs` |
| `description` | toutes | `text-style.body.small.regular`, `color.text.muted` ; écart `spacing.2xs` |
| tout | désactivé | opacité `opacity.disabled` |

## Accessibilité

- Élément : Radix rend un `<button role="checkbox">` avec `aria-checked` (`mixed` pour indéterminé) et un `<input>` caché pour les formulaires.
- Clavier : Tab pour atteindre, Espace pour cocher / décocher.
- Libellé : toujours un `Label htmlFor` ; la zone de clic couvre le libellé, pas seulement la case de 16 px.
- Groupe : `fieldset` + `legend` pour une liste de cases.
- Contraste : contour de la case ≥ 3:1 avec le fond (d'où `color.border.strong`).

## Exemples

```tsx
import { Checkbox, Label } from "@/components/ui"

// Option seule
<div className="flex items-start gap-(--spacing-xs)">
  <span className="flex h-5 items-center"><Checkbox id="cgu" /></span>
  <Label htmlFor="cgu">Accepter les conditions</Label>
</div>

// Avec description
<div className="flex items-start gap-(--spacing-xs)">
  <span className="flex h-5 items-center"><Checkbox id="news" defaultChecked /></span>
  <div className="grid gap-(--spacing-2xs)">
    <Label htmlFor="news">Recevoir le résumé hebdomadaire</Label>
    <p className="text-body-small text-(--color-text-muted)">Un e-mail le lundi matin.</p>
  </div>
</div>

// Groupe avec parent indéterminé
<fieldset>
  <legend className="text-body-small font-semibold">Notifications</legend>
  <Checkbox checked={all ? true : some ? "indeterminate" : false} onCheckedChange={toggleAll} />
</fieldset>

// Erreur
<Checkbox id="cgu" aria-invalid aria-describedby="cgu-err" />
<p id="cgu-err" className="text-body-small text-(--color-text-error)">Acceptez les conditions pour continuer.</p>
```

Le conteneur `h-5` (20 px = interlignage de `Body/Small`) centre la case sur la première ligne du libellé, comme dans Figma.

## Do et Don't

- **Do :** formuler l'option à l'affirmatif.
- **Don't :** « Ne pas me désabonner ».
- **Do :** `indeterminate` pour un parent dont seuls certains enfants sont cochés.
- **Don't :** déclencher une action immédiate au clic (préférer `Switch`).
- **Do :** case décochée par défaut pour un consentement.
- **Don't :** une case sans libellé.

---

Les sections suivantes complètent le template de la formation.

## Anatomie

| Partie | Rôle |
|---|---|
| `control` | Conteneur de 20 px qui aligne la case sur la première ligne du libellé. |
| `box` | La case de 16 px. |
| `indicator` | Coche (`Check`) ou tiret (`Minus`), 14 px. |
| `label` | Libellé cliquable (`Label`). |
| `description` | Aide optionnelle sous le libellé. |

## Correspondance avec Figma

| Dans Figma | Dans le code |
|---|---|
| Composant `Checkbox` (12 variantes) | `<Checkbox>` + `<Label>` |
| `Checked=False` · `True` · `Indeterminate` | `checked={false}` · `{true}` · `"indeterminate"` |
| `State=Focus` | `:focus-visible` |
| `State=Error` | `aria-invalid` |
| `State=Disabled` | `disabled` |
| `Label` + `Show label` | `<Label htmlFor>` |
| `Description` + `Show description` | `<p>` relié par `aria-describedby` |

## Prototype Figma

| Déclencheur | Depuis | Vers |
|---|---|---|
| Clic | `Checked=False` | `Checked=True` (même état) |
| Clic | `Checked=True` | `Checked=False` |
| Clic | `Checked=Indeterminate` | `Checked=True` |

## Limites connues

- Le libellé et la description sont composés à côté (comme shadcn) ; dans Figma ils font partie du composant.
- La logique parent / enfants de l'état indéterminé est à écrire dans l'écran.

## Implémentation de référence

[`src/components/ui/checkbox.tsx`](../../src/components/ui/checkbox.tsx)
