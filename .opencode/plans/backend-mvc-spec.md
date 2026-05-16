# Backend MVC Architecture — Design Spec

## Project Overview

A Node.js + Express.js + MongoDB RESTful API backend serving a GitHub code dataset (JSON → MongoDB collection). The API exposes 100+ routes across CRUD, search, filter, analytics, stats, and authentication with JWT + role-based access control.

## Architecture

Layered MVC with middleware injection:

```
HTTP Request
  → app.js (global middleware: helmet, cors, sanitize, rateLimiter, logger)
    → routes/index.js (dispatcher)
      → Route-level middleware (auth, role, validate)
        → Controller (parse req, call service, send res)
          → Service (business logic, aggregation, orchestration)
            → Model (Mongoose schema/query)
              → MongoDB
```

### Dependency Rules (strict)
- Routes import Controllers only
- Controllers import Services only (controllers never call other controllers)
- Services import Models only
- Middlewares are independent, injected via routes or app.js
- Utils are imported anywhere needed
- No business logic in controllers
- No DB queries in controllers
- Error handling uses asyncHandler wrapper across all async functions

### Auth / JWT Boundary
- `auth.controller.login` calls `jwt.service` (not `jwt.controller`) to generate tokens
- `jwt.controller` handles standalone token operations (refresh, verify, revoke)
- Controllers never call other controllers — always route through the appropriate service

## Dataset Schema

Each entry in the JSON dataset has:

| Field | Type | Description |
|---|---|---|
| `id` | String | Unique identifier (e.g., `ultralytics/yolov5_repos/...`) |
| `instruction` | String | Instruction text describing the task |
| `input` | String | Optional input for the task |
| `output` | String | The generated code/documentation output |
| `metadata` | Object | Nested metadata |
| `metadata.type` | String | Entry type (function, class, documentation, etc.) |
| `metadata.code_element` | String | Code element type (function, class, etc.) |
| `metadata.repo_name` | String | Source repository name |
| `metadata.file_path` | String | File path within the repository |
| `metadata.source_type` | String | Always `github_repository` |
| `metadata.doc_type` | String | Documentation type (md, txt) |
| `metadata.is_readme` | Boolean | Whether it's a README file |

## Directory Structure

```
project-root/
├── server.js                  → Express app entry point, starts server after DB connection
├── app.js                     → Express app config, global middleware, route mounting
├── .env                       → Environment variables (PORT, MONGO_URI, JWT_SECRET, NODE_ENV)
├── .env.example               → Template for environment variables
├── .gitignore                 → Ignore node_modules, .env
├── package.json               → Project metadata, scripts (start, dev, seed)
├── README.md                  → Project documentation
│
└── src/
    ├── config/
    │   ├── db.js              → mongoose.connect with retry logic
    │   └── env.js             → dotenv loader + env var validation (CORS_ORIGIN, etc.)
    │
    ├── models/
    │   ├── Dataset.model.js   → Mongoose schema for dataset entries
    │   └── User.model.js      → Mongoose schema for users (name, email, hashed password, role)
    │
    ├── controllers/
    │   ├── dataset.controller.js    → getAll, getById, create, update, delete, bulkCreate, checkExistence
    │   ├── auth.controller.js       → register, login, logout, forgotPassword, resetPassword
    │   ├── jwt.controller.js        → generateToken, refreshToken, verifyToken, revokeToken
    │   ├── search.controller.js     → searchDatasets (full-text across instruction/input/output)
    │   ├── filter.controller.js     → filterByType, filterByRepo, filterByCodeElement, filterBySource, filterByDocType, combinedFilter
    │   ├── analytics.controller.js  → getRepoDistribution, getTypeDistribution, getCodeElementDistribution, getSourceDistribution
    │   ├── stats.controller.js      → totalCount, countByType, countByRepo, countByCodeElement, recentEntries
    │   └── health.controller.js     → healthCheck (DB status, uptime, response time)
    │
    ├── services/
    │   ├── dataset.service.js    → CRUD, pagination, sorting, field selection, existence checks
    │   ├── search.service.js     → MongoDB text search across instruction/input/output with relevance scoring
    │   ├── filter.service.js     → Dynamic MongoDB filter builder from query params, combined filters
    │   ├── auth.service.js       → Register, login, password hashing, password reset token generation
    │   ├── jwt.service.js        → JWT sign/verify/refresh/revoke (called by auth.controller.login)
    │   ├── email.service.js      → Nodemailer transport, send password reset email (or return token directly if no mailer configured)
    │   ├── analytics.service.js  → MongoDB $group/$bucket aggregation pipelines
    │   └── stats.service.js      → countDocuments queries and aggregate stats
    │
    ├── routes/
    │   ├── index.js              → Central aggregator, mounts all routers with base paths (filter BEFORE datasets to avoid :id conflict); conditionally guards middleware.routes behind NODE_ENV !== 'production'
    │   ├── dataset.routes.js     → /api/datasets (CRUD, bulk, check)
    │   ├── search.routes.js      → /api/search (full-text search)
    │   ├── filter.routes.js      → /api/datasets/filter (mounted BEFORE dataset.routes to avoid :id = 'filter' conflict)
    │   ├── analytics.routes.js   → /api/analytics (distribution pipelines)
    │   ├── stats.routes.js       → /api/stats (count queries)
    │   ├── auth.routes.js        → /api/auth (register, login, password reset)
    │   ├── jwt.routes.js         → /api/jwt (token management)
    │   ├── admin.routes.js       → /api/admin (admin-only endpoints)
    │   ├── protected.routes.js   → /api/protected (any authenticated user)
    │   ├── health.routes.js      → /api/health (DB status, uptime — no auth)
    │   └── middleware.routes.js  → /api/middleware (demo routes, guarded: only mounted in non-production)
    │
    ├── middlewares/
    │   ├── auth.middleware.js     → JWT verification, attaches req.user
    │   ├── role.middleware.js     → Factory: authorize('admin') — checks role
    │   ├── logger.middleware.js   → Structured logging via winston (console transport, log levels)
    │   ├── error.middleware.js    → Global error handler (4xx/5xx), returns apiResponse
    │   ├── validate.middleware.js → Factory: takes validator fn, runs on req.body/query/params
    │   ├── rateLimiter.middleware.js  → express-rate-limit configuration
    │   ├── cors.middleware.js     → CORS origin read from env, credentials, allowed methods
    │   └── sanitize.middleware.js → express-mongo-sanitize configuration (prevents NoSQL injection via $ operators)
    │
    ├── utils/
    │   ├── asyncHandler.js    → Wraps async route handlers, forwards errors to next()
    │   ├── apiResponse.js     → Standardized { success, message, data, error, meta }
    │   ├── pagination.js      → Computes skip, limit, totalPages from query params
    │   ├── filterBuilder.js   → Converts query params to MongoDB filter objects
    │   ├── jwtHelper.js       → Thin wrappers around jsonwebtoken sign/verify/decode
    │   └── logger.js          → Winston logger instance (console transport, level from NODE_ENV)
    │
    ├── validators/
    │   ├── dataset.validator.js  → Validates dataset fields on create/update
    │   └── auth.validator.js     → Validates email format, password strength, login body
    │
    ├── seeders/
    │   └── dataset.seeder.js     → Reads GITHUB dataset.json, inserts into MongoDB
    │
    └── constants/
        └── enums.js              → Frozen objects: TYPES, CODE_ELEMENTS, SOURCES, DOC_TYPES, ROLES
```

## Route Map

| Route File | Base Path | Auth Required |
|---|---|---|---|
| health.routes.js | `/api/health` | Public |
| filter.routes.js | `/api/datasets/filter` | Public (mounted BEFORE dataset routes) |
| dataset.routes.js | `/api/datasets` | Read: public; Write: auth |
| search.routes.js | `/api/search` | Public |
| analytics.routes.js | `/api/analytics` | Public (or optional) |
| stats.routes.js | `/api/stats` | Public |
| auth.routes.js | `/api/auth` | Public |
| jwt.routes.js | `/api/jwt` | Auth required |
| admin.routes.js | `/api/admin` | Auth + admin role |
| protected.routes.js | `/api/protected` | Auth required |
| middleware.routes.js | `/api/middleware` | Mixed (dev-only, guarded by NODE_ENV) |

**Mount order in `routes/index.js`:** health → filter → dataset → search → analytics → stats → auth → jwt → admin → protected → middleware (dev only). This prevents `/api/datasets/filter` from being captured by `dataset.routes.js`'s `/:id` param.

## Middleware Chain

```
Global (app.js):         helmet → cors → sanitize → rateLimiter → logger → routes → error
Per-route (in route file): [auth] → [role] → [validate] → controller handler
```

## Response Format

All responses use the `apiResponse` utility:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "error": null,
  "meta": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 }
}
```

## Scripts (package.json)

| Script | Command |
|---|---|
| `start` | `node server.js` |
| `dev` | `nodemon server.js` |
| `seed` | `node src/seeders/dataset.seeder.js` |

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | JWT signing secret |
| `JWT_EXPIRES_IN` | Token expiry (default: 7d) |
| `NODE_ENV` | Environment (development/production) |
| `CORS_ORIGIN` | Allowed CORS origin (default: http://localhost:3000) |
| `SMTP_HOST` | SMTP server for password reset emails |
| `SMTP_PORT` | SMTP port |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `RATE_LIMIT_WINDOW` | Rate limit window in ms (default: 900000 = 15 min) |
| `RATE_LIMIT_MAX` | Max requests per window (default: 100) |
