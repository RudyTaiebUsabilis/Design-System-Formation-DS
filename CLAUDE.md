# CLAUDE.md

Point d'entrée pour Claude Code. Les règles communes à tous les agents sont dans `AGENTS.md` :

@AGENTS.md

## Spécifique à Claude Code

- Commandes utiles : `npm run dev` (démo), `npm run tokens` (régénère le CSS), `npm run build` (vérification).
- Pour toute modification visible, lancer la démo et vérifier le rendu en Light et en Dark avant de conclure.
- Fichier Figma de référence : `S5w6gdpuYhKzlqm0WW1Xu9` (pages « Design System J3 » et « Composants J3 »). Avec le MCP Figma, les variables `J3 · …` portent la syntaxe de code WEB de chaque token : utilisez-la telle quelle.
- Pour générer un écran depuis une maquette Figma : réutiliser les composants de `src/components/ui/` et les tokens sémantiques ; ne jamais recopier les valeurs hexadécimales renvoyées par Figma.
