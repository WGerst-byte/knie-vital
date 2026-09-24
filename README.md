# KnieVital - Digitale Knie-Therapie & Physio-Begleiter

Eine barrierefreie, moderne Webapplikation zur Unterstützung von Patientinnen und Patienten mit Knieschmerzen (Arthrose, Patellaspitzensyndrom, Läuferknie, postoperative Reha oder alltägliche Überlastung).

## 🌟 Funktionsübersicht

1. **Digitaler Physio-Berater (Consultant)**
   - **Geführter 4-Stufen Symptom-Check (Anamnese)**: Lokalisation (vorne, außen, innen, Kniekehle), Schmerzsituation (Treppenabwärts, Anlaufschmerz, Sport, Sitzen), Schwellungsprüfung und Schmerzstärke (VAS-Skala 0–10).
   - **Automatische Trainingsplan-Ermittlung**: Schlägt sofort das passende Übungsset vor.
   - **Interaktiver Chat**: Beantwortet Fragen zu Wärme vs. Kälte, Schuhen, Bandagen, Joggen und Knorpelernährung.
   - **Medizinische Red Flags**: Prominente Warnhinweise bei Blockaden, akutem Trauma oder Entzündungszeichen zur Weiterleitung an Fachärzte.

2. **Abschnitt: Leichte Übungen für Knie-Patienten**
   - *Fersenschleifen im Liegen (Heel Slides)* – Sanfte Mobilisation & Gelenkschmiere.
   - *Isometrischer Kniekehlendruck (Quad-Sets)* – Kräftigung des Vastus medialis ohne Gelenkdruck.
   - *Gerades Beinheben (Straight Leg Raise)* – Schonender Kraftaufbau für den Oberschenkel.
   - *Kniestreckung im Sitzen (Terminal Knee Extension)* – Ideal für den Büroalltag.
   - *Sanfte Beckenbrücke (Glute Bridge)* – Stärkung der rückwärtigen Kraftkette zur Knieentlastung.
   - *Geführtes Fersenheben (Wadenheber)* – Achsenstabilität und Stoßdämpfung.

3. **Abschnitt: Gezielte Dehnungsübungen bei Knieschmerzen**
   - *Dehnung der Oberschenkelrückseite (Hamstrings)* – Vermindert Anpressdruck im Knorpel.
   - *Quadrizeps-Dehnung in Seitlage* – Nimmt den Dauerdruck von der Kniescheibe.
   - *Wadendehnung an der Wand* – Reduziert Kniekehlenzug und Streckhemmung.
   - *IT-Band & Gesäßdehnung* – Goldstandard bei Außenseitenschmerz („Läuferknie“).
   - *Hüftbeuger-Dehnung (Iliopsoas)* – Korrigiert Beckenkippung und Beinachsenstellung.

4. **Interaktiver Workout- & Dehnungs-Player**
   - Akustischer Countdown und Gongs über die Web Audio API (funktioniert ohne externe Dateien).
   - Satz- und Pausenzeiten-Führung mit kreisförmiger Zeitanzeige.
   - Direktes Protokollieren im Schmerztagebuch nach Trainingsabschluss.

5. **Schmerztagebuch & Verlaufsdokumentation**
   - Speicherung im `localStorage` des Browsers.
   - Schmerzscore-Tracking (VAS 0–10) mit Notizen.

6. **Optimierte Druckansicht (`Ctrl + P`)**
   - Generiert einen sauberen A4-Übungsplan für den Arztbesuch oder die Pinnwand.

---

## 🚀 Starten der Anwendung

Die Anwendung benötigt keine Installation oder Abhängigkeiten und läuft direkt in jedem modernen Webbrowser:

### Option 1: Direkt im Browser öffnen
Doppelklicken Sie einfach auf die Datei `index.html` oder öffnen Sie sie in Google Chrome, Microsoft Edge oder Firefox:
```powershell
explorer.exe "C:\Users\wgers\.gemini\antigravity\scratch\knee-therapy-app\index.html"
```

### Option 2: Über einen lokalen Webserver (z. B. Python)
```powershell
cd "C:\Users\wgers\.gemini\antigravity\scratch\knee-therapy-app"
python -m http.server 8000
```
Öffnen Sie anschließend im Browser: `http://localhost:8000`

---

## ⚕️ Medizinischer Haftungsausschluss
Diese Applikation dient der Information und Prävention. Sie ersetzt keine ärztliche Untersuchung, Befundung oder professionelle physiotherapeutische Betreuung.
