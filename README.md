# BloomHub API

BloomHub is a lightweight project-tracking web app backend built with Express.js and MongoDB. It provides user authentication, role-based access control, and a small admin dashboard — plus a simple web UI built with EJS and Tailwind for listing and managing projects.

This README reflects the current features implemented in the repository.

## Key features

- User registration and login using JWT (tokens are also stored in cookies to support browser pages).
- Role-based authorization: `admin`, `member`, and `user` roles with middleware guards.
- Admin dashboard with CRUD for users and projects.
- Project CRUD for authenticated users (create, update, delete own projects).
- Image upload for projects (stored under `src/public/uploads` and served at `/uploads/<filename>`).
- EJS views with Tailwind-based UI for home, projects list, login/register, and admin dashboard.

## Tech stack

- Node.js (ES Modules)
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- Multer for file uploads
- EJS + Tailwind CSS for the server-rendered UI

## Quick start

1. Clone the repo and install dependencies

```powershell
git clone https://github.com/2Saly2/bloomhub-api.git
cd bloomhub-api
npm install
```

2. Create a `.env` file at the project root. Example variables used by this project:

```ini
PORT=5000
MONGO_URL=mongodb://localhost:27017/bloomhub
JWT_SECRET=change_me_to_a_strong_secret
JWT_EXPIRES_IN=7d
```

3. (Optional) Create an admin user quickly:

```powershell
npm run create-admin
```

4. Start the dev server

```powershell
npm run dev
```

The server will start at `http://localhost:5000` by default.

## Important routes and pages

- Web pages (EJS views):
  - `/` — Home page (now shows latest projects)
  - `/projects` — Projects listing with create/edit modals and image upload
  - `/admin` — Admin dashboard (requires admin role)
  - `/auth/login` and `/auth/register` — Authentication pages

- API endpoints (selected):
  - `POST /auth/register` — Register a new user
  - `POST /auth/login` — Login (returns JWT and sets cookie)
  - `GET /projects` — List projects (public view or user-scoped)
  - `POST /projects` — Create a project (authenticated; supports `multipart/form-data` with `image`)
  - `PUT /projects/:id` — Update a project (authenticated; supports replacing image)
  - `DELETE /projects/:id` — Delete a project (authenticated)
  - `GET /admin` — Admin dashboard (authenticated, admin-only)

Notes about uploads

- Uploaded images are placed at `src/public/uploads` and served statically from the `/uploads` path.
- The front-end create/edit forms send `FormData` (with file field name `image`) and the server uses Multer to process uploads.

Security and validation

- Passwords are hashed with `bcryptjs`.
- JWTs are signed with `JWT_SECRET` from `.env` and can be provided in the `Authorization: Bearer <token>` header or via cookie.
- Currently the server accepts image uploads but does not yet enforce strict server-side file type or size limits — consider adding Multer validation and max file size (e.g., 2–5 MB) before production.

Project structure (high level)

```
src/
  main.js                # App entry point
  databases/
    connect-mongo.js     # MongoDB connection helper
  middlewares/
    auth.js              # JWT + cookie auth
    roles.js             # Role guard middleware
    populateUser.js      # Loads user for views
  routes/
    index.js             # Main router (/, /auth, /projects, /admin)
    auth/                # Auth routes
    project/             # Project CRUD routes (includes multer usage)
    admin/               # Admin CRUD routes
  modules/
    auth/                # User model & auth services
    project/             # Project model & services
  views/                 # EJS templates (layout, home, projects, dashboard...)
  public/                # Static assets
    uploads/             # Uploaded project images
```

Development notes & tips

- The codebase uses import aliases (`#@/`) mapped in `package.json`.
- To create an admin user quickly, use `npm run create-admin`. The script creates `admin@bloomhub.com` with password `admin123` (change this in production).
- When updating project images, the previous file is not removed automatically. We can add automatic cleanup if you want.

Next enhancements you might want

- Server-side validation for uploads (file type/size), plus thumbnail generation using Sharp.
- Delete or garbage-collect replaced images.
- Add pagination or infinite-scroll to `/projects` and `/`.
- Add unit/integration tests for routes and services.

License

