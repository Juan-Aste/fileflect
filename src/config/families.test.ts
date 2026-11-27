import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/routing";
import { familiesInCategory, familyIds, familyOf, toolFamilies } from "./families";
import { availableTools, toolCategories, toolIds, tools } from "./tools";

describe("tool families", () => {
  it("puts every published tool in exactly one family of its own category", () => {
    for (const id of availableTools) {
      const owners = familyIds.filter((f) => (toolFamilies[f].members as readonly string[]).includes(id));
      expect(owners, id).toHaveLength(1);
      expect(toolFamilies[owners[0]!].category, id).toBe(tools[id].category);
    }
  });

  it("only lists real tools, once", () => {
    const all = familyIds.flatMap((f) => [...toolFamilies[f].members]);
    expect(new Set(all).size).toBe(all.length);
    for (const id of all) expect(toolIds).toContain(id);
  });

  it("gives a tool its published siblings, itself included", () => {
    const family = familyOf("rotate-pdf")!;
    expect(family.id).toBe("pdf-pages");
    expect(family.tools.map((t) => t.id)).toContain("rotate-pdf");
    expect(family.tools.every((t) => availableTools.includes(t.id))).toBe(true);
  });

  it("covers each category's tools with its families, in order", () => {
    for (const category of toolCategories) {
      const fromFamilies = familiesInCategory(category).flatMap((f) => f.tools.map((t) => t.id));
      const inCategory = availableTools.filter((id) => tools[id].category === category);
      expect([...fromFamilies].sort(), category).toEqual([...inCategory].sort());
    }
  });

  it("has a name for every family in every language", async () => {
    for (const locale of locales) {
      const messages = (await import(`../../messages/${locale}.json`)).default;
      for (const id of familyIds) expect(messages.Catalog.families?.[id]?.name, `${locale} ${id}`).toBeTruthy();
    }
  });
});
