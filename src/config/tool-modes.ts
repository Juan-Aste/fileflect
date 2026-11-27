import type { ToolId } from "./tools";

// Unified tools (phase 20): one component with modes, where each tool page
// keeps its own URL, texts and canonical and just opens the component in its
// mode. The user can switch modes without losing the loaded file, so a tool
// page also needs its siblings' button texts (see toolMessages).

export const unifiedTools = {
  "pdf-pages": ["organize-pdf", "rotate-pdf", "delete-pdf-pages", "extract-pdf-pages"],
} as const satisfies Record<string, readonly ToolId[]>;

export type UnifiedToolId = keyof typeof unifiedTools;

/** The other tools that are modes of the same unified tool as `id` (empty if it is not unified). */
export function modeSiblings(id: string): ToolId[] {
  for (const members of Object.values(unifiedTools) as readonly (readonly ToolId[])[]) {
    if (members.includes(id as ToolId)) return members.filter((m) => m !== id);
  }
  return [];
}
