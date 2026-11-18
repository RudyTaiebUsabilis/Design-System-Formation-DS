---
name: Tag
description: Étiquette courte qui qualifie un élément - statut, catégorie, filtre actif.
status: stable
category: data-display
code: src/components/ui/tag.tsx
shadcn: https://ui.shadcn.com/docs/components/badge
figma:
  file: S5w6gdpuYhKzlqm0WW1Xu9
  page: Composants J3
  node: "233:103"
variants:
  variant: [default, secondary, outline, destructive, success, warning, info]
props:
  - { name: variant, type: enum, values: [default, secondary, outline, destructive, success, warning, info], default: default }
  - { name: asChild, type: boolean, default: false }
  - { name: onRemove, type: function }
  - { name: removeLabel, type: string }
  - { name: children, type: node }
states: [default, focus]
tokens:
  - color.bg.brand
  - color.bg.secondary
  - color.bg.error
  - color.bg.success-subtle
  - color.bg.warning-subtle
  - color.bg.info-subtle
  - color.text.on-brand
  - color.text.default
  - color.text.on-status
  - color.text.success
  - color.text.warning
  - color.text.info
  - color.icon.on-brand
  - color.icon.default
  - color.icon.on-status
  - color.icon.success
  - color.icon.warning
  - color.icon.info
  - color.border.default
  - color.border.focus-ring
  - size.icon-xs
  - spacing.3xs
  - spacing.2xs
  - spacing.xs
  - radius.badge
  - text-style.caption.default
related: [Button]
updated: 2026-11-18
---

# Tag

Étiquette courte qui qualifie un élément : statut (« Publié »), catégorie (« Design »), filtre actif. Correspond au **Badge** de shadcn/ui, étendu aux statuts.

## Installation

```bash
npx shadcn@latest add badge
```

Dans ce dépôt : `import { Tag } from "@/components/ui"`. Extensions J3 par rapport au Badge shadcn : variantes `success`, `warning`, `info` et props `onRemove` / `removeLabel`.

## Usage

**Utiliser quand :**

- **Statut** d'un objet (Publié, En attente, Brouillon) : `success`, `warning`, `info`, `secondary`, car la couleur et le libellé se lisent d'un coup d'œil dans une liste.
- **Catégorie ou mot-clé** : `secondary` ou `outline`, discrets pour ne pas concurrencer le contenu.
- **Filtre actif** : `onRemove` ajoute une croix pour retirer le filtre, car l'utilisateur doit pouvoir annuler sans chercher le panneau de filtres.
- **Nouveauté** : `default` (marque), avec parcimonie.

**Ne pas utiliser quand :**

- L'élément déclenche une action → alternative : `Button` (`ghost` ou `outline`, `size="sm"`). Raison : un tag n'est pas perçu comme cliquable.
- Le message est long ou demande une action → alternative : alerte / bannière (à venir). Raison : un tag tient en 1 à 2 mots.
- Un nombre (compteur de notifications) → alternative : pastille de compteur (à venir). Raison : le tag est textuel.
- Un statut négatif mais non bloquant → alternative : `warning` plutôt que `destructive`. Raison : le rouge plein signale une erreur ou une suppression.

## Variantes et états

| Variante | Rôle | Règle |
|---|---|---|
| `default` | Mise en avant de marque (Nouveau) | Un seul par élément. |
| `secondary` | Catégorie, filtre, statut neutre (Brouillon) | Variante par défaut pour les filtres. |
| `outline` | Mot-clé discret, statut archivé | Sur fond uni uniquement. |
| `destructive` | Erreur, suppression (Supprimé, Échec) | Réservé aux états bloquants. |
| `success` | Statut positif (Publié, Validé) | Fond `-subtle` : extension J3. |
| `warning` | Statut à surveiller (En attente) | Extension J3. |
| `info` | Information (Bêta) | Extension J3. |

| État | Comportement |
|---|---|
| Repos | Non interactif : simple `<span>`. |
| Focus | Uniquement si cliquable (`asChild` + `<a>`) ou sur la croix de suppression : anneau `color.border.focus-ring`. |
| Retrait | Clic sur la croix → `onRemove()`. L'écran retire le tag et remet le focus sur l'élément suivant. |

## API

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `"default" \| "secondary" \| "outline" \| "destructive" \| "success" \| "warning" \| "info"` | `"default"` | Rôle et couleur. |
| `onRemove` | `() => void` | — | Affiche une croix et l'appelle au clic (Figma : `Removable`). |
| `removeLabel` | `string` | texte du tag | Lu par les lecteurs d'écran : « Retirer <removeLabel> ». |
| `asChild` | `boolean` | `false` | Rend l'enfant (`<a>`) avec le style du tag. |
| `children` | `ReactNode` | — | Libellé, avec icône Lucide optionnelle (12 px). |

Exporte aussi `tagVariants(...)`.

## Tokens utilisés

| Partie | État | Tokens |
|---|---|---|
| `container` | toutes | marges `spacing.xs` × `spacing.3xs` ; écart `spacing.2xs` ; arrondi `radius.badge` ; contour transparent (`color.border.default` pour outline) |
| `container` · default / secondary / destructive | — | fond `color.bg.brand` / `color.bg.secondary` / `color.bg.error` |
| `container` · success / warning / info | — | fond `color.bg.success-subtle` / `color.bg.warning-subtle` / `color.bg.info-subtle` |
| `label` | toutes | style `text-style.caption.default` ; texte `color.text.on-brand`, `color.text.default`, `color.text.on-status`, `color.text.success`, `color.text.warning`, `color.text.info` selon la variante |
| `icon` / `remove` | toutes | taille `size.icon-xs` ; couleur `color.icon.*` assortie au texte |
| `remove` | focus | anneau `color.border.focus-ring` |

## Accessibilité

- Élément : `<span>` non interactif. La croix est un vrai `<button type="button">` avec `aria-label="Retirer …"`.
- La couleur ne porte jamais seule le sens : le libellé dit le statut.
- Contraste texte / fond ≥ 4,5:1, y compris pour les fonds `-subtle` (texte en `color.text.success`… de teinte 700).
- Les icônes sont décoratives (`aria-hidden` via Lucide).

## Exemples

```tsx
import { Tag } from "@/components/ui"
import { Check, Info } from "lucide-react"

<Tag>Nouveau</Tag>
<Tag variant="secondary">Brouillon</Tag>
<Tag variant="outline">Archivé</Tag>
<Tag variant="destructive">Supprimé</Tag>
<Tag variant="success"><Check /> Publié</Tag>
<Tag variant="warning">En attente</Tag>
<Tag variant="info"><Info /> Bêta</Tag>

// Filtre retirable
<Tag variant="secondary" onRemove={() => removeFilter("design")} removeLabel="le filtre Design">Design</Tag>

// Tag cliquable (lien vers la catégorie)
<Tag variant="outline" asChild><a href="/categories/design">Design</a></Tag>
```

## Do et Don't

- **Do :** des libellés courts et homogènes (même temps, même longueur).
- **Don't :** un tag comme bouton d'action.
- **Do :** une couleur = un sens, partout dans le produit.
- **Don't :** plus de 3 tags sur un même élément.
- **Do :** `success`, `warning`, `info` pour des statuts.
- **Don't :** `destructive` pour un statut simplement négatif.

---

Les sections suivantes complètent le template de la formation.

## Anatomie

| Partie | Rôle |
|---|---|
| `container` | Fond, contour, arrondi, marges. |
| `icon` | Icône optionnelle à gauche, 12 px. |
| `label` | Texte, 1 à 2 mots. |
| `remove` | Croix optionnelle pour retirer (filtre). |

## Correspondance avec Figma

| Dans Figma | Dans le code |
|---|---|
| Composant `Tag` (7 variantes) | `<Tag>` |
| `Variant=Default` … `Info` | `variant="default"` … `"info"` |
| Propriété `Label` | `children` |
| `Icon` + `Icon · glyph` | icône Lucide dans `children` |
| `Removable` | `onRemove` |

## Prototype Figma

Aucune interaction : le Tag n'est pas interactif dans Figma.

## Limites connues

- `success`, `warning`, `info` n'existent pas dans shadcn : à ajouter dans `badgeVariants` si vous repartez d'une installation shadcn neuve.
- Pas de taille alternative : une seule hauteur (≈ 22 px).

## Implémentation de référence

[`src/components/ui/tag.tsx`](../../src/components/ui/tag.tsx)
