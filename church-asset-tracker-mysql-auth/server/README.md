# Server (Node + Express + Prisma) - Church Asset Tracker

## Setup (development)

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a MySQL database (PlanetScale or local) and set DATABASE_URL in `.env` (copy `.env.example`).

3. Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
```

4. Start server in dev mode:

```bash
npm run dev
```

API will run on http://localhost:5000 by default.

## Notes
- The seed script creates an admin user: admin@example.com / changeme123 (change password immediately).
- User management (create/list) is admin-only via `/api/users` endpoints.
