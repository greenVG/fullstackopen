 ```mermaid
 sequenceDiagram
    %% Diagramma di sequenza: L'utente crea una nuova nota

    participant browser
    participant server

    %% L'utente scrive la nota
    Note right of browser: User types a note into the text field

    %% L'utente preme il pulsante "Salva"
    Note right of browser: User clicks the "Save" button

    %% Il browser invia i dati al server tramite POST
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    %% I dati della nota vengono inviati come form data
    Note right of browser: The browser sends the note content as form data
    %% Il server risponde con un redirect per ricaricare la pagina
    server-->>browser: HTTP redirect (302) to /exampleapp/notes
    deactivate server

    %% Il browser ricarica la pagina: nuova richiesta GET
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    %% Il browser richiede i file di stile (CSS)
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    %% Il browser richiede il file JavaScript
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    %% Lo script JS richiede l'elenco aggiornato delle note
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    %% Il server restituisce le note (inclusa quella nuova)
    server-->>browser: Updated list of notes (including the new one)
    deactivate server

    %% Il browser mostra l'elenco aggiornato all'utente
    Note right of browser: The browser renders the updated list of notes
 ```
