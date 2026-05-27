# GitHub Dataset API

A production-ready RESTful API for querying, analyzing, and managing a large-scale GitHub code dataset. Built with **Node.js**, **Express 4**, and **MongoDB** following a clean layered architecture with JWT-based authentication, role-based access control, rate limiting, and comprehensive analytics.

> **Postman Documentation:** [https://documenter.getpostman.com/view/50839202/2sBXwmRDDH](https://documenter.getpostman.com/view/50839202/2sBXwmRDDH)

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 4.21 |
| Database | MongoDB + Mongoose 8.6 |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Validation | express-validator |
| Rate Limiting | express-rate-limit |
| Logging | morgan |

## Architecture

The API follows a **layered (MVC-inspired) architecture**:

```
Route (HTTP) → Middleware (auth/validation/rate-limit) → Controller → Service → Model (Mongoose)
```

- **Routes** define endpoints and attach middleware chains
- **Middlewares** handle cross-cutting concerns: JWT verification, role authorization, request validation, rate limiting, error handling
- **Controllers** marshal request/response and delegate to services
- **Services** encapsulate business logic and database queries
- **Models** define Mongoose schemas with validation, indexes, and lifecycle hooks
- **Utils** provide reusable helpers for responses, pagination, filtering, and JWT operations

## Project Structure

```
backend/
  server.js                  # Entry point: DB connect + server start
  app.js                     # Express app setup (cors, morgan, json, routes, error handler)
  src/
    config/                  # Environment config & DB connection
    constants/               # Enum definitions for models
    controllers/             # Request handlers (7 controllers)
    middlewares/             # auth, role, validate, rateLimiter, error
    models/                  # Dataset & User schemas
    routes/                  # Route definitions (9 route modules)
    services/                # Business logic (7 services)
    utils/                   # Async handler, responses, filter builder, JWT helper, pagination
    validators/              # express-validator rules (auth, dataset)
    seeders/                 # MongoDB seed script
```

## Setup

```bash
npm install
cp .env.example .env   # edit MONGO_URI, JWT_SECRET, JWT_EXPIRES_IN
npm run seed            # import GITHUB dataset.json into MongoDB
npm run dev             # start dev server on :5000
```

### Scripts

| Command | Description |
|---|---|
| `npm start` | Production start |
| `npm run dev` | Dev with nodemon (auto-restart) |
| `npm run seed` | Seed MongoDB from JSON dataset |

## API Endpoints

All endpoints are prefixed with `/api/v1` (default: `http://localhost:5000/api/v1`).

| Module | Base Path | Description | Auth |
|---|---|---|---|
| Health | `/api/v1/health` | Server health check | -- |
| Auth | `/api/v1/auth` | Register, login, password reset, profile | Mixed |
| Datasets | `/api/v1/datasets` | CRUD + bulk operations | Mixed |
| Filters | `/api/v1/datasets/filter` | Predefined dataset filters | -- |
| Search | `/api/v1/search` | Full-text search | -- |
| Analytics | `/api/v1/analytics` | Aggregation & distribution analytics | -- |
| Stats | `/api/v1/stats` | Count & distinct-value statistics | -- |
| JWT | `/api/v1/jwt` | Token generation, verification, refresh | Mixed |
| Admin | `/api/v1/admin` | Admin-protected operations | Admin |
| Protected | `/api/v1/protected` | Legacy JWT-protected routes | Auth |

---

### 1. Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/health` | Server uptime, environment, timestamp |

### 2. Authentication (`/api/v1/auth`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | -- | Register a new user |
| POST | `/auth/login` | -- | Login (rate-limited: 10 req/15min) |
| POST | `/auth/logout` | -- | Stateless logout |
| GET | `/auth/profile` | JWT | Get current user profile |
| PATCH | `/auth/profile` | JWT | Update name/email |
| POST | `/auth/change-password` | JWT | Change password (requires old password) |
| POST | `/auth/forgot-password` | -- | Request password reset OTP |
| POST | `/auth/reset-password` | -- | Reset password with OTP |
| POST | `/auth/send-otp` | -- | Send email verification OTP |
| POST | `/auth/verify-email` | -- | Verify email address |

### 3. JWT Token Management (`/api/v1/jwt`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/jwt/generate-token` | JWT | Generate a new JWT |
| POST | `/jwt/verify-token` | -- | Verify and decode a JWT |
| POST | `/jwt/refresh-token` | -- | Re-sign an existing JWT |
| DELETE | `/jwt/revoke-token` | -- | Stateless token revocation |
| GET | `/jwt/profile` | JWT | Token owner profile |
| GET | `/jwt/dashboard` | JWT | Dashboard stub |
| GET | `/jwt/private-datasets` | JWT | Protected dataset access |
| GET | `/jwt/private-analytics` | JWT + Admin | Admin-only analytics |

### 4. Datasets CRUD (`/api/v1/datasets`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/datasets` | -- | List all datasets (paginated, filterable, sortable) |
| POST | `/datasets` | JWT | Create a new dataset |
| GET | `/datasets/random` | -- | Single random dataset |
| GET | `/datasets/trending` | -- | Top 10 repos by entry count |
| GET | `/datasets/sort/recent` | -- | Latest 20 datasets |
| GET | `/datasets/type/:type` | -- | Filter by type (function, class, etc.) |
| GET | `/datasets/repo/:repo` | -- | Filter by repository name |
| GET | `/datasets/check/:id` | -- | Check if a dataset ID exists |
| GET | `/datasets/:id` | -- | Get single dataset by ID |
| PUT | `/datasets/:id` | JWT | Full replacement |
| PATCH | `/datasets/:id` | JWT | Partial update |
| DELETE | `/datasets/:id` | JWT | Soft-delete (sets isDeleted: true) |
| POST | `/datasets/bulk-create` | JWT | Insert many datasets at once |
| PATCH | `/datasets/bulk-update` | JWT | Update many by filter |
| DELETE | `/datasets/bulk-delete` | JWT | Soft-delete many by IDs |

### 5. Dataset Filters (`/api/v1/datasets/filter`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/datasets/filter/functions` | All datasets of type=function |
| GET | `/datasets/filter/classes` | All datasets of type=class |
| GET | `/datasets/filter/documentation` | All datasets of type=documentation |
| GET | `/datasets/filter/readme` | All datasets where isReadme=true |
| GET | `/datasets/filter/python` | All datasets with language=python |
| GET | `/datasets/filter/ai` | All datasets with category=ai |
| GET | `/datasets/filter/ml` | All datasets with category=ml |
| GET | `/datasets/filter/github` | All datasets with source=github_repository |
| GET | `/datasets/filter/frameworks` | Filter by framework (?framework=) |
| GET | `/datasets/filter/docstrings` | All datasets of type=docstring_generation |

### 6. Full-Text Search (`/api/v1/search`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/search/datasets` | Regex search across type/repo/instruction/input/output (?q=) |

Rate-limited: 50 req/15min.

### 7. Analytics (`/api/v1/analytics`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/analytics/datasets/type-analysis` | Count by type dimension |
| GET | `/analytics/datasets/repo-analysis` | Top 20 repos by count |
| GET | `/analytics/datasets/source-analysis` | Count by source |
| GET | `/analytics/datasets/framework-analysis` | Count by framework |
| GET | `/analytics/datasets/language-analysis` | Count by language |
| GET | `/analytics/datasets/code-analysis` | Count by codeElement |
| GET | `/analytics/datasets/doc-analysis` | Count by docType |
| GET | `/analytics/datasets/readme-analysis` | Readme count by repo |
| GET | `/analytics/datasets/ml-analysis` | ML counts by framework |
| GET | `/analytics/datasets/ai-analysis` | AI counts by task |

### 8. Statistics (`/api/v1/stats`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats/datasets/count` | Total non-deleted datasets |
| GET | `/stats/datasets/functions` | Count of type=function |
| GET | `/stats/datasets/classes` | Count of type=class |
| GET | `/stats/datasets/documentation` | Count of type=documentation |
| GET | `/stats/datasets/readme` | Count of isReadme=true |
| GET | `/stats/datasets/repos` | Distinct repos count |
| GET | `/stats/datasets/languages` | Distinct languages count |
| GET | `/stats/datasets/frameworks` | Distinct frameworks count |
| GET | `/stats/datasets/github` | Count of source=github_repository |
| GET | `/stats/datasets/ai` | Count of category=ai |

### 9. Admin (`/api/v1/admin`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/admin/datasets` | JWT + Admin | Admin list all datasets (rate-limited: 20 req/15min) |
| GET | `/admin/analytics` | JWT + Admin | Admin combined analytics |

### 10. Protected (Legacy) (`/api/v1/protected`)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/protected/datasets` | JWT | Create dataset (alternative route) |
| PATCH | `/protected/datasets/:id` | JWT | Partial update (alternative route) |
| DELETE | `/protected/datasets/:id` | JWT | Soft-delete (alternative route) |

## Data Models

### Dataset

| Field | Type | Constraints |
|---|---|---|
| type | String | required, enum: function, class, documentation, function_implementation, class_implementation, docstring_generation |
| repo | String | required |
| source | String | required, enum: github_repository |
| docType | String | enum: md, rst, txt |
| codeElement | String | enum: function, class, module |
| isReadme | Boolean | default: false |
| language | String | enum: python, javascript, typescript, java, go, rust, cpp, csharp, ruby, php |
| framework | String | enum: pytorch, tensorflow, django, flask, transformers, spacy, numpy, pandas, scikit-learn, opencv |
| category | String | enum: ai, ml, github, documentation, nlp, computer_vision, audio, reinforcement_learning, data_pipeline |
| instruction | String | required |
| input | String | required |
| output | String | required |
| isDeleted | Boolean | default: false |

Indexed on: type, repo, source, language, framework, category, isDeleted.

### User

| Field | Type | Constraints |
|---|---|---|
| name | String | required, trimmed |
| email | String | required, unique, lowercase |
| password | String | required, minlength 6, excluded from queries by default |
| role | String | enum: user, admin, default: user |
| isVerified | Boolean | default: false |
| otp | String | for password reset |
| otpExpiry | Date | 15-minute expiry |

Password is automatically hashed via bcrypt (salt rounds: 10) on save. Provides `comparePassword(candidate)` method.

## Middleware

| Middleware | Purpose |
|---|---|
| `verifyJWT` | Extracts and verifies Bearer token, attaches `req.user` |
| `requireRole(...roles)` | Restricts access by role (admin, user) |
| `validateMiddleware` | Runs express-validator rules, returns 400 on failure |
| `generalLimiter` | 100 requests per 15 min (global) |
| `authLimiter` | 10 requests per 15 min (login) |
| `searchLimiter` | 50 requests per 15 min (search) |
| `adminLimiter` | 20 requests per 15 min (admin) |
| `errorMiddleware` | Global error handler; handles ValidationError, duplicate keys, CastError, JWT errors |

## Response Format

All API responses follow a consistent structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```
