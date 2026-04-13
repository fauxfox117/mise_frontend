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

## Realtime Table Status

- Dashboard subscribes to websocket updates for table status changes.
- Configure these in `.env` when needed:
  - `VITE_WS_URL`
  - `VITE_TABLES_STATUS_PATH`
  - `VITE_TABLE_UPDATE_PATH`
  - `VITE_TOAST_SYNC_PATH`
