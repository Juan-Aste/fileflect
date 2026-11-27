import { availableTools, tools, type ToolCategory, type ToolId, type ToolInfo } from "./tools";

// Tool families (phase 20.1): tools that do related jobs on the same kind of
// file, shown together so the catalog reads as a few workspaces instead of
// ~110 loose pages. Every published tool belongs to exactly one family of its
// own category (families.test.ts). On a tool page the family's other members
// appear as tabs above the tool; category pages list tools family by family.
// Names live in messages under Catalog.families.<id>.

export const toolFamilies = {
  "pdf-pages": { category: "pdf", members: ["merge-pdf", "split-pdf", "organize-pdf", "rotate-pdf", "delete-pdf-pages", "extract-pdf-pages"] },
  "pdf-edit": { category: "pdf", members: ["edit-pdf", "sign-pdf", "fill-pdf-form", "pdf-watermark", "pdf-page-numbers", "crop-pdf"] },
  "pdf-optimize": { category: "pdf", members: ["compress-pdf", "protect-pdf", "unlock-pdf", "pdf-to-pdfa"] },
  "pdf-convert": { category: "pdf", members: ["pdf-to-text", "pdf-to-excel", "pdf-to-powerpoint", "extract-pdf-images"] },
  "pdf-create": { category: "pdf", members: ["images-to-pdf", "scan-document"] },
  "image-edit": { category: "image", members: ["crop-image", "resize-image", "rotate-image", "round-image", "watermark-image", "add-text-to-image"] },
  "image-photo": { category: "image", members: ["remove-background", "enhance-photo", "id-photo"] },
  "image-optimize": { category: "image", members: ["compress-image", "remove-exif", "svg-converter", "favicon-generator"] },
  "document-markup": { category: "document", members: ["markdown-to-html", "html-to-markdown", "markdown-to-pdf", "html-to-pdf"] },
  "document-sheets": {
    category: "document",
    members: ["spreadsheet-converter", "excel-to-csv", "csv-to-excel", "xls-to-xlsx", "excel-to-ods", "ods-to-excel", "excel-to-json", "json-to-excel", "merge-excel", "split-excel"],
  },
  "data-convert": { category: "data", members: ["json-to-csv", "csv-to-json", "json-to-yaml", "yaml-to-json", "json-to-toml", "toml-to-json", "json-to-xml", "xml-to-json"] },
  "developer-format": { category: "developer", members: ["json-formatter", "xml-formatter", "yaml-formatter"] },
  "developer-encode": { category: "developer", members: ["base64-encode", "base64-decode", "url-encode", "hash-generator"] },
  "developer-generate": { category: "developer", members: ["uuid-generator", "timestamp-converter"] },
  "utility-text": { category: "utility", members: ["word-counter", "case-converter", "compare-text", "remove-duplicate-lines", "lorem-ipsum"] },
  "utility-qr": { category: "utility", members: ["qr-generator", "qr-reader"] },
  "utility-other": { category: "utility", members: ["password-generator", "color-converter", "unit-converter"] },
  subtitle: { category: "subtitle", members: ["subtitle-converter", "subtitle-sync"] },
  font: { category: "font", members: ["font-converter"] },
  archive: { category: "archive", members: ["create-archive", "extract-archive"] },
  ocr: { category: "ocr", members: ["image-to-text", "ocr-pdf"] },
  ebook: { category: "ebook", members: ["epub-converter", "epub-to-pdf", "create-epub"] },
  "audio-edit": { category: "audio", members: ["audio-converter", "trim-audio", "adjust-audio", "normalize-audio", "join-audio"] },
  "audio-speech": { category: "audio", members: ["text-to-speech", "audio-to-text"] },
  video: { category: "video", members: ["video-converter", "compress-video", "trim-video", "video-speed", "join-videos", "extract-audio", "video-to-gif"] },
  "3d": { category: "3d", members: ["model-converter", "image-to-lithophane"] },
  cad: { category: "cad", members: ["dxf-converter"] },
} as const satisfies Record<string, { category: ToolCategory; members: readonly ToolId[] }>;

export type FamilyId = keyof typeof toolFamilies;

export const familyIds = Object.keys(toolFamilies) as FamilyId[];

export interface PublishedFamily {
  id: FamilyId;
  category: ToolCategory;
  /** Published members, in family order. */
  tools: ToolInfo[];
}

const published = (id: FamilyId): PublishedFamily => ({
  id,
  category: toolFamilies[id].category,
  tools: (toolFamilies[id].members as readonly ToolId[]).filter((t) => availableTools.includes(t)).map((t) => tools[t]),
});

/** The family a tool belongs to, with only its published members. */
export function familyOf(id: ToolId): PublishedFamily | undefined {
  const family = familyIds.find((f) => (toolFamilies[f].members as readonly ToolId[]).includes(id));
  return family ? published(family) : undefined;
}

/** Families of a category that have published tools, in catalog order. */
export function familiesInCategory(category: ToolCategory): PublishedFamily[] {
  return familyIds
    .filter((f) => toolFamilies[f].category === category)
    .map(published)
    .filter((f) => f.tools.length > 0);
}
