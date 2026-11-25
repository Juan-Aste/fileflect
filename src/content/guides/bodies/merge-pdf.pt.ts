const body = `
Juntar vários PDFs em um só serve para mandar um processo completo em um único anexo, reunir as notas fiscais do mês ou montar uma pasta de documentos na ordem em que alguém deve lê-la. Com o [Juntar PDF](tool:merge-pdf) isso é feito no navegador, sem enviar os arquivos para nenhum servidor. O que mais vale a pena cuidar é a ordem: este guia explica como deixá-la certa antes de juntar, o que fazer com PDFs protegidos, fotos e digitalizações, e o que muda no arquivo final.

## Antes de começar: organize o que vai juntar

O PDF final tem as páginas na mesma ordem da lista de arquivos, e cada arquivo entra com todas as suas páginas, da primeira à última. Por isso convém pensar na ordem antes de juntar, e não depois:

- **Um arquivo por documento**: se cada parte já tem o seu PDF (o requerimento, o comprovante, o contrato), a lista de arquivos é o seu índice. Dê nomes que façam sentido.
- **Páginas sobrando**: se um PDF tem páginas que você não quer, tire-as antes com [Excluir páginas de um PDF](tool:delete-pdf-pages). Se só precisa de um trecho, extraia-o com [Dividir PDF](tool:split-pdf).
- **Fotos ou capturas de tela**: transforme-as antes em PDF com [Imagens para PDF](tool:images-to-pdf). Se forem fotos de folhas tiradas com o celular, o [Escanear documento](tool:scan-document) as endireita e deixa o papel branco; o resultado é mais um PDF para a lista.
- **PDFs com senha de abertura**: o Juntar PDF não consegue lê-los. Tire a senha antes com [Remover senha de PDF](tool:unlock-pdf) (você precisa conhecê-la).

## Como juntar PDFs passo a passo

1. Abra o [Juntar PDF](tool:merge-pdf) e arraste os arquivos, ou clique para escolhê-los. Dá para selecionar vários de uma vez.
2. Confira a lista. Um arquivo que não é PDF aparece marcado com **Só PDF** e fica de fora. Para tirar um da lista, use o botão de remover ao lado do nome.
3. Ordene a lista com os botões de subir e descer de cada arquivo (também funcionam pelo teclado). O de cima será o começo do PDF final.
4. Com pelo menos dois arquivos, clique em **Juntar PDF**. A barra de progresso avança arquivo por arquivo.
5. Quando aparecer **Seu arquivo está pronto**, baixe o resultado com **Baixar**. Ele se chama \`fileflect-merged.pdf\`.
6. Para juntar outros arquivos, clique em **Começar de novo**.

![A lista de três arquivos PDF com os botões para subir e descer cada um](shot:unir-pdf-lista "Cada arquivo tem seus botões de subir e descer; a ordem da lista é a ordem do PDF final.")

## Quando uma única página está fora do lugar

Às vezes a ordem por arquivos não basta: por exemplo, uma página do contrato precisa ficar entre duas do anexo. Nesse caso, junte primeiro (mesmo que uma página fique mal posicionada) e abra o resultado em [Organizar páginas de PDF](tool:organize-pdf):

1. Escolha o PDF unido. A ferramenta gera uma miniatura por página.
2. Arraste as miniaturas para o novo lugar, ou use os botões de mover para antes e para depois de cada uma.
3. Se uma página ficou de lado, use o botão de girar; se sobra, o de excluir. **Restaurar todas** devolve o documento à ordem original.
4. Clique em **Salvar PDF** e baixe o novo arquivo.

## O que o PDF unido mantém e o que não mantém

As páginas são copiadas como estão, sem recomprimir: o texto continua selecionável, os links para sites são mantidos e as imagens conservam a resolução. Mesmo assim, há três coisas que convém saber:

- **Os formulários deixam de ser editáveis.** Verificamos que, ao juntar um PDF com campos de formulário, o arquivo final não os mantém como campos preenchíveis. Se precisa juntar um formulário já preenchido, preencha-o antes com [Preencher formulário PDF](tool:fill-pdf-form) e escolha a opção de achatá-lo: assim os valores ficam escritos na página e aparecem igual no PDF unido. Se o formulário ainda vai ser editado, deixe-o fora da união.
- **Os marcadores ou o índice do PDF original não são levados.** Todas as páginas chegam ao arquivo final, mas o índice lateral dos documentos longos não.
- **O resultado não tem senha.** Se o documento unido precisa ficar protegido, coloque a senha no fim com [Proteger PDF com senha](tool:protect-pdf).

Cada página mantém o seu próprio tamanho: se você juntar um documento A4 com outro em tamanho Carta, o PDF final mistura páginas dos dois tamanhos. Nada é redimensionado nem cortado.

## Se o PDF final ficar pesado demais

A união não comprime nada, então o tamanho do resultado é, mais ou menos, a soma dos tamanhos dos arquivos. Se precisa enviá-lo por e-mail ou subi-lo em um portal com limite de tamanho, passe-o pelo [Comprimir PDF](tool:compress-pdf). O guia [Como diminuir o tamanho de um PDF](guide:reduce-pdf-size) explica qual nível escolher e quando a compressão não rende muito (por exemplo, com PDFs que já são leves).

Uma dica prática: se for comprimir, faça isso depois de juntar e não antes; assim você comprime uma só vez e compara o tamanho do arquivo que realmente vai enviar.

## Se algo der errado

- **Diz que o arquivo tem senha**: é um PDF com senha de abertura. Tire-a com [Remover senha de PDF](tool:unlock-pdf) e adicione o arquivo de novo. Para isso você precisa conhecer a senha: não dá para abrir o PDF protegido de outra pessoa sem ela.
- **Um arquivo aparece como “Só PDF”**: não é um PDF, ou o conteúdo não é, mesmo que a extensão diga \`.pdf\`. Se for uma imagem, converta com [Imagens para PDF](tool:images-to-pdf); se for um documento do Word, com [Word para PDF](conv:docx-pdf) (essa conversão é feita no nosso servidor, diferente da união).
- **O botão não ativa**: são necessários pelo menos dois arquivos válidos na lista.
- **O PDF final não abre ou faltam páginas**: pode ser um arquivo de origem danificado. Tente juntar de dois em dois para descobrir qual é e, se for preciso, exporte-o de novo pelo programa original.

## Resumo

- Pense na ordem antes de juntar: o PDF final segue a lista de arquivos, de cima para baixo.
- Prepare cada parte: tire páginas que sobram, converta fotos com [Imagens para PDF](tool:images-to-pdf) ou [Escanear documento](tool:scan-document) e remova as senhas de abertura.
- No [Juntar PDF](tool:merge-pdf), ordene com os botões de subir e descer, clique em **Juntar PDF** e baixe.
- Se uma página ficou mal posicionada, corrija com [Organizar páginas de PDF](tool:organize-pdf).
- Os campos de formulário e os marcadores não passam para o arquivo unido; preencha e achate antes, se precisar.
- Se ficar pesado, use o [Comprimir PDF](tool:compress-pdf) no fim.
`;

export default body;
