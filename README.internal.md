## packaging
* Per generare il file ```vsix``` è necessario effettuare il packaging
  * Prerequisiti:
    * assicurarsi di aver installato il ```vsce```, altrimenti eseguire il comando ```npm install -g vsce```
    * aver fatto il clone del progetto ```folder-creator``` da qualche parte
  * Steps:
    * posizionarsi nella directory del progetto
    * eseguire il comando ```vsce package```
    * ciò genera/sovrascrive il file ```folder-creator-x.y.z.vsix``` nella directory del progetto
  * il file vsix è l'estensione effettiva. Questo file va condiviso con i colleghi o girandoglielo direttamente, oppure condividendolo sullo store.