# Design System J3

Source unique de vérité du design system de la formation **Design System & IA (jour 3)** : **tokens**, **composants React**, **documentation** et **règles**, lisibles par les humains et exploitables par les agents IA (Claude Code, Codex, Cursor, Lovable).

> Une bibliothèque décrit ce qui existe. Ce dépôt explique aussi **pourquoi**, **quand** et **comment** l'utiliser.

- **Figma** : [Formation Design System — IA](https://www.figma.com/design/S5w6gdpuYhKzlqm0WW1Xu9/) · pages « Design System J3 » (fondations) et « Composants J3 » (composants)
- **Base technique** : [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS v4](https://tailwindcss.com) + [Radix UI](https://www.radix-ui.com)
- **Format des tokens** : [W3C Design Tokens (DTCG)](https://www.designtokens.org/tr/drafts/format/)

## Démarrer

```bash
npm install
npm run dev        # page de démo : tokens + composants + exemple (http://localhost:5173)
npm run tokens     # régénère src/styles/tokens.css depuis tokens/*.json
npm run build      # vérifie les types et construit la démo
```

## Structure

```
design-system-j3/
├── README.md                 ← vous êtes ici : vue d'ensemble
├── AGENTS.md                 ← règles pour tous les agents IA (Codex, Cursor, Lovable…)
├── CLAUDE.md                 ← point d'entrée Claude Code (importe AGENTS.md)
├── CHANGELOG.md              ← historique des versions
├── tokens/                   ← Design Tokens au format W3C (DTCG)
│   ├── README.md
│   ├── primitives.tokens.json    ← valeurs brutes (collection Figma « J3 · Primitives »)
│   ├── semantic.tokens.json      ← espacements, tailles, formes, typographie, styles composites
│   └── themes/
│       ├── light.tokens.json     ← couleurs sémantiques, mode Light
│       └── dark.tokens.json      ← mêmes noms, mode Dark
├── docs/
│   ├── tokens-naming.md      ← règles de nommage Figma ↔ JSON ↔ CSS ↔ Tailwind
│   ├── agents/               ← instructions à copier dans Lovable, etc.
│   └── components/           ← une fiche par composant (_template.md + 7 fiches)
├── scripts/
│   └── build-tokens.mjs      ← tokens/*.json → src/styles/tokens.css
└── src/
    ├── components/ui/        ← composants React (.tsx)
    ├── lib/utils.ts          ← cn() : fusion des classes Tailwind
    ├── styles/               ← tokens.css (généré) + globals.css
    └── demo/                 ← page de démo du design system
```

## Qui lit quoi ?

| Lecteur | Point d'entrée | Ce qu'il y cherche |
|---|---|---|
| **Designer** | `docs/components/`, Figma | Règles d'usage, correspondance Figma ↔ code |
| **Développeur** | `src/components/ui/`, `tokens/`, `docs/components/` | Props, variantes, tokens, exemples |
| **Agent IA** | `AGENTS.md` puis `docs/` et `tokens/` | Contraintes explicites, noms stables, exemples représentatifs |
| **Équipe DS** | `CHANGELOG.md`, `docs/tokens-naming.md` | Versions, conventions |

## Architecture des tokens

```
Primitives (masquées)        Sémantiques (publiées)                Composants
color/brand/600   ───────▶   color/bg/brand (Light / Dark)  ───▶   <Button variant="default">
spacing/4         ───────▶   spacing/md                     ───▶   px-(--spacing-md)
font-size/sm      ───────▶   typography/body-small/…        ───▶   text-body-small
```

| Fichier | Collection Figma | Modes | Tokens |
|---|---|---|---|
| `primitives.tokens.json` | J3 · Primitives | Value | 198 |
| `themes/light.tokens.json` / `dark.tokens.json` | J3 · Color | Light / Dark | 81 |
| `semantic.tokens.json` → `spacing` | J3 · Spacing | Value | 10 |
| `semantic.tokens.json` → `size` | J3 · Size | Value | 12 |
| `semantic.tokens.json` → `radius`, `border-width`, `opacity` | J3 · Shape | Value | 13 |
| `semantic.tokens.json` → `typography` | J3 · Typography | Value | 43 |
| `semantic.tokens.json` → `text-style`, `shadow`, `focus`, `blur` | Styles de texte et d'effets | — | 18 + 8 |

Chaque token porte dans `$extensions["com.figma"]` sa collection, son nom de variable, ses scopes et sa **syntaxe de code** : c'est elle qui donne le nom de la variable CSS (`var(--color-bg-brand)`).

## Composants

| Composant | Fichier | Base shadcn | Fiche |
|---|---|---|---|
| Button | `src/components/ui/button.tsx` | Button | [button.md](docs/components/button.md) |
| Input | `src/components/ui/input.tsx` | Input (+ prop `icon`) | [input.md](docs/components/input.md) |
| Checkbox | `src/components/ui/checkbox.tsx` | Checkbox | [checkbox.md](docs/components/checkbox.md) |
| Radio Group | `src/components/ui/radio-group.tsx` | Radio Group | [radio-group.md](docs/components/radio-group.md) |
| Switch | `src/components/ui/switch.tsx` | Switch | [switch.md](docs/components/switch.md) |
| Tag | `src/components/ui/tag.tsx` | Badge (+ success, warning, info, `onRemove`) | [tag.md](docs/components/tag.md) |
| Link | `src/components/ui/link.tsx` | style « link » du Button | [link.md](docs/components/link.md) |
| Label | `src/components/ui/label.tsx` | Label | utilisé par les contrôles de formulaire |

```tsx
import { Button, Input, Label } from "@/components/ui"
```

## Principes

- **Source unique de vérité** : une décision n'existe qu'à un seul endroit. Figma, le code et la doc s'y réfèrent.
- **Tokens d'abord** : aucune valeur en dur dans un composant. Primitives → sémantiques → composants.
- **Documenter pour un lecteur sans contexte** : chaque règle donne sa condition, son action, sa limite, son alternative et sa raison.
- **Tout passe par une Pull Request** : rien n'arrive sur `main` sans relecture.

## Mettre à jour les tokens

1. Modifier la variable dans Figma (collections `J3 · …`).
2. Reporter la modification dans le fichier JSON correspondant (même nom, `/` → `.`).
3. `npm run tokens` puis vérifier la démo (`npm run dev`), en Light et en Dark.
4. Ajouter une entrée dans `CHANGELOG.md` et ouvrir une Pull Request.
