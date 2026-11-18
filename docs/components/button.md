---
name: Button
description: Déclenche une action immédiate sur la page ou dans un formulaire.
status: stable
category: basics
code: src/components/ui/button.tsx
shadcn: https://ui.shadcn.com/docs/components/button
figma:
  file: S5w6gdpuYhKzlqm0WW1Xu9
  page: Composants J3
  node: "229:434"
variants:
  variant: [default, secondary, outline, ghost, destructive, link]
  size: [sm, default, lg]
props:
  - { name: variant, type: enum, values: [default, secondary, outline, ghost, destructive, link], default: default }
  - { name: size, type: enum, values: [sm, default, lg], default: default }
  - { name: disabled, type: boolean, default: false }
  - { name: asChild, type: boolean, default: false }
  - { name: type, type: enum, values: [button, submit, reset], default: submit }
  - { name: children, type: node }
states: [default, hover, focus, disabled]
tokens:
  - color.bg.brand
  - color.bg.brand-hover
  - color.bg.secondary
  - color.bg.secondary-hover
  - color.bg.default
  - color.bg.muted
  - color.bg.error
  - color.bg.error-hover
  - color.text.on-brand
  - color.text.default
  - color.text.on-status
  - color.text.link
  - color.text.link-hover
  - color.icon.on-brand
  - color.icon.default
  - color.icon.on-status
  - color.icon.link
  - color.border.default
  - color.border.focus
  - color.border.focus-ring
  - color.border.error-ring
  - size.control-sm
  - size.control-md
  - size.control-lg
  - size.icon-md
  - spacing.xs
  - spacing.sm
  - spacing.md
  - spacing.lg
  - radius.control
  - opacity.disabled
  - shadow.xs
  - text-style.body.small.medium
related: [Link, Tag]
updated: 2026-11-18
---

# Button

Déclenche une action immédiate sur la page ou dans un formulaire : enregistrer, envoyer, créer, supprimer.

## Installation

```bash
npx shadcn@latest add button
```

Dans ce dépôt : `import { Button } from "@/components/ui"`. Dépendances : `@radix-ui/react-slot`, `class-variance-authority`.

## Usage

**Utiliser quand :**

- **Action principale (`default`)** : l'utilisateur valide l'étape en cours (enregistrer, envoyer, continuer). Une seule par zone (formulaire, carte, modale), car l'œil doit trouver tout de suite l'action attendue.
- **Action secondaire (`secondary` ou `outline`)** : l'action accompagne l'action principale (annuler, retour, brouillon). Placez-la à gauche de l'action principale, car l'ordre de lecture doit rester le même sur tous les écrans.
- **Action à faible poids (`ghost`)** : l'action est fréquente mais ne doit pas attirer l'œil (barre d'outils, en-tête de carte, filtre). Toujours avec un libellé visible, car sans fond rien n'indique sinon qu'on peut cliquer.
- **Action irréversible (`destructive`)** : l'action supprime ou révoque une donnée. Toujours suivie d'une confirmation, car le rouge prévient mais n'empêche pas l'erreur.
- **Libellé** : un verbe à l'infinitif, 1 à 3 mots (« Enregistrer », « Créer le projet »), car il annonce le résultat du clic.

**Ne pas utiliser quand :**

- L'élément mène vers une autre page ou une URL → alternative : `Link`, ou `Button variant="link" asChild` avec un `<a>`. Raison : un bouton n'ouvre pas de nouvel onglet et n'est pas annoncé comme un lien par les lecteurs d'écran.
- L'action n'a qu'une icône, sans libellé → alternative : bouton icône (à venir) avec `aria-label` obligatoire. Raison : `Button` est dimensionné pour du texte, et une icône seule n'a pas de nom accessible.
- L'élément active ou désactive une option → alternative : `Switch` ou `Checkbox`. Raison : un bouton ne garde pas d'état visible après le clic.
- Plusieurs actions principales se trouvent dans la même zone → alternative : une seule en `default`, les autres en `secondary` ou `outline`. Raison : deux actions de même poids obligent à choisir sans indice.
- L'action est impossible tant qu'un champ n'est pas rempli → alternative : laisser le bouton actif et afficher l'erreur sur le champ (`Input` avec `aria-invalid`). Raison : un bouton désactivé n'explique pas pourquoi il est bloqué et ne reçoit pas le focus clavier.

## Variantes et états

| Variante | Rôle | Règle |
|---|---|---|
| `default` | Action principale de la zone | Une seule par zone, placée à droite dans un groupe. |
| `secondary` | Action secondaire sur fond uni | À gauche de l'action principale. Choisir `secondary` **ou** `outline` pour tout le produit. |
| `outline` | Action secondaire sur fond chargé ou à côté d'un `default` | Pas plus de 2 par groupe. |
| `ghost` | Action à faible poids (barre d'outils, en-tête de carte) | Libellé obligatoire. Jamais seul en bas d'un formulaire. |
| `destructive` | Action irréversible (supprimer, révoquer) | Toujours suivie d'une confirmation. Jamais action par défaut d'un formulaire. |
| `link` | Action présentée comme un lien | Pour une navigation, `asChild` avec un `<a>` (ou le composant `Link`). |

| Taille | Hauteur | Règle |
|---|---|---|
| `sm` | `size.control-sm` (32 px) | Zones denses : tableaux, barres d'outils, filtres. Desktop uniquement. |
| `default` | `size.control-md` (36 px) | Cas général : formulaires, modales, cartes. |
| `lg` | `size.control-lg` (40 px) | Action principale isolée : écran vide, fin de parcours. |

| État | Comportement |
|---|---|
| Repos | Cliquable et atteignable au clavier (Tab). |
| Survol | Le fond change de teinte (apparaît pour `ghost` et `outline`, soulignement pour `link`). Aucun changement de taille, pour ne pas déplacer la mise en page. |
| Focus | Anneau de 3 px uniquement à la navigation clavier (`:focus-visible`), rouge pour `destructive`. Entrée ou Espace déclenche l'action. |
| Désactivé | 50 % d'opacité, ne réagit plus au clic ni au survol, sort de l'ordre de tabulation. À réserver aux actions impossibles dans le contexte (droits insuffisants), avec une explication à proximité. |

## API

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `"default" \| "secondary" \| "outline" \| "ghost" \| "destructive" \| "link"` | `"default"` | Poids visuel et rôle. |
| `size` | `"sm" \| "default" \| "lg"` | `"default"` | Hauteur et marges. |
| `asChild` | `boolean` | `false` | Rend l'enfant unique (`<a>`, `Link` de routeur) avec le style du bouton. |
| `disabled` | `boolean` | `false` | Désactive le bouton. |
| `type` | `"button" \| "submit" \| "reset"` | `"submit"` (HTML) | Préciser `type="button"` pour toute action qui ne soumet pas. |
| `children` | `ReactNode` | — | Libellé, avec icône Lucide optionnelle avant ou après. |

Exporte aussi `buttonVariants(...)` pour appliquer le style à un autre élément.

## Tokens utilisés

| Partie | État | Tokens |
|---|---|---|
| `container` | toutes | hauteur `size.control-sm` / `size.control-md` / `size.control-lg` ; marge horizontale `spacing.sm` / `spacing.md` / `spacing.lg` ; écart icône-libellé `spacing.xs` ; arrondi `radius.control` ; ombre `shadow.xs` (sauf `ghost`, `link`) |
| `container` · default | repos / survol | fond `color.bg.brand` → `color.bg.brand-hover` |
| `container` · secondary | repos / survol | fond `color.bg.secondary` → `color.bg.secondary-hover` |
| `container` · outline | repos / survol / focus | fond `color.bg.default` → `color.bg.muted` ; contour `color.border.default` → `color.border.focus` |
| `container` · ghost | repos / survol | aucun fond → `color.bg.muted` |
| `container` · destructive | repos / survol | fond `color.bg.error` → `color.bg.error-hover` |
| `label` | toutes | style `text-style.body.small.medium` ; texte `color.text.on-brand` (default), `color.text.default` (secondary, outline, ghost), `color.text.on-status` (destructive), `color.text.link` → `color.text.link-hover` (link) |
| `icon` | toutes | taille `size.icon-md` ; couleur `color.icon.on-brand`, `color.icon.default`, `color.icon.on-status`, `color.icon.link` selon la variante |
| `focus-ring` | focus | anneau 3 px `color.border.focus-ring` (`color.border.error-ring` pour destructive) |
| `container` | désactivé | opacité `opacity.disabled` |

## Accessibilité

- Élément natif : `<button>`. Avec `asChild`, l'élément enfant (`<a>`, `Link`) remplace le `<button>` et garde sa sémantique.
- Clavier : atteignable avec Tab ; Entrée et Espace déclenchent l'action. Dans un formulaire, `type="button"` pour toute action qui ne soumet pas.
- Focus : anneau de 3 px visible uniquement au clavier, jamais supprimé sans remplacement.
- Contraste : libellé / fond ≥ 4,5:1 pour toutes les variantes, en Light et en Dark ; anneau de focus ≥ 3:1. L'état désactivé est exempté mais ne doit pas porter d'information essentielle.
- Icônes : décoratives (Lucide ajoute `aria-hidden`) quand un libellé est présent.
- Zone de clic : `sm` (32 px) seulement sur desktop dense ; sur mobile, `default` ou `lg`.

## Exemples

```tsx
import { Button } from "@/components/ui"
import { ArrowRight, Loader2, Plus, Trash2 } from "lucide-react"

// Action principale + secondaire
<div className="flex justify-end gap-(--spacing-xs)">
  <Button variant="outline" type="button">Annuler</Button>
  <Button type="submit">Créer le projet</Button>
</div>

// Avec icône
<Button variant="ghost" size="sm"><Plus /> Ajouter un filtre</Button>
<Button size="lg">Continuer <ArrowRight /></Button>

// Action irréversible (ouvre une confirmation)
<Button variant="destructive" onClick={openConfirm}><Trash2 /> Supprimer le compte</Button>

// Chargement (pas de variante dédiée)
<Button disabled><Loader2 className="animate-spin" /> Patientez…</Button>

// Navigation : un vrai lien avec le style du bouton
<Button variant="link" asChild><a href="/aide">Consulter l'aide</a></Button>

// Action impossible dans le contexte, avec explication
<Button disabled aria-describedby="droits">Publier</Button>
<p id="droits">Seuls les administrateurs peuvent publier.</p>
```

## Do et Don't

- **Do :** un seul `default` par zone, placé à droite du groupe.
- **Don't :** deux `default` côte à côte, ou `default` + `destructive` de même poids.
- **Do :** un verbe qui annonce le résultat : « Créer le projet ».
- **Don't :** « OK », « Valider », « Cliquez ici ».
- **Do :** `destructive` suivi d'une confirmation qui reprend l'objet supprimé.
- **Don't :** `destructive` pour une action réversible (masquer, archiver).
- **Do :** `asChild` avec `<a>` pour naviguer.
- **Don't :** `onClick={() => router.push(...)}` sur un `Button` pour changer de page.
- **Do :** des couleurs par token sémantique (`bg-(--color-bg-brand)`).
- **Don't :** une couleur en dur ou une classe de palette (`bg-red-600`).

---

Les sections suivantes complètent le template de la formation.

## Anatomie

| Partie | Rôle |
|---|---|
| `container` | Zone cliquable : porte le fond, le contour, l'arrondi, l'ombre et les marges. |
| `icon` (gauche) | Icône optionnelle avant le libellé, pour renforcer le sens (`Plus` pour « Ajouter »). 16 px. |
| `label` | Texte de l'action. Obligatoire. |
| `icon` (droite) | Icône optionnelle après le libellé, pour indiquer une suite (`ArrowRight`). 16 px. |
| `focus-ring` | Anneau de 3 px autour du container, visible uniquement au focus clavier. |

## Correspondance avec Figma

| Dans Figma | Dans le code |
|---|---|
| Composant `Button` (72 variantes) | `<Button>` |
| `Variant=Default` · `Secondary` · `Outline` · `Ghost` · `Destructive` · `Link` | `variant="default"` · `"secondary"` · `"outline"` · `"ghost"` · `"destructive"` · `"link"` |
| `Size=Small` · `Default` · `Large` | `size="sm"` · `"default"` · `"lg"` |
| `State=Hover` · `Focus` | `:hover` · `:focus-visible` (CSS, pas de prop) |
| `State=Disabled` | `disabled` |
| Propriété `Label` | `children` (texte) |
| `Icon left` / `Icon right` + `· glyph` | icône `lucide-react` avant / après le texte dans `children` |
| Variables `J3 · Color`, `J3 · Size`, `J3 · Spacing`, `J3 · Shape` | `var(--color-…)`, `var(--size-…)`, `var(--spacing-…)`, `var(--radius-…)` |

## Prototype Figma

| Déclencheur | Depuis | Vers |
|---|---|---|
| Survol (While hovering) | `State=Default` | `State=Hover`, même variante et taille (Smart animate 150 ms) |

## Limites connues

- Pas d'état **loading** : `disabled` + icône `Loader2` animée, en attendant une variante dédiée.
- Pas de taille **icône seule** : un composant `ButtonIcon` est à créer (avec `aria-label` obligatoire).
- `secondary` et `outline` jouent le même rôle : le produit doit en choisir une comme norme.
- En Figma, l'état Focus remplace l'ombre `shadow.xs` par l'anneau ; en CSS les deux se cumulent.

## Implémentation de référence

[`src/components/ui/button.tsx`](../../src/components/ui/button.tsx)
