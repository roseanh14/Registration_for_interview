# Registration Flow Demo

A tiny full‑stack demo of a registration flow: a **React (Vite)** frontend talks to a **Flask + SQLAlchemy** API persisting data in **SQLite**. It highlights *state lifting* in form sections and end‑to‑end JSON submission to the backend, with results visible in a submissions table/detail view.

---

## Tech Stack
- **Frontend:** React, Vite, 
- **Backend:** Python, Flask, SQLAlchemy
- **Database:** SQLite
- **Testing:** Pytest (backend), `npm test` (frontend)
- **Dev URLs:**
  - API: `http://127.0.0.1:5000`
  - App: `http://localhost:5173`
- **CORS:** Backend allows requests from `http://localhost:5173`

---

## Quickstart

### 1) Run the backend
```bash
cd backend
pip install -r requirements.txt
python main.py
# API served at http://127.0.0.1:5000 (CORS: http://localhost:5173)
```

### 2) Run the frontend
```bash
cd frontend
npm install
npm run dev
# App served at http://localhost:5173
```

## How the Form Works 

Form sections like **`PersonalSection`** and **`LoanSection`** are *controlled components*:
- Each section accepts `value` and `onChange` props from the parent (e.g., `RegistrationForm`).
- Local inputs call `onChange(partialUpdate)`; the parent merges to a single `formData` object.
- On submit, the parent sends the aggregated `formData` as **JSON** to the Flask API.
- After a successful POST, the new record appears in the **submissions table/detail** view.

## Testing

### Backend
```bash
cd backend
pytest -q
```

### Frontend
```bash
cd frontend
npm test
```
