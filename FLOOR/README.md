# 🏠 Floorplan für IP-Symcon

Floorplan ist ein interaktiver Grundriss-Editor für **IP-Symcon**. Räume, Wände, Türen, Fenster, Objekte, Formen und Geräte können direkt im Browser erstellt, positioniert und anschließend in der Visualisierung angezeigt und bedient werden.

Floorplan arbeitet vollständig innerhalb von IP-Symcon und benötigt keine externe Cloud.

## ✨ Funktionen

- Grundrisse direkt im Browser zeichnen und bearbeiten
- Mehrere Etagen mit eigener Ansicht
- Wände, Türen und Fenster frei platzieren
- Objekte, Formen, Texte und Geräte frei positionieren, drehen und skalieren
- Raster und Zoom im Editor
- Grundriss automatisch an die verfügbare Fläche anpassen
- Konfigurierbare Wandstärke und Wandlänge
- Optionale Innen- und Außenvermassung
- Live-Ansicht ohne Editor-Raster und Bearbeitungshilfen
- Etagenwechsel direkt in der Live-Ansicht
- Geräte und Variablen über den IP-Symcon-Objektbaum auswählen
- Geräte direkt aus dem Grundriss bedienen
- Kamerastreams im Floorplan darstellen
- Unterstützung des hellen und dunklen IP-Symcon-Themes

## 🎛️ IP-Symcon Variablen

Geräte werden mit einer IP-Symcon-Variable verknüpft. Je nach Variablentyp und Variablendarstellung stellt Floorplan passende Anzeige- und Bedienmöglichkeiten bereit.

Unterstützt werden **Boolean-, Integer-, Float- und String-Variablen**.

Sowohl klassische **Legacy-Profile** als auch die aktuellen **IP-Symcon-Variablendarstellungen** werden berücksichtigt.

Variablen ohne hinterlegte Aktion dienen ausschließlich zur Anzeige. Boolean-Werte können direkt geschaltet werden. Integer- und Float-Werte lassen sich abhängig von der IP-Symcon-Konfiguration über Assoziationen oder Slider bedienen.

Auch **String-Assoziationen** werden unterstützt. Dadurch kann beispielsweise anstelle eines Rohwertes wie `CHARGING` der in IP-Symcon hinterlegte Text `Laden` angezeigt werden.

## 🖼️ Icons und Statusfarben

Das Gerätesymbol wird soweit möglich automatisch aus der ausgewählten IP-Symcon-Variable übernommen.

Bei Boolean-Variablen können unterschiedliche Icons für **AUS** und **EIN** verwendet werden. Zusätzlich steht die umfangreiche IP-Symcon-Iconauswahl zur Verfügung.

Statusfarben aus IP-Symcon-Profilen und Variablendarstellungen werden ebenfalls berücksichtigt. Bei Boolean-Variablen kann damit der aktive Zustand farbig dargestellt werden.

Auch Integer-Variablen können Statusfarben aus ihrer Darstellung bzw. ihrem Profil übernehmen.

Mit **Variableneinstellungen aktualisieren** können die aktuell in IP-Symcon hinterlegten Icons und Darstellungsinformationen erneut eingelesen werden.

## 💡 Farbsteuerung für Lampen

Bei Geräten mit einer **Boolean-Hauptvariable** kann optional eine zusätzliche **Integer-Farbvariable (Hex/RGB)** zugeordnet werden.

Die Boolean-Variable übernimmt weiterhin **Ein/Aus**, während die zusätzliche Integer-Variable die aktuelle Leuchtfarbe enthält.

Damit kann:

- die aktuelle Leuchtfarbe im Floorplan dargestellt werden
- die Farbe direkt über einen Farbkreis gewählt werden
- Ein/Aus und Farbe gemeinsam im Geräte-Popup bedient werden
- die gespeicherte Farbe auch bei ausgeschalteter Lampe im Farbwähler angezeigt werden
- das Gerätesymbol nur bei eingeschalteter Lampe in der gewählten Farbe leuchten

Die zusätzliche Farbvariablenauswahl wird nur bei Boolean-Geräten angeboten.

## 🚪 Türen, Fenster und Rollläden

Türen und Fenster werden direkt einer Wand zugeordnet und bewegen sich zusammen mit dieser.

Türen können in Position, Breite und Anschlag konfiguriert werden.

Fensterkontakte können mit einer Boolean-Variable verknüpft werden. Ein geöffnetes Fenster wird entsprechend dargestellt und farblich hervorgehoben.

Rollläden und Jalousien können direkt am Fenster mit eigenen Variablen verknüpft und bedient werden.

## 🛋️ Objekte

Objekte dienen zur Gestaltung des Grundrisses und können frei platziert, verschoben, gedreht und skaliert werden.

Neben den Easy-Floorplan-Objekten stehen weitere Symbole wie Dusche, Eckdusche, Badewanne, Waschbecken, WC, Wärmepumpe, Backofen, Regal, Auto, Motorrad und Fahrrad zur Verfügung.

Die Objektliste wird alphabetisch angezeigt. Die Beschriftung eines Objektes kann optional ein- oder ausgeblendet werden.

## 🔷 Formen

Zusätzlich können Formen zur Gestaltung und Kennzeichnung von Flächen verwendet werden.

Verfügbar sind:

- Dreieck
- Kreis / Ellipse
- Linie
- Pfeil
- Rechteck

Nach dem Platzieren können Position, Größe, Drehung, Name und Darstellung angepasst werden.

Geschlossene Formen können optional gefüllt werden. Auch das Füllmuster kann unabhängig gedreht werden.

Formen liegen grafisch unterhalb der Objekte und eignen sich dadurch beispielsweise zur Kennzeichnung von Grundflächen oder Bereichen.

## 📐 Vermassung

Für jede Etage kann optional eine Vermassung der Wände eingeblendet werden.

Unterstützt werden **Innenmaße und Außenmaße**. Dabei werden Wandstärken und Wandanschlüsse berücksichtigt.

Die Schriftgröße der Vermassung ist konfigurierbar. Zusätzlich können im Editor Tooltips für Wände eingeblendet werden.

In der Live-Ansicht bleiben Vermassung und Bearbeitungshilfen ausgeblendet.

## ✏️ Editor und Live-Ansicht

Im Editor können sämtliche Elemente des Grundrisses erstellt und bearbeitet werden.

Werkzeuge sind nur aktiv, solange sie tatsächlich benötigt werden. Nach dem Platzieren werden entsprechende Werkzeuge wieder deaktiviert.

Bestehende Elemente können direkt angeklickt und anschließend über ihre Eigenschaften bearbeitet werden.

Der komplette Grundriss kann über **Verschieben** oder mit der mittleren Maustaste bewegt werden.

In der **Live-Ansicht** werden Raster, Auswahlrahmen und Bearbeitungshilfen ausgeblendet. Bei mehreren Etagen kann direkt zwischen den Stockwerken gewechselt werden.

## 🎥 Kamerastreams

Kamerastreams können als Geräte in den Floorplan eingebunden und direkt innerhalb der Visualisierung dargestellt werden.

Die Streamdarstellung berücksichtigt die verfügbare Kachelgröße, damit das Videofenster möglichst vollständig innerhalb des Floorplans dargestellt wird.

## ⚙️ Technisches

Floorplan verwendet Easy Floorplan als Basis für Teile der Grundrissdarstellung.

Die benötigten Ressourcen werden lokal aus dem Modul bereitgestellt. Eine externe Cloud ist nicht erforderlich.

## 📦 Installation

Das Modul kann über den **IP-Symcon Module Store** installiert werden.

Anschließend eine **Floorplan-Instanz** anlegen, den Editor öffnen und den Grundriss erstellen.

**Voraussetzung:** IP-Symcon ab Version 8.2.

## 📝 Änderungen

### 1.18

- Es ist nun möglich, die Leuchtfarbe über einen zusätzlichen Integer/HexColor zu steuern (zb Hue-Lampen).

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

- Vier neue Möbel hinzugefügt: Dusche, Eckdusche, Eck-Whirlpool, Wärmepumpe und Backofen.

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