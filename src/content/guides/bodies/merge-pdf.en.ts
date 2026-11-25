const body = `
Merging several PDFs into one lets you send a whole application as a single attachment, collect the month's invoices, or build a folder of documents in the order someone should read them. With [Merge PDF](tool:merge-pdf) it happens in your browser, without uploading the files to any server. The part worth getting right is the order: this guide shows how to set it up before merging, what to do with password-protected PDFs, photos and scans, and what changes in the final file.

## Before you start: put things in order

The final PDF has its pages in the same order as the file list, and each file contributes all its pages, first to last. So it pays to think about the order before merging, not after:

- **One file per document**: if each piece already has its own PDF (the application, the receipt, the contract), the file list is your table of contents. Give the files names that make sense.
- **Extra pages**: if a PDF has pages you don't want, remove them first with [Delete PDF pages](tool:delete-pdf-pages). If you only need one stretch, take it out with [Split PDF](tool:split-pdf).
- **Photos or screenshots**: turn them into PDFs first with [Images to PDF](tool:images-to-pdf). For phone photos of paper pages, [Scan document](tool:scan-document) straightens them and makes the paper white; the result is one more PDF for the list.
- **PDFs with an open password**: Merge PDF can't read them. Remove the password first with [Unlock PDF](tool:unlock-pdf) (you need to know it).

## How to merge PDFs step by step

1. Open [Merge PDF](tool:merge-pdf) and drag the files in, or click to choose them. You can select several at once.
2. Check the list. A file that isn't a PDF is marked **PDF only** and is left out. To take one off the list, use the remove button next to its name.
3. Order the list with each file's move up and move down buttons (they also work with the keyboard). The file at the top becomes the start of the final PDF.
4. With at least two files, click **Merge PDF**. The progress bar moves forward file by file.
5. When **Your file is ready** appears, download the result with **Download**. It is named \`fileflect-merged.pdf\`.
6. To merge other files, click **Start over**.

![The list of three PDF files with the buttons to move each one up and down](shot:unir-pdf-lista "Each file has its own move up and move down buttons; the order of the list is the order of the final PDF.")

## When a single page is out of place

Sometimes ordering by file isn't enough: for example, one page of the contract has to go between two pages of the appendix. In that case, merge first (even if a page ends up in the wrong place) and open the result in [Organize PDF pages](tool:organize-pdf):

1. Choose the merged PDF. The tool generates one thumbnail per page.
2. Drag the thumbnails to their new place, or use each page's move-before and move-after buttons.
3. If a page is sideways, use the rotate button; if it's extra, the delete button. **Restore all** puts the document back in its original order.
4. Click **Save PDF** and download the new file.

## What the merged PDF keeps and what it doesn't

Pages are copied as they are, without recompressing them: text stays selectable, links to websites are kept and images keep their resolution. Even so, there are three things worth knowing:

- **Forms stop being editable.** We checked that when a PDF with form fields is merged, the final file doesn't keep them as fillable fields. If you need to merge a form that's already filled in, fill it first with [Fill PDF form](tool:fill-pdf-form) and choose the option to flatten it: the values are then written on the page and look the same in the merged PDF. If the form is going to be edited further, leave it out of the merge.
- **Bookmarks or the outline of the original PDF are not carried over.** Every page reaches the final file, but the side index of long documents does not.
- **The result has no password.** If the merged document must be protected, add the password at the end with [Protect PDF](tool:protect-pdf).

Each page keeps its own size: if you merge an A4 document with a Letter one, the final PDF mixes pages of both sizes. Nothing is resized or cropped.

## If the final PDF is too big

Merging doesn't compress anything, so the result is roughly the sum of the sizes of the files. If you have to send it by email or upload it to a portal with a size limit, run it through [Compress PDF](tool:compress-pdf). The guide [How to reduce a PDF's file size](guide:reduce-pdf-size) explains which level to pick and when compression doesn't achieve much (for example, with PDFs that are already light).

A practical tip: if you're going to compress, do it after merging and not before; that way you compress once and compare the size of the file you'll actually send.

## If something goes wrong

- **It says the file has a password**: it is a PDF with an open password. Remove it with [Unlock PDF](tool:unlock-pdf) and add the file again. You need to know the password: a protected PDF from someone else can't be opened without it.
- **A file shows as “PDF only”**: it isn't a PDF, or its content isn't one even if the extension says \`.pdf\`. If it's an image, convert it with [Images to PDF](tool:images-to-pdf); if it's a Word document, with [Word to PDF](conv:docx-pdf) (that conversion runs on our server, unlike merging).
- **The button doesn't turn on**: you need at least two valid files in the list.
- **The final PDF won't open or pages are missing**: a damaged source file may be the cause. Try merging two at a time to find which one it is and, if needed, export it again from the original program.

## Summary

- Think about the order before merging: the final PDF follows the file list, top to bottom.
- Prepare each piece: remove extra pages, convert photos with [Images to PDF](tool:images-to-pdf) or [Scan document](tool:scan-document), and remove open passwords.
- In [Merge PDF](tool:merge-pdf), order with the move up and move down buttons, click **Merge PDF** and download.
- If a page ended up in the wrong place, fix it with [Organize PDF pages](tool:organize-pdf).
- Form fields and bookmarks don't carry over to the merged file; fill in and flatten first if needed.
- If it's heavy, use [Compress PDF](tool:compress-pdf) at the end.
`;

export default body;
