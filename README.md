# Mise Frontend

## Local Setup

1. Install dependencies:
   `npm install`
2. Create env file:
   `cp .env.example .env`
3. Ensure backend runs on `http://localhost:3001` (or update `VITE_API_URL` in `.env`).
4. Start frontend:
   `npm run dev`

## Auth Connection

- Sign up and sign in call the backend API.
- JWT is stored in local storage as `jwt`.
- App loads the current user from `GET /users/me` on refresh.
- If your API uses different paths, set these in `.env`:
  - `VITE_AUTH_SIGNUP_PATH`
  - `VITE_AUTH_SIGNIN_PATH`
  - `VITE_AUTH_ME_PATH`
