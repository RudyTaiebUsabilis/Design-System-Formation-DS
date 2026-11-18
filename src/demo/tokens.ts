// Lecture des fichiers W3C pour la page de démo (affichage uniquement).
import primitives from "@tokens/primitives.tokens.json"
import semantic from "@tokens/semantic.tokens.json"
import light from "@tokens/themes/light.tokens.json"
import dark from "@tokens/themes/dark.tokens.json"

type Dim = { value: number; unit: string }
export interface Token { path: string; type: string; value: unknown; description?: string; web?: string }

function flatten(node: Record<string, unknown>, prefix: string[] = []): Token[] {
  return Object.entries(node).flatMap(([k, v]) => {
    if (k.startsWith("$") || !v || typeof v !== "object") return []
    const o = v as Record<string, any>
    if ("$value" in o) return [{ path: [...prefix, k].join("."), type: o.$type, value: o.$value, description: o.$description, web: o.$extensions?.["com.figma"]?.codeSyntax?.WEB }]
    return flatten(o, [...prefix, k])
  })
}
export const P = flatten(primitives as any)
export const S = flatten(semantic as any)
export const L = flatten(light as any)
export const D = flatten(dark as any)
const byPath = new Map([...P, ...S, ...L].map((t) => [t.path, t]))
export const aliasOf = (v: unknown) => (typeof v === "string" ? v.match(/^\{(.+)\}$/)?.[1] : undefined)
export function resolve(v: unknown): string {
  const a = aliasOf(v)
  if (a) return resolve(byPath.get(a)!.value)
  if (v && typeof v === "object" && "unit" in (v as Dim)) return `${(v as Dim).value}${(v as Dim).unit}`
  if (Array.isArray(v)) return v[0]
  return String(v)
}
export const cssVar = (t: Token) => t.web?.match(/^var\((--[\w-]+)\)$/)?.[1]
export function group<T extends Token>(list: T[], depth: number) {
  const m = new Map<string, T[]>()
  for (const t of list) { const k = t.path.split(".")[depth]; m.set(k, [...(m.get(k) ?? []), t]) }
  return m
}
