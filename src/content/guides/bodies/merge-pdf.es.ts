const body = `
Unir varios PDF en uno solo sirve para mandar un trámite completo en un único adjunto, juntar las facturas del mes o armar una carpeta de documentos en el orden en que alguien debe leerla. Con [Unir PDF](tool:merge-pdf) se hace en el navegador, sin subir los archivos a ningún servidor. Lo que más conviene cuidar es el orden: esta guía explica cómo dejarlo bien antes de unir, qué hacer con PDF protegidos, con fotos o con escaneos, y qué cosas cambian en el archivo final.

## Antes de empezar: ordena lo que vas a unir

El PDF final tiene las páginas en el mismo orden que la lista de archivos, y cada archivo aporta todas sus páginas, de la primera a la última. Por eso conviene pensar el orden antes de unir y no después:

- **Un archivo por documento**: si ya tienes cada pieza en su propio PDF (la solicitud, el comprobante, el contrato), la lista de archivos es tu índice. Ponles nombres que se entiendan.
- **Páginas sueltas de más**: si un PDF tiene páginas que no quieres, quítalas antes con [Eliminar páginas de PDF](tool:delete-pdf-pages). Si necesitas solo un tramo, sácalo con [Dividir PDF](tool:split-pdf).
- **Fotos o capturas**: pásalas primero a PDF con [Imágenes a PDF](tool:images-to-pdf). Si son fotos de hojas hechas con el celular, [Escanear documento](tool:scan-document) las endereza y deja el papel blanco; el resultado es un PDF más para la lista.
- **PDF con contraseña de apertura**: Unir PDF no los lee. Quítale la contraseña primero con [Quitar contraseña de PDF](tool:unlock-pdf) (necesitas conocerla).

## Cómo unir PDF paso a paso

1. Abre [Unir PDF](tool:merge-pdf) y arrastra los archivos, o pulsa para elegirlos. Puedes seleccionar varios a la vez.
2. Revisa la lista. Si un archivo no es un PDF, aparece marcado con **Solo PDF** y no se incluye. Para sacar uno de la lista, usa el botón de quitar junto a su nombre.
3. Ordena la lista con los botones de subir y bajar de cada archivo (también funcionan con el teclado). El de arriba será el principio del PDF final.
4. Con al menos dos archivos, pulsa **Unir PDF**. La barra de progreso avanza archivo por archivo.
5. Cuando aparezca **Tu archivo está listo**, descarga el resultado con **Descargar**. Se llama \`fileflect-merged.pdf\`.
6. Si quieres unir otros archivos, pulsa **Empezar de nuevo**.

![La lista de tres archivos PDF con los botones para subir y bajar cada uno](shot:unir-pdf-lista "Cada archivo tiene sus botones para subir y bajar; el orden de la lista es el orden del PDF final.")

## Cuando una sola página está fuera de lugar

A veces el orden por archivos no alcanza: por ejemplo, una página del contrato debe ir entre dos del anexo. En ese caso, une primero (aunque una página quede mal ubicada) y abre el resultado en [Ordenar páginas de PDF](tool:organize-pdf):

1. Elige el PDF unido. La herramienta genera una miniatura por página.
2. Arrastra las miniaturas a su nuevo lugar, o usa los botones de mover antes y después de cada una.
3. Si una página quedó de costado, usa el botón de girar; si sobra, el de eliminar. **Restaurar todas** devuelve el documento al orden original.
4. Pulsa **Guardar PDF** y descarga el nuevo archivo.

## Qué conserva y qué no conserva el PDF unido

Las páginas se copian tal cual, sin volver a comprimirlas: el texto sigue siendo seleccionable, los enlaces a sitios web se mantienen y las imágenes conservan su resolución. Aun así, hay tres cosas que conviene saber:

- **Los formularios dejan de ser editables.** Comprobamos que al unir un PDF con campos de formulario, el archivo final no los conserva como campos rellenables. Si necesitas unir un formulario ya completo, rellénalo antes con [Rellenar formulario PDF](tool:fill-pdf-form) y elige la opción de aplanarlo: así los valores quedan escritos en la página y se ven igual en el PDF unido. Cuando el formulario se va a seguir editando, déjalo fuera de la unión.
- **Los marcadores o índice del PDF original no se trasladan.** Cada página llega al archivo final, pero el índice lateral de los documentos largos no.
- **El resultado no tiene contraseña.** Si el documento unido debe estar protegido, agrégale la contraseña al final con [Proteger PDF](tool:protect-pdf).

Cada página conserva su propio tamaño: si unes un documento A4 con otro en tamaño Carta, el PDF final mezcla páginas de los dos tamaños. No se ajustan ni se recortan.

## Si el PDF final pesa demasiado

La unión no comprime nada, así que el tamaño del resultado es, más o menos, la suma de los tamaños de los archivos. Si tienes que mandarlo por correo o subirlo a un portal con límite de peso, pásalo por [Comprimir PDF](tool:compress-pdf). La guía [Cómo reducir el peso de un PDF](guide:reduce-pdf-size) explica qué nivel elegir y cuándo la compresión no logra mucho (por ejemplo, con PDF que ya son livianos).

Un consejo práctico: si vas a comprimir, hazlo después de unir y no antes; así comprimes una sola vez y comparas el peso del archivo que realmente vas a enviar.

## Si algo sale mal

- **Dice que el archivo tiene contraseña**: es un PDF con contraseña de apertura. Quítala con [Quitar contraseña de PDF](tool:unlock-pdf) y vuelve a agregarlo. Para eso necesitas conocer la contraseña: no se puede abrir un PDF protegido de otra persona sin ella.
- **Un archivo aparece como «Solo PDF»**: no es un PDF, o su contenido no lo es aunque la extensión diga \`.pdf\`. Si es una imagen, conviértela con [Imágenes a PDF](tool:images-to-pdf); si es un documento de Word, con [Word a PDF](conv:docx-pdf) (esa conversión se hace en nuestro servidor, a diferencia de la unión).
- **El botón no se activa**: hacen falta al menos dos archivos válidos en la lista.
- **El PDF final no abre o le faltan páginas**: puede deberse a un archivo de origen dañado. Prueba a unir de a dos para encontrar cuál es y, si hace falta, vuelve a exportarlo desde el programa original.

## Resumen

- Piensa el orden antes de unir: el PDF final sigue la lista de archivos, de arriba hacia abajo.
- Prepara cada pieza: quita páginas que sobran, convierte fotos con [Imágenes a PDF](tool:images-to-pdf) o [Escanear documento](tool:scan-document), y quita las contraseñas de apertura.
- En [Unir PDF](tool:merge-pdf), ordena con los botones de subir y bajar, pulsa **Unir PDF** y descarga.
- Si una página quedó mal ubicada, arréglala con [Ordenar páginas de PDF](tool:organize-pdf).
- Los campos de formulario y los marcadores no pasan al archivo unido; rellena y aplana antes si hace falta.
- Si pesa mucho, usa [Comprimir PDF](tool:compress-pdf) al final.
`;

export default body;
