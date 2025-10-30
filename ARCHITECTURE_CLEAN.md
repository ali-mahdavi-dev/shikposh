## Modular Clean Architecture (Enterprise-ready)

This project follows a layered, modular Clean Architecture to keep business logic isolated, testable, and scalable.

Layers (top → bottom):

- App (Next.js UI + routing): `src/app/**`
- Features/Modules (use-cases, DTOs, mappers): `src/features/**` or `src/modules/**`
- Shared (cross-cutting UI, utils, services): `src/shared/**`
- Core (pure primitives, base types): `src/core/**`

Key rules:

- App depends on features/modules/shared/core.
- Features/Modules depend on shared/core.
- Shared depends on core only.
- Core has no dependencies upward.
- No cross-feature imports; share via `shared`.

Conventions:

- Domain: `domain/*` (entities, value objects, domain services, repository interfaces)
- Application: `application/*` (use cases, queries, commands, orchestrations)
- Infrastructure: `infrastructure/*` (adapters: http/json-server, storage, DI containers)

Path aliases:

- `@app/*`, `@features/*`, `@modules/*`, `@shared/*`, `@core/*`, `@configs/*`, `@providers/*`, `@stores/*`, `@types/*`

Lint boundaries:

- Enforced via `eslint-plugin-boundaries` in `eslint.config.mjs`.

API and repositories:

- Prefer repository interfaces in `domain` and concrete adapters in `infrastructure`.
- Centralize HTTP concerns in `shared/services/api.service.ts` and inject into repositories.

Migration guide:

1) Replace direct `src/lib/api.ts` calls with feature repository methods.
2) Keep page/routes thin; call application layer hooks/use-cases.
3) Move shared UI to `src/shared/components` and domain-agnostic utilities to `src/shared/utils`.
4) For new verticals, scaffold `src/modules/<name>/{domain,application,infrastructure}`.


