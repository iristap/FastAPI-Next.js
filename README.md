# FastAPI + Next.js Starter

This repository contains a small starter project that pairs a FastAPI backend with a Next.js frontend.

Features
- FastAPI backend for authentication, workouts, and routines.
- Next.js frontend (app directory) with client-side authentication context and protected routes.
- Examples of protected API calls from the frontend using axios.

Quick start

1. Backend (FastAPI)

   - Create and activate a Python virtual environment.
   - Install dependencies from `FastAPI/requirements.txt` or `pyproject.toml`.
   - Start the backend (example):

     ```powershell
     cd FastAPI
     uvicorn api.main:app --reload
     ```

2. Frontend (Next.js)

   - Install dependencies and start the dev server:

     ```powershell
     cd nextjs
     npm install
     npm run dev
     ```

Makefile (convenience)

This repository includes a top-level `Makefile` with convenient targets:

- `make install` — install backend and frontend dependencies
- `make backend-install` — create Python venv and install backend deps
- `make frontend-install` — install frontend npm packages
- `make backend` — run backend (uvicorn)
- `make frontend` — run frontend (next dev)
- `make dev` — attempt to run both (requires `concurrently` to be installed)
- `make clean` — remove venv and Next build artifacts

Windows (PowerShell) notes

On Windows you may not have `make` available. Use these PowerShell commands instead:

```powershell
# Backend setup and run
python -m venv .venv
# .\.venv\Scripts\Activate
pip install --upgrade pip
pip install -r FastAPI/requirements.txt
uvicorn api.main:app --reload --port 8000

# Frontend setup and run (separate shell)
cd nextjs
npm install
npm run dev
```

Credits

This project was built with reference to a community tutorial:

- YouTube: "FastAPI + Next.js Authentication Tutorial" — https://www.youtube.com/watch?v=g566eI2EmeY

License

This repository is provided as-is. Adjust licensing to match your needs.# FastAPI + Next.js Starter

This repository contains a small starter project that pairs a FastAPI backend with a Next.js frontend.

Features
- FastAPI backend for authentication, workouts, and routines.
- Next.js frontend (app directory) with client-side authentication context and protected routes.
- Examples of protected API calls from the frontend using axios.

Quick start

1. Backend (FastAPI)

	 - Create and activate a Python virtual environment.
	 - Install dependencies from `FastAPI/requirements.txt` or `pyproject.toml`.
	 - Start the backend (example):

		 ```powershell
		 cd FastAPI
		 uvicorn api.main:app --reload
		 ```

2. Frontend (Next.js)

	 - Install dependencies and start the dev server:

		 ```powershell
		 cd nextjs
		 npm install
		 npm run dev
		 ```

Credits

This project was built with reference to a community tutorial:

- YouTube: "FastAPI + Next.js Authentication Tutorial" — https://www.youtube.com/watch?v=g566eI2EmeY

