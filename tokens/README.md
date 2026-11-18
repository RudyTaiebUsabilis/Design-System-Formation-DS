# Tokens

Format **W3C Design Tokens (DTCG)** : chaque token a un `$type`, une `$value` et, sauf exception, une `$description`. Les alias s'écrivent `{groupe.sous-groupe.nom}`.

| Fichier | Contenu | Collection Figma |
|---|---|---|
| `primitives.tokens.json` | Valeurs brutes : `color.*` (brand, neutral, red, amber, green, blue, teal, violet, orange, cyan, base, alpha), `spacing.*`, `radius.*`, `font-size.*`, `leading.*`, `font-weight.*`, `tracking.*`, `opacity.*`, `border-width.*`, `font-family.*` | J3 · Primitives (masquée, aucun scope) |
| `themes/light.tokens.json` | Couleurs sémantiques, mode Light : `color.bg.*`, `color.text.*`, `color.icon.*`, `color.border.*`, `color.dataviz.*`, `color.shadow.*` | J3 · Color, mode Light |
| `themes/dark.tokens.json` | **Exactement les mêmes noms**, alias du mode Dark | J3 · Color, mode Dark |
| `semantic.tokens.json` | `spacing.*`, `size.*`, `radius.*`, `border-width.*`, `opacity.*`, `typography.*` + composites `text-style.*`, `shadow.*`, `focus.*`, `blur.*` | J3 · Spacing, Size, Shape, Typography + styles de texte et d'effets |

## Métadonnées Figma

Chaque token porte dans `$extensions["com.figma"]` :

```json
{
  "file": "S5w6gdpuYhKzlqm0WW1Xu9",
  "collection": "J3 · Color",
  "variable": "bg/brand",
  "scopes": ["FRAME_FILL", "SHAPE_FILL"],
  "codeSyntax": { "WEB": "var(--color-bg-brand)" }
}
```

- `variable` : nom exact dans Figma (séparateur `/`).
- `scopes` : où la variable est proposée dans Figma. Les primitives n'en ont aucun : elles sont invisibles dans les sélecteurs.
- `codeSyntax.WEB` : nom CSS du token, utilisé par `scripts/build-tokens.mjs`.
  - `var(--x)` → la variable `--x` est déclarée dans `src/styles/tokens.css`.
  - autre expression (`calc(var(--spacing) * 4)`, `1px`, `0.5`) → pas de variable dédiée : l'expression est reprise par les tokens qui pointent vers celui-ci. Les échelles d'espacement et d'interlignage suivent ainsi la base Tailwind `--spacing` (4 px).

## Synchronisation avec Figma

Les fichiers ont été générés à partir des variables Figma et contrôlés par empreinte (noms, modes, valeurs et alias) : les six collections `J3 · …` sont identiques au JSON. Après une modification dans Figma, reportez-la ici, puis :

```bash
npm run tokens   # régénère src/styles/tokens.css
```

Les composites (`text-style`, `shadow`, `focus`) reflètent les styles de texte et d'effets Figma ; leur nom Figma est dans `$extensions["com.figma"].textStyle` ou `.effectStyle`.
