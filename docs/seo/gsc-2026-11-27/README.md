# Exportación de Google Search Console (2026-11-27)

Exportado por el dueño desde Search Console, después del core update de noviembre (10 al 24/11/2026). Las impresiones del sitio bajaron de ~300 por día (fines de octubre y primeros días de noviembre) a 0–3 por día desde el 12–13/11.

- `rendimiento-paginas.csv` (Rendimiento → Páginas): 627 URLs con clics, impresiones, CTR y posición media. En total 83 clics y 6417 impresiones. Por idioma: es 21 clics / 1651 impresiones, en 22 / 2205, pt 19 / 1073, fr 1 / 881, zh 1 / 509 (más 19 clics en URLs sin prefijo).
- `rastreada-sin-indexar.csv` (Páginas → «Rastreada: actualmente sin indexar»): 350 URLs; 115 `zh`, 53 `fr`, 62 `es`, 59 `en`, 51 `pt`, 10 sin prefijo. 296 estaban en el sitemap.

## Lo que se decidió con estos datos
- **20.5a (hecha)**: fr y zh fuera del índice (`docs/seo/indexacion.md`).
- **Dos causas posibles de la caída, sin poder separarlas**: el core update (desde el 10/11) y el `noindex` de ~60 páginas de conversión por idioma de la fase 19.2, que llegó a `main` el 08/11. Las páginas que hoy están fuera del sitemap sumaron 10 clics y 968 impresiones en el período. Entre ellas, las que tuvieron clics son: `/en/csv-to-pdf` (262 impresiones, 3 clics), `/en/gif-to-pdf` (41, 3), `/en/odp-to-pdf` (22, 1), `/pt/arquivos-compactados` (26, 1), `/en/heic-to-webp` (4, 1) y `/pt/ico-para-pdf` (1, 1). Esto es la tarea 20.5b.
