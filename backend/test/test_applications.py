import json
from main import app, db   


def setup_module(module):
    with app.app_context():
        db.create_all()


def test_get_applications_empty():
    client = app.test_client()
    resp = client.get("/applications")
    assert resp.status_code == 200
    data = resp.get_json()
    assert isinstance(data, list)


def test_create_application_ok():
    client = app.test_client()
    payload = {
        "firstName": "Test",
        "lastName": "User",
        "gender": "female",
        "email": "test@example.com",
        "requestedAmount": 150000,
        "loanTermYears": 3,
        "loanPurpose": "car",
        "customPurpose": "",
        "gdprConsent": True,
    }
    resp = client.post(
        "/applications",
        data=json.dumps(payload),
        content_type="application/json",
    )
    assert resp.status_code == 201
    data = resp.get_json()
    assert "id" in data


def test_create_application_bad_years():
    client = app.test_client()
    payload = {
        "firstName": "Bad",
        "lastName": "Years",
        "email": "bad@example.com",
        "requestedAmount": 100000,
        "loanTermYears": 0,
    }
    resp = client.post(
        "/applications",
        data=json.dumps(payload),
        content_type="application/json",
    )
    assert resp.status_code == 400