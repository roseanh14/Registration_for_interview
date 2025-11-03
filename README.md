 This app is a tiny demo of a registration flow: a React (Vite) frontend talks to a Flask + SQLAlchemy API that stores data in SQLite. 
 Run backend: cd backend && pip install -r requirements.txt && python main.py (API on http://127.0.0.1:5000, CORS allows http://localhost:5173). 
 Run frontend: cd frontend && npm install && npm run dev (opens on http://localhost:5173). 
 The form components (e.g., Personal/Loan sections) lift state to the parent and send JSON to the API, showing how the piece fits the overall architecture. 
 Tests: backend with pytest, frontend with npm test

 The showcased component (form sections like LoanSection) lifts state to the parent, sends JSON to the API, 
 and its data appears in the submissions table/detail—demonstrating how the piece fits the whole system.
