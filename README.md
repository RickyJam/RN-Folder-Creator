## *RN Folder Creator*

L'obbiettivo di questa semplice estensione è quello di automatizzare la creazione dei componenti RN, della folder e dei test annessi.

La struttura che l'estensione produrrà è:
```
- dir
  - __tests__
    - componente.test.js
  - componente.js
```

In aggiunta, i due file .js creati conterranno al loro interno già una piccola porzione di codice; nel caso del file _componente.js_, al suo interno ci saranno i proptypes, gli import basici ed un componente base vuoto. Invece, il file di test _componente.test.js_ contiene la suo interno gli import essenziali e l'import del componente sotto test, oltre ad un test snapshot già scritto.
