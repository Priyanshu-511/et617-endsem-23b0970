# DESIGN.md — RoadWise ET End-Sem Project

**Roll:** 23B0970  
**Learner code:** L1

---

## D1 · Learning Problem

Learners on Indian roads often cannot recognise or correctly interpret common road signs. This creates safety risks — especially for young road users who may misidentify a warning triangle as a STOP sign, or misunderstand what a pedestrian-crossing sign tells *drivers* to do (vs. pedestrians).

The app addresses three learning gaps:
1. Classifying signs into their regulatory category (Mandatory / Prohibitory / Warning / Informatory)
2. Describing a sign's visual features and meaning in their own words
3. Choosing a safe driver response in a realistic traffic scenario

---

## D2 · Learner Persona

| Field | Value |
|-------|-------|
| **Name** | Priyanshu |
| **Age** | 21 |
| **Learner code** | L1 |
| **Roll number** | 23B0970 |
| **Primary language** | English (`en-IN`) |
| **Other languages configured** | Hindi (`hi-IN`), Marathi (`mr-IN`) |
| **Content language status** | English-only — `contentLang()` falls back to `en-IN` for all non-English locales until translations are added to `signs.js` and `question.js` |

**Persona description:**  
Priyanshu is a 21-year-old learner who is comfortable reading and speaking English. He uses a smartphone daily and can interact with voice-based interfaces. He is learning road signs for the first time (or revisiting them) and may hold common misconceptions — for example, that every triangular sign means STOP, or that a pedestrian-crossing sign instructs pedestrians to stop rather than alerting drivers.

**Why English-only for now:**  
The sign catalogue (`signs.js`) and question bank (`question.js`) carry only `en` text keys. The speech service (`speech.js`) selects a voice by BCP-47 locale and falls back gracefully, but all question text, feedback strings, and sign descriptions are hard-coded in English. Adding `hi` / `mr` keys to every sign entry and question string is the prerequisite for multi-language support.

---

## D3 · Misconceptions Targeted

| Code | Misconception | Addressed by |
|------|--------------|--------------|
| M1 | "Every triangular sign means STOP" | MCQ `m1`, `evaluateSpoken` name-check for triangle signs |
| M2 | "Pedestrian-crossing sign tells pedestrians to stop" | MCQ `m2`, `evaluateSpoken` action-check for `PEDESTRIAN_CROSSING` |

---

## D4 · Learning Outcomes

| Outcome | Description | Goal |
|---------|-------------|------|
| O1 | Classify signs into categories | 4 / 5 |
| O2 | Explain signs using visual features + meaning | 3 / 3 |
| O3 | Choose a safe response in traffic situations | 4 / 5 |

---

## D5 · App Flow

```
Welcome → Capture (photo) → Recognition (AI identifies sign)
       → VoiceTutor (name + action Q&A)
       → Practice (Match → MCQ → Short-answer → Scenario MCQ)
       → Results (scores, outcomes, misconceptions, revision list)
```

---

## D6 · Technology Notes

| Concern | Decision |
|---------|----------|
| Vision AI | Gemini via `/api/analyze` (Vercel serverless); model configurable via `VISION_MODEL` env var |
| Speech synthesis | Web Speech API (`speechSynthesis`), rate 0.9, locale-matched voice |
| Speech recognition | Web Speech API (`SpeechRecognition`), 3 alternatives, Chrome recommended |
| State persistence | `localStorage` key `roadwise_state_v1`; photo held in React state only (never saved) |
| Language fallback | `contentLang()` returns `en-IN` for any non-English locale until translated content exists |

---

## TODO

- [ ] Add `hi` and `mr` text keys to every entry in `signs.js` for Hindi / Marathi support
- [ ] Translate all question text, feedback, and model answers in `question.js`
- [ ] Verify Hindi and Marathi voices are available on target devices
- [ ] Update `contentLang()` to lift the English-only restriction once translations land
