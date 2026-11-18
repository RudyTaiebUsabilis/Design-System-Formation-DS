---
name: Input
description: Champ de saisie d'une ligne de texte dans un formulaire.
status: stable
category: forms
code: src/components/ui/input.tsx
shadcn: https://ui.shadcn.com/docs/components/input
figma:
  file: S5w6gdpuYhKzlqm0WW1Xu9
  page: Composants J3
  node: "230:68"
variants:
  content: [placeholder, filled]
props:
  - { name: type, type: enum, values: [text, email, password, search, tel, url, number, file], default: text }
  - { name: placeholder, type: string }
  - { name: value, type: string }
  - { name: icon, type: node }
  - { name: disabled, type: boolean, default: false }
  - { name: aria-invalid, type: boolean, default: false }
states: [default, focus, error, disabled]
tokens:
  - color.bg.default
  - color.bg.brand
  - color.text.default
  - color.text.muted
  - color.text.on-brand
  - color.text.error
  - color.icon.muted
  - color.border.default
  - color.border.focus
  - color.border.focus-ring
  - color.border.error
  - color.border.error-ring
  - size.control-md
  - size.icon-md
  - spacing.xs
  - spacing.sm
  - radius.control
  - opacity.disabled
  - shadow.xs
  - text-style.body.small.regular
related: [Label, Button]
updated: 2026-11-18
---

# Input

Champ de saisie d'une ligne de texte dans un formulaire : nom, e-mail, recherche, mot de passe.

## Installation

```bash
npx shadcn@latest add input label
```

Dans ce dépôt : `import { Input, Label } from "@/components/ui"`. Extension J3 par rapport à shadcn : prop `icon` (propriété Figma « Icon »).

## Usage

**Utiliser quand :**

- **Saisie courte et libre** : nom, e-mail, ville, code. Toujours avec un `Label` visible au-dessus, car le libellé reste lisible pendant et après la saisie.
- **Recherche** : avec `icon={<Search />}` et `type="search"`, car l'icône rend la fonction reconnaissable sans libellé long (le `Label` peut alors être masqué visuellement avec `sr-only`).
- **Aide** : un texte d'aide sous le champ (`text-body-small`, `color.text.muted`) relié par `aria-describedby`, quand le format attendu n'est pas évident.

**Ne pas utiliser quand :**

- Le texte attendu fait plusieurs lignes → alternative : `Textarea` (à venir). Raison : un `<input>` n'affiche qu'une ligne et masque le reste.
- Le choix se fait parmi une liste connue → alternative : `RadioGroup` (2 à 6 options) ou `Select` (à venir). Raison : saisir ce qu'on pourrait choisir provoque des fautes et des doublons.
- Le placeholder sert de libellé → alternative : `Label` visible + placeholder d'exemple. Raison : le placeholder disparaît à la saisie et son contraste est faible.
- Une date ou une heure → alternative : sélecteur de date (à venir) ou `type="date"`. Raison : le format saisi à la main est ambigu.

## Variantes et états

| Variante (Figma `Content`) | Rôle | Règle |
|---|---|---|
| `Placeholder` | Champ vide, texte d'exemple en `color.text.muted` | Le placeholder montre un exemple (« camille@exemple.fr »), jamais une consigne. |
| `Filled` | Champ rempli, texte en `color.text.default` | — |

| État | Comportement |
|---|---|
| Repos | Contour `color.border.default`, ombre légère. Atteignable avec Tab. |
| Focus | Contour `color.border.focus` + anneau de 3 px `color.border.focus-ring`. Le curseur apparaît. |
| Erreur | `aria-invalid` : contour `color.border.error` + anneau `color.border.error-ring`, message d'erreur sous le champ en `color.text.error`. L'erreur s'affiche à la sortie du champ ou à l'envoi, pas à chaque frappe. |
| Désactivé | 50 % d'opacité, non focusable, non modifiable. Préférer `readOnly` si la valeur doit rester lisible et copiable. |

## API

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `type` | `string` | `"text"` | Type HTML : `email`, `password`, `search`, `tel`… adapte le clavier mobile. |
| `icon` | `ReactNode` | — | Icône décorative à gauche (Lucide, 16 px). Extension J3. |
| `aria-invalid` | `boolean` | — | Affiche l'état erreur. |
| `disabled` | `boolean` | `false` | Désactive le champ. |
| `placeholder` | `string` | — | Exemple de valeur, jamais seul libellé. |
| `autoComplete` | `string` | — | À renseigner (`email`, `name`, `tel`…) pour le remplissage automatique. |

Les autres props de `<input>` sont transmises.

## Tokens utilisés

| Partie | État | Tokens |
|---|---|---|
| `container` | toutes | hauteur `size.control-md` ; marges `spacing.sm` ; arrondi `radius.control` ; fond `color.bg.default` ; ombre `shadow.xs` |
| `container` | repos / focus / erreur | contour `color.border.default` → `color.border.focus` → `color.border.error` ; anneau `color.border.focus-ring` / `color.border.error-ring` |
| `text` | rempli / placeholder | style `text-style.body.small.regular` ; `color.text.default` / `color.text.muted` |
| `icon` | toutes | taille `size.icon-md` ; couleur `color.icon.muted` ; écart `spacing.xs` |
| `selection` | sélection de texte | fond `color.bg.brand`, texte `color.text.on-brand` |
| message d'erreur | erreur | `color.text.error` |
| `container` | désactivé | opacité `opacity.disabled` |

## Accessibilité

- Élément natif : `<input>`, toujours relié à un `<Label htmlFor>` (ou `aria-label` pour une recherche à libellé masqué).
- Clavier : Tab pour entrer et sortir ; aucun piège de focus.
- Focus : anneau de 3 px, jamais supprimé.
- Erreur : `aria-invalid="true"` + message relié par `aria-describedby`. Le message dit comment corriger.
- Contraste : texte saisi ≥ 4,5:1 ; contour du champ ≥ 3:1 avec le fond (`color.border.default` est un séparateur : en contexte très clair, préférer `color.border.strong`).
- `type` et `autoComplete` adaptés : clavier mobile et gestionnaire de mots de passe.

## Exemples

```tsx
import { Input, Label } from "@/components/ui"
import { Mail, Search } from "lucide-react"

// Champ avec label et aide
<div className="grid gap-(--spacing-xs)">
  <Label htmlFor="email">E-mail</Label>
  <Input id="email" type="email" autoComplete="email" placeholder="camille@exemple.fr" aria-describedby="email-aide" />
  <p id="email-aide" className="text-body-small text-(--color-text-muted)">Nous ne partagerons jamais votre adresse.</p>
</div>

// Erreur
<Input id="email" aria-invalid aria-describedby="email-erreur" defaultValue="camille@" />
<p id="email-erreur" className="text-body-small text-(--color-text-error)">Saisissez une adresse e-mail valide.</p>

// Recherche avec icône
<Label htmlFor="q" className="sr-only">Rechercher</Label>
<Input id="q" type="search" icon={<Search />} placeholder="Rechercher…" />

// Désactivé
<Input disabled placeholder="Indisponible" />
```

## Do et Don't

- **Do :** un label court au-dessus du champ.
- **Don't :** le placeholder comme seul libellé.
- **Do :** un message d'erreur qui dit comment corriger : « Saisissez une adresse e-mail valide ».
- **Don't :** « Champ invalide », ou une erreur affichée à chaque frappe.
- **Do :** une largeur proportionnée à la donnée (code postal plus court qu'une adresse).
- **Don't :** désactiver le bouton d'envoi au lieu d'afficher l'erreur sur le champ.

---

Les sections suivantes complètent le template de la formation.

## Anatomie

| Partie | Rôle |
|---|---|
| `label` (externe) | Composant `Label` au-dessus du champ. |
| `container` | Le `<input>` : contour, fond, arrondi, ombre. |
| `icon` | Icône décorative optionnelle à gauche. |
| `text` | Valeur saisie ou placeholder. |
| `message` (externe) | Aide ou erreur sous le champ. |

## Correspondance avec Figma

| Dans Figma | Dans le code |
|---|---|
| Composant `Input` (8 variantes) | `<Input>` |
| `Content=Placeholder` · `Filled` | champ vide (`placeholder`) · rempli (`value` / `defaultValue`) |
| `State=Focus` | `:focus-visible` (CSS) |
| `State=Error` | `aria-invalid` |
| `State=Disabled` | `disabled` |
| Propriétés `Placeholder` · `Value` | `placeholder` · `value` |
| `Icon` + `Icon · glyph` | `icon={<Search />}` |

## Prototype Figma

| Déclencheur | Depuis | Vers |
|---|---|---|
| Clic | `State=Default` ou `Error` | `State=Focus`, même contenu |
| Clic | `Content=Placeholder, State=Focus` | `Content=Filled, State=Focus` (simule la saisie) |

## Limites connues

- Pas de tailles `sm` / `lg` : une seule hauteur (36 px), comme shadcn.
- Pas d'icône à droite (bouton effacer, afficher le mot de passe) : à composer à la main ou à ajouter.
- `Label` et message d'aide ne font pas partie du composant (composition, comme shadcn).

## Implémentation de référence

[`src/components/ui/input.tsx`](../../src/components/ui/input.tsx)
