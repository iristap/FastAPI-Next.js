# Makefile for FastAPI + Next.js project
# Usage: make <target>

PY_ENV?=.venv
PY=python
PIP=${PY} -m pip

.PHONY: help install backend-install frontend-install backend frontend dev clean

help:
	@echo "Makefile targets:"
	@echo "  install            - install both backend and frontend deps"
	@echo "  backend-install    - set up python venv and install backend deps"
	@echo "  frontend-install   - install frontend npm deps"
	@echo "  backend            - run backend (uvicorn)"
	@echo "  frontend           - run frontend (next dev)"
	@echo "  dev                - run both backend and frontend"
	@echo "  clean              - remove Python venv and Next build artifacts"

install: backend-install frontend-install

backend-install:
	@echo "Setting up Python virtual environment and installing backend requirements..."
	${PY} -m venv ${PY_ENV}
	${PIP} install --upgrade pip
	@if [ -f FastAPI/requirements.txt ]; then ${PIP} install -r FastAPI/requirements.txt; fi

frontend-install:
	@echo "Installing frontend npm packages..."
	cd nextjs && npm install

backend:
	@echo "Starting backend (uvicorn)"
	cd FastAPI && ${PY_ENV}/Scripts/activate && ${PY} -m uvicorn api.main:app --reload --port 8000

frontend:
	@echo "Starting Next.js dev server"
	cd nextjs && npm run dev

# dev: run both concurrently if `concurrently` is installed, else run in separate shells
dev:
	@echo "Starting both backend and frontend for development"
	@if command -v concurrently >/dev/null 2>&1; then \
		concurrently "cd FastAPI && ${PY_ENV}/Scripts/activate && ${PY} -m uvicorn api.main:app --reload --port 8000" "cd nextjs && npm run dev"; \
	else \
		echo "concurrently not found — run `make backend` and `make frontend` in separate terminals"; \
	fi

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf ${PY_ENV}
	@rm -rf nextjs/.next
