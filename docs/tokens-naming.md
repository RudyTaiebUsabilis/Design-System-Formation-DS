# Nommage des tokens

Un token a **un seul nom**, écrit de quatre façons selon l'outil. La règle de passage est mécanique : un humain ou un agent doit pouvoir retrouver un token dans n'importe quel outil sans table de correspondance.

| Outil | Séparateur | Exemple |
|---|---|---|
| Figma (variable) | `/` | `color/bg/brand` |
| JSON W3C (alias) | `.` | `{color.bg.brand}` |
| CSS | `-` | `var(--color-bg-brand)` |
| Tailwind v4 (classe) | variable entre parenthèses | `bg-(--color-bg-brand)` |

## Structure d'un nom

```
catégorie / rôle / variante-état
color     / bg   / brand-hover
spacing   / md
size      / control-md
radius    / control
```

- **Minuscules, mots séparés par `-`** : `brand-hover`, `on-brand`, `focus-ring`.
- **Les états à la fin** : `-hover`, `-subtle`, `-ring`. Jamais au début.
- **`on-*`** désigne la couleur posée sur un fond : `text/on-brand` va sur `bg/brand`.
- **Pas de valeur dans le nom d'un sémantique** : `bg/brand`, pas `bg/pink-600`. La valeur peut changer, le rôle reste.

## Primitives

| Famille | Nom | Échelle | Exemple |
|---|---|---|---|
| Couleurs | `color/<palette>/<pas>` | 50 → 950 (Tailwind) | `color/brand/600` |
| Alpha | `color/alpha/<base>-<opacité>` | % d'opacité | `color/alpha/black-10` |
| Espacements | `spacing/<n>` | n × 4 px (Tailwind), `-` pour la décimale | `spacing/1-5` = 6 px |
| Rayons | `radius/<taille>` | xs → 3xl, full (Tailwind) ; `radius/0` = 0 | `radius/lg` = 8 px |
| Typo | `font-size/<taille>`, `leading/<n>`, `font-weight/<nom>`, `tracking/<nom>` | Tailwind | `font-size/sm` = 14 px |

Les primitives reprennent volontairement les noms Tailwind v4 : `--radius-lg`, `--text-sm`, `--font-weight-semibold` sont les mêmes variables que celles de Tailwind.

## Sémantiques

| Collection | Préfixe | Nommé par… | Exemples |
|---|---|---|---|
| J3 · Color | `bg/`, `text/`, `icon/`, `border/`, `dataviz/`, `shadow/` | rôle + intention | `bg/error-subtle`, `text/link-hover`, `border/focus-ring` |
| J3 · Spacing | `spacing/` | taille de t-shirt | `spacing/xs` (8) → `spacing/3xl` (64) |
| J3 · Size | `size/` | élément dimensionné | `size/control-md`, `size/icon-sm`, `size/switch-thumb` |
| J3 · Shape | `radius/`, `border-width/`, `opacity/` | usage | `radius/control`, `border-width/strong`, `opacity/disabled` |
| J3 · Typography | `<rôle>/<propriété>` (`typography.` en JSON) | rôle typographique | `h1/font-size`, `body-small/line-height`, `body-weight/medium` |

### Typographie et Tailwind

La syntaxe de code des variables typographiques suit la convention Tailwind v4 des tailles de texte :

```css
--text-h1: …;  --text-h1--line-height: …;  --text-h1--font-weight: …;  --text-h1--letter-spacing: …;
```

La classe `text-h1` applique donc les quatre propriétés d'un coup. Pour les bodies, la graisse est séparée (`body-weight/*`) : `text-body-small font-medium` = style Figma `Body/Small/Medium`.

| Style Figma | Classes |
|---|---|
| `Display/Default` | `text-display` |
| `Heading/H1` … `Heading/H5` | `text-h1` … `text-h5` |
| `Body/Large/Regular` · `Medium` · `SemiBold` | `text-body-large font-normal` · `font-medium` · `font-semibold` |
| `Body/Default/…` | `text-body-default …` |
| `Body/Small/…` | `text-body-small …` |
| `Body/…/Medium-Underline` | `text-body-… font-medium underline` |
| `Caption/Default` | `text-caption` |

## Pièges connus

- **Collision de noms** : un sémantique ne doit jamais porter le même chemin qu'une primitive (ex. `radius/none` des deux côtés → alias circulaire). C'est pourquoi la primitive s'appelle `radius/0`.
- **Tailles de t-shirt** : `spacing/md`, `spacing/3xl` deviennent `--spacing-md`, `--spacing-3xl`. Tailwind les utilise aussi pour `max-w-md`, `max-w-3xl` : utilisez `max-w-[48rem]` pour une largeur maximale.
- **Thèmes** : les fichiers `light` et `dark` doivent garder exactement les mêmes noms. Un token ajouté dans l'un est ajouté dans l'autre.
