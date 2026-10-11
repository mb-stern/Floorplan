# Lokale Prüfungen

Die PHP-Regressionprüfungen laufen ohne Symcon-Installation mit kleinen Funktionsdoubles gegen den tatsächlichen Modulcode:

```sh
php tests/regression.php
```

Die Browserprüfung benötigt Node.js, Playwright und Chromium:

```sh
node tests/ipsview-browser.cjs
```

Bei separat installierten Werkzeugen können `PLAYWRIGHT_MODULE` (Modulname oder absoluter Pfad) und `CHROMIUM_PATH` (Browserpfad) gesetzt werden.

Die Browserprüfung lädt HTML und JavaScript aus `FLOOR/module.php` mit einem Beispielprojekt. Sie prüft Maus- und Touch-Aktivierung, einzelne Schaltbefehle, Geräte-Popups, die Live-Etagenauswahl per Buttons und Tastatur, das Schließen des Auswahlmenüs und reine Statusvariablen. Eine simulierte Host-Schnittstelle nimmt Bedienaktionen nur während eines Klickereignisses an.

Die Simulation bestätigt die Ereignisbehandlung im Browser. Sie ersetzt keinen Test in IPSView oder mit echten Symcon-Geräten.
