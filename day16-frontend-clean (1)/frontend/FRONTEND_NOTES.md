# Burrow & Bloom — Pet Wellness Console

A React (Vite) frontend built for the `day16` Spring Boot backend (Pet Wellness
Clinic API). Covers every module exposed by the backend with full CRUD.

## Modules

| Module | Backend endpoint |
| --- | --- |
| Auth (login/register) | `/api/auth`, `/api/roles` |
| Pets | `/api/pets` |
| Consultant Availability | `/api/consultants` |
| Emergency Contacts | `/api/emergency-contacts` |
| Insurance Policies | `/api/policies` |
| Therapy Progress | `/api/therapy` |
| Treatment Records | `/api/treatments` |
| Wellness Assessments | `/api/wellness` |

## Running it

1. Start the Spring Boot backend first — it must be reachable at
   `http://localhost:8080` (the default `application.properties` port), and
   its `WebConfig` CORS policy only allows `http://localhost:5173`, so the
   frontend must run on Vite's default port.
2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open `http://localhost:5173`.

## Registering your first user

`RegisterRequest.role` must match an existing `Role` row (`AuthServiceImpl`
looks it up by name and 404s if it isn't found), and `data.sql` ships empty —
so no roles exist until you create one. The Register page handles this: it
loads `/api/roles` for the dropdown, and includes an inline "Add role" field
that calls `POST /api/roles` if the list is empty (e.g. add `ADMIN` or
`PET_OWNER` before registering).

## Structure

```
src/
  api/          fetch wrapper (attaches JWT), auth calls, generic CRUD factory
  config/       entities.js — single source of truth for every module's
                table columns + form fields (drives the generic CRUD UI)
  context/      AuthContext (session/JWT), ToastContext (notifications)
  components/   Sidebar, Topbar, Modal, ConfirmDialog, DataTable, EntityForm…
  pages/        LoginPage, RegisterPage, DashboardPage, EntityListPage
```

Every module beyond Auth/Dashboard is rendered by the same
`EntityListPage` + `EntityForm` pair, configured per-module in
`src/config/entities.js` — to add a new backend module later, add one entry
there rather than a new page.
