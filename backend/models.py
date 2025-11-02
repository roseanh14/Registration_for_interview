from datetime import datetime, timezone
from config import db

class LoanApplication(db.Model):
    __tablename__ = "loan_applications"

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
    )

    first_name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    gender = db.Column(db.String(20))
    email = db.Column(db.String(255), nullable=False)

    requested_amount = db.Column(db.Float, nullable=False)
    loan_term_years = db.Column(db.Integer, nullable=False)
    loan_purpose = db.Column(db.String(120))
    custom_purpose = db.Column(db.Text)
    status = db.Column(db.String(20), default="pending")

    def to_dict(self):
        return {
            "id": self.id,
            "created_at": self.created_at.isoformat(),
            "first_name": self.first_name,
            "last_name": self.last_name,
            "gender": self.gender,
            "email": self.email,
            "requested_amount": self.requested_amount,
            "loan_term_years": self.loan_term_years,
            "loan_purpose": self.loan_purpose,
            "custom_purpose": self.custom_purpose,
            "status": self.status,
        }