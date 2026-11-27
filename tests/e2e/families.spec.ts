// Tool families (20.1 in PLAN.md): every tool of a family of two or more shows
// its siblings as tabs above the tool, the current one marked, each a real
// link; category pages list tools family by family. families.test.ts checks
// that every published tool is in exactly one family.
import { familyIds, familyOf, toolFamilies } from "../../src/config/families";
import { availableTools, tools, type ToolId } from "../../src/config/tools";
import { locales } from "../../src/i18n/routing";
import { axeViolations } from "./axe";
import { expect, test } from "./support";

test("every tool shows its family as tabs, with the current one marked", async ({ page }) => {
  test.setTimeout(300_000);
  // Every tool in Spanish; in the other languages, one tool per family (the slugs differ, the logic does not).
  const firstOfFamily = familyIds.map((f) => familyOf(toolFamilies[f].members[0] as ToolId)!.tools[0]?.id).filter(Boolean) as ToolId[];
  for (const locale of locales) {
    for (const id of locale === "es" ? availableTools : firstOfFamily) {
      const family = familyOf(id)!;
      await page.goto(`/${locale}/${tools[id].slugs[locale]}`);
      const nav = page.locator(`nav[data-family="${family.id}"]`);
      if (family.tools.length < 2) {
        await expect(nav, `${locale} ${id}`).toHaveCount(0);
        continue;
      }
      const links = nav.getByRole("link");
      await expect(links, `${locale} ${id}`).toHaveCount(family.tools.length);
      for (const [i, sibling] of family.tools.entries()) {
        await expect(links.nth(i)).toHaveAttribute("href", `/${locale}/${sibling.slugs[locale]}`);
      }
      await expect(nav.locator('[aria-current="page"]')).toHaveAttribute("href", `/${locale}/${tools[id].slugs[locale]}`);
    }
  }
});

test("a family tab goes to its tool @xb", async ({ page }) => {
  await page.goto("/es/unir-pdf");
  const nav = page.locator('nav[data-family="pdf-pages"]');
  await nav.getByRole("link", { name: "Rotar PDF" }).click();
  await expect(page).toHaveURL(/\/es\/rotar-pdf$/);
  await expect(page.locator('nav[data-family="pdf-pages"] [aria-current="page"]')).toHaveText("Rotar PDF");
  expect(await axeViolations(page)).toEqual([]);
});

test("category pages group tools by family", async ({ page }) => {
  await page.goto("/es/herramientas-pdf");
  const pdfFamilies = familyIds.filter((f) => toolFamilies[f].category === "pdf");
  for (const f of pdfFamilies) await expect(page.locator(`#family-${f}`)).toBeVisible();
  const pages = page.locator('section[aria-labelledby="family-pdf-pages"]');
  for (const id of toolFamilies["pdf-pages"].members as readonly ToolId[]) {
    if (availableTools.includes(id)) await expect(pages.locator(`a[href="/es/${tools[id].slugs.es}"]`)).toHaveCount(1);
  }
  expect(await axeViolations(page)).toEqual([]);
});
