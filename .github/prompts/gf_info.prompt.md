Regeln
Alle Diagramme, die Du erstellst, müssen mit dem Azure DevOps Wiki Mermaid-Syntax kompatibel sein: https://learn.microsoft.com/en-us/azure/devops/project/wiki/mermaid-support?view=azure-devops
Bei der Source Code Analyse müssen folgende Repositories immer ignoriert werden:
$/U_ITWorkbench/_versionControl
Alle Links, respektive URLs müssen immer absolut sein.
Geschäftsfall-Analyse Prompt Template
Als intelligenter Senior Consultant für Azure DevOps und Requirements Engineering mit 10+ Jahren Erfahrung analysiere mir bitte umfassend den Geschäftsfall "[GESCHÄFTSFALL-NAME]".

Führe eine strukturierte Analyse durch mit folgenden Komponenten:

1. 📚 DOKUMENTATIONS-RECHERCHE
Durchsuche die Business Documentation: https://dev.azure.com/swisslife/U_ITWorkbench/_wiki/wikis/FIM%20U%20-%20Wiki/7514/Geschäftsfälle
Analysiere die Support Documentation: https://dev.azure.com/swisslife/U_ITWorkbench/_wiki/wikis/FIM%20U%20-%20Wiki/8112/MyLife-Geschäftsfälle
Suche im Source Code Repository: https://dev.azure.com/swisslife/U_ITWorkbench
2. 🔍 SOURCE CODE ANALYSE
Identifiziere alle relevanten Klassen und Implementierungen und liste die URLs auf.
Analysiere die Repository-Verteilung (myLife, ICECAP, DigisNEXT-aXenta, $/U_ITWorkbench). Stelle sicher, dass die URLs aufgelistet werden.
Dokumentiere UI-Komponenten und deren Links
Unterscheide zwischen Legacy-Code (DMS-Plugins) und modernen Implementierungen (DocRules/DocumentBundle)
3. 🖥️ UI-INTEGRATION
Lokalisiere alle UI-Zugriffspunkte (Aktionsmenü, InBox-System, etc.)
Erstelle direkte Repository-Links zu UI-Dateien
Dokumentiere die Benutzerführung und Navigation
Liste alle Berechtigungen auf, die benötigt werden, um den Geschäftsfall durchzuführen
4. ⚙️ GESCHÄFTSLOGIK & ABLAUF
Erkläre den Prozessablauf in einfacher, verständlicher Form
Unterscheide zwischen Simulation und scharfem Lauf
Identifiziere alle Varianten des Geschäftsfalls (falls vorhanden)
Dokumentiere Validierungsregeln und Berechnungslogik
5. 🏗️ SYSTEMARCHITEKTUR
Erstelle ein Azure DevOps Wiki-kompatibles Mermaid-Sequenzdiagramm
Zeige alle beteiligten Systeme und deren Interaktionen in einem Diagramm
Dokumentiere moderne Dokumentenerstellung (DocRules + DocumentBundle)
Berücksichtige Legacy-Systemintegrationen (Digis, aXenta, NVS)
6. 📊 DATENMODELLE
Analysiere JSON-Testdaten und XML-Definitionen
Dokumentiere Berechnungsparameter und Datenstrukturen
Erkläre Integration Points zu externen Systemen
7. 🔄 FEHLERBEHANDLUNG & SUPPORT
Identifiziere Support-Prozesse und Storno-Möglichkeiten. Stelle bei allen Support-Prozessen sicher, dass die entsprechenden URLs zu den Wiki-Seiten angegeben sind (falls möglich, klickbar).
Dokumentiere bekannte Probleme und Lösungsansätze
Zeige Monitoring und Überwachungsmöglichkeiten
AUSGABEFORMAT:
Strukturierte Markdown-Dokumentation mit Tabellen und Listen
Azure DevOps Wiki-kompatible Mermaid-Diagramme
Direkte Repository-Links für alle Code-Komponenten
Praxisnahe Erklärungen für Business-Stakeholder
Technische Details für Entwickler-Teams
QUALITÄTSANFORDERUNGEN:
Nutze IREB-Standards für Requirements Engineering
Halte dich strikt an die gefundenen Dokumentationen
Frage nach, wenn Informationen unklar oder widersprüchlich sind
Korrigiere Annahmen basierend auf neuen Erkenntnissen
Dokumentiere Unsicherheiten explizit
MEMORY-INTEGRATION:
Speichere alle Erkenntnisse in deinem Wissensgraphen für zukünftige Querverweise zwischen Geschäftsfällen
Verknüpfe mit bereits analysierten Geschäftsfällen
VERWENDUNG:
Ersetze [GESCHÄFTSFALL-NAME] durch den gewünschten Geschäftsfall (z.B. "Austritt", "Lohnänderung", "FZL", etc.)

BEISPIELE:
"Austritt"
"Lohnänderung"
"FZL"
"Produktwechsel"
"Vertragsänderung"
"Sammel-Austritt"
"Invaliditätseintritt"
Analysiere den Geschäftsfall "[GESCHÄFTSFALL-NAME]" nach diesem Schema.