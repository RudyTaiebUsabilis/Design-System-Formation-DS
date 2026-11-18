# Changelog

Toutes les évolutions notables du design system. Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versions selon [SemVer](https://semver.org/lang/fr/) :

- **MAJEURE** : suppression ou renommage d'un token, d'un composant, d'une prop ou d'une variante (casse l'existant).
- **MINEURE** : ajout rétrocompatible (nouveau token, nouvelle variante, nouveau composant).
- **CORRECTIF** : correction sans changement d'API (valeur, accessibilité, bug).

## [Non publié]

## [1.0.0] — 2026-11-18

Première version, alignée sur le fichier Figma de la formation (pages « Design System J3 » et « Composants J3 »).

### Ajouté

- **Tokens W3C (DTCG)** :
  - `tokens/primitives.tokens.json` : 198 primitives (10 palettes de 50 à 950, alpha, espacements, rayons, tailles de police, interlignages, graisses, tracking, opacités, bordures, polices).
  - `tokens/themes/light.tokens.json` et `dark.tokens.json` : 81 couleurs sémantiques (`bg`, `text`, `icon`, `border`, `dataviz`, `shadow`).
  - `tokens/semantic.tokens.json` : espacements (10), tailles (12), formes (13), typographie (43), 18 styles de texte, 5 ombres, 2 anneaux de focus, 1 flou.
- **Script** `scripts/build-tokens.mjs` : génère `src/styles/tokens.css` (Tailwind v4, thèmes Light / Dark).
- **Composants React** basés sur shadcn/ui : Button, Input, Label, Checkbox, Radio Group, Switch, Tag, Link.
- **Documentation** : README, AGENTS.md, CLAUDE.md, instructions Lovable, règles de nommage, gabarit de fiche enrichi et 7 fiches composants.
- **Page de démo** : tous les tokens, les composants (variantes × états) et un formulaire d'inscription.

### Modifié

- Primitive `radius/none` renommée `radius/0` (syntaxe de code `0px`), dans Figma et dans le JSON, pour ne plus entrer en conflit avec le token sémantique `radius/none`.
