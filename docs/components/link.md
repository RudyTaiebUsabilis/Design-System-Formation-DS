---
name: Link
description: Lien de navigation vers une autre page ou une URL.
status: stable
category: navigation
code: src/components/ui/link.tsx
shadcn: https://ui.shadcn.com/docs/components/button#link
figma:
  file: S5w6gdpuYhKzlqm0WW1Xu9
  page: Composants J3
  node: "233:152"
variants:
  type: [standalone, inline]
  size: [default, sm]
props:
  - { name: type, type: enum, values: [standalone, inline], default: standalone }
  - { name: size, type: enum, values: [default, sm], default: default }
  - { name: href, type: string }
  - { name: external, type: boolean, default: false }
  - { name: asChild, type: boolean, default: false }
  - { name: children, type: node }
states: [default, hover, focus]
tokens:
  - color.text.link
  - color.text.link-hover
  - color.icon.link
  - color.border.focus-ring
  - size.icon-md
  - size.icon-sm
  - spacing.2xs
  - radius.badge
  - text-style.body.default.medium
  - text-style.body.small.medium
  - text-style.body.default.medium-underline
  - text-style.body.small.medium-underline
related: [Button]
updated: 2026-11-18
---

# Link

Lien de navigation vers une autre page ou une URL. shadcn/ui n'a pas de composant Link : c'est le style **« link »** du Button appliqué à un vrai `<a>`, avec deux usages distincts (isolé ou dans un texte).

## Installation

```bash
npx shadcn@latest add button   # le style « link » vient du Button
```

Dans ce dépôt : `import { Link } from "@/components/ui"`. Avec un routeur : `<Link asChild><RouterLink to="/aide">Aide</RouterLink></Link>`.

## Usage

**Utiliser quand :**

- **Navigation** vers une page, une section ou un site externe, car un lien est annoncé comme tel et s'ouvre dans un nouvel onglet au besoin.
- **Lien isolé (`standalone`)** : « En savoir plus », « Voir tous les projets », sous une carte ou une section. Souligné au survol.
- **Lien dans un texte (`inline`)** : « … nos conditions d'utilisation. » Toujours souligné, car la couleur seule ne suffit pas à le distinguer (WCAG 1.4.1).
- **Lien externe (`external`)** : ouvre un nouvel onglet, avec icône et mention pour les lecteurs d'écran.

**Ne pas utiliser quand :**

- L'élément déclenche une action (enregistrer, ouvrir une modale) → alternative : `Button`. Raison : un lien navigue, un bouton agit ; les technologies d'assistance les annoncent différemment.
- Le lien doit avoir le poids d'une action principale → alternative : `Button asChild` avec un `<a>`. Raison : un lien texte n'attire pas l'œil comme un bouton plein.
- Le libellé est « Cliquez ici » ou « En savoir plus » répété → alternative : un libellé qui décrit la destination. Raison : les lecteurs d'écran listent les liens hors contexte.

## Variantes et états

| Variante | Rôle | Règle |
|---|---|---|
| `type="standalone"` | Lien isolé | Souligné au survol uniquement. |
| `type="inline"` | Lien dans un paragraphe | Toujours souligné ; hérite du flux du texte (`display: inline`). |
| `size="default"` | 16 px (`Body/Default/Medium`) | Cas général. |
| `size="sm"` | 14 px (`Body/Small/Medium`) | Textes d'aide, pieds de formulaire. |

| État | Comportement |
|---|---|
| Repos | `color.text.link`. Atteignable avec Tab. |
| Survol | `color.text.link-hover` + soulignement (standalone). |
| Focus | Anneau 3 px `color.border.focus-ring`, arrondi `radius.badge`. Entrée suit le lien. |
| Externe | Icône `ExternalLink` + « (nouvel onglet) » en texte masqué ; `target="_blank" rel="noopener noreferrer"`. |

## API

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `href` | `string` | — | Destination (obligatoire sauf `asChild`). |
| `type` | `"standalone" \| "inline"` | `"standalone"` | Contexte d'usage. |
| `size` | `"default" \| "sm"` | `"default"` | Taille du texte. |
| `external` | `boolean` | `false` | Nouvel onglet, icône et mention accessible. |
| `asChild` | `boolean` | `false` | Rend l'enfant (`RouterLink`, `NextLink`) avec le style du lien. |
| `children` | `ReactNode` | — | Libellé qui décrit la destination. |

Exporte aussi `linkVariants(...)`.

## Tokens utilisés

| Partie | État | Tokens |
|---|---|---|
| `label` | repos / survol | `color.text.link` → `color.text.link-hover` |
| `label` | default / sm | `text-style.body.default.medium` / `text-style.body.small.medium` ; soulignés : `text-style.body.default.medium-underline` / `text-style.body.small.medium-underline` |
| `icon` | toutes | `color.icon.link` ; taille `size.icon-md` / `size.icon-sm` ; écart `spacing.2xs` |
| `focus-ring` | focus | `color.border.focus-ring`, arrondi `radius.badge` |

## Accessibilité

- Élément natif : `<a href>`. Jamais un `<div onClick>` ni un `Button` qui change de page.
- Libellé : décrit la destination, compréhensible hors contexte.
- Lien dans un texte : souligné en permanence ; contraste avec le texte environnant et avec le fond ≥ 4,5:1.
- Focus : anneau de 3 px visible au clavier.
- Externe : annonce l'ouverture d'un nouvel onglet (fait par le composant).

## Exemples

```tsx
import { Link } from "@/components/ui"

// Isolé
<Link href="/projets">Voir tous les projets</Link>
<Link size="sm" href="/aide">Consulter l'aide</Link>

// Dans un texte
<p className="text-body-default">
  En continuant, vous acceptez nos <Link type="inline" href="/cgu">conditions d'utilisation</Link>.
</p>

// Externe
<Link href="https://ui.shadcn.com" external>Documentation shadcn</Link>

// Avec un routeur
<Link asChild><RouterLink to="/compte">Mon compte</RouterLink></Link>
```

## Do et Don't

- **Do :** « Consulter l'aide », « Voir la facture de mars ».
- **Don't :** « Cliquez ici », « En savoir plus » répété dans la page.
- **Do :** `type="inline"` pour un lien dans un paragraphe.
- **Don't :** retirer le soulignement d'un lien dans un texte.
- **Do :** `Button` pour une action, `Link` pour une navigation.
- **Don't :** ouvrir un nouvel onglet sans le signaler.

---

Les sections suivantes complètent le template de la formation.

## Anatomie

| Partie | Rôle |
|---|---|
| `label` | Texte du lien. |
| `icon` | Icône optionnelle après le texte (`ExternalLink` pour un lien externe). |
| `focus-ring` | Anneau autour du lien au focus clavier. |

## Correspondance avec Figma

| Dans Figma | Dans le code |
|---|---|
| Composant `Link` (12 variantes) | `<Link>` |
| `Type=Standalone` · `Inline` | `type="standalone"` · `"inline"` |
| `Size=Default` · `Small` | `size="default"` · `"sm"` |
| `State=Hover` · `Focus` | `:hover` · `:focus-visible` |
| Propriété `Label` | `children` |
| `External` + `Icon · glyph` | `external` (icône `ExternalLink` ajoutée automatiquement) |
| Styles `Body/…/Medium-Underline` | classe `underline` |

## Prototype Figma

| Déclencheur | Depuis | Vers |
|---|---|---|
| Survol (While hovering) | `State=Default` | `State=Hover`, même type et taille |

## Limites connues

- Pas d'état « visité » (`:visited`) : non distingué dans ce design system.
- En Figma, le soulignement passe par un style de texte dédié (`…-Underline`) ; en CSS c'est la classe `underline`.

## Implémentation de référence

[`src/components/ui/link.tsx`](../../src/components/ui/link.tsx)
