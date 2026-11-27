import { describe, expect, it } from "vitest";
import { familyOf } from "./families";
import { modeSiblings, unifiedTools } from "./tool-modes";
import { tools } from "./tools";

describe("unified tools", () => {
  it("are made of existing tools of one family, each in one unified tool", () => {
    const seen = new Set<string>();
    for (const members of Object.values(unifiedTools)) {
      const families = new Set(members.map((id) => familyOf(id)?.id));
      expect(families.size).toBe(1);
      for (const id of members) {
        expect(tools[id], id).toBeDefined();
        expect(seen.has(id), id).toBe(false);
        seen.add(id);
      }
    }
  });

  it("give each mode its siblings, and nothing to a tool that is not unified", () => {
    expect(modeSiblings("rotate-pdf")).toEqual(["organize-pdf", "delete-pdf-pages", "extract-pdf-pages"]);
    expect(modeSiblings("merge-pdf")).toEqual([]);
  });
});
