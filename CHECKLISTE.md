# Erfüllte Projekt-Checkliste

## Git

- Lokales Git-Repository mit mehreren verständlichen Commits vorbereitet
- `.gitignore` vorhanden
- README mit Start- und GitHub-Anleitung vorhanden

## Design und Aufbau

- Figma-Wireframe als Grundlage verwendet
- Header, Hero-Bild, überlappendes Restaurantlogo und Footer umgesetzt
- Restaurantname, Bewertung, Beschreibung und Lieferinformationen vorhanden
- Desktop-Inhalt auf maximal 1440 px begrenzt

## Gerichte und Warenkorb

- 12 Gerichte aus einem JavaScript-Array dynamisch gerendert
- 3 Kategorien mit je 4 Gerichten und Bild-Trennung
- Kategorien-Slider mit Sprunglinks umgesetzt
- Hinzufügen, Erhöhen, Verringern und Löschen möglich
- Zwischensumme, Lieferkosten und Gesamtsumme werden berechnet
- Warenkorbinhalt ist bei vielen Gerichten scrollbar
- Desktop-Warenkorb ist sticky
- Bestellung leert den Warenkorb und zeigt eine schließbare Bestätigung ohne `alert()`

## Code

- Aussagekräftige Variablen- und Funktionsnamen in camelCase
- HTML-Templates in eigene Funktionen ausgelagert
- Funktionen bleiben kurz und übersichtlich
- HTML, CSS und JavaScript getrennt

## Responsive

- Responsive Layout bis 320 px ohne geplanten horizontalen Scrollbalken
- Desktop-Warenkorb wird mobil ausgeblendet
- Mobiler Warenkorb wird über einen festen Button als Dialog geöffnet
- Mengensteuerung, Löschen und Bestellen funktionieren auch im Dialog

## Sonstiges

- Lokale Bilder ohne temporäre externe Links
- Favicon vorhanden
- Hauptdatei heißt `index.html`
