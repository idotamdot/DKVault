# DKV Bridge

## Overview

**DKV Bridge** is a system for capturing human-generated content (journals, reflections, and media) and transforming it into structured, persistent data using large language models.

The system is designed to preserve **context**, **authorship**, and **temporal continuity** over time.  
It avoids treating human input as disposable prompts and instead creates durable, traceable records that can be analyzed longitudinally.

---

## Problem Statement

Most AI-driven applications treat input as ephemeral:
- prompts are not preserved
- context is lost between runs
- derived insights overwrite earlier understanding

DKV Bridge addresses this by:
- persisting raw input alongside AI-derived outputs
- explicitly linking input, processing, and storage
- enforcing traceability across time and model versions

---

## System Architecture

### Input Layer
- Free-form text (journals, notes)
- Media uploads (audio / video)
- Time-based submissions

### Analysis Layer
- Language models extract:
  - semantic patterns
  - recurring themes
  - tonal and contextual shifts
- Outputs are structured as typed records rather than prose summaries

### Synthesis Layer
- Normalizes structured outputs
- Attaches metadata:
  - timestamp
  - source
  - model identity
  - processing version

### Storage Layer
- Immutable record storage
- Raw input and synthesized output remain linked
- Historical records remain queryable

---

## Technology Stack

- **Framework:** Next.js 15 (App Router, Server Actions)
- **Styling:** Tailwind CSS
- **AI Orchestration:** Firebase Genkit
- **Key-Value Storage:** Vercel KV (Redis-backed)
- **Media Storage:** Vercel Blob
- **Models Used:**
  - Gemini 1.5 Flash (fast synthesis)
  - ChatGPT-4o (language analysis)

---

## Key Features

- **Structured Synthesis**  
  Converts unstructured human input into typed, queryable records.

- **Traceable AI Output**  
  Every synthesis records:
  - model used
  - processing parameters
  - source input

- **Temporal Coherence**  
  Records are stored with explicit time context to support longitudinal analysis.

- **Minimal UI**  
  Interfaces prioritize clarity, inspection, and data integrity over presentation.

---

## Setup & Installation

### Clone and Install

```bash
git clone https://github.com/idotamdot/DKVault.git
cd DKVault
pnpm install
