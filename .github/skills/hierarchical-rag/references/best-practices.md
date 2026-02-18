# Hierarchical RAG — Best Practices & Ressourcen

> Dieses File dient als **Living Document**: Quellen regelmässig auf Aktualität prüfen.  
> Stand: Februar 2026

---

## Namensgebung & Einordnung

Das DIGEST/RAW-Pattern ist **kein einzelner Standard**, sondern kombiniert mehrere etablierte Konzepte:

| Konzept | Beschreibung |
|---------|-------------|
| **Hierarchical RAG** | Oberbegriff für mehrstufige Retrieval-Architekturen |
| **Context Distillation** | Token-Reduktion durch Vorverarbeitung (Anthropic) |
| **Summary Index** | Pre-computed Summaries als Indexschicht (LlamaIndex) |
| **Parent Document Retriever** | Chunk → Originaldokument Navigation (LangChain) |
| **Context Engineering** | Bewusstes Gestalten des LLM-Kontextfensters (Karpathy, 2025) |
| **Community Summaries** | Hierarchische Zusammenfassungen in GraphRAG (Microsoft) |

---

## Primärquellen (Theorie & Architektur)

### Anthropic – Contextual Retrieval
- **URL:** https://www.anthropic.com/news/contextual-retrieval
- **Inhalt:** Wie man Chunks mit Kontext anreichert vor dem Embedding; BM25 + Embeddings kombiniert
- **Relevanz für DIGEST/RAW:** Basis-Konzept der Voranreicherung (unser Digest = Pre-enriched Context)

### Anthropic – Long Context Best Practices
- **URL:** https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips
- **Inhalt:** Wie man grosse Dokumente strukturiert übergibt; Platzierung wichtiger Infos
- **Relevanz:** Erklärt warum Digest zuerst (kurzes Dokument) + RAW auf Demand besser ist als alles laden

### Andrej Karpathy – Context Engineering (2025)
- **URL:** https://x.com/karpathy/status/1825455658987270151
- **Zitat:** *"Context engineering is the delicate art and science of filling the context window with just the right information for the LLM to do the task at hand."*
- **Relevanz:** Nennt den Oberbegriff; erklärt warum Token-Budget bewusst verwaltet werden muss

---

## Technische Implementierungen (Frameworks)

### LlamaIndex – Summary Index / Document Summary Index
- **URL:** https://docs.llamaindex.ai/en/stable/examples/index_structs/doc_summary/
- **Inhalt:** Automatische Generierung von Dokument-Summaries als Indexschicht; zweiphasige Retrieval
- **Relevanz:** Das technische Äquivalent zu unseren `20_folders/*.digest.md` Files

### LlamaIndex – Recursive Retriever (Hierarchical)
- **URL:** https://docs.llamaindex.ai/en/stable/examples/retrievers/recursive_retriever_nodes/
- **Inhalt:** Summary → Chunk → Full Document Navigation; entspricht Digest → RAW
- **Relevanz:** Direkte Entsprechung unserer manuellen DIGEST/RAW-Struktur

### LangChain – Parent Document Retriever
- **URL:** https://python.langchain.com/docs/how_to/parent_document_retriever/
- **Inhalt:** Kleine Chunks für Retrieval, grosse Chunks für Kontext zurückgeben
- **Relevanz:** Gleiche Philosophie wie DIGEST (retrieval) → RAW (vollständiges Dokument)

### LangChain – Contextual Compression
- **URL:** https://python.langchain.com/docs/how_to/contextual_compression/
- **Inhalt:** Automatisches Kürzen von retrieved Documents auf relevante Passagen
- **Relevanz:** Was unser Digest manuell macht; kann auch automatisiert werden

---

## Microsoft GraphRAG

### GraphRAG – Community Summaries
- **URL:** https://microsoft.github.io/graphrag/
- **GitHub:** https://github.com/microsoft/graphrag
- **Arxiv Paper:** https://arxiv.org/pdf/2404.16130
- **Inhalt:** Knowledge Graphs + hierarchische Community Summaries für globale vs. lokale Queries
- **Relevanz:** Unser `10_topics/`-Layer entspricht den "Community Summaries"; `00_catalog.md` = global summary

### Microsoft Blog – GraphRAG Announcement
- **URL:** https://www.microsoft.com/en-us/research/blog/graphrag-unlocking-llm-discovery-on-narrative-private-data/
- **Inhalt:** Erklärung warum flaches RAG für globale Fragen versagt; Hierarchie als Lösung

---

## Weiterführende Konzepte

### RAPTOR – Recursive Abstractive Processing
- **URL:** https://arxiv.org/abs/2401.18059
- **Inhalt:** Baumstruktur von Summaries durch rekursives Clustering; automatisierte Version von DIGEST
- **Relevanz:** Theoretisches Fundament für mehrstufige Zusammenfassungsstrukturen

### HippoRAG – Inspired by Human Memory
- **URL:** https://arxiv.org/abs/2405.14831
- **Inhalt:** Episodisches Gedächtnis (RAW) + semantisches Gedächtnis (Digest/Index) kombiniert
- **Relevanz:** Biologische Analogie für unser DIGEST/RAW-Konzept

---

## Vergleich: Manuell vs. Automatisiert

| Aspekt | DIGEST/RAW (manuell) | LlamaIndex/LangChain (auto) |
|--------|---------------------|---------------------------|
| Setup | Einmalig aufwändig | Schnell (automatisch) |
| Qualität der Summaries | Hoch (menschlich kuratiert) | Variabel (LLM-generiert) |
| Wartung | Manuell bei Updates | Automatisch re-indexierbar |
| Token für Retrieval | Minimal (Markdown-Files) | Variable (Embeddings+VectorDB) |
| Infrastruktur | Keine (nur Dateien) | VectorDB nötig |
| Ideal für | Stabiles, strukturiertes Wissen | Häufig wechselnde Dokumente |

**Fazit:** DIGEST/RAW ist ideal für **stabile Projektwissensbases** wie FiANTEC-Dokumentation, die sich langsam ändern und manuell qualitätsgesichert werden sollen.

---

## Aktualität prüfen

Diese Seiten regelmässig (quartalsweise) auf Updates prüfen:
1. Anthropic Docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/
2. LlamaIndex Blog: https://www.llamaindex.ai/blog
3. LangChain Blog: https://blog.langchain.dev/
4. Microsoft graphrag Releases: https://github.com/microsoft/graphrag/releases
