# FastAPI Service

Minimal README for the FastAPI backend in this repo.

## Overview
This folder contains the FastAPI backend used by the FastAPI + Next.js starter. It exposes authentication, workouts, and routines endpoints used by the frontend.

## Requirements
- Python 3.8+
- Recommended: virtual environment (venv)

## Quick setup (PowerShell)
```powershell
# from repo root or this folder
python -m venv .venv
.\.venv\Scripts\Activate
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## Run (development)
```powershell
# from FastAPI folder
python -m uvicorn api.main:app --reload --port 8000
```

## Environment variables
Create a .env (or set in your environment) with values required by the app, for example:
- SECRET_KEY
- DATABASE_URL
- ACCESS_TOKEN_EXPIRE_MINUTES

Adjust names/values according to your project code.

## Useful targets
If you prefer convenience commands see the repo root Makefile or make.ps1 for Windows:
- `make backend` or `powershell -File make.ps1 backend`

## API
Brief summary (adjust to your implementation):
- POST /auth/login — obtain access token
- POST /auth/register — create user
- GET /workouts — list workouts (protected)
- POST /workouts — create workout (protected)
- GET /routines — list routines (protected)
- POST /routines — create routine (protected)