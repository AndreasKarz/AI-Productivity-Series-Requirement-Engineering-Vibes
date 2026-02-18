# RE-Templates und Patterns

## Feature-Template (ADO)

```html
<h2>Geschäftskontext</h2>
<p>[Warum ist dieses Feature nötig? Welches Geschäftsproblem löst es?]</p>

<h2>Scope</h2>
<h3>In Scope</h3>
<ol>
  <li>[Punkt 1]</li>
  <li>[Punkt 2]</li>
</ol>
<h3>Out of Scope</h3>
<ol>
  <li>[Punkt 1]</li>
</ol>

<h2>Akzeptanzkriterien</h2>
<ol>
  <li><strong>GIVEN</strong> [Vorbedingung]<br/>
      <strong>WHEN</strong> [Aktion]<br/>
      <strong>THEN</strong> [Messbares Ergebnis]</li>
</ol>

<h2>Nicht-funktionale Anforderungen</h2>
<table>
  <tr><th>Attribut</th><th>Messgrösse</th><th>Schwelle</th><th>Verifikation</th></tr>
  <tr><td>[z.B. Performance]</td><td>[z.B. P95 Antwortzeit]</td><td>[z.B. &lt; 2s]</td><td>[z.B. Lasttest]</td></tr>
</table>

<h2>Abhängigkeiten</h2>
<ul>
  <li>[Andere Features/PBIs/Systeme]</li>
</ul>

<h2>Annahmen</h2>
<ul>
  <li>ANNAHME: [Kennzeichnung offener Punkte]</li>
</ul>
```

## PBI-Template (ADO)

```html
<h2>Beschreibung</h2>
<p>Als <strong>[Rolle]</strong> möchte ich <strong>[Fähigkeit]</strong>, damit <strong>[Geschäftswert]</strong>.</p>

<h2>Kontext</h2>
<p>[Aktueller Zustand, Problembeschreibung, relevante Hintergrundinformation]</p>

<h2>Akzeptanzkriterien</h2>
<ol>
  <li><strong>GIVEN</strong> [konkreter Zustand mit Werten]<br/>
      <strong>WHEN</strong> [Benutzeraktion oder Systemereignis]<br/>
      <strong>THEN</strong> [messbares, verifizierbares Ergebnis]</li>
  <li><strong>GIVEN</strong> [Fehlerfall-Zustand]<br/>
      <strong>WHEN</strong> [ungültige Aktion]<br/>
      <strong>THEN</strong> [Fehlermeldung "[Text]" wird angezeigt, keine Datenänderung]</li>
</ol>

<h2>Technische Hinweise</h2>
<ul>
  <li>[Optional: Hinweise zur Umsetzung, betroffene Komponenten]</li>
</ul>
```

## Epic-Template (ADO)

```html
<h2>Vision</h2>
<p>[Übergeordnetes Geschäftsziel, strategische Ausrichtung]</p>

<h2>Problemstellung</h2>
<p>[Welches Problem wird gelöst? Für wen?]</p>

<h2>Erwarteter Geschäftswert</h2>
<table>
  <tr><th>KPI</th><th>Baseline</th><th>Ziel</th><th>Zeithorizont</th></tr>
  <tr><td>[Kennzahl]</td><td>[Aktuell]</td><td>[Soll]</td><td>[Termin]</td></tr>
</table>

<h2>Scope (Features)</h2>
<ol>
  <li>[Feature 1: Kurzbeschreibung]</li>
  <li>[Feature 2: Kurzbeschreibung]</li>
</ol>

<h2>Erfolgskriterien</h2>
<ol>
  <li>[Messbare Bedingung für "Fertig"]</li>
</ol>

<h2>Risiken</h2>
<table>
  <tr><th>Risiko</th><th>Wahrscheinlichkeit</th><th>Auswirkung</th><th>Gegenmassnahme</th></tr>
  <tr><td>[Beschreibung]</td><td>H/M/N</td><td>H/M/N</td><td>[Massnahme]</td></tr>
</table>
```

## Definition of Ready (DoR) — Checkliste

| # | Kriterium | Prüfung |
|---|-----------|---------|
| 1 | Titel ist aussagekräftig und ergebnisorientiert | ✔/✖ |
| 2 | Beschreibung enthält Geschäftskontext | ✔/✖ |
| 3 | Akzeptanzkriterien sind im GIVEN/WHEN/THEN-Format | ✔/✖ |
| 4 | Jedes AC ist unabhängig testbar | ✔/✖ |
| 5 | NFRs haben messbare Schwellenwerte | ✔/✖ |
| 6 | Abhängigkeiten sind identifiziert | ✔/✖ |
| 7 | Scope (In/Out) ist definiert | ✔/✖ |
| 8 | Schätzung liegt vor (Story Points) | ✔/✖ |
| 9 | Parent-Work-Item ist verlinkt | ✔/✖ |
| 10 | Annahmen sind als ANNAHME markiert | ✔/✖ |

## Definition of Done (DoD) — Checkliste

| # | Kriterium | Prüfung |
|---|-----------|---------|
| 1 | Alle Akzeptanzkriterien sind erfüllt | ✔/✖ |
| 2 | Testfälle sind via "Tested By" verlinkt | ✔/✖ |
| 3 | Testfälle sind bestanden | ✔/✖ |
| 4 | Code Review durchgeführt | ✔/✖ |
| 5 | Dokumentation aktualisiert | ✔/✖ |
| 6 | Keine offenen Blocker | ✔/✖ |
| 7 | Product Owner hat abgenommen | ✔/✖ |

## User Story Mapping

```
                    Aktivität 1          Aktivität 2          Aktivität 3
                    ──────────          ──────────          ──────────
Release 1 (MVP)     [Story A]           [Story D]           [Story G]
                    [Story B]           [Story E]
                    
Release 2           [Story C]           [Story F]           [Story H]
                                                            [Story I]
                                                            
Backlog             [Story J]                               [Story K]
```

Horizontale Achse = Benutzeraktivitäten (Workflow)
Vertikale Achse = Priorisierung (oben = wichtiger)
