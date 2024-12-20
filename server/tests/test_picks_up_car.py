# Tests for client picking up car
import sys

sys.path.append("..")
sys.path.append(".")

from ..app import create_app

app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})


def test_start():
    with app.test_client() as client:
        response = client.get("/")
        assert response.status_code == 200


def test_create_reservation():
    sample_data = {
        "start_date": "10/04/24",
        "end_date": "10/05/24",
        "start_time": "10:00:00",
        "end_time": "18:00:00",
        "pickup_location": "Location A",
        "dropoff_location": "Location B",
    }

    with app.test_client() as client:
        response = client.post("/create_reservation", json=sample_data)
        assert response.status_code == 201


def test_create_reservation_missing_fields():
    sample_data = {
        "start_date": "10/04/24",
        "end_date": "10/05/24",
        "start_time": "10:00:00",
        "end_time": "18:00:00",
        "pickup_location": "Location A",
        # Missing dropoff_location
    }
    with app.test_client() as client:
        response = client.post("/create_reservation", json=sample_data)
        assert response.status_code == 400
        assert response.get_json() == {"error": "Missing required fields"}


def test_create_reservation_invalid_date_format():
    sample_data = {
        "start_date": "10/05/2024",
        "end_date": "10/03/2024",
        "start_time": "10:00:00",
        "end_time": "18:00:00",
        "pickup_location": "Location A",
        "dropoff_location": "Location B",
    }
    with app.test_client() as client:
        response = client.post("/create_reservation", json=sample_data)
        assert response.status_code == 400


def test_create_valid_bill():
    valid_bill_data = {
        "totalcost": 366.63,
        "isPayed": False,
        "inPerson": False,
        "credit_card": 1234567890123456,
        "card_name": "John Doe",
        "card_expiration_data": "12/23",
        "card_cvc": 123,
    }

    with app.test_client() as client:
        response = client.post("/create_bill", json=valid_bill_data)
        assert response.status_code == 201
