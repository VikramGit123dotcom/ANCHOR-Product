# Local API reference

Base URL: `http://127.0.0.1:3000`. JSON request/response bodies. No authenticated identity; all mutations use `local-demo-user`. Local demo only.

| Method | Path | Behavior |
|---|---|---|
| GET | `/api/health` | `{ok:true,mode:"local-demo"}` |
| GET | `/api/requests` | List local requests |
| POST | `/api/requests` | Create fictional submitted request |
| PATCH | `/api/requests/:id` | Advance/cancel using current version |
| GET | `/api/audit` | List local request events |
| POST | `/api/chat` | Stateless deterministic assistant response |

Create body:

```json
{"title":"Demo water delivery","area":"Anna Nagar","priority":"high"}
```

Returns 201 with UUID `id`, fields, `status: "submitted"`, `version: 1`, ISO creation/update timestamps. Allowed priorities: low, medium, high, critical. Title: 1-140 characters; area: 1-80; whitespace-only fields rejected.

Transition body:

```json
{"status":"verified","version":1}
```

Returns the new record with incremented version. Valid progression: submitted -> verified -> assigned -> in_progress -> completed. Every nonterminal state can also become cancelled. Invalid/stale transitions return 409, unknown IDs 404. No assignment record or resource reservation is created.

Chat body:

```json
{
  "message":"water stock",
  "short":false,
  "context":{
    "sites":[{"item":"Drinking water","site":"Demo depot","qty":100,"use":20,"unit":"L"}],
    "roads":[],
    "needs":[]
  }
}
```

Returns `{intent, answer, tools, sources, mode, promptVersion}`. Context is supplied by the browser and is not trusted live data. Message must be 1-1000 characters; body limit is 64 KiB. No chat messages are saved to disk. Source IDs resolve to records in `kb/relief-guide.json`; the backend never executes writes from assistant output.

Validation errors use `{error:"..."}`. Origin/Host violations return 403. Runtime storage errors return 500 and log a terminal error without echoing file contents. No CORS access is enabled.
