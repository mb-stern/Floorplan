# 🏠 Floorplan für IP-Symcon

Mit Floorplan zeichnest du deinen Grundriss direkt in IP-Symcon und bedienst deine Geräte an ihrer Position im Raum. Du kannst mehrere Etagen anlegen, Türen und Fenster darstellen sowie Möbel, Formen, Texte und Kameras ergänzen. Floorplan benötigt keine externe Cloud.

## 📦 Installation und erster Start

**Voraussetzung:** IP-Symcon ab Version 8.2.

1. **Floorplan** über den IP-Symcon Module Store installieren.
2. Eine **Floorplan-Instanz** anlegen und deren Kachel in der Symcon-Visualisierung öffnen.
3. Falls bereits die Live-Ansicht angezeigt wird, über das **Stiftsymbol** zum Editor wechseln.

Zum Zeichnen und Einrichten empfiehlt sich ein Browser mit ausreichend Platz für den Grundriss und die Eigenschaftenleiste.

## ✏️ Deinen ersten Grundriss erstellen

1. **Wand** wählen und im Zeichenbereich den Anfangs- und Endpunkt anklicken. Weitere Wände auf dieselbe Weise zeichnen.
2. **Tür** oder **Fenster** wählen und auf die gewünschte Wand klicken. Danach kannst du Position, Breite und weitere Eigenschaften anpassen.
3. Über **Objekte**, **Formen** und **Text** Möbel, Flächen und Beschriftungen ergänzen.
4. **Gerät** wählen, im Grundriss platzieren und in den Eigenschaften die passende **IP-Symcon Variable** zuordnen.
5. Mit **Einpassen** den ganzen Grundriss anzeigen und über **Live-Ansicht** zur Bedienung wechseln.

Änderungen werden nach einer kurzen Pause automatisch gespeichert. Beim Wechsel zwischen Editor und Live-Ansicht wird ebenfalls gespeichert. Warte nach der letzten Änderung kurz, bevor du die Ansicht schließt.

## 🖱️ Im Editor arbeiten

Klicke ein Element an, um seine Eigenschaften zu öffnen. Du kannst es mit der Maus verschieben und je nach Element über die sichtbaren Griffpunkte vergrößern, verkleinern oder drehen. Genaue Werte lassen sich in den Eigenschaften eingeben. Unterhalb der Eigenschaften findest du die passende Bedienhilfe zur Auswahl.

| Bedienung | Wirkung |
| --- | --- |
| **Verschieben** und auf einer freien Fläche ziehen | Grundriss verschieben |
| Mittlere Maustaste gedrückt halten und ziehen | Grundriss verschieben |
| **− / +** | Heraus- oder hineinzoomen |
| **Einpassen** | Aktuelle Etage vollständig anzeigen |
| **Raster** und die Zahl daneben | Raster einblenden und dessen Abstand einstellen |
| **↶ / ↷** | Änderungen rückgängig machen oder wiederholen |
| **Löschen** | Ausgewähltes Element entfernen |
| **Esc** | Aktives Werkzeug und Auswahl aufheben |

Das Raster hilft beim Ausrichten der Elemente. Eine Wand kannst du auch über ihre Endpunkte oder die Eingabe **Länge** verändern. Beim Löschen einer Wand werden ihre Türen und Fenster ebenfalls entfernt.

### Etagen verwalten

Mit **+ Etage** legst du ein weiteres Stockwerk an. Über die Etagenauswahl wechselst du zwischen den Grundrissen. Wenn kein Element ausgewählt ist, kannst du in den **Projekteigenschaften** den Etagennamen, die Reihenfolge und die Mauerwerkdicke ändern.

**Etage kopieren** übernimmt den vollständigen Grundriss einschließlich der Gerätezuordnungen. Prüfe danach die zugeordneten Variablen, damit die kopierten Geräte das richtige Stockwerk bedienen. **Etage löschen** entfernt das gesamte ausgewählte Stockwerk nach einer Bestätigung.

### Objekte, Formen und Maße

Über **Objekte** kannst du beispielsweise Möbel, Sanitärobjekte oder Fahrzeuge platzieren und anschließend den gewünschten Typ auswählen. Größe, Drehung und Beschriftung lassen sich anpassen.

Bei **Formen** stehen Rechteck, Kreis/Ellipse, Dreieck, Linie und Pfeil zur Verfügung. Geschlossene Formen können gefüllt oder mit einem Muster versehen werden. Sie eignen sich beispielsweise zum Kennzeichnen von Räumen und Bereichen.

In den Projekteigenschaften lassen sich **Innenmaße anzeigen**, **Außenmaße anzeigen** und **Wandmaße bei Mausover** aktivieren. Die Maße werden in Zentimetern angegeben; die Schriftgröße der Vermassung ist einstellbar. In der Live-Ansicht sind diese Maße ausgeblendet.

## 🎛️ Geräte zuordnen und bedienen

Platziere ein **Gerät** und klicke in seinen Eigenschaften auf **IP-Symcon Variable**. Öffne die passenden Zweige des Objektbaums oder suche nach Name, Objekt-ID oder Profil. Klicke anschließend auf die gewünschte Variable. Über **Zuordnung entfernen** kannst du eine bestehende Verbindung wieder lösen.

In der **Live-Ansicht** hängt die Bedienung von der zugeordneten Variable ab:

| Variable | Bedienung und Anzeige |
| --- | --- |
| Ein/Aus (Boolean) | Icon anklicken, um umzuschalten. Bei eingerichteter Farb- oder Helligkeitsbedienung öffnet sich stattdessen das Bedienfenster. |
| Zahlenwert (Integer/Float) | Icon anklicken und im Bedienfenster einen angebotenen Wert wählen oder den Slider verwenden. Die verfügbaren Werte richten sich nach den Einstellungen in Symcon. |
| Text (String) | Text anzeigen. Hinterlegte Bezeichnungen werden berücksichtigt, etwa „Laden“ statt „CHARGING“. |
| Variable ohne Aktion | Aktuellen Zustand anzeigen; eine Bedienung ist nicht möglich. |

Für geeignete Zahlenbereiche kannst du in den Geräteeigenschaften **Slider anzeigen** aktivieren. Damit lässt sich der Wert direkt unter dem Icon verstellen. Diese Option wird für Zahlenbereiche ohne feste Auswahleinträge angeboten.

Bedienfenster bleiben geöffnet, bis du daneben klickst. Über das **Stiftsymbol** kehrst du zum Editor zurück. Bei mehreren Etagen steht in der Live-Ansicht eine Etagenauswahl zur Verfügung.

### Icons und Darstellung

Icons, Wertformatierung und Statusfarben werden soweit möglich aus Symcon übernommen. In den Geräteeigenschaften kannst du unter anderem:

- das Icon ändern und bei Ein/Aus-Geräten getrennte Symbole für **AUS** und **EIN** wählen,
- **Name anzeigen**, **Wert anzeigen** und **Symbol anzeigen** einzeln einstellen,
- Position und Schriftgröße von Name und Wert anpassen,
- über **Rahmen um Istwert** die Lesbarkeit des Wertes verbessern.

Wenn du das Profil oder die Darstellung in Symcon geändert hast, wähle am Gerät **Variableneinstellungen aktualisieren**, um die aktuellen Einstellungen erneut zu übernehmen. Klassische Variablenprofile und die neueren Symcon-Variablendarstellungen werden unterstützt.

### 💡 Lampen mit Farbe und Helligkeit

Ordne zunächst die Ein/Aus-Variable der Lampe als Hauptvariable zu. Danach kannst du in **Helligkeit (optional)** und **Farbe (optional)** die zugehörigen Variablen auswählen.

Mit **Farbe/Helligkeit im Bedienfenster anzeigen** öffnet ein Klick auf die Lampe ein gemeinsames Bedienfenster für Ein/Aus, Helligkeit und Farbe. Dort lässt sich die Farbe über einen Farbkreis wählen. Schaltest du diese Option aus, schaltet das Icon wieder direkt Ein/Aus.

## 🚪 Türen, Fenster und Rollläden

Türen und Fenster gehören zu einer Wand und bewegen sich mit ihr. Wähle das Element im Editor aus, um seine Größe, Position und bei Türen die Öffnungsseite anzupassen.

Über **Türkontakt / Türposition** beziehungsweise **Fensterkontakt / Fensterposition** kannst du den Zustand mit einer Symcon-Variable verknüpfen. Geöffnete Elemente werden entsprechend dargestellt. Falls die Anzeige umgekehrt ist, aktiviere **Türzustand invertieren** beziehungsweise **Fensterzustand invertieren**. Die Farbe für den geöffneten Zustand lässt sich ebenfalls anpassen.

Am Fenster kannst du zusätzlich unter **Rollo / Rollladen (optional)** die passende Variable zuordnen. In der Live-Ansicht öffnet das Rollo-Bediensymbol die verfügbaren Werte oder den Slider. Zeigt der Grundriss die Stellung verkehrt an, nutze **Rollo-Status invertieren**. Bei festen Profilwerten kannst du über **Rollo-Werte zuordnen** festlegen, welche grafische Stellung zu welchem Wert gehört.

## 🎥 Kameras

Platziere ein Gerät und wähle im Objektbaum das passende **Stream-Medienobjekt** aus. In der Live-Ansicht öffnet ein Klick auf das Kamerasymbol das Videofenster innerhalb des Floorplans. Voraussetzung ist ein bereits in Symcon eingerichteter Kamerastream.

## 💾 Grundriss sichern und wiederherstellen

Öffne das Konfigurationsformular der Floorplan-Instanz in der Symcon-Verwaltungskonsole:

- **Sichern** lädt den gespeicherten Grundriss als Sicherungsdatei herunter.
- **Wiederherstellen** öffnet die Dateiauswahl für eine vorhandene Sicherung. Nach dem Einspielen ersetzt sie den aktuell gespeicherten Grundriss.

Erstelle vor größeren Änderungen oder vor einer Wiederherstellung eine Sicherung.

## ❓ Wenn die Bedienung nicht klappt

**Ein Gerät zeigt seinen Wert, lässt sich aber nicht schalten:** Prüfe in Symcon, ob für die zugeordnete Variable eine Aktion eingerichtet ist und sie sich in der normalen Kachelvisualisierung bedienen lässt. Reine Statusvariablen werden im Floorplan ausschließlich angezeigt.

**Icons oder Werte passen nicht mehr:** Wähle am betroffenen Gerät **Variableneinstellungen aktualisieren**. Prüfe auch die zugeordnete Variable und ihre Darstellung in Symcon.

**IPSView-App:** In der getesteten Version 6.5.10 werden Geräteaktionen aus der Floorplan-Kachel nicht korrekt übertragen. Bedienfenster können sich öffnen, ohne dass Wertänderungen ausgeführt werden. Auch die Etagenauswahl kann eingeschränkt sein. Im IPSView-Webclient funktionierte die Bedienung. Das passt zu den [bekannten Problemen mit HTML-Tiles in IPSView](https://community.symcon.de/t/html-tile-probleme/143806). Nutze für die Bedienung bis zur Behebung die Symcon-Kachelvisualisierung oder den funktionierenden Webclient.

## Ursprung

Floorplan basiert ursprünglich auf **Easy Floorplan von Nicolas Sandller** und wurde für IP-Symcon weiterentwickelt. Die ursprüngliche MIT-Lizenz und die zugehörigen Copyright-Hinweise bleiben im Repository erhalten.

## 📝 Änderungen

### 1.24

- Die Variablenauswahl öffnet sich direkt am Standort der bereits zugeordneten Variable.
- Beim Darüberfahren mit der Maus wird der vollständige Variablenpfad angezeigt.
- Zahlenwerte und Einheiten werden korrekt dargestellt, auch beim Wert 0.
- Der störende Rahmen beim Anklicken der Etagenauswahl wurde entfernt.
- Wertanzeigen werden nach dem Speichern und Wiederherstellen zuverlässiger aktualisiert.
- Die README wurde als Anleitung für Einrichtung und Bedienung überarbeitet.

### 1.23

- Zur bool Variable kann nun zusätzlich eine Farb- und eine Helligkeitsvariable gewählt werden.
- Der Dialog beim Schalten von bool mit Helligkeit oder Farbe kann deaktiviert werden, so dass sich das Gerät wie eine normale bool verhält.
- Dialogfenster bleiben nun offen bis neben das Fenster geklickt wird.


### 1.22

- Kameraverbindung überarbeitet, um ein Standbild nach Verbindungsabbrüchen zu verhindern.

### 1.21

- Der Modulcode wurde überarbeitet und auf Store-Kompatibilität geprüft.

### 1.20

- Der Variablen-Picker wurde überarbeitet, so dass das Speicherlimit auch bei grossen Objektbäumen nicht mehr erreicht werden sollte.

### 1.19

- Überflüssige ResizeObserver entfernt, welche zum Einfrieren der Visu führen könnten.
- Bedienung der Rollos funktioniert wieder.
- Einige Icons konnten nicht aus der Variable gelesen werden und es wurde ein Fragezeichen angezeigt.
- Des Verstellen der Icon-Grösse Funktioniert wieder.

### 1.18

- Es ist nun möglich, die Leuchtfarbe über einen zusätzlichen Integer/HexColor zu steuern (zb Hue-Lampen).
- Hilfemenu im Editor funktionsbezogen angepasst.
- Menu im Editor verhält sich nun dynamisch und wird nur noch bei engen Platzverhältnissen auf zwei Zeilen umgebrochen.

### 1.17

- Assoziationen von String-Variablen werden nun korrekt übernommen.

### 1.16

- Unscharfe Schrift der neuen Vermassung unter IPS-View behoben.
- Die Schrift der Vermassung lässt sich nun in der Grösse konfigurieren.

### 1.15

- Ein Fehler in in der Bedienung im IPS-View im Live Modus wurde behoben.
- In den Stockwerk- Eigenschaften lassen sich nun Tooltips und Vermassung der Mauern einblenden, für alle die es genauer haben möchten.

### 1.14

- Bearbeiten der Wände verbessert. Es kann nun eine Längenangabe gemacht werden und die Endpunkte liegen nach einem Klick darauf nicht mehr unterhalb einer anderen Wand.
- Möbel in objekte umbenannt.
- Drei neue Objekte: Regal, Auto, Motorrad, Fahrrad.
- Eine rote Fehlermeldung konnte auftauchen und den Editor blockieren, wenn ein bestimmtes Variablenprofil nicht mehr existierte. Stattdessen wird nun der Rohwert verarbeit.

### 1.13

- Variablenwert mit Rahmen deckt nun Möbel zwecks besserer Lesbarkeit ab.
- Drei neue Möbel hinzugefügt, Waschbecken halbrund, WC halbrund und Badewanne beidseitig rund.

### 1.12

- Letzte Output-Buffer Optimierung wieder rückgängig gemacht da offenbar IPSView nicht damit umgehen konnte. Das bedeutet für grössere Projekte, dass allenfalls der Output-Buffer erhöht werden muss.
- Flackern der Stockwerk-Auswahl auf einigen Android Tablets behoben.
- Die Einstellung der Nachkommastellen etc. wird nun ebenfalls aus dem Variablenprofil übernommen.
- Vier neue Möbel hinzugefügt, Dusche, Eckdusche, Eck-Whirlpool, Wärmepumpe und Backofen.

### 1.11

- Inhalt der Formen kann nun rotiert werden, um eine andere Optik zu erzeugen.

### 1.10

- Konfigurationsformular aktualisiert.
- Auswahl der Formen derjenigen der Möbel angepasst.
- Formen um Pfeil und Dreieck erweitert.
- Verhalten der Buttons und Werkzeuge im Editor überarbeitet.
- Aktive Werkzeuge werden beim Wechsel zu anderen Funktionen automatisch deaktiviert.
- Formen liegen nun unterhalb der Möbel, da sie unter anderem Grundflächen markieren sollen.
- Möbel und Formen werden nun alphabetisch gelistet.
- Floorplaner in Floorplan umbenannt.
- Weitere Speicheroptimierungen über den Webhook, um die Output-Buffer Fehlermeldung auch bei grossen Projekten zu umgehen.

### 1.9

- Einige Sichtbarkeits-Verbesserungen im Bearbeitungsmodus des Light-Themes.
- Die Formen sind nun analog zu den Möbeln konfigurierbar und es kann nach Wunsch eine Füllung ausgewählt werden.
- Integerfarben werden nun unterstützt. So kann ein Icon bzw. Statusring den Zustand auch ohne angezeigten Wert wiedergeben.
- Farben und Darstellungsinformationen können aus IP-Symcon-Profilen und aktuellen Variablendarstellungen übernommen werden.

### 1.8

- Fenster und Türen sind nun umfassend konfigurierbar.
- Videofenster werden nicht mehr durch den Rand der Kachel abgeschnitten.
- Es können nun Formen wie Rechtecke, Kreise oder Linien erstellt werden.
- Größere Ressourcen werden nun über einen WebHook bereitgestellt, um Output-Buffer-Meldungen von IP-Symcon zu verhindern.
- Diverse kleinere Anpassungen.

### 1.7

- Der farbige Statusring funktioniert nun auch im hellen Theme.
- Kamerastreams können nun dargestellt werden.

### 1.6

- Die Leuchtfarbe der Icons kann nun durch den Konfigurator übersteuert werden.

### 1.5

- Icons mit einer reinen Statusvariable reagieren nun nicht mehr auf Betätigung.
- Die Mauerdicke lässt sich nun konfigurieren.

### 1.4

- Icons werden nun sowohl aus den neuen IP-Symcon-Variablendarstellungen als auch aus Legacy-Profilen automatisch übernommen.
- Bei Boolean-Variablen können zwei unterschiedliche Icons für AUS und EIN aus der Variablendarstellung übernommen und verwendet werden.
- Die übernommenen Icons können weiterhin manuell geändert oder über **Variableneinstellungen aktualisieren** neu aus IP-Symcon eingelesen werden.

### 1.3

- IP-Symcon-Icons werden automatisch aus der Variable übernommen und können manuell geändert werden.
- Umfangreiche Iconauswahl mit rund 4000 IP-Symcon-Icons.
- Verbesserungen an Geräte-, Fenster- und Statusdarstellung.

### 1.2

- Geräte können mit einem Rahmen um den Istwert dargestellt werden.
- Variablen ohne Aktion werden nur angezeigt und bieten keine Steuerung.
- Fensterdarstellung und helles IP-Symcon-Theme wurden verbessert.

### 1.1

- Verbesserte Gerätebedienung sowie Unterstützung von Rollläden und Jalousien.
- Optimierungen für Editor, Möbel, Skalierung und verschiedene Displaygrößen.
- Verbesserte Darstellung im hellen und dunklen IP-Symcon-Theme.

### 1.0

- Erste Beta-Version mit Grundriss-Editor, Etagen, Möbeln und IP-Symcon-Geräten.
- Direkte Bedienung von Variablen aus der Live-Ansicht.
- Unterstützung für Wände, Türen und Fenster.
