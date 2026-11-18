import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Les styles de texte J3 (text-h1, text-body-small…) sont des tailles de police :
// on le déclare à tailwind-merge pour qu'il ne les confonde pas avec une couleur de texte.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "h1", "h2", "h3", "h4", "h5", "body-large", "body-default", "body-small", "caption"] }],
    },
  },
})

/** Fusionne des classes Tailwind en résolvant les conflits (la dernière gagne). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
