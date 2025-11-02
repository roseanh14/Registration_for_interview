from flask import request, jsonify
from config import app, db
from models import LoanApplication

# create tables at startup
with app.app_context():
    db.create_all()


@app.route("/applications", methods=["POST"])
def create_application():
    data = request.get_json()

    required = ["firstName", "lastName", "email", "requestedAmount", "loanTermYears"]
    missing = [f for f in required if f not in data or data[f] in ("", None, " ")]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    # validate  years
    try:
        years = int(data.get("loanTermYears"))
    except (TypeError, ValueError):
        return jsonify({"error": "loanTermYears must be a number"}), 400

    if years <= 0:
        return jsonify({"error": "loanTermYears must be greater than 0"}), 400

    # validate amount
    try:
        amount = float(data.get("requestedAmount"))
    except (TypeError, ValueError):
        return jsonify({"error": "requestedAmount must be a number"}), 400

    # create db object 
    app_obj = LoanApplication(
        first_name=data.get("firstName"),
        last_name=data.get("lastName"),
        gender=data.get("gender"),
        email=data.get("email"),
        requested_amount=amount,
        loan_term_years=years,
        loan_purpose=data.get("loanPurpose"),
        custom_purpose=data.get("customPurpose"),
        status="pending",  # default state
    )

    db.session.add(app_obj)
    db.session.commit()

    return (
        jsonify(
            {
                "id": app_obj.id,
                "created_at": app_obj.created_at.isoformat(),
            }
        ),
        201,
    )


@app.route("/applications", methods=["GET"])
def list_applications():
    apps = LoanApplication.query.order_by(LoanApplication.created_at.desc()).all()
    return jsonify([a.to_dict() for a in apps]), 200


# endpoint to change status
@app.route("/applications/<int:app_id>/status", methods=["PATCH"])
def update_application_status(app_id):
    data = request.get_json()
    new_status = data.get("status")

    if new_status not in ("pending", "approved", "rejected"):
      return jsonify({"error": "status must be one of: pending, approved, rejected"}), 400

    app_obj = LoanApplication.query.get_or_404(app_id)
    app_obj.status = new_status
    db.session.commit()

    return jsonify(app_obj.to_dict()), 200


if __name__ == "__main__":
    # run Flask app
    app.run(host="0.0.0.0", port=5000, debug=True)