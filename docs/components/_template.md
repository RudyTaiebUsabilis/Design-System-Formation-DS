---
name: NomDuComposant            # PascalCase, identique au code (relié au nom Figma dans « Correspondance avec Figma »)
description: Une phrase - à quoi sert le composant.
status: beta                    # stable | beta | deprecated
category: basics                # basics | forms | navigation | feedback | data-display
code: src/components/ui/nom-du-composant.tsx
shadcn: https://ui.shadcn.com/docs/components/nom   # composant shadcn/ui de base (ou « aucun »)
figma:
  file: S5w6gdpuYhKzlqm0WW1Xu9
  page: Composants J3
  node: "0:0"
variants:                       # axes de variation et leurs valeurs, dans le même ordre que les props
  size: [sm, default, lg]
props:                          # type : enum | boolean | string | number | node | function
  - { name: size, type: enum, values: [sm, default, lg], default: default }
  - { name: disabled, type: boolean, default: false }
states: [default, hover, focus, disabled]   # default | hover | focus | active | disabled | loading | error | readOnly | checked | indeterminate
tokens:                         # tous les tokens cités dans le corps, par leur nom
  - color.bg.default
related: []
updated: AAAA-MM-JJ
---

# NomDuComposant

Une phrase : à quoi sert le composant.

## Installation

```bash
npx shadcn@latest add nom           # composant shadcn de base, si vous partez de zéro
```

Dans ce dépôt, le composant est déjà adapté aux tokens J3 : `import { NomDuComposant } from "@/components/ui"`.

## Usage

**Utiliser quand :**

- …

**Ne pas utiliser quand :**

- … → alternative : …

Chaque « ne pas utiliser » donne son alternative. Une règle explicite répond à cinq questions : condition, action, limite, alternative, raison.

## Variantes et états

| Variante | Rôle | Règle |
|---|---|---|
| … | … | … |

| État | Comportement |
|---|---|
| Repos | … |
| Désactivé | … |

Décrire le comportement de chaque état, pas seulement son apparence.

## API

| Prop | Type | Défaut | Description |
|---|---|---|---|
| … | … | … | … |

Les autres props HTML de l'élément natif sont transmises telles quelles.

## Tokens utilisés

| Partie | État | Tokens |
|---|---|---|
| `container` | repos | fond `color.bg.default` |

Tokens cités par leur nom, jamais par leur valeur.

## Accessibilité

- Élément natif : …
- Clavier : …
- Focus : …
- Contraste : …

## Exemples

```tsx
// un exemple par variante ou par cas d'usage
```

## Do et Don't

- **Do :** …
- **Don't :** …

---

Les sections suivantes complètent le template de la formation.

## Anatomie

| Partie | Rôle |
|---|---|
| `container` | … |

## Correspondance avec Figma

| Dans Figma | Dans le code |
|---|---|
| … | … |

## Prototype Figma

| Déclencheur | Depuis | Vers |
|---|---|---|
| … | … | … |

## Limites connues

- …

## Implémentation de référence

[`src/components/ui/nom-du-composant.tsx`](../../src/components/ui/nom-du-composant.tsx)

---

> **Sections ajoutées au gabarit de la formation** : `shadcn` et `figma.page` dans le frontmatter, « Installation », « API » et « Prototype Figma ». Elles relient la fiche à la base shadcn, aux props réelles et aux interactions du prototype.
