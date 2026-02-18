---
name: requirements-engineer
description: "Tiefgehendes Domänenwissen für Requirements Engineering nach IREB-Standard: Ermittlungstechniken, Dokumentationsformate, Qualitätskriterien, Anforderungs-Templates, GIVEN/WHEN/THEN-Patterns, NFR-Kategorisierung nach ISO 25010, Anforderungsvalidierung und Traceability. Verwende diesen Skill wenn Anforderungen erhoben, dokumentiert, validiert, Features/PBIs/Epics erstellt, Akzeptanzkriterien formuliert oder Anforderungsqualität geprüft wird. Triggers: IREB, Anforderung, Requirement, User Story, Feature, PBI, Epic, Akzeptanzkriterium, Given When Then, NFR, nicht-funktional, Qualitätsattribut, Traceability, Verfolgbarkeit, Ermittlung, Elicitation, Validierung."
---

# Requirements Engineering Domänenwissen

Dieses Skill liefert das Fach- und Methodenwissen für den Requirements Engineer Agent. Der Agent orchestriert — dieser Skill liefert die inhaltliche Tiefe.

## IREB RE-Lebenszyklus

```
┌──────────┐    ┌──────────────┐    ┌──────────┐    ┌──────────────┐    ┌────────────┐
│ Ermitteln │───▶│ Dokumentieren│───▶│  Prüfen  │───▶│  Abstimmen   │───▶│  Verwalten │
│           │◀───│              │◀───│          │◀───│              │◀───│            │
└──────────┘    └──────────────┘    └──────────┘    └──────────────┘    └────────────┘
   Elicitation    Documentation      Validation     Negotiation        Management
```

### Ermittlungstechniken

| Technik | Wann einsetzen | Stärke | Schwäche |
|---------|---------------|--------|----------|
| **Interview** | Individuelle Stakeholder befragen | Tiefe Einsichten, Nachfragen möglich | Zeitaufwändig, subjektiv |
| **Workshop** | Mehrere Stakeholder gemeinsam | Konsens, verschiedene Perspektiven | Gruppendynamik, Dominanz |
| **Beobachtung** | Bestehende Prozesse verstehen | Implizites Wissen aufdecken | Hawthorne-Effekt |
| **Dokumentenanalyse** | Bestehende Systeme/Prozesse | Vorhandenes Wissen nutzen | Möglicherweise veraltet |
| **Prototyping** | UI-nahe Anforderungen | Konkretisierung, frühes Feedback | Kann als "fertig" missverstanden werden |
| **Fragebogen** | Breite Stakeholder-Gruppe | Skalierbar, quantifizierbar | Keine Nachfragen, Missverständnisse |
| **Brainstorming** | Kreative/innovative Features | Viele Ideen generieren | Bewertung/Priorisierung nötig |

### Dokumentationsformate

Detaillierte Templates und Patterns: Siehe [references/templates.md](references/templates.md)

## Anforderungsarten

### Funktionale Anforderungen (FR)

Beschreiben **was** das System tun soll.

**Formulierungsmuster (IREB-konform):**

| Verbindlichkeit | Schlüsselwort | Beispiel |
|---------------|--------------|---------|
| **Pflicht** | muss / shall | "Das System **muss** den Benutzer nach 3 Fehlversuchen sperren." |
| **Wunsch** | sollte / should | "Das System **sollte** eine Passwort-Stärke-Anzeige bieten." |
| **Absicht** | wird / will | "Das System **wird** in einer zukünftigen Version 2FA unterstützen." |

**Qualitätsmerkmale einer guten FR:**
- Atomar (eine Anforderung pro Satz)
- Eindeutig (nur eine Interpretation möglich)
- Notwendig (trägt zum Geschäftsziel bei)
- Prüfbar (verifizierbar durch Test)
- Verfolgbar (Quelle und Ziel dokumentiert)
- Realisierbar (technisch und wirtschaftlich machbar)

### Nicht-funktionale Anforderungen (NFR) nach ISO 25010

Detaillierte NFR-Kategorien und Messmethoden: Siehe [references/nfr-iso25010.md](references/nfr-iso25010.md)

## Akzeptanzkriterien — GIVEN/WHEN/THEN

### Struktur

```gherkin
GIVEN [Vorbedingung — konkreter Systemzustand]
WHEN  [Auslöser — Benutzeraktion oder Systemereignis]
THEN  [Erwartung — messbares, verifizierbares Ergebnis]
```

### Formulierungsregeln

| Regel | Erklärung | Beispiel |
|-------|-----------|---------|
| **Konkreter GIVEN** | Zustand mit Werten, nicht abstrakt | ✅ "GIVEN ein Benutzer mit Rolle 'Berater' ist angemeldet" ❌ "GIVEN ein Benutzer ist im System" |
| **Aktiver WHEN** | Eine klare, auslösende Aktion | ✅ "WHEN der Benutzer auf 'Vertrag kündigen' klickt" ❌ "WHEN etwas passiert" |
| **Messbares THEN** | Verifizierbar mit konkreten Werten | ✅ "THEN wird der Status auf 'Gekündigt' gesetzt und eine E-Mail an den Kunden gesendet" ❌ "THEN wird die Kündigung verarbeitet" |
| **AND für Ergänzungen** | Zusätzliche Bedingungen/Ergebnisse | "AND der Kündigungstermin entspricht dem nächsten Vertragsablauf" |
| **Ein Szenario pro AC** | Jedes AC testet genau einen Aspekt | Nicht mehrere unabhängige Flows in einem AC |
| **Positive + Negative** | Beide Richtungen abdecken | Happy Path UND Fehlerfall (z.B. "GIVEN kein Vertrag vorhanden") |

### Muster für häufige Szenarien

| Szenario-Typ | GIVEN-Muster | WHEN-Muster | THEN-Muster |
|-------------|-------------|-------------|-------------|
| **CRUD: Erstellen** | Benutzer hat Berechtigung X | Formular mit gültigen Daten absenden | Datensatz erstellt, ID vergeben, Bestätigung angezeigt |
| **CRUD: Lesen** | Datensatz mit ID X existiert | Detailansicht öffnen | Alle Felder korrekt angezeigt (konkrete Werte nennen) |
| **CRUD: Aktualisieren** | Datensatz mit Wert A existiert | Wert auf B ändern und speichern | Wert ist B, Änderungsdatum aktualisiert, Audit-Log geschrieben |
| **CRUD: Löschen** | Datensatz ohne Abhängigkeiten | Löschen bestätigen | Datensatz entfernt, abhängige Referenzen bereinigt |
| **Validierung** | Formular ist offen | Ungültigen Wert eingeben (z.B. Text in Zahlenfeld) | Validierungsmeldung "[Text]" beim Feld angezeigt, Speichern deaktiviert |
| **Berechtigung** | Benutzer hat Rolle Y (ohne Berechtigung Z) | Geschützte Aktion aufrufen | Zugriff verweigert, Fehlercode 403, keine Datenänderung |
| **Grenzwert** | Feld akzeptiert max. N Zeichen | N+1 Zeichen eingeben | Eingabe wird auf N Zeichen begrenzt ODER Fehlermeldung |
| **Asynchron** | Prozess X wurde ausgelöst | Verarbeitung abgeschlossen | Status wechselt auf "Abgeschlossen", Benachrichtigung gesendet |

### Anti-Patterns in ACs

| Anti-Pattern | Warum schlecht | Korrektur |
|-------------|---------------|-----------|
| "System funktioniert korrekt" | Nicht testbar | Konkretes Verhalten + Werte beschreiben |
| "Benutzer sieht die Daten" | Welche Daten? Wie? | "Benutzer sieht Vorname, Name, Geburtsdatum im Format dd.MM.yyyy" |
| "Fehler wird behandelt" | Wie? Welche Meldung? | "Fehlermeldung '[Text]' wird angezeigt, kein Datenverlust" |
| "Performance ist gut" | Nicht messbar | "Antwortzeit < 2s bei P95 unter Last von 100 gleichzeitigen Benutzern" |
| "Wie im alten System" | Implizites Wissen | Verhalten explizit spezifizieren |

## Anforderungsvalidierung — IREB-Checkliste

### Einzelne Anforderung prüfen

| # | Kriterium | Prüffrage |
|---|-----------|-----------|
| 1 | **Klarheit** | Gibt es nur eine mögliche Interpretation? |
| 2 | **Vollständigkeit** | Sind alle Aspekte (Normalfall, Fehlerfall, Grenzwerte) beschrieben? |
| 3 | **Konsistenz** | Widerspricht diese Anforderung keiner anderen? |
| 4 | **Korrektheit** | Ist die Anforderung fachlich richtig? |
| 5 | **Testbarkeit** | Kann ein Tester prüfen, ob die Anforderung erfüllt ist? |
| 6 | **Verfolgbarkeit** | Ist die Quelle dokumentiert? Ist ein Test zugeordnet? |
| 7 | **Notwendigkeit** | Trägt die Anforderung zum Geschäftsziel bei? |
| 8 | **Realisierbarkeit** | Ist sie technisch und wirtschaftlich umsetzbar? |

### Anforderungsspezifikation prüfen

| # | Kriterium | Prüffrage |
|---|-----------|-----------|
| 1 | **Scope** | Sind In-/Out-of-Scope klar definiert? |
| 2 | **Vollständigkeit** | Sind alle Stakeholder-Bedürfnisse abgedeckt? |
| 3 | **Redundanzfreiheit** | Gibt es keine doppelten Anforderungen? |
| 4 | **Konsistenz** | Widersprechen sich keine Anforderungen? |
| 5 | **Priorisierung** | Sind alle Anforderungen priorisiert (MoSCoW)? |

## Priorisierung — MoSCoW

| Priorität | Bedeutung | Anteil am Scope |
|-----------|-----------|----------------|
| **Must have** | Ohne diese Anforderung ist das Release wertlos | ~60% |
| **Should have** | Wichtig, aber workaround möglich | ~20% |
| **Could have** | Wünschenswert, wenn Zeit und Budget reicht | ~20% |
| **Won't have** | Explizit ausgeschlossen für dieses Release | Dokumentiert |

## Azure DevOps Work-Item-Struktur

### Hierarchie

```
Epic (strategische Initiative)
├── Feature (fachliches Ergebnis)
│   ├── PBI / User Story (kleinste lieferbare Einheit)
│   │   ├── Task (technische Teilaufgabe)
│   │   └── Test Case (linked via "Tested By")
│   └── PBI / User Story
└── Feature
```

### Work-Item-Qualitätskriterien

| Feld | Regel |
|------|-------|
| **Title** | Aussagekräftig, max. 80 Zeichen, Ergebnis-orientiert |
| **Description** | HTML-formatiert für ADO, Geschäftskontext + Scope (In/Out) |
| **Acceptance Criteria** | GIVEN/WHEN/THEN, jedes AC unabhängig testbar |
| **Tags** | Immer `AI Gen` hinzufügen |
| **Area Path** | Korrekt zuordnen (z.B. `CTRM\Corporate Services\...`) |
| **Parent** | PBI muss an Feature verlinkt sein |
| **Tested By** | Testfälle MÜSSEN verlinkt sein |

## Traceability

### Verfolgbarkeitskette

```
Geschäftsziel → Epic → Feature → PBI → Akzeptanzkriterium → Testfall → Testergebnis
```

### Traceability-Matrix

| Quelle | Anforderung (ID) | AC | Testfall (ID) | Status |
|--------|-------------------|-----|---------------|--------|
| [Stakeholder/Dokument] | [PBI-123] | AC-1 | [TC-456] | ✔/✖/❓ |

> Jede Anforderung MUSS vorwärts (zu Tests) und rückwärts (zur Quelle) verfolgbar sein.
