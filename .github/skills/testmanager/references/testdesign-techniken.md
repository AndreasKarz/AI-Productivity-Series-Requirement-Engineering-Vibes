# Testdesign-Techniken (ISTQB)

## 1. Äquivalenzklassenbildung (Equivalence Partitioning)

### Prinzip
Eingabewerte in Klassen aufteilen, die vom System **gleich behandelt** werden. Pro Klasse genügt **ein Repräsentant**.

### Vorgehen
1. Eingabeparameter identifizieren
2. Gültige und ungültige Klassen bilden
3. Pro Klasse einen Testfall erstellen

### Beispiel: Altersfeld (18–65 Jahre)

| Klasse | Wertebereich | Gültigkeit | Repräsentant |
|--------|-------------|-----------|-------------|
| K1 | < 18 | Ungültig | 15 |
| K2 | 18–65 | Gültig | 30 |
| K3 | > 65 | Ungültig | 70 |
| K4 | Nicht-numerisch | Ungültig | "abc" |
| K5 | Leer | Ungültig | "" |

**Ergebnis:** 5 Testfälle statt unendlich viele.

## 2. Grenzwertanalyse (Boundary Value Analysis)

### Prinzip
Fehler treten häufig an den **Grenzen** von Äquivalenzklassen auf. Teste die Grenzen und ihre unmittelbaren Nachbarn.

### Vorgehen (2-Wert-BVA)
Für jede Grenze: den Grenzwert selbst und den Wert direkt daneben testen.

### Beispiel: Altersfeld (18–65 Jahre)

| Grenze | Wert | Erwartung |
|--------|------|-----------|
| Untere Grenze −1 | 17 | Ungültig |
| Untere Grenze | 18 | Gültig |
| Obere Grenze | 65 | Gültig |
| Obere Grenze +1 | 66 | Ungültig |

### 3-Wert-BVA (für höhere Abdeckung)
Für jede Grenze: Grenzwert −1, Grenzwert, Grenzwert +1.

## 3. Entscheidungstabelle (Decision Table Testing)

### Prinzip
Alle **Kombinationen von Bedingungen** systematisch auflisten und die erwarteten Aktionen zuordnen. Besonders nützlich bei Geschäftsregeln.

### Vorgehen
1. Bedingungen identifizieren (ja/nein)
2. Alle Kombinationen aufschreiben (2^n Regeln)
3. Für jede Kombination die erwartete Aktion bestimmen
4. Redundante Regeln zusammenfassen

### Beispiel: Versicherungsrabatt

| Bedingung | R1 | R2 | R3 | R4 |
|-----------|----|----|----|----|
| Bestandskunde (> 3 Jahre) | Ja | Ja | Nein | Nein |
| Schadenfrei (letzte 2 Jahre) | Ja | Nein | Ja | Nein |
| **Aktion** | | | | |
| Rabatt 15% | ✔ | | | |
| Rabatt 5% | | | ✔ | |
| Rabatt 0% | | ✔ | | ✔ |

**Ergebnis:** 4 Testfälle für 2 Bedingungen (statt Ad-hoc-Tests).

### Vereinfachung
Wenn eine Bedingung für das Ergebnis irrelevant ist, mit "—" markieren und Regeln zusammenfassen.

## 4. Zustandstransitionstest (State Transition Testing)

### Prinzip
Systeme mit **Zuständen und Übergängen** modellieren und testen, ob alle erlaubten Übergänge funktionieren und unerlaubte abgefangen werden.

### Vorgehen
1. Zustände identifizieren
2. Übergänge (Trigger/Ereignisse) identifizieren
3. Zustandsdiagramm erstellen
4. Testfälle ableiten:
   - Alle gültigen Übergänge (0-switch coverage)
   - Alle ungültigen Übergänge (negative Tests)

### Beispiel: Vertragsstatus

```
                    ┌──────────┐
    Erfassen ─────▶ │  Entwurf │
                    └────┬─────┘
                         │ Freigeben
                    ┌────▼─────┐
                    │  Aktiv   │◀── Reaktivieren
                    └────┬─────┘
                    │    │ Sistieren
                    │ ┌──▼───────┐
                    │ │ Sistiert │
                    │ └──────────┘
                    │ Kündigen
                    ┌────▼─────┐
                    │ Gekündigt │
                    └──────────┘
```

### Zustandstranistionstabelle

| Aktueller Zustand | Ereignis | Nächster Zustand | Erwartung |
|-------------------|----------|-----------------|-----------|
| Entwurf | Freigeben | Aktiv | ✔ Gültig |
| Entwurf | Kündigen | — | ✖ Ungültig (Fehlermeldung) |
| Aktiv | Sistieren | Sistiert | ✔ Gültig |
| Aktiv | Kündigen | Gekündigt | ✔ Gültig |
| Sistiert | Reaktivieren | Aktiv | ✔ Gültig |
| Sistiert | Kündigen | — | ✖ Ungültig |
| Gekündigt | * | — | ✖ Endstatus, keine Übergänge |

## 5. Anwendungsfallbasiertes Testen (Use Case Testing)

### Prinzip
Testfälle aus **Anwendungsfällen (Use Cases)** ableiten. Deckt den Haupterfolgsweg und alternative/Ausnahme-Szenarien ab.

### Vorgehen
1. Haupterfolgsweg (Happy Path) als ersten Testfall
2. Jede Alternative/Erweiterung als eigenen Testfall
3. Jede Ausnahme als eigenen Testfall
4. Vor- und Nachbedingungen prüfen

### Beispiel: Use Case "Vertrag abschliessen"

| Szenario | Beschreibung | Testfall-Typ |
|----------|-------------|-------------|
| Happy Path | Alle Daten gültig → Vertrag aktiv | Positiv |
| Alt 1 | Kunde unter 18 → Eltern-Zustimmung nötig | Alternativ |
| Alt 2 | Bonität ungenügend → Gesundheitsprüfung | Alternativ |
| Exc 1 | System-Timeout bei Bonitätsprüfung → Retry | Exception |
| Exc 2 | Pflichtfeld fehlt → Validierungsfehler | Exception |

## 6. Error Guessing (Erfahrungsbasiert)

### Prinzip
Basierend auf Erfahrung **typische Fehlerstellen** gezielt testen.

### Häufige Fehlerquellen

| Kategorie | Typische Fehler | Testideen |
|-----------|----------------|-----------|
| **Eingaben** | Null, leer, Sonderzeichen, Unicode, SQL-Injection | `null`, `""`, `<script>`, `' OR 1=1`, Emojis |
| **Zahlen** | 0, negativ, MAX_INT, Dezimalstellen | `0`, `-1`, `2147483647`, `99999999.999` |
| **Datum** | Schaltjahr, Jahreswechsel, Zeitzonen | `29.02.2024`, `31.12.2025`, `01.01.2026`, UTC vs. CET |
| **Listen** | Leere Liste, ein Element, viele Elemente | `[]`, `[1]`, `[1..10000]` |
| **Concurrent** | Gleichzeitige Änderungen | Zwei Benutzer ändern denselben Datensatz |
| **Netzwerk** | Timeout, langsame Verbindung, Abbruch | Browser Throttling, DevTools Network |

## Technik-Kombinationsmatrix

| Anforderungstyp | Primärtechnik | Ergänzungstechnik |
|----------------|--------------|-------------------|
| Eingabefelder mit Bereich | Äquivalenzklassen + Grenzwert | Error Guessing |
| Geschäftsregeln | Entscheidungstabelle | Anwendungsfall (E2E) |
| Statusmaschinen / Workflows | Zustandstransition | Error Guessing (ungültige Übergänge) |
| Benutzer-Abläufe | Anwendungsfallbasiert | Exploratives Testen |
| API-Schnittstellen | Äquivalenzklassen (Parameter) + Entscheidungstabelle (Kombinationen) | Grenzwert + Error Guessing |
| UI-Formulare | Äquivalenzklassen + Grenzwert | Explorativ (UX-Perspektive) |
