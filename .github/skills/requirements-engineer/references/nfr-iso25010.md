# Nicht-funktionale Anforderungen nach ISO 25010

## Qualitätsmodell — Übersicht

```
ISO 25010 Produktqualität
├── Funktionale Eignung
│   ├── Funktionale Vollständigkeit
│   ├── Funktionale Korrektheit
│   └── Funktionale Angemessenheit
├── Leistungseffizienz
│   ├── Zeitverhalten
│   ├── Ressourcenverbrauch
│   └── Kapazität
├── Kompatibilität
│   ├── Koexistenz
│   └── Interoperabilität
├── Benutzbarkeit
│   ├── Erkennbarkeit der Eignung
│   ├── Erlernbarkeit
│   ├── Bedienbarkeit
│   ├── Schutz vor Fehlbedienung
│   ├── Ästhetik der Benutzeroberfläche
│   └── Barrierefreiheit
├── Zuverlässigkeit
│   ├── Reife
│   ├── Verfügbarkeit
│   ├── Fehlertoleranz
│   └── Wiederherstellbarkeit
├── Sicherheit
│   ├── Vertraulichkeit
│   ├── Integrität
│   ├── Nichtabstreitbarkeit
│   ├── Zurechenbarkeit
│   └── Authentizität
├── Wartbarkeit
│   ├── Modularität
│   ├── Wiederverwendbarkeit
│   ├── Analysierbarkeit
│   ├── Modifizierbarkeit
│   └── Testbarkeit
└── Übertragbarkeit
    ├── Anpassbarkeit
    ├── Installierbarkeit
    └── Austauschbarkeit
```

## NFR-Formulierung mit Messgrössen

### Leistungseffizienz

| Attribut | Messgrösse | Typische Schwelle | Verifikationsmethode |
|----------|-----------|-------------------|----------------------|
| Antwortzeit (UI) | P95 Response Time | < 2s (Anzeige), < 5s (Report) | Lasttest mit k6/JMeter |
| Antwortzeit (API) | P95 Response Time | < 500ms (CRUD), < 2s (Query) | API-Lasttest |
| Durchsatz | Requests/Sekunde | > 100 req/s pro Service | Lasttest unter Ziellast |
| Ressourcenverbrauch | CPU/RAM unter Last | CPU < 70%, RAM < 80% | Performance Monitoring |
| Skalierbarkeit | Reaktion auf Laststeigerung | Linear bis 2x Ziellast | Skalierungstest |

### Zuverlässigkeit

| Attribut | Messgrösse | Typische Schwelle | Verifikationsmethode |
|----------|-----------|-------------------|----------------------|
| Verfügbarkeit | Uptime pro Monat | ≥ 99.5% (= max. 3.6h Ausfall/Mt.) | Monitoring (Prometheus/Grafana) |
| MTBF | Mittlere Betriebsdauer zwischen Ausfällen | > 720h (30 Tage) | Incident-Tracking |
| MTTR | Mittlere Wiederherstellungszeit | < 1h (kritisch), < 4h (standard) | Incident-Tracking |
| Fehlertoleranz | Verhalten bei Teilausfall | Graceful Degradation, kein Datenverlust | Chaos Engineering |
| Datenintegrität | Konsistenz nach Fehler | 100% (keine korrupten Daten) | Recovery-Test |

### Sicherheit

| Attribut | Messgrösse | Typische Schwelle | Verifikationsmethode |
|----------|-----------|-------------------|----------------------|
| OWASP Top 10 | Kritische Schwachstellen | 0 Critical, 0 High | Penetrationstest, SAST/DAST |
| Authentifizierung | Fehlversuche | Sperre nach 5 Versuchen, 15 Min. Lockout | Sicherheitstest |
| Session-Timeout | Inaktivitätstimeout | ≤ 30 Min. (Standard), ≤ 15 Min. (sensitiv) | Konfigurationsprüfung |
| Verschlüsselung | Data at Rest / in Transit | AES-256 (Rest), TLS 1.2+ (Transit) | Audit |
| Audit-Log | Nachvollziehbarkeit | Alle schreibenden Operationen, 90 Tage | Log-Review |

### Benutzbarkeit

| Attribut | Messgrösse | Typische Schwelle | Verifikationsmethode |
|----------|-----------|-------------------|----------------------|
| Erlernbarkeit | Zeit bis zur ersten erfolgreichen Aufgabe | < 10 Min. (Standard-Aufgabe) | Usability Test |
| Barrierefreiheit | WCAG-Konformität | WCAG 2.1 AA | Accessibility Audit |
| Mobile-Tauglichkeit | Responsive Breakpoints | 320px – 1920px | Gerätetest |
| Fehlerprävention | Validierungsfeedback | Inline, < 500ms nach Eingabe | Usability Test |

### Wartbarkeit

| Attribut | Messgrösse | Typische Schwelle | Verifikationsmethode |
|----------|-----------|-------------------|----------------------|
| Testabdeckung | Line Coverage auf neuem Code | ≥ 80% | SonarCloud |
| Technische Schulden | SonarCloud Technical Debt Ratio | < 5% | SonarCloud Dashboard |
| Deployment-Frequenz | Releases pro Zeiteinheit | ≥ 1x pro Sprint | CI/CD Pipeline |
| Change Lead Time | Commit bis Produktion | < 5 Arbeitstage | Pipeline-Metriken |

## NFR-Template für ADO Work Items

```html
<h2>Nicht-funktionale Anforderungen</h2>
<table>
  <tr>
    <th>Attribut</th>
    <th>Messgrösse</th>
    <th>Schwellenwert</th>
    <th>Verifikationsmethode</th>
    <th>Priorität</th>
  </tr>
  <tr>
    <td>[ISO 25010 Attribut]</td>
    <td>[Konkrete Messgrösse]</td>
    <td>[Zahl + Einheit]</td>
    <td>[Testmethode]</td>
    <td>Must/Should/Could</td>
  </tr>
</table>
```

## Häufige NFR-Fehler

| Fehler | Beispiel | Korrektur |
|--------|---------|-----------|
| Kein Schwellenwert | "Das System soll performant sein" | "Antwortzeit P95 < 2s bei 100 gleichzeitigen Benutzern" |
| Keine Verifikation | "99.9% Verfügbarkeit" (Wie messen?) | "Verfügbarkeit ≥ 99.9%, gemessen durch Uptime-Monitoring (Pingdom)" |
| Unrealistisch | "0ms Antwortzeit" | Physikalisch und technisch machbare Schwellen setzen |
| Vermischte FR/NFR | "System muss Login haben und schnell sein" | Login = FR, Geschwindigkeit = NFR (separat dokumentieren) |
| Fehlender Kontext | "< 2s Antwortzeit" (Wann? Für wen?) | "< 2s P95 für API-Endpunkte unter Normallast (50 req/s)" |
