# Projektdokumentation - BestellApp

## Ziel des Projekts

Die BestellApp ist ein Lieferdienst-Projekt nach dem Vorbild von Lieferando. Die Oberfläche orientiert sich am BurgerHouse-Wireframe aus Figma. Das Projekt wurde mit HTML, CSS und Vanilla JavaScript umgesetzt.

## Ordnerstruktur

```text
BestellApp/
├── index.html
├── style.css
├── script.js
├── README.md
├── CHECKLISTE.md
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── img/
│       └── Bilder der Gerichte und des Restaurants
└── docs/
    ├── PROJEKT-DOKUMENTATION.md
    └── BILDER.md
```

## HTML - `index.html`

Die HTML-Datei enthält die feste Grundstruktur der Seite:

- Header mit Logo und optischen Navigationssymbolen
- großes Restaurantbild
- Restaurantinformationen
- Navigation für die Kategorien
- Bereiche für die dynamisch erzeugte Speisekarte
- Desktop- und Mobile-Warenkorb
- Bestellbestätigung
- Footer

Die einzelnen Gerichte stehen nicht fest im HTML. Sie werden in `script.js` aus dem Array `meals` erzeugt.

## CSS - `style.css`

Das CSS kümmert sich um Farben, Abstände, Größen und die responsive Darstellung.

Wichtige Maße aus der Vorlage:

- Header und Footer nutzen die volle Fensterbreite.
- Der Hauptinhalt ist auf 1440 px begrenzt und zentriert.
- Der Desktop-Warenkorb ist 390 px breit und bleibt beim Scrollen sichtbar.
- Unterhalb von 950 px wird der Desktop-Warenkorb ausgeblendet.
- Bis 320 px bleibt die Seite ohne geplanten horizontalen Scrollbalken bedienbar.

Die Farben sind am orangefarbenen BurgerHouse-Design ausgerichtet und als CSS-Variablen im `:root` definiert.

## JavaScript - `script.js`

### Daten

`meals` enthält alle Gerichte mit ID, Kategorie, Name, Beschreibung, Preis und Bildpfad. `categories` enthält die drei Bereiche Burger, Pizza und Salat.

### Dynamisches Rendern

`renderMenu()` erzeugt die Kategorien und Gerichte. Dafür werden kleine Template-Funktionen verwendet, damit HTML und Logik getrennt und verständlich bleiben.

### Warenkorb

Der Warenkorb wird im Objekt `cart` gespeichert. Die ID eines Gerichts ist der Schlüssel und die gewählte Anzahl der Wert.

Folgende Aktionen sind möglich:

- Gericht hinzufügen
- Anzahl erhöhen
- Anzahl verringern
- Gericht löschen
- Zwischensumme berechnen
- Lieferkosten hinzufügen
- Bestellung abschließen

Nach einer Bestellung wird der Warenkorb geleert. Die Bestätigung wird ohne `alert()` angezeigt und verschwindet nach einigen Sekunden automatisch.

### Responsive Warenkorbansicht

Auf kleineren Bildschirmen öffnet sich der Warenkorb als HTML-Dialog. Darin stehen dieselben Funktionen wie im Desktop-Warenkorb zur Verfügung.

## Git-Dokumentation

Im Projekt ist bereits ein lokales Git-Repository mit nachvollziehbaren Commits enthalten. Für GitHub muss nur noch ein leeres Repository erstellt und als `origin` verbunden werden.

```bash
git remote add origin DEINE-GITHUB-URL
git push -u origin main
```

## Eigene Erweiterungen

- Kategorien-Navigation mit Sprunglinks
- Bilder für jedes Gericht
- mobile Gesamtsumme im Warenkorb-Button
- automatisch ausblendbare Bestellbestätigung
- optimierte lokale WebP-Bilder
