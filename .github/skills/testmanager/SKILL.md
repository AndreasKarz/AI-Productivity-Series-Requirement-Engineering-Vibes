---
name: testmanager
description: "Tiefgehendes Domänenwissen für Test Management nach ISTQB-Standard: Testdesign-Techniken (Äquivalenzklassen, Grenzwertanalyse, Entscheidungstabellen, Zustandstransitionen), Coverage-Strategien, Teststufen, Testberichterstattung, Azure DevOps Test Plans Integration und deterministische Testfall-Formulierung. Verwende diesen Skill wenn Testfälle erstellt, Teststrategien definiert, Coverage-Matrizen aufgebaut, Testberichte geschrieben, ADO Test Plans verwaltet oder Expected Results formuliert werden. Triggers: ISTQB, Testfall, Test Case, Teststrategie, Testplan, Coverage, Abdeckung, Testbericht, Expected Result, Testdesign, Grenzwert, Äquivalenzklasse, Entscheidungstabelle, Zustandsübergang, ADO Test Plan, Testausführung, Regressiontest, Abnahmetest."
---

# Test Management Domänenwissen

Dieses Skill liefert das Fach- und Methodenwissen für den Testmanager Agent. Der Agent orchestriert — dieser Skill liefert die inhaltliche Tiefe.

## ISTQB-Testprozess

```
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────────┐   ┌──────────┐   ┌──────────┐
│ Planung  │──▶│ Analyse  │──▶│  Design  │──▶│Implementierung│──▶│Durchführung│──▶│ Abschluss│
└──────────┘   └──────────┘   └──────────┘   └──────────────┘   └──────────┘   └──────────┘
 Strategie,     Was testen?    Wie testen?    Testfälle,         Tests laufen    Report,
 Ressourcen,    Testbedingungen Techniken     Testdaten,          lassen,         Lessons
 Zeitplan       identifizieren  wählen        Umgebung            Ergebnisse      Learned
                                              vorbereiten         dokumentieren
```

## Teststufen

| Stufe | Fokus | Basis | Verantwortung | Typische Werkzeuge |
|-------|-------|-------|---------------|-------------------|
| **Komponententest** | Einzelne Units isoliert | Code, Detaildesign | Entwickler | xUnit, NUnit, Moq |
| **Integrationstest** | Zusammenspiel von Komponenten | Schnittstellenspez. | Entwickler/Tester | Testcontainers, WireMock |
| **Systemtest** | Gesamtsystem gegen Anforderungen | Anforderungsspez. | Tester | Playwright, Postman |
| **Abnahmetest** | Business-Anforderungen, Benutzersicht | Geschäftsprozesse | PO/Tester/Endbenutzer | ADO Test Plans |

## Testdesign-Techniken

Detaillierte Techniken mit Beispielen: Siehe [references/testdesign-techniken.md](references/testdesign-techniken.md)

### Technik-Auswahl nach Situation

| Situation | Empfohlene Technik | Begründung |
|-----------|-------------------|-----------|
| Eingabefelder mit Wertebereichen | Äquivalenzklassen + Grenzwertanalyse | Systematische Abdeckung mit minimaler Testanzahl |
| Geschäftsregeln mit Bedingungen | Entscheidungstabelle | Alle Bedingungskombinationen sichtbar |
| Workflows mit Statusübergängen | Zustandstransitionstest | Zustandsmaschine vollständig abdecken |
| Komplexe Benutzerprozesse | Anwendungsfallbasiertes Testen | Realistische End-to-End-Szenarien |
| Erfahrungsbasiertes Testen | Error Guessing + Exploratives Testen | Defekte finden, die Techniken übersehen |

## Deterministische Testfall-Formulierung

### Expected Results — Goldstandard

**Regel:** Jedes Expected Result muss so präzise sein, dass zwei verschiedene Tester zum **gleichen Ergebnis** kommen (bestanden/nicht bestanden).

| Qualitätsstufe | Beispiel | Bewertung |
|-------------|---------|-----------|
| ❌ Schlecht | "Ergebnis wird angezeigt" | Nicht verifizierbar — WAS wird WO WIE angezeigt? |
| ⚠️ Mittel | "Fehlermeldung wird angezeigt" | Welche Meldung? Wo? |
| ✅ Gut | "Inline-Fehlermeldung 'Bitte geben Sie eine gültige E-Mail-Adresse ein' erscheint unter dem Feld 'E-Mail' in roter Schrift (#D82034)" | Deterministisch prüfbar |

### Checkliste für Expected Results

- [ ] **WAS** passiert? (Konkretes Systemverhalten)
- [ ] **WO** wird es sichtbar? (Element, Seite, Bereich)
- [ ] **WIE** sieht es aus? (Format, Farbe, Text)
- [ ] **WANN** passiert es? (Sofort, nach Delay, nach Bestätigung)
- [ ] **Welche Werte?** (Konkrete Zahlen, Texte, Formate)
- [ ] **Was passiert NICHT?** (Keine Datenänderung, keine Navigation, kein Datenverlust)

### Muster für Expected Results nach Aktionstyp

| Aktionstyp | Expected-Result-Muster |
|-----------|----------------------|
| **Formular absenden** | "Erfolgsmeldung '[Text]' erscheint. Datensatz ist in der Liste sichtbar mit Werten [A], [B], [C]. URL wechselt zu [/pfad]." |
| **Validierungsfehler** | "Inline-Fehlermeldung '[Text]' unter Feld '[Name]'. Formular bleibt offen. Speichern-Button ist deaktiviert. Keine Daten wurden gespeichert." |
| **Löschen** | "Bestätigungsdialog mit Text '[Text]' erscheint. Nach Bestätigung: Datensatz ist aus der Liste entfernt. Meldung '[Text]'. Zugehörige [Verknüpfungen] sind bereinigt." |
| **Navigation** | "Seite '[Titel]' wird geladen. URL ist [/pfad]. Breadcrumb zeigt [A > B > C]. Ladezeit < [n]s." |
| **Statuswechsel** | "Status-Badge wechselt von '[Alt]' auf '[Neu]' (Farbe: [Farbe]). Timestamp 'Letzte Änderung' ist aktualisiert auf [Format]. Audit-Log enthält Eintrag mit [Details]." |
| **E-Mail-Versand** | "E-Mail wird an [Adresse] gesendet. Betreff: '[Text]'. Inhalt enthält [Schlüsselinformationen]. Absender ist [Adresse]." |
| **Dateiexport** | "Datei '[Name].[Format]' wird heruntergeladen. Dateigrösse > 0 Bytes. Inhalt enthält [erwartete Spalten/Zeilen]. Encoding: UTF-8." |

## Coverage-Analyse

### Coverage-Matrix-Aufbau

```
Anforderung (AC)    →    Testbedingung    →    Testfall    →    Testergebnis
     1:1                    1:n                  n:1              1:1
```

| Kennzahl | Formel | Zielwert |
|----------|--------|----------|
| **AC-Coverage** | Getestete ACs / Alle ACs × 100% | ≥ 85% (Standard), ≥ 95% (Hoch-Risiko) |
| **Testfall-Effizienz** | Gefundene Defekte / Anzahl Testfälle | Höher = effizienter |
| **Redundanz** | Doppelt abgedeckte ACs / Alle ACs | < 10% (wenig Redundanz) |

### Coverage-Typen

| Typ | Beschreibung | Wann einsetzen |
|-----|-------------|---------------|
| **Anforderungsbasiert** | Jede Anforderung / jedes AC mindestens 1x getestet | Immer (Baseline) |
| **Risikobasiert** | Hohe Risiken haben mehr Tests | Bei knappem Budget/Zeit |
| **Codebasiert** | Line/Branch Coverage | Komponententests |
| **Explorativ** | Session-basiert, erfahrungsgetrieben | Ergänzend zu strukturierten Tests |

## Teststrategie nach Risiko

### Risikobasierte Testpriorisierung

| Risikostufe | Wahrscheinlichkeit × Auswirkung | Teststrategie |
|------------|-------------------------------|--------------|
| **Kritisch** (R1) | Hoch × Hoch | Vollständige Abdeckung: Positiv + Negativ + Grenzwert + Integration + Performance |
| **Hoch** (R2) | Hoch × Mittel ODER Mittel × Hoch | Positiv + Negativ + Grenzwert + ausgewählte Integration |
| **Mittel** (R3) | Mittel × Mittel | Positiv + wichtigste Negativ-Tests |
| **Niedrig** (R4) | Niedrig × beliebig ODER beliebig × Niedrig | Happy Path + Stichproben |

### Risikobewertung für Testfälle

| Faktor | Hoch | Mittel | Niedrig |
|--------|------|--------|---------|
| **Geschäftskritikalität** | Kernprozess, regulatorisch | Unterstützungsprozess | Nice-to-have |
| **Benutzerhäufigkeit** | Täglich, viele Benutzer | Wöchentlich, wenige Benutzer | Selten, Admin-Only |
| **Technische Komplexität** | Viele Schnittstellen, Async | Moderate Logik | Einfaches CRUD |
| **Änderungshistorie** | Häufig geändert, fehleranfällig | Gelegentlich geändert | Stabil seit Langem |

## Azure DevOps Test Plans Integration

### Testfall-Erstellung via MCP

```
1. mcp_ado_testplan_list_test_plans     → Verfügbare Testpläne
2. mcp_ado_testplan_list_test_suites    → Test Suites im Plan
3. mcp_ado_testplan_create_test_case    → Neuen Testfall erstellen
4. mcp_ado_testplan_add_test_cases_to_suite → Testfälle zur Suite hinzufügen
5. mcp_ado_wit_link_work_item_to_pull_request → Testfall mit PBI verlinken
```

### Testfall-Verlinkung (Pflicht)

```
Work Item (PBI/Feature)
    │
    ├── Tested By ──▶ Test Case 1
    ├── Tested By ──▶ Test Case 2
    └── Tested By ──▶ Test Case 3
```

**Regeln:**
- Jeder Testfall ist via "Tested By" mit dem Work Item verlinkt
- Jedes AC hat mindestens 1 Testfall
- Testfälle tragen den Tag `AI Gen`
- Nummerierung: Fortlaufend (1, 2, 3 ...), bei Selektion umnummerieren

### ADO Test Case Format

```
Title:          TC-[Nr]: [Aussagekräftiger, aktionsorientierter Titel]
Area Path:      [Gleicher Area Path wie das verlinkte Work Item]
Tags:           AI Gen
Assigned To:    [Optional]

Test Steps:
  Step 1: [Aktion]
    Expected Result: [Detailliertes, deterministisches Ergebnis]
  Step 2: [Aktion]
    Expected Result: [Detailliertes, deterministisches Ergebnis]

Preconditions:
  - [Vorbedingung 1]
  - [Vorbedingung 2]
```

## Testberichterstattung

### Testbericht-Template

```markdown
# Testbericht: [Work Item / Feature Titel]

**Datum:** [TT.MM.YYYY] | **Tester:** [Name/AI] | **Gesamtstatus:** 🟢/🟡/🔴

## Zusammenfassung

| Kennzahl | Wert |
|----------|------|
| Testfälle gesamt | [n] |
| Bestanden | [n] ([%]%) |
| Fehlgeschlagen | [n] ([%]%) |
| Blockiert | [n] ([%]%) |
| Nicht ausgeführt | [n] ([%]%) |
| AC-Abdeckung | [n/m] ([%]%) |

## Defekte

| # | Testfall | Fehlerbeschreibung | Schweregrad | Status |
|---|---------|--------------------| ------------|--------|
| 1 | TC-[Nr] | [Was ist passiert vs. was erwartet war] | Kritisch/Hoch/Mittel/Niedrig | Offen/In Arbeit/Gelöst |

## Risikobewertung

| Bereich | Restrisiko | Begründung |
|---------|-----------|-----------|
| [Bereich] | Hoch/Mittel/Niedrig | [Warum?] |

## Empfehlung

[Go / No-Go mit Begründung. Bei No-Go: Was muss noch passieren?]
```

### Schweregrad-Definitionen

| Schweregrad | Definition | Reaktion |
|------------|-----------|---------|
| **Kritisch** | System unbenutzbar, Datenverlust, Sicherheitslücke | Sofort beheben, Release blockiert |
| **Hoch** | Kernfunktion beeinträchtigt, kein Workaround | Vor Release beheben |
| **Mittel** | Funktion beeinträchtigt, Workaround vorhanden | Im nächsten Sprint beheben |
| **Niedrig** | Kosmetisch, geringe Auswirkung | Backlog, nach Priorität |

## Regressionstest-Strategie

### Wann Regressionstests?

| Auslöser | Regressions-Scope |
|----------|-------------------|
| Neues Feature | Betroffene bestehende Funktionen + Schnittstellen |
| Bugfix | Fix-Verifikation + verwandte Funktionen |
| Konfigurations-Änderung | Alle betroffenen Features |
| Release | Kritische Pfade + Smoke Tests |

### Smoke-Test-Set (Minimum für jedes Release)

1. Login/Logout funktioniert
2. Hauptnavigation erreichbar
3. Kernprozess 1 (Happy Path) durchläuft
4. Kernprozess 2 (Happy Path) durchläuft
5. Daten werden korrekt angezeigt (Stichprobe)
6. Keine JavaScript-/API-Fehler in der Konsole
