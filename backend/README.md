# GitHub Dataset API

RESTful API for a GitHub code dataset with Node.js + Express.js + MongoDB (MVC architecture).

## Setup

```bash
npm install
cp .env.example .env   # edit MONGO_URI, JWT_SECRET
npm run seed            # import dataset into MongoDB
npm run dev             # start dev server on :5000
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Production start |
| `npm run dev` | Dev with nodemon |
| `npm run seed` | Import dataset |

## API Endpoints

| Base Path | Description |
|---|---|
| `/api/health` | Health check |
| `/api/datasets` | CRUD operations |
| `/api/datasets/filter` | Filter by type/repo/code-element |
| `/api/search` | Full-text search |
| `/api/analytics` | Distribution analytics |
| `/api/stats` | Count statistics |
| `/api/auth` | Register, login, password reset |
| `/api/jwt` | Token management |
| `/api/admin` | Admin-only (auth + admin role) |
| `/api/protected` | Authenticated user routes |
