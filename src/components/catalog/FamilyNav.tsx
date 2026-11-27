import { getLocale, getTranslations } from "next-intl/server";
import ToolIcon from "@/components/tools/ToolIcon";
import { familyOf } from "@/config/families";
import type { ToolId } from "@/config/tools";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/**
 * Tabs with the other tools of a tool's family (phase 20.1), shown above the
 * tool so related jobs on the same file are one click away. Plain links: each
 * tab is its own page. Nothing is drawn for a family of one.
 */
export default async function FamilyNav({ current }: { current: ToolId }) {
  const family = familyOf(current);
  if (!family || family.tools.length < 2) return null;
  const t = await getTranslations("Catalog");
  const tt = await getTranslations("Tools");
  const locale = (await getLocale()) as Locale;
  const name = t(`families.${family.id}.name`);
  const tab =
    "inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition";
  return (
    <nav aria-label={t("familyNav", { family: name })} data-family={family.id}>
      <ul className="flex flex-wrap justify-center gap-2">
        {family.tools.map((tool) => {
          const active = tool.id === current;
          return (
            <li key={tool.id}>
              <Link
                href={`/${tool.slugs[locale]}`}
                aria-current={active ? "page" : undefined}
                className={`${tab} ${active ? "border-brand-solid bg-brand-solid text-white" : "border-border bg-surface hover:border-brand hover:text-brand"}`}
              >
                <ToolIcon id={tool.id} className="hidden h-4 w-4 sm:block" />
                {tt(`${tool.id}.title`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
