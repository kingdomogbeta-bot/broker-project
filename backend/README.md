Aurex Capital - Backend skeleton

This is a minimal Express.js skeleton intended as a starting point for the project's backend.

Setup:

```bash
cd backend
npm install
npm run dev
```

Available endpoints (stubbed):
- `GET /api/health` — health check
- `GET /api/messages` — list conversations (in-memory stub)
- `POST /api/messages` — create a new message

Environment variables
- `PORT` — server port (default 4000)
- `CORS_ORIGIN` — origin allowed for CORS (example: https://your-frontend.com)

Security & production notes
- This skeleton uses an in-memory store. Replace with a real database (MongoDB, Postgres) for production.
- Do not store plaintext admin passwords in env: store hashed passwords and use a secret manager.
- Rate limiting (express-rate-limit) and basic security headers (helmet) are enabled.

Next steps:
- Replace in-memory store with a database (Postgres/Mongo)
- Add authentication (JWT) and admin routes
- Add validation and logging
