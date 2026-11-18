# Instructions pour Lovable

Lovable ne lit pas automatiquement `AGENTS.md`. Copiez le bloc ci-dessous dans **Project Settings → Knowledge** (ou en début de conversation), après avoir connecté ce dépôt GitHub au projet Lovable.

---

```text
Tu travailles avec le Design System J3 (dépôt GitHub connecté). Règles :

1. Composants : utilise uniquement ceux de src/components/ui/ (Button, Input, Label, Checkbox, RadioGroup/RadioGroupItem, Switch, Tag, Link). N'en recrée aucun.
2. Couleurs : uniquement les tokens sémantiques en variables CSS, avec la syntaxe Tailwind v4
   bg-(--color-bg-…), text-(--color-text-…), border-(--color-border-…), [&_svg]:text-(--color-icon-…).
   Jamais de hex, jamais de palette Tailwind (bg-red-500…), jamais de primitive (--color-brand-600).
3. Espacements et tailles : gap-(--spacing-xs|sm|md|lg|xl), p-(--spacing-…), h-(--size-control-md),
   rounded-(--radius-control|card|modal|pill). Pour une largeur max : max-w-[48rem] (pas max-w-3xl).
4. Typographie : text-display, text-h1 … text-h5, text-body-large, text-body-default, text-body-small,
   text-caption ; graisses font-normal, font-medium, font-semibold. Police Fira Sans.
5. Thème sombre : data-theme="dark" sur <html>. Ne code aucune couleur spécifique au thème.
6. Accessibilité : chaque champ a un Label visible ; erreurs via aria-invalid + message relié
   (aria-describedby) ; focus visible conservé ; un seul Button variant="default" par zone.
7. Choix : action → Button ; navigation → Link ; choix multiple → Checkbox ; choix unique → RadioGroup ;
   réglage immédiat → Switch ; statut/catégorie → Tag.
8. Avant d'utiliser un composant, lis sa fiche dans docs/components/<nom>.md (usage, variantes, exemples).
```

---

Conseil : demandez à Lovable de « lire AGENTS.md et docs/components/ avant de commencer » dans votre premier message, en plus du Knowledge.
