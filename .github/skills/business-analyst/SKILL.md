---
name: business-analyst
description: "Tiefgehendes Domänenwissen für Business-Analyse: OKR-Framework (Objectives & Key Results), Klaus Leopolds Flight Levels, Stakeholder-Analyse, Business-Case-Bewertung, Wettbewerbsanalyse im Schweizer Versicherungsmarkt und regulatorische Rahmenbedingungen (FINMA, DSG). Verwende diesen Skill wenn Geschäftswert bewertet, strategische Initiativen priorisiert, OKRs definiert, Stakeholder analysiert, Business Cases erstellt oder Wettbewerber verglichen werden. Triggers: OKR, Flight Level, Stakeholder, Business Case, Geschäftswert, Wettbewerb, FINMA, DSG, ROI, NPV, KPI, Strategie, Portfolio, Wertstrom."
---

# Business-Analyse Domänenwissen

Dieses Skill liefert das Fach- und Methodenwissen für den Business Analyst Agent. Der Agent orchestriert — dieser Skill liefert die inhaltliche Tiefe.

## OKR-Framework (Objectives & Key Results)

### Struktur

```
Company OKR (Quartal/Jahr)
├── Objective 1 (qualitativ, inspirierend)
│   ├── Key Result 1.1 (quantitativ, messbar)
│   ├── Key Result 1.2
│   └── Key Result 1.3
└── Objective 2
    ├── Key Result 2.1
    └── Key Result 2.2
```

### Formulierungsregeln

| Element | Regel | Beispiel gut | Beispiel schlecht |
|---------|-------|-------------|-------------------|
| **Objective** | Qualitativ, motivierend, zeitgebunden | "Unsere Kunden erleben das beste digitale Vorsorge-Erlebnis der Schweiz" | "Umsatz um 10% steigern" |
| **Key Result** | Messbar, mit Zahl und Deadline | "NPS des Kundenportals steigt von 45 auf 60 bis Q2" | "Kundenzufriedenheit verbessern" |
| **Key Result** | Outcome, nicht Output | "Ø Abschlusszeit Self-Service-Mutation sinkt von 12 auf 5 Minuten" | "20 neue Features implementieren" |

### OKR-Zyklus

| Phase | Dauer | Aktivität |
|-------|-------|-----------|
| **Planung** | 2 Wochen vor Quartal | Objectives und Key Results definieren, Alignment prüfen |
| **Check-in** | Wöchentlich | Confidence Level aktualisieren (0-100%) |
| **Review** | Quartalsende | Zielerreichung bewerten (0.0–1.0), Learnings dokumentieren |
| **Retrospektive** | Nach Review | Prozess verbessern, nächsten Zyklus vorbereiten |

### Scoring

| Score | Bewertung | Bedeutung |
|-------|-----------|-----------|
| 0.0–0.3 | Rot | Signifikant verfehlt |
| 0.4–0.6 | Gelb | Fortschritt, aber Ziel nicht erreicht |
| 0.7–1.0 | Grün | Sweet Spot (0.7 = ambitioniert und erreicht) |

> **Faustregel:** Wenn alle OKRs bei 1.0 landen, waren sie nicht ambitioniert genug. Ziel ist 0.7.

## Flight Levels (Klaus Leopold)

### Die drei Ebenen

```
┌─────────────────────────────────────────────┐
│  FL 3 — STRATEGIE                           │
│  "Machen wir die richtigen Dinge?"          │
│  Portfolio-Kanban · OKRs · Investitions-Mix │
├─────────────────────────────────────────────┤
│  FL 2 — KOORDINATION                        │
│  "Arbeiten die Teams richtig zusammen?"     │
│  Wertstrom-Kanban · Abhängigkeiten · Flow   │
├─────────────────────────────────────────────┤
│  FL 1 — OPERATIV                            │
│  "Liefern die Teams gut?"                   │
│  Team-Kanban · Sprint · WIP-Limits          │
└─────────────────────────────────────────────┘
```

### Steuerungsinstrumente pro Level

| Level | Board-Typ | Metriken | Kadenz |
|-------|-----------|----------|--------|
| **FL 3** | Portfolio-Board | Strategischer Fit, ROI, Time-to-Market | Monatlich/Quartalsweise |
| **FL 2** | Wertstrom-Board | Lead Time, Durchsatz, Blockaden | 2-wöchentlich |
| **FL 1** | Team-Board | Velocity, Cycle Time, WIP | Täglich/Wöchentlich |

### Interaktion zwischen Levels

| Von → Nach | Mechanismus | Beispiel |
|-----------|------------|---------|
| FL 3 → FL 2 | Strategische Initiative wird in Wertstrom-Items zerlegt | "Digitales Onboarding" → 5 Wertstrom-Epics |
| FL 2 → FL 1 | Wertstrom-Items werden in Team-Aufgaben zerlegt | "Onboarding-Formular" → PBIs für 3 Teams |
| FL 1 → FL 2 | Blockaden und Abhängigkeiten werden eskaliert | "API von Team B nicht bereit" → Koordination |
| FL 2 → FL 3 | Strategische Erkenntnisse fliessen zurück | "Scope zu gross" → Re-Priorisierung |

### Typische Dysfunktionen

| Dysfunktion | Symptom | Gegenmassnahme |
|------------|---------|----------------|
| Nur FL 1 | Teams liefern, aber das Falsche | FL 2/3 einführen, Alignment herstellen |
| FL 3 ohne FL 2 | Strategie wird nicht koordiniert umgesetzt | Wertstrom-Board einführen |
| Kein WIP-Limit | Alles gleichzeitig, nichts wird fertig | WIP-Limits pro Flight Level setzen |
| Kein Feedback-Loop | FL 3 entscheidet im Vakuum | Regelmässige Reviews FL 1→FL 2→FL 3 |

## Stakeholder-Analyse

### Einfluss-Betroffenheits-Matrix

```
         Hoher Einfluss
              │
    Zufrieden │ Eng
    stellen   │ einbinden
              │
 Niedrige ────┼──── Hohe
 Betroffenheit│    Betroffenheit
              │
    Beob-     │ Informiert
    achten    │ halten
              │
         Niedriger Einfluss
```

### Analyse-Template

| Stakeholder | Rolle | Interesse | Einfluss | Betroffenheit | Strategie | Kommunikation |
|-------------|-------|-----------|----------|----------------|-----------|---------------|
| [Name] | [Funktion] | [Was ist das Interesse?] | H/M/N | H/M/N | [Einbinden/Informieren/...] | [Kanal + Kadenz] |

### Kommunikationsstrategien

| Quadrant | Strategie | Massnahmen |
|----------|-----------|-----------|
| **Eng einbinden** (H/H) | Aktive Zusammenarbeit | Regelmässige Meetings, Mitentscheidung, frühes Einbeziehen |
| **Zufrieden stellen** (H/N) | Erwartungen managen | Status-Updates, Eskalationsweg klar, keine Überraschungen |
| **Informiert halten** (N/H) | Transparenz schaffen | Newsletter, Dashboard-Zugang, offene Sprechstunden |
| **Beobachten** (N/N) | Minimal | Allgemeine Projekt-Updates |

## Business-Case-Methodik

### Bewertungsdimensionen

| Dimension | KPI-Beispiele | Messmethode |
|-----------|--------------|-------------|
| **Umsatzwachstum** | Neukunden, Cross-Selling-Rate, ARPU | CRM-Daten, Vertragsverwaltung |
| **Kundenbindung** | Churn Rate, NPS, Retention Rate | Kundenportal-Analytik, Surveys |
| **Effizienz** | Prozesszeit, FTE-Einsparung, Automatisierungsgrad | Prozess-Monitoring, Zeiterfassung |
| **Risiko/Compliance** | Audit-Findings, Incident-Rate, Regulatorische Verstösse | Audit-Reports, FINMA-Meldungen |

### Finanzkennzahlen

| Kennzahl | Formel | Interpretation |
|----------|--------|----------------|
| **ROI** | (Nutzen − Kosten) / Kosten × 100% | > 0% = rentabel |
| **Payback** | Investition / jährlicher Netto-Nutzen | In Monaten, < 24 Mt. wünschenswert |
| **NPV** | Σ (Cashflow_t / (1+r)^t) − Investition | > 0 = wertschöpfend |
| **TCO (5J)** | CapEx + (5 × OpEx p.a.) | Gesamtbetriebskosten über 5 Jahre |

### Kostenstruktur (Versicherungsbranche)

| Kostenart | Kategorie | Typische Grössenordnung |
|-----------|-----------|------------------------|
| Lizenzkosten | CapEx | Einmalig oder jährlich (SaaS) |
| Implementierung | CapEx | Projektlaufzeit × Tagessätze |
| Betrieb & Support | OpEx | 15-25% der Implementierungskosten p.a. |
| Schulung | CapEx | 1-3 Tage pro Nutzergruppe |
| Change Management | CapEx | 5-10% der Implementierungskosten |

## Regulatorischer Rahmen (Schweiz)

### Relevante Regulierungen

| Regulierung | Behörde | Relevanz für Business-Analyse |
|-------------|---------|------------------------------|
| **FINMA-Rundschreiben** | FINMA | Governance, Risikomanagement, IT-Sicherheit, Outsourcing |
| **DSG (rev. 2023)** | EDÖB | Datenschutz, Einwilligungen, Datenbearbeitung, Aufbewahrung |
| **VAG** (Versicherungsaufsichtsgesetz) | FINMA | Versicherungsspezifische Anforderungen |
| **FIDLEG/FINIG** | FINMA | Finanzdienstleistungen, Beratungspflichten |

### DSG-Checkliste für Business Cases

- [ ] Datenbearbeitungszweck definiert und dokumentiert
- [ ] Rechtsgrundlage für Datenbearbeitung identifiziert
- [ ] Datenschutz-Folgenabschätzung (DSFA) nötig? (Profiling, sensitive Daten)
- [ ] Datenaufbewahrung und -löschung geregelt
- [ ] Informationspflicht gegenüber betroffenen Personen erfüllt
- [ ] Auftragsbearbeiter (Dritte) vertraglich geregelt
- [ ] Datenexport ins Ausland geprüft (Angemessenheitsbeschluss)

## Schweizer Versicherungsmarkt — Wettbewerbslandschaft

### Hauptwettbewerber (Kundenportal-Sicht)

| Anbieter | Portal-Stärken | Portal-Schwächen | Differenzierungspotenzial |
|----------|---------------|------------------|--------------------------|
| **AXA** | Modernes UI, Self-Service breit | Komplexität bei Kombi-Produkten | Vorsorge-Beratung digital |
| **Helvetia** | Gute Mobile-App, Schadensmeldung | Weniger Vorsorge-Features | Ganzheitliche Vorsorge-Sicht |
| **Zurich** | Integration mit Partnern | Fragmentierte Portale | Einheitliches Erlebnis |
| **Baloise** | Einfachheit, Fokus | Eingeschränkter Funktionsumfang | Innovation, InsurTech-Partnerschaften |
| **Generali** | Internationaler Standard | Wenig CH-spezifisch | Lokale Relevanz |

### Digitale Reifegradachsen

| Achse | Beschreibung | Messkriterien |
|-------|-------------|---------------|
| **Self-Service** | Was kann der Kunde selbst? | Mutationen, Schadenmeldung, Dokumente |
| **Personalisierung** | Wie individuell ist das Erlebnis? | Empfehlungen, Kontext, Vorausfüllung |
| **Integration** | Wie nahtlos sind die Kanäle? | Omni-Channel, SSO, Datenübernahme |
| **Transparenz** | Wie verständlich sind Informationen? | Sprachliche Klarheit, Visualisierung |

## Entscheidungsvorlagen

### Option-Vergleich (Template)

| Kriterium | Gewicht | Option A | Option B | Nichts tun |
|-----------|---------|----------|----------|------------|
| Strategischer Fit | 30% | [1-5] | [1-5] | [1-5] |
| Geschäftswert (NPV) | 25% | [1-5] | [1-5] | [1-5] |
| Umsetzungsrisiko | 20% | [1-5] | [1-5] | [1-5] |
| Time-to-Market | 15% | [1-5] | [1-5] | [1-5] |
| Regulatorische Compliance | 10% | [1-5] | [1-5] | [1-5] |
| **Gewichteter Score** | 100% | **[Σ]** | **[Σ]** | **[Σ]** |

> **Regel:** Immer mindestens 2 Optionen + "Nichts tun" darstellen. "Nichts tun" hat auch Kosten (Opportunitätskosten, technische Schulden, Wettbewerbsnachteil).

### RACI-Matrix (Template)

| Aktivität | Responsible | Accountable | Consulted | Informed |
|-----------|------------|-------------|-----------|----------|
| Business Case erstellen | BA | PO | Stakeholder | PMO |
| Budget genehmigen | – | Sponsor | Finance | PO, BA |
| Anforderungen definieren | RE | PO | BA, Dev | Test |
| Lösung umsetzen | Dev | Tech Lead | Architekt | BA, PO |
| Abnahme durchführen | Test | PO | BA | Stakeholder |
