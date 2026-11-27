"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, RotateCw, X } from "lucide-react";
import { buttonSecondary } from "@/components/ui/styles";
import type { ToolId } from "@/config/tools";
import { organizePdfFile, rotatePdfFile, splitPdfFile } from "@/lib/pdf/client";
import type { PageSpec, Rotation } from "@/lib/pdf/ops";
import { formatPageRanges, parsePageRanges } from "@/lib/pdf/ranges";
import { errorCode } from "@/lib/convert-error";
import type { ApiErrorCode } from "@/lib/api-errors";
import { trackTool } from "@/lib/stats-client";
import ChoiceGroup from "./ChoiceGroup";
import PrimaryButton from "./PrimaryButton";
import ProgressBar from "./ProgressBar";
import RangesInput from "./RangesInput";
import SinglePdfInput from "./SinglePdfInput";
import ToolAlert from "./ToolAlert";
import ToolResult from "./ToolResult";
import { usePdfThumbnails } from "./usePdfThumbnails";
import { useSinglePdf } from "./useSinglePdf";

// One screen for the pages of a PDF (phase 20.2a): organize (reorder, rotate
// and delete each page), rotate (all pages or some, 90/180/270), delete pages
// and extract pages (one PDF, or one per page in a ZIP), on the same
// thumbnails. /ordenar-pdf, /rotar-pdf, /eliminar-paginas-pdf and
// /extraer-paginas-pdf open it in their mode; switching keeps the file.

export type PagesMode = "organize" | "rotate" | "delete" | "extract";
const modes: readonly PagesMode[] = ["organize", "rotate", "delete", "extract"];
const modeTool: Record<PagesMode, ToolId> = {
  organize: "organize-pdf",
  rotate: "rotate-pdf",
  delete: "delete-pdf-pages",
  extract: "extract-pdf-pages",
};

type Output = "single" | "each";

const baseName = (name: string) => name.replace(/\.pdf$/i, "") || "document";

const pageButton =
  "grid h-7 w-7 place-items-center rounded-md text-sm text-muted hover:bg-brand-soft hover:text-foreground disabled:opacity-30";

export default function PdfPagesTool({ initialMode }: { initialMode: PagesMode }) {
  const t = useTranslations("ToolUi");
  const tp = useTranslations("PdfTools");
  const tools = useTranslations("Tools");
  const te = useTranslations("ApiErrors");
  const pdf = useSinglePdf();
  const { thumbs, failed: thumbsFailed } = usePdfThumbnails(pdf.file);
  const [mode, setMode] = useState<PagesMode>(initialMode);
  // Organize: the new page order with each page's rotation.
  const [pages, setPages] = useState<PageSpec[]>([]);
  const [dragged, setDragged] = useState<number | null>(null);
  // Rotate (some pages), delete and extract: the picked pages, shared so switching keeps them.
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [ranges, setRanges] = useState("");
  const [rotation, setRotation] = useState<`${Rotation}`>("90");
  const [scope, setScope] = useState<"all" | "some">("all");
  const [output, setOutput] = useState<Output>("single");
  const [working, setWorking] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; name: string } | null>(null);
  const [failed, setFailed] = useState<ApiErrorCode | null>(null);

  const total = pdf.pages ?? 0;
  const restore = () => setPages(Array.from({ length: total }, (_, index) => ({ index, rotation: 0 })));
  useEffect(restore, [total, pdf.file]);
  useEffect(() => {
    setSelected(new Set());
    setRanges("");
  }, [pdf.file, pdf.pages]);

  const move = (from: number, to: number) =>
    setPages((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item!);
      return next;
    });

  const choose = (next: Set<number>) => {
    setSelected(next);
    setRanges(formatPageRanges(next));
  };
  const toggle = (page: number) => {
    const next = new Set(selected);
    if (!next.delete(page)) next.add(page);
    choose(next);
  };
  const typeRanges = (value: string) => {
    setRanges(value);
    const parsed = total ? parsePageRanges(value, total) : null;
    setSelected(new Set(parsed?.flat() ?? []));
  };
  const rangesValid = ranges.trim() === "" || (total > 0 && parsePageRanges(ranges, total) !== null);
  const picked = [...selected].sort((a, b) => a - b);

  const picking = mode === "delete" || mode === "extract" || (mode === "rotate" && scope === "some");
  // Deleting every page would leave an empty (invalid) PDF.
  const allSelected = mode === "delete" && total > 0 && selected.size === total;
  const ready =
    mode === "organize"
      ? pages.length > 0
      : mode === "rotate" && scope === "all"
        ? total > 0
        : picked.length > 0 && rangesValid && !allSelected;
  const loaded = thumbs.filter(Boolean).length;
  const angle = Number(rotation) as Rotation;

  async function run() {
    if (!pdf.file || !ready || working) return;
    const file = pdf.file;
    const base = baseName(file.name);
    const id = modeTool[mode];
    const track = { from: "pdf", to: "pdf", files: [file] } as const;
    setFailed(null);
    setWorking(true);
    try {
      if (mode === "organize") {
        const blob = await trackTool(id, track, () => organizePdfFile(file, pages), (b) => b.size);
        setResult({ blob, name: file.name.replace(/(\.pdf)?$/i, "-organized.pdf") });
      } else if (mode === "rotate") {
        const only = scope === "some" ? picked : undefined;
        const blob = await trackTool(id, track, () => rotatePdfFile(file, angle, only), (b) => b.size);
        setResult({ blob, name: file.name.replace(/(\.pdf)?$/i, "-rotated.pdf") });
      } else if (mode === "delete") {
        const keep = Array.from({ length: total }, (_, index) => index).filter((i) => !selected.has(i));
        const blob = await trackTool(
          id,
          track,
          () => organizePdfFile(file, keep.map((index) => ({ index, rotation: 0 }))),
          (b) => b.size,
        );
        setResult({ blob, name: `${base}-edited.pdf` });
      } else {
        const groups = output === "each" ? picked.map((p) => [p]) : [picked];
        const outputs = await trackTool(
          id,
          track,
          () => splitPdfFile(file, groups),
          (parts) => parts.reduce((sum, b) => sum + b.size, 0),
        );
        if (outputs.length === 1) {
          setResult({ blob: outputs[0]!, name: `${base}-${formatPageRanges(picked).replace(/, /g, "_")}.pdf` });
        } else {
          const { zipBlobs } = await import("@/lib/zip");
          const files = outputs.map((blob, i) => ({ blob, name: `${base}-${picked[i]! + 1}.pdf` }));
          setResult({ blob: await zipBlobs(files), name: `${base}-pages.zip` });
        }
      }
    } catch (error) {
      console.error(error);
      setFailed(errorCode(error));
    } finally {
      setWorking(false);
    }
  }

  if (result) {
    return (
      <ToolResult
        blob={result.blob}
        filename={result.name}
        onReset={() => {
          setResult(null);
          pdf.clear();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <SinglePdfInput pdf={pdf} />
      {pdf.pages !== null && (
        <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card sm:p-6">
          <ChoiceGroup
            legend={tp("pagesMode")}
            value={mode}
            onChange={(next) => {
              setMode(next);
              setFailed(null);
            }}
            options={modes.map((m) => ({ value: m, label: tp(`pagesModes.${m}`) }))}
          />
          {mode === "rotate" && (
            <>
              <ChoiceGroup
                legend={t("rotation")}
                value={rotation}
                onChange={setRotation}
                options={[
                  { value: "90", label: `↻ ${t("rotateRight")}` },
                  { value: "180", label: t("rotate180") },
                  { value: "270", label: `↺ ${t("rotateLeft")}` },
                ]}
              />
              <ChoiceGroup
                legend={t("rotateScope")}
                value={scope}
                onChange={setScope}
                options={[
                  { value: "all", label: t("allPages") },
                  { value: "some", label: t("somePages") },
                ]}
              />
            </>
          )}
          {loaded < total && !thumbsFailed && <ProgressBar value={loaded / (total || 1)} label={t("loadingPages")} />}
          {mode === "organize" && <p className="text-sm text-muted">{t("dragHint")}</p>}
          {picking && (
            <p className="text-sm text-muted">
              {mode === "rotate" ? tp("pickRotateHint") : t(mode === "delete" ? "pickDeleteHint" : "pickExtractHint")}
            </p>
          )}
          {mode === "organize" ? (
            <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {pages.map((spec, i) => {
                const n = spec.index + 1;
                return (
                  <li
                    key={spec.index}
                    draggable
                    onDragStart={(e) => {
                      // Firefox only starts a drag when data is set.
                      e.dataTransfer.setData("text/plain", String(i));
                      e.dataTransfer.effectAllowed = "move";
                      setDragged(i);
                    }}
                    onDragEnd={() => setDragged(null)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      if (dragged !== null) move(dragged, i);
                      setDragged(null);
                    }}
                    className={`flex cursor-grab flex-col items-center gap-2 rounded-xl border bg-background p-2 ${
                      dragged === i ? "border-brand opacity-50" : "border-border"
                    }`}
                  >
                    <div className="grid aspect-[3/4] w-full place-items-center overflow-hidden">
                      {thumbs[spec.index] ? (
                        // eslint-disable-next-line @next/next/no-img-element -- local blob URL
                        <img
                          src={thumbs[spec.index]}
                          alt={t("pageLabel", { n })}
                          draggable={false}
                          style={{ transform: `rotate(${spec.rotation}deg)` }}
                          className="max-h-full max-w-full shadow transition-transform"
                        />
                      ) : (
                        <span className="text-sm text-muted">{t("pageLabel", { n })}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium">{n}</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className={pageButton}
                        disabled={i === 0}
                        onClick={() => move(i, i - 1)}
                        aria-label={t("movePageLeft", { n })}
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        className={pageButton}
                        onClick={() =>
                          setPages((prev) =>
                            prev.map((p, j) =>
                              j === i ? { ...p, rotation: ((p.rotation + 90) % 360) as PageSpec["rotation"] } : p,
                            ),
                          )
                        }
                        aria-label={t("rotatePage", { n })}
                      >
                        ↻
                      </button>
                      <button
                        type="button"
                        className={pageButton}
                        disabled={pages.length === 1}
                        onClick={() => setPages((prev) => prev.filter((_, j) => j !== i))}
                        aria-label={t("deletePage", { n })}
                      >
                        🗑
                      </button>
                      <button
                        type="button"
                        className={pageButton}
                        disabled={i === pages.length - 1}
                        onClick={() => move(i, i + 1)}
                        aria-label={t("movePageRight", { n })}
                      >
                        →
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <ol className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {Array.from({ length: total }, (_, index) => {
                const n = index + 1;
                const on = selected.has(index);
                // What the page will look like: rotated, dimmed when deleted.
                const turned = mode === "rotate" && (scope === "all" || on);
                const style = turned ? { transform: `rotate(${angle}deg)${angle === 180 ? "" : " scale(0.75)"}` } : undefined;
                const image = thumbs[index] ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local blob URL
                  <img
                    src={thumbs[index]}
                    alt={picking ? "" : t("pageLabel", { n })}
                    draggable={false}
                    style={style}
                    className={`max-h-full max-w-full shadow transition-transform ${on && mode === "delete" ? "opacity-40" : ""}`}
                  />
                ) : (
                  <span className="text-sm text-muted">{n}</span>
                );
                if (!picking) {
                  return (
                    <li key={index} className="flex flex-col items-center gap-1 rounded-xl border-2 border-border bg-background p-2">
                      <span className="grid aspect-[3/4] w-full place-items-center overflow-hidden">{image}</span>
                      <span className="text-xs font-medium tabular-nums">{n}</span>
                    </li>
                  );
                }
                const Mark = mode === "delete" ? X : mode === "rotate" ? RotateCw : Check;
                return (
                  <li key={index}>
                    <button
                      type="button"
                      aria-pressed={on}
                      aria-label={t("pageLabel", { n })}
                      onClick={() => toggle(index)}
                      className={`relative flex w-full flex-col items-center gap-1 rounded-xl border-2 bg-background p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                        on ? (mode === "delete" ? "border-danger" : "border-brand") : "border-border hover:border-muted"
                      }`}
                    >
                      <span className="grid aspect-[3/4] w-full place-items-center overflow-hidden">{image}</span>
                      <span className="text-xs font-medium tabular-nums">{n}</span>
                      {on && (
                        <span
                          className={`absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full text-white ${
                            mode === "delete" ? "bg-danger" : "bg-brand"
                          }`}
                        >
                          <Mark aria-hidden="true" className="h-4 w-4" />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
          {picking && (
            <>
              <div className="flex flex-wrap gap-3">
                <button type="button" className={buttonSecondary} onClick={() => choose(new Set(Array.from({ length: total }, (_, i) => i)))}>
                  {t("selectAll")}
                </button>
                <button type="button" className={buttonSecondary} disabled={selected.size === 0} onClick={() => choose(new Set())}>
                  {t("selectNone")}
                </button>
              </div>
              <RangesInput
                value={ranges}
                onChange={typeRanges}
                valid={rangesValid}
                pageCount={total}
                placeholder={mode === "rotate" ? "1, 3-4" : undefined}
              />
            </>
          )}
          {(mode === "delete" || mode === "extract") && (
            <p role="status" className="text-sm font-medium">
              {t(mode === "delete" ? "pagesToDelete" : "pagesToExtract", { count: picked.length, total })}
            </p>
          )}
          {allSelected && <ToolAlert>{t("cannotDeleteAll")}</ToolAlert>}
          {mode === "extract" && (
            <ChoiceGroup
              legend={t("extractOutput")}
              value={output}
              onChange={setOutput}
              options={[
                { value: "single", label: t("extractSingle") },
                { value: "each", label: t("extractEach") },
              ]}
            />
          )}
          {failed && <ToolAlert>{te(failed)}</ToolAlert>}
          <div className="flex flex-wrap gap-3">
            <PrimaryButton onClick={run} disabled={!ready || working}>
              {working ? t("working") : tools(`${modeTool[mode]}.action`)}
            </PrimaryButton>
            {mode === "organize" && (
              <button
                type="button"
                onClick={restore}
                className="rounded-xl border border-border px-6 py-3 font-semibold hover:bg-brand-soft"
              >
                {t("restorePages")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const OrganizePdfTool = () => <PdfPagesTool initialMode="organize" />;
export const RotatePdfTool = () => <PdfPagesTool initialMode="rotate" />;
export const DeletePdfPagesTool = () => <PdfPagesTool initialMode="delete" />;
export const ExtractPdfPagesTool = () => <PdfPagesTool initialMode="extract" />;
