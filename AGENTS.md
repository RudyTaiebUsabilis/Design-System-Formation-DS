# AGENTS.md — règles pour les agents IA

Ce fichier s'adresse à **tout agent IA** qui lit ou modifie ce dépôt (Codex, Claude Code, Cursor, Lovable, Copilot…). Codex le lit automatiquement ; Claude Code l'importe via `CLAUDE.md` ; pour Lovable, voir [`docs/agents/lovable.md`](docs/agents/lovable.md).

Lisez-le en entier avant de produire du code ou de la documentation. En cas de doute, **demandez** plutôt que d'inventer.

## 1. Ce qu'est ce dépôt

Le design system J3 : tokens W3C (`tokens/`), composants React (`src/components/ui/`), documentation (`docs/`). Stack : React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Radix UI, lucide-react. La source visuelle est le fichier Figma de la formation (pages « Design System J3 » et « Composants J3 »).

## 2. Règles non négociables

| # | Règle | Pourquoi |
|---|---|---|
| 1 | **Utiliser uniquement les composants de `src/components/ui/`** pour Button, Input, Checkbox, Radio Group, Switch, Tag, Link, Label. Ne jamais recréer un bouton avec un `<div>` ou des classes à la main. | Un seul comportement, accessible, maintenu à un seul endroit. |
| 2 | **Aucune valeur en dur** : pas de hex, de px, de rgb dans un composant ou un écran. Toujours une variable de token : `bg-(--color-bg-brand)`, `px-(--spacing-md)`, `rounded-(--radius-control)`. | Les thèmes Light / Dark et les évolutions passent par les tokens. |
| 3 | **Jamais de primitive** dans le code produit (`--color-brand-600`, `--color-neutral-200`…). Uniquement des tokens sémantiques (`--color-bg-*`, `--color-text-*`, `--color-icon-*`, `--color-border-*`, `--color-dataviz-*`). | Les primitives n'ont pas de sens d'usage et ne changent pas avec le thème. |
| 4 | **Pas de palette Tailwind** (`bg-red-600`, `text-gray-500`) : elle est volontairement désactivée dans `tokens.css`. | Seules les couleurs sémantiques existent. |
| 5 | **Typographie par style** : `text-display`, `text-h1` … `text-h5`, `text-body-large`, `text-body-default`, `text-body-small`, `text-caption`. Graisse des bodies : `font-normal`, `font-medium`, `font-semibold`. | Correspond aux 18 styles de texte Figma. |
| 6 | **Ne pas modifier `src/styles/tokens.css`** : il est généré. Modifier `tokens/*.json`, puis `npm run tokens`. | Le JSON est la source de vérité. |
| 7 | **Respecter l'accessibilité** décrite dans chaque fiche (`docs/components/*.md`) : libellé visible, focus visible, contraste, clavier. | Non négociable, y compris pour un prototype. |
| 8 | **Ne pas inventer de variante ni de prop.** Si un besoin n'est pas couvert, le signaler et proposer une évolution (fiche + code + Figma). | Le design system doit rester cohérent avec Figma. |

## 3. Choisir le bon composant

| Besoin | Composant | Pas |
|---|---|---|
| Déclencher une action (enregistrer, envoyer, supprimer) | `Button` | `Link` |
| Naviguer vers une page ou une URL | `Link` (ou `Button variant="link" asChild`) | `Button onClick={navigate}` |
| Saisir du texte | `Input` + `Label` | placeholder sans label |
| Choisir plusieurs options, valider avec un bouton | `Checkbox` | `Switch` |
| Choisir une seule option parmi 2 à 6 | `RadioGroup` + `RadioGroupItem` | plusieurs `Checkbox` |
| Activer un réglage avec effet immédiat | `Switch` | `Checkbox` |
| Qualifier un élément (statut, catégorie, filtre) | `Tag` | `Button` |

## 4. Tokens : comment les utiliser

- **Nommage** : voir [`docs/tokens-naming.md`](docs/tokens-naming.md). Figma `color/bg/brand` = JSON `{color.bg.brand}` = CSS `var(--color-bg-brand)`.
- **Classes Tailwind** : syntaxe variable `propriété-(--token)` → `bg-(--color-bg-subtle)`, `text-(--color-text-muted)`, `border-(--color-border-default)`, `gap-(--spacing-xs)`, `h-(--size-control-md)`, `rounded-(--radius-card)`, `opacity-(--opacity-disabled)`.
- **Ombres et focus** : `shadow-xs` … `shadow-xl` ; anneau de focus `focus-visible:ring-[3px] focus-visible:ring-(--color-border-focus-ring)` (`--color-border-error-ring` pour l'erreur et le destructif).
- **Thème** : `data-theme="dark"` sur `<html>` (ou sur un conteneur). Ne jamais écrire de couleur conditionnelle au thème : les tokens s'en chargent.
- ⚠️ **Piège** : les espacements sémantiques utilisent des tailles de t-shirt (`--spacing-md`, `--spacing-3xl`). Tailwind les reprend pour `max-w-md`, `max-w-3xl`… qui valent alors 16 ou 64 px. Pour une largeur maximale, écrire `max-w-[48rem]`.

## 5. Avant de rendre votre travail

- [ ] `npm run build` passe (types + build).
- [ ] Aucun hex, px, ni classe de palette dans le diff (`grep -nE "#[0-9a-fA-F]{3,8}|bg-(red|gray|blue)-" src/`).
- [ ] Vérifié en Light **et** en Dark dans la démo (`npm run dev`).
- [ ] Fiche `docs/components/<composant>.md` mise à jour si l'API ou l'usage change (frontmatter compris).
- [ ] Entrée ajoutée dans `CHANGELOG.md`.

## 6. Documenter un composant

Copier [`docs/components/_template.md`](docs/components/_template.md). Chaque règle « Ne pas utiliser » donne son alternative et sa raison. Les tokens sont cités par leur nom, jamais par leur valeur. Le frontmatter (props, variants, states, tokens) doit correspondre exactement au code.
