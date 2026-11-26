# Design and tradeoffs

## Why plain JavaScript and a small Node server

The input is a functioning single-file prototype. Extracting its CSS and JavaScript retains its existing workflows and makes the package easy to review without a framework migration. The enhancement layer overrides selected dashboard functions; a future refactor should replace global state and inline handlers with modules and delegated events. This structure prioritizes a runnable submission over an unfinished stack migration.

## State ownership

- `app/js/app.js`: scenario seed, original rendering and baseline interactions.
- `app/js/enhancements.js`: current demo boundaries, input validation, request and assistant views, browser audit events.
- Browser storage: version 3 envelope `{version:3,data:...}`; invalid data produces a visible warning and a fresh seed. Browser data is untrusted and device-specific.
- Backend: version 1 request/audit file. One in-process promise queue serializes writes. Each mutation writes a temporary file then renames it; this reduces partial-write exposure, but is not a transactional database or fsync-based durability guarantee. Run one process only.
- Optimistic concurrency: PATCH must supply the current integer `version`. A stale version receives HTTP 409 and cannot overwrite the latest state.

## Request state machine

```text
submitted -> verified -> assigned -> in_progress -> completed
    |            |           |             |
    +------------+-----------+-------------+----> cancelled
```

This represents a simulated coordinator workflow, with no authenticated verification, personnel acceptance, resource reservation or dispatch. Every mutation appends the previous and new snapshots to the local audit array.

## Assistant pipeline

1. Check immediate-danger phrases, override/secret requests and sensitive-record requests before tools.
2. Route supported registration, stock, route and skill-gap intents with deterministic rules.
3. Execute a read-only tool over a browser-supplied fictional snapshot, or rank knowledge records by exact keyword overlap.
4. Return answer, intent, prompt version, tool arguments/results and source IDs.
5. If the local API fails, run the same engine and KB in the browser and label the transport.

The engine is shared by the server, browser and eval runner. `kb/relief-guide.json` is canonical; `app/js/kb.js` is its static browser mirror. Keep them synchronized when editing. There is no persistent chat history or model usage. Source citations appear in the expandable trace and identify local KB records, not live official guidance.

## Route and capacity assumptions

Routes must be clear, sourced, not future-dated and at most six hours old. Among eligible candidates only, shorter is preferred. An unlit route is never promoted as safe. Coordinates are illustrative polylines rather than actual road routing.

Supply-chain capacity is the minimum staffing ratio. It omits inventory buffers, different worker productivity, facility constraints and demand. Stock cover assumes constant daily use and excludes inbound/reserved inventory. Both are transparent scenario calculations, not forecasts.

## Boundaries before deployment

The server binds to 127.0.0.1 and applies Host/origin checks. It has no authenticated users, production rate limiting, real database, independent verification or protected case management. Do not expose it publicly. A hosted backend needs an explicit redesign around authentication, authorization, durable storage, input schemas, observability and abuse prevention. Real emergency operations need qualified operational review and verified data sources.
