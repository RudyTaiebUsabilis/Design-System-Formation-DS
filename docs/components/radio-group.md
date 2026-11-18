---
name: RadioGroup
description: Groupe d'options dont une seule peut être sélectionnée à la fois.
status: stable
category: forms
code: src/components/ui/radio-group.tsx
shadcn: https://ui.shadcn.com/docs/components/radio-group
figma:
  file: S5w6gdpuYhKzlqm0WW1Xu9
  page: Composants J3
  node: "231:132"
variants:
  checked: [false, true]
props:
  - { name: value, type: string }
  - { name: defaultValue, type: string }
  - { name: onValueChange, type: function }
  - { name: disabled, type: boolean, default: false }
  - { name: required, type: boolean, default: false }
  - { name: orientation, type: enum, values: [vertical, horizontal], default: vertical }
  - { name: RadioGroupItem.value, type: string }
  - { name: RadioGroupItem.aria-invalid, type: boolean, default: false }
states: [default, focus, error, disabled, checked]
tokens:
  - color.bg.default
  - color.bg.brand
  - color.bg.error
  - color.border.strong
  - color.border.focus
  - color.border.focus-ring
  - color.border.error
  - color.border.error-ring
  - color.text.default
  - color.text.muted
  - size.radio
  - size.radio-dot
  - spacing.xs
  - spacing.sm
  - radius.pill
  - opacity.disabled
  - shadow.xs
  - text-style.body.small.medium
related: [Checkbox, Label]
updated: 2026-11-18
---

# RadioGroup

Groupe d'options mutuellement exclusives : l'utilisateur en sélectionne une seule (`RadioGroup` contient des `RadioGroupItem`). Figma : composant « Radio ».

## Installation

```bash
npx shadcn@latest add radio-group label
```

Dans ce dépôt : `import { RadioGroup, RadioGroupItem, Label } from "@/components/ui"`. Dépendance : `@radix-ui/react-radio-group`.

## Usage

**Utiliser quand :**

- **Choix unique parmi 2 à 6 options** visibles d'un coup (formule, mode de livraison, densité). Toutes les options restent affichées, car comparer est plus facile que dérouler une liste.
- **Une option par défaut** quand c'est possible (la plus courante ou la plus sûre), car le groupe ne peut pas revenir à « aucune sélection ».
- **Options qui méritent une explication** : une description sous chaque libellé.

**Ne pas utiliser quand :**

- Plusieurs choix sont possibles → alternative : `Checkbox`. Raison : un radio en désélectionne un autre.
- Plus de 6 options → alternative : `Select` (à venir). Raison : la liste devient trop longue à parcourir.
- Une seule option (oui / non implicite) → alternative : `Checkbox` ou `Switch`. Raison : un radio seul ne peut pas être décoché.
- Le choix s'applique immédiatement et modifie la vue (filtre, onglet) → alternative : `Tabs` ou contrôle segmenté (à venir). Raison : le radio est un champ de formulaire.

## Variantes et états

| Variante (Figma `Checked`) | Rôle | Règle |
|---|---|---|
| `False` | Option non sélectionnée | — |
| `True` | Option sélectionnée : point central `color.bg.brand` | Une seule par groupe. |

| État | Comportement |
|---|---|
| Repos | Cercle 16 px, contour `color.border.strong`. Le libellé est cliquable. |
| Focus | Contour `color.border.focus` + anneau 3 px. Les flèches changent d'option. |
| Erreur | `aria-invalid` sur les items : contour et anneau rouges, point `color.bg.error` ; message sous le groupe. |
| Désactivé | 50 % d'opacité, sur un item ou sur tout le groupe. |

## API

**RadioGroup**

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` / `defaultValue` | `string` | — | Option sélectionnée (contrôlé / non contrôlé). |
| `onValueChange` | `(value: string) => void` | — | Appelé au changement. |
| `disabled` | `boolean` | `false` | Désactive tout le groupe. |
| `required` | `boolean` | `false` | Requis dans un formulaire. |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Sens de navigation aux flèches. |
| `aria-labelledby` | `string` | — | Relie le groupe à son intitulé. |

**RadioGroupItem**

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | — | Valeur de l'option (obligatoire). |
| `id` | `string` | — | À relier au `Label`. |
| `disabled` | `boolean` | `false` | Désactive l'option. |
| `aria-invalid` | `boolean` | — | État erreur. |

## Tokens utilisés

| Partie | État | Tokens |
|---|---|---|
| `group` | toutes | écart entre options `spacing.sm` |
| `item` | toutes | taille `size.radio` ; arrondi `radius.pill` ; fond `color.bg.default` ; contour `color.border.strong` ; ombre `shadow.xs` |
| `item` | focus / erreur | contour `color.border.focus` / `color.border.error` ; anneau `color.border.focus-ring` / `color.border.error-ring` |
| `indicator` | coché / erreur | taille `size.radio-dot` ; fond `color.bg.brand` / `color.bg.error` |
| `label` | toutes | `text-style.body.small.medium`, `color.text.default` ; écart `spacing.xs` |
| `description` | toutes | `color.text.muted` |
| tout | désactivé | opacité `opacity.disabled` |

## Accessibilité

- Élément : Radix rend `role="radiogroup"` et des `role="radio"` avec `aria-checked`.
- Clavier : **un seul arrêt de tabulation** pour le groupe ; les flèches déplacent la sélection ; Espace sélectionne l'option focalisée.
- Intitulé : le groupe a un titre relié par `aria-labelledby` (ou `fieldset` + `legend`).
- Libellés : chaque option a un `Label htmlFor`.
- L'état coché ne repose pas que sur la couleur : le point central le matérialise.

## Exemples

```tsx
import { Label, RadioGroup, RadioGroupItem } from "@/components/ui"

<p id="formule" className="text-body-small font-semibold">Formule</p>
<RadioGroup defaultValue="mensuel" aria-labelledby="formule">
  <div className="flex items-start gap-(--spacing-xs)">
    <span className="flex h-5 items-center"><RadioGroupItem value="mensuel" id="f-m" /></span>
    <div className="grid gap-(--spacing-2xs)">
      <Label htmlFor="f-m">Mensuel</Label>
      <p className="text-body-small text-(--color-text-muted)">9 € / mois, résiliable à tout moment.</p>
    </div>
  </div>
  <div className="flex items-start gap-(--spacing-xs)">
    <span className="flex h-5 items-center"><RadioGroupItem value="annuel" id="f-a" /></span>
    <Label htmlFor="f-a">Annuel</Label>
  </div>
</RadioGroup>

// Erreur : aucun choix alors qu'il est requis
<RadioGroup required aria-describedby="err">
  <RadioGroupItem value="oui" id="oui" aria-invalid />
  <RadioGroupItem value="non" id="non" aria-invalid />
</RadioGroup>
<p id="err" className="text-body-small text-(--color-text-error)">Choisissez une option.</p>
```

## Do et Don't

- **Do :** 2 à 6 options courtes, dans un ordre logique.
- **Don't :** des radios pour un choix multiple.
- **Do :** une option sélectionnée par défaut quand c'est possible.
- **Don't :** plus de 6 options (préférer un `Select`).
- **Do :** un intitulé de groupe.
- **Don't :** un radio seul.

---

Les sections suivantes complètent le template de la formation.

## Anatomie

| Partie | Rôle |
|---|---|
| `group` | Conteneur `RadioGroup` : gère la valeur et le clavier. |
| `control` | Conteneur 20 px qui aligne le cercle sur la première ligne. |
| `item` | Le cercle de 16 px (`RadioGroupItem`). |
| `indicator` | Point central de 8 px, visible si sélectionné. |
| `label` / `description` | Libellé cliquable et aide optionnelle. |

## Correspondance avec Figma

| Dans Figma | Dans le code |
|---|---|
| Composant `Radio` (8 variantes) | `<RadioGroupItem>` dans un `<RadioGroup>` + `<Label>` |
| `Checked=False` · `True` | `value` du groupe différente · égale à celle de l'item |
| `State=Focus` | `:focus-visible` |
| `State=Error` | `aria-invalid` sur les items |
| `State=Disabled` | `disabled` (item ou groupe) |
| `Label` / `Description` | `<Label htmlFor>` / `<p>` |

## Prototype Figma

| Déclencheur | Depuis | Vers |
|---|---|---|
| Clic | `Checked=False` | `Checked=True` (même état) |

## Limites connues

- Dans le prototype Figma, les radios d'un groupe ne s'excluent pas entre eux (chaque instance réagit seule). En code, Radix gère l'exclusivité.
- Pas de variante « carte » (option dans une carte cliquable) : à composer.

## Implémentation de référence

[`src/components/ui/radio-group.tsx`](../../src/components/ui/radio-group.tsx)
