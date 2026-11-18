// Génère src/styles/tokens.css à partir des fichiers W3C (DTCG) de tokens/.
// Les JSON sont la source de vérité : ne jamais modifier tokens.css à la main.
//
// Règle de nommage : chaque token porte sa syntaxe de code Figma ($extensions.com.figma.codeSyntax.WEB).
//   - « var(--x) »  → le token est déclaré comme variable CSS --x ;
//   - sinon (« calc(var(--spacing) * 4) », « 1px », « 0.5 ») → pas de variable : l'expression est réutilisée
//     telle quelle par les tokens qui pointent vers lui.
import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const read = (f) => JSON.parse(readFileSync(path.join(root, "tokens", f), "utf8"))
const primitives = read("primitives.tokens.json")
const semantic = read("semantic.tokens.json")
const light = read("themes/light.tokens.json")
const dark = read("themes/dark.tokens.json")

function flatten(node, prefix = []) {
  return Object.entries(node).flatMap(([k, v]) => {
    if (k.startsWith("$")) return []
    if (v && typeof v === "object" && "$value" in v) return [[[...prefix, k].join("."), v]]
    return v && typeof v === "object" ? flatten(v, [...prefix, k]) : []
  })
}
const web = (t) => t.$extensions?.["com.figma"]?.codeSyntax?.WEB
const varName = (t) => web(t)?.match(/^var\((--[\w-]+)\)$/)?.[1]

const all = new Map([...flatten(primitives), ...flatten(semantic), ...flatten(light)])
const refExpr = (ref) => {
  const t = all.get(ref)
  if (!t) throw new Error(`Alias introuvable : {${ref}}`)
  return varName(t) ? `var(${varName(t)})` : web(t) ?? raw(t)
}
const alias = (v) => (typeof v === "string" ? v.match(/^\{(.+)\}$/)?.[1] : undefined)
function raw(t) {
  const v = t.$value
  if (Array.isArray(v)) return v.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(", ")
  if (v && typeof v === "object" && "unit" in v) return `${v.value}${v.unit}`
  return String(v)
}
const value = (t) => (alias(t.$value) ? refExpr(alias(t.$value)) : raw(t))
const decl = (tokens) => tokens.filter(([, t]) => varName(t)).map(([, t]) => `  ${varName(t)}: ${value(t)};`).join("\n")

// Ombres et anneaux de focus (composites) → --shadow-*, --focus-ring*
const dim = (d) => (typeof d === "object" ? `${d.value}${d.unit}` : d)
const shadow = (t) => t.$value.map((l) => `${dim(l.offsetX)} ${dim(l.offsetY)} ${dim(l.blur)} ${dim(l.spread)} ${refExpr(alias(l.color))}`).join(", ")

const semTokens = flatten(semantic).filter(([n]) => !n.startsWith("text-style") && !n.startsWith("shadow") && !n.startsWith("focus") && !n.startsWith("blur"))
const lightTokens = flatten(light), darkTokens = flatten(dark)

const css = `/* ⚠️ Généré par scripts/build-tokens.mjs à partir de tokens/*.json — ne pas modifier à la main. */

/* 1. Primitives : valeurs brutes, jamais utilisées directement dans un composant. */
:root {
${decl(flatten(primitives))}
}

/* 2. Sémantiques : exposées à Tailwind v4 (classes text-h1, shadow-md…) et aux composants. */
@theme {
  /* On retire la palette Tailwind par défaut : seules les couleurs sémantiques existent. */
  --color-*: initial;
${decl(semTokens)}

  /* Thème Light (par défaut) */
${decl(lightTokens)}

  /* Effets */
${["xs", "sm", "md", "lg", "xl"].map((k) => `  --shadow-${k}: ${shadow(semantic.shadow[k])};`).join("\n")}
  --focus-ring: ${shadow(semantic.focus.ring)};
  --focus-ring-error: ${shadow(semantic.focus["ring-error"])};
  --blur-backdrop: ${dim(semantic.blur.backdrop.$value)};
}

/* 3. Thèmes explicites : data-theme sur <html> ou sur n'importe quel conteneur. Mêmes noms, autres alias. */
[data-theme="light"] {
${decl(lightTokens)}
}

[data-theme="dark"] {
${decl(darkTokens)}
}
`
writeFileSync(path.join(root, "src/styles/tokens.css"), css)
console.log(`✓ src/styles/tokens.css — ${flatten(primitives).length} primitives, ${semTokens.length} sémantiques, ${lightTokens.length} couleurs × 2 thèmes`)
