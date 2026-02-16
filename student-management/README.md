Student Management System
=========================

Full-stack Student Management System (React + Vite frontend, Django + DRF backend) with CRUD operations and Supabase (Postgres) as the database.

Quick start

Backend

1. Create a Python virtualenv and activate it.
2. Install: `pip install -r backend/requirements.txt`
3. Set `DATABASE_URL` to your Supabase Postgres connection string (see `database/database.sql`).
4. Run migrations: `python backend/manage.py migrate`
5. Start server: `python backend/manage.py runserver`

Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

Notes

- The backend reads `DATABASE_URL` env var. Configure CORS origins in `config/settings.py` for local dev.
- See `database/database.sql` for table schema suitable for Supabase.

Project structure

student-management-system/
  - frontend/ (React + Vite)
  - backend/ (Django + DRF)
  - database/database.sql
