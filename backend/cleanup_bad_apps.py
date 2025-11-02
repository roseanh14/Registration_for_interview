from config import app, db
from models import LoanApplication

with app.app_context():
    bad_rows = LoanApplication.query.filter(LoanApplication.loan_term_years <= 0).all()
    print(f"Found {len(bad_rows)} bad rows.")
    for row in bad_rows:
        print(f"Deleting id={row.id}, name={row.first_name} {row.last_name}")
        db.session.delete(row)

    db.session.commit()
    print("Done ")