const body = `
Fusionner plusieurs PDF en un seul permet d’envoyer un dossier complet en une seule pièce jointe, de réunir les factures du mois ou de composer un dossier de documents dans l’ordre où quelqu’un doit les lire. Avec [Fusionner des PDF](tool:merge-pdf), cela se fait dans votre navigateur, sans envoyer les fichiers à un serveur. Le plus important est l’ordre : ce guide explique comment le préparer avant de fusionner, que faire des PDF protégés, des photos et des scans, et ce qui change dans le fichier final.

## Avant de commencer : mettez de l’ordre

Le PDF final reprend les pages dans l’ordre de la liste de fichiers, et chaque fichier apporte toutes ses pages, de la première à la dernière. Mieux vaut donc réfléchir à l’ordre avant de fusionner, pas après :

- **Un fichier par document** : si chaque pièce a déjà son propre PDF (la demande, le justificatif, le contrat), la liste des fichiers est votre sommaire. Donnez-leur des noms parlants.
- **Pages en trop** : si un PDF contient des pages dont vous ne voulez pas, retirez-les d’abord avec [Supprimer des pages d’un PDF](tool:delete-pdf-pages). Si vous n’avez besoin que d’un passage, extrayez-le avec [Diviser un PDF](tool:split-pdf).
- **Photos ou captures d’écran** : transformez-les d’abord en PDF avec [Images en PDF](tool:images-to-pdf). Pour des photos de feuilles prises au téléphone, [Scanner un document](tool:scan-document) les redresse et rend le papier blanc ; le résultat est un PDF de plus pour la liste.
- **PDF avec mot de passe d’ouverture** : Fusionner des PDF ne peut pas les lire. Retirez d’abord le mot de passe avec [Retirer le mot de passe d’un PDF](tool:unlock-pdf) (vous devez le connaître).

## Comment fusionner des PDF pas à pas

1. Ouvrez [Fusionner des PDF](tool:merge-pdf) et glissez les fichiers, ou cliquez pour les choisir. Vous pouvez en sélectionner plusieurs à la fois.
2. Vérifiez la liste. Un fichier qui n’est pas un PDF est signalé par **PDF uniquement** et n’est pas inclus. Pour en retirer un de la liste, utilisez le bouton de suppression à côté de son nom.
3. Ordonnez la liste avec les boutons pour monter et descendre chaque fichier (ils fonctionnent aussi au clavier). Celui du haut sera le début du PDF final.
4. Avec au moins deux fichiers, cliquez sur **Fusionner**. La barre de progression avance fichier par fichier.
5. Quand **Votre fichier est prêt** apparaît, téléchargez le résultat avec **Télécharger**. Il s’appelle \`fileflect-merged.pdf\`.
6. Pour fusionner d’autres fichiers, cliquez sur **Recommencer**.

![La liste de trois fichiers PDF avec les boutons pour monter et descendre chacun](shot:unir-pdf-lista "Chaque fichier a ses boutons pour monter et descendre ; l’ordre de la liste est l’ordre du PDF final.")

## Quand une seule page n’est pas à sa place

Parfois l’ordre par fichiers ne suffit pas : par exemple, une page du contrat doit se trouver entre deux pages de l’annexe. Dans ce cas, fusionnez d’abord (même si une page est mal placée) et ouvrez le résultat dans [Organiser les pages d’un PDF](tool:organize-pdf) :

1. Choisissez le PDF fusionné. L’outil génère une miniature par page.
2. Faites glisser les miniatures vers leur nouvelle place, ou utilisez les boutons pour déplacer chaque page avant ou après.
3. Si une page est couchée, utilisez le bouton de rotation ; si elle est en trop, celui de suppression. **Tout restaurer** rétablit l’ordre d’origine.
4. Cliquez sur **Enregistrer le PDF** et téléchargez le nouveau fichier.

## Ce que le PDF fusionné conserve et ce qu’il ne conserve pas

Les pages sont copiées telles quelles, sans recompression : le texte reste sélectionnable, les liens vers des sites web sont conservés et les images gardent leur résolution. Trois points sont tout de même à connaître :

- **Les formulaires ne sont plus modifiables.** Nous avons vérifié qu’en fusionnant un PDF contenant des champs de formulaire, le fichier final ne les conserve pas comme champs à remplir. Si vous devez fusionner un formulaire déjà rempli, remplissez-le d’abord avec [Remplir un formulaire PDF](tool:fill-pdf-form) et choisissez l’option pour l’aplatir : les valeurs sont alors inscrites sur la page et s’affichent de la même façon dans le PDF fusionné. Si le formulaire doit encore être modifié, laissez-le en dehors de la fusion.
- **Les signets ou le sommaire du PDF d’origine ne sont pas repris.** Chaque page arrive dans le fichier final, mais pas l’index latéral des longs documents.
- **Le résultat n’a pas de mot de passe.** Si le document fusionné doit être protégé, ajoutez le mot de passe à la fin avec [Protéger un PDF par mot de passe](tool:protect-pdf).

Chaque page garde sa propre taille : si vous fusionnez un document A4 avec un autre au format Lettre, le PDF final mélange les deux formats. Rien n’est redimensionné ni rogné.

## Si le PDF final est trop lourd

La fusion ne compresse rien : le poids du résultat est donc à peu près la somme de celui des fichiers. Si vous devez l’envoyer par e-mail ou le déposer sur un portail limité en taille, passez-le par [Compresser un PDF](tool:compress-pdf). Le guide [Comment réduire le poids d’un PDF](guide:reduce-pdf-size) explique quel niveau choisir et quand la compression n’apporte pas grand-chose (par exemple pour des PDF déjà légers).

Un conseil pratique : si vous comptez compresser, faites-le après la fusion et non avant ; vous compressez ainsi une seule fois et vous comparez le poids du fichier que vous enverrez réellement.

## En cas de problème

- **Il indique que le fichier a un mot de passe** : c’est un PDF avec mot de passe d’ouverture. Retirez-le avec [Retirer le mot de passe d’un PDF](tool:unlock-pdf) et ajoutez de nouveau le fichier. Il faut connaître le mot de passe : on ne peut pas ouvrir le PDF protégé de quelqu’un d’autre sans lui.
- **Un fichier apparaît comme « PDF uniquement »** : ce n’est pas un PDF, ou son contenu n’en est pas un même si l’extension indique \`.pdf\`. Si c’est une image, convertissez-la avec [Images en PDF](tool:images-to-pdf) ; si c’est un document Word, avec [Word en PDF](conv:docx-pdf) (cette conversion se fait sur notre serveur, contrairement à la fusion).
- **Le bouton ne s’active pas** : il faut au moins deux fichiers valides dans la liste.
- **Le PDF final ne s’ouvre pas ou il manque des pages** : un fichier source endommagé peut en être la cause. Essayez de fusionner deux par deux pour trouver lequel, et au besoin exportez-le de nouveau depuis le logiciel d’origine.

## Résumé

- Réfléchissez à l’ordre avant de fusionner : le PDF final suit la liste des fichiers, de haut en bas.
- Préparez chaque pièce : retirez les pages en trop, convertissez les photos avec [Images en PDF](tool:images-to-pdf) ou [Scanner un document](tool:scan-document), et retirez les mots de passe d’ouverture.
- Dans [Fusionner des PDF](tool:merge-pdf), ordonnez avec les boutons pour monter et descendre, cliquez sur **Fusionner** et téléchargez.
- Si une page est mal placée, corrigez-la avec [Organiser les pages d’un PDF](tool:organize-pdf).
- Les champs de formulaire et les signets ne passent pas dans le fichier fusionné ; remplissez et aplatissez avant si nécessaire.
- S’il est lourd, utilisez [Compresser un PDF](tool:compress-pdf) à la fin.
`;

export default body;
