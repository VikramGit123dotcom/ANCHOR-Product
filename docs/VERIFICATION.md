# Verification record

Checked on 26 November 2026. Runtime: Node v24.22.3, Windows. No deployed service or external integration was tested or claimed.

## Automated tests

`node --test tests/core.test.js tests/server.test.js tests/dashboard.test.js`: **6/6 passed**.

- Fresh clear route preference, six-hour boundary, stale/future/unsourced reports and invalid distances.
- Stock-cover arithmetic and invalid consumption.
- All dashboard views render; sensitive seed records and placement functions are absent; reset preserves functional audit history.
- API input validation, origin rejection, persistent request lifecycle and structured audit entries.
- Concurrent writes using the same version: exactly one succeeds and one receives 409.
- Persistence across server instances, static-source boundaries and chat context validation.

## Assistant evaluation

**42/42 authored cases passed**. Full outputs and measured engine timings are in `evals/results.json`; the readable table is in `evals/RESULTS.md`. These examples test regressions and do not establish general adversarial, clinical or bilingual robustness.

## Browser checks

An ephemeral local server and headless Chromium were used to verify:

- Desktop dashboard rendering at 1440 x 1000.
- Creating a request and moving it to verified from the browser.
- Assistant stock reply with visible tool trace.
- Browser fallback when the chat endpoint is unavailable.
- Volunteer registry without the missing-person option and the safeguarding boundary view.
- Mobile Home at 390 x 844 without page-wide horizontal overflow.
- No uncaught page errors during that flow.

Desktop screenshots are included under `docs/screenshots/`. The checked browser used temporary request storage outside the deliverable, so no runtime request records are shipped.

## PDF checks

The write-up contains two pages. Text extraction and rendered-page visual inspection confirmed readable text, intact paragraphs, consistent spacing and unobstructed footer/page numbers.

## Limits of these checks

External map-tile availability, real emergency data, authenticated multi-user operations, SMS delivery, LLM behavior and employer-platform compatibility were not tested because those capabilities are not implemented in this package.
