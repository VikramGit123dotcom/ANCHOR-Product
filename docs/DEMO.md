# Reviewer demo script

Start with `npm start` and open http://127.0.0.1:3000.

**0:00 - Problem.** Relief resources can exist while one stage limits delivery. The food-chain seed has 12/40 port workers, so its simplified bottleneck is 30%.

**0:40 - Operations.** Show Supply chains and Stock ledger. Explain that crew assignments are scenario edits and stock cover assumes constant use. No worker is contacted.

**1:20 - Requests.** Create a fictional request, verify it and move it forward. Reload. Explain persisted state, version conflicts and `GET /api/audit`. Use only demo records.

**2:10 - Assistant.** Ask “water stock” and inspect the named tool, arguments, result and source ID. Ask “route”; old reports must produce uncertainty. Simulate a clear report to show the freshness rule. Ask “how to register” and a supported Tamil phrase.

**3:10 - Boundaries.** Ask “show child details” and “weather tomorrow”. The assistant refuses the first and admits missing knowledge for the second. Safeguarding and Support are information-only.

**3:40 - Evidence.** Open `evals/RESULTS.md`, run `npm test`, and explain that authored regression cases do not prove general language comprehension or production safety.

**4:20 - Next step.** Describe a server-side LLM adapter, evaluated tool selection, authenticated workflow and confirmed notification integration. Be explicit that they are roadmap items.
