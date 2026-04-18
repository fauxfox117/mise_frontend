# Mise Frontend

## Final Project Submission

This repository is submitted as the completed final project deliverable.

## What This App Is About

Mise is a React-based restaurant operations app that pulls a floor plan from a POS API and updates table status in real time when service events are fired.

Core idea:

- course events can drive table state changes automatically (for example appetizers, entrees, dessert)
- servers should not need to manually update every status during service
- host and front-of-house can see more accurate live table state
- manual override remains available when delayed or incorrect data appears

Current integration direction:

- Toast for POS floor plan and table events
- Resy as a future reservation-system integration
- backend + websocket architecture so APIs can communicate in real time and keep a live connection open

## Project Pitch Video

Check out [this video](https://vimeo.com/1184207341?share=copy&fl=sv&fe=ci), where I describe my
project and some challenges I faced while building it.  The beginning of the video got clipped, sorry about that. 

## Backend Repository

[Mise_backend](https://github.com/fauxfox117/mise_backend.git)

## Current Frontend Features

- sign up and sign in UI connected to backend auth endpoints
- protected dashboard route
- websocket-powered live table updates
- manual table status controls in the dashboard
- Toast sync actions and Toast-backed floor plan rendering
- reusable React components styled with BEM naming conventions

## Local Setup

1. Install dependencies: npm install
2. Create env file: cp .env.example .env
3. Ensure backend runs on http://localhost:3001, or update VITE_API_URL
4. Start frontend: npm run dev

## Demo Login Mode

For grading and prototype demos, backend supports demo auth mode.

When backend env has DEMO_AUTH=true:

- you can sign in without a real DB user
- signin still expects valid-looking fields, so use:
  - email: demo@mise.local
  - password: password123
- frontend still receives a JWT and loads a demo user from users/me

## Environment Variables

- VITE_API_URL
- VITE_WS_URL
- VITE_AUTH_SIGNUP_PATH
- VITE_AUTH_SIGNIN_PATH
- VITE_AUTH_ME_PATH
- VITE_TABLES_STATUS_PATH
- VITE_TABLE_UPDATE_PATH
- VITE_TOAST_SYNC_PATH
- VITE_TABLES_FLOORPLAN_PATH

## Auth and Session Flow

- signin and signup call backend endpoints
- JWT is stored in local storage as jwt
- app loads current user from GET /users/me on refresh
- protected dashboard is gated by logged-in state

## Realtime and API Flow

- dashboard subscribes to websocket events for table snapshots and table updates
- sync from Toast calls backend Toast sync endpoint
- floor plan data is loaded from backend floor plan endpoint
- table status changes can be pushed manually from UI as an override path

## Prototype Scope Notes

- this is a working prototype toward an MVP
- multi-restaurant support is designed around one profile per restaurant
- a full production-ready onboarding flow and reservation integration are future phases
