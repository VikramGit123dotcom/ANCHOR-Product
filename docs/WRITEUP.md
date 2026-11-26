# Anchor: helping coordinators see the next useful action

## The problem I chose

Relief coordination is not only about counting available resources. Supplies can be waiting at a port while transport lacks drivers, or a hospital can have medicine but too few staff to deliver care. Separate lists do not show where a dependency is holding everything else back.

Anchor is a Chennai-focused relief coordination prototype that brings those dependencies into one place. I am proud of the idea because it turns a broad, difficult problem into concrete questions: what is the bottleneck, what information is uncertain, and what can a coordinator review next?

## What makes the approach different

The starting point is a weakest-link view of a supply chain. Each stage has an available and required crew count; the lowest ratio highlights a constraint. In the fictional food-chain scenario, the port stage has 12 of 40 workers, giving a 30% staffing ratio. This is a transparent demonstration, not a claim about actual Chennai operations or a universal effect of workforce loss.

The dashboard combines that view with stock-cover calculations, a fictional volunteer registry and a request lifecycle. A local Node backend persists requests, records structured audit events and rejects updates made against an outdated version. The frontend remains plain HTML, CSS and JavaScript so a reviewer can run and inspect it easily.

## How I used AI, and what the assistant does

I used AI assistance to develop this submission package from the original Anchor HTML, including code organization, implementation, documentation and evaluation scaffolding. The package makes that assistance explicit rather than presenting every addition as unaided work.

The Anchor Assistant demonstrates conversational workflow design through deterministic intent rules, read-only tools and a small local knowledge base. Questions about stock, routes and skill gaps produce visible tool traces. Procedural answers identify the retrieved source records. Selected Tamil intents and a short-reply mode demonstrate accessibility choices; a shared browser engine provides a fallback when the local API is unavailable.

This is not a connected LLM or an Edgechat deployment. The prompt folder documents the intended behavior contract, while executable rules implement it. This distinction matters: I want the reviewer to see exactly what the project can do today and what still needs a model integration.

## Reliability and boundaries

I included reproducible evaluations for tool selection, retrieval sources, supported Tamil queries, unsupported questions and refusal examples, plus tests for route selection, validation, persistence and concurrency. The accompanying results report records the actual run; it is an authored regression suite, not an independent benchmark or proof of real-world safety.

The package also addresses misleading prototype behavior. Call-ups and assignments are labeled as simulated. Routes marked blocked, unlit, unknown, unsourced or stale are excluded from automatic candidate selection. Child placement and fictional counselling bookings are removed. The assistant does not dispatch teams, register volunteers from chat or claim that help is on its way.

## What I would build next

My next step would be a server-side LLM adapter with validated tool arguments and evaluation against this deterministic baseline. I would then add authenticated roles, a transactional database, consent-aware notifications and better bilingual evaluation before considering shared operational use. Offline synchronization and verified routing need their own design and testing.

What makes Anchor special to me is the connection between an understandable systems model and a practical conversational interface. It demonstrates how I approach an ambiguous problem: make dependencies visible, keep the reasoning inspectable, and be honest about uncertainty and unfinished capabilities.

Repository: https://github.com/VikramGit123dotcom/ANCHOR-Product

Run instructions, measured evaluation results and implementation details are included in the repository.
