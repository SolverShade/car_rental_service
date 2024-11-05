# Tests for client picking up car
import sys

sys.path.append("..")
sys.path.append(".")

from app.myapp import create_app

app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})


def test_valid_login():
    sample_data = {
        "username": "Mijn",
        "password": "Password01!",
        "email": "sample@email.com",
        "first_name": "Mijn",
        "last_name": "Jin",
        "phone_number": "1111111111",
        "isAdmin": True,
    }

    with app.test_client() as client:
        response = client.post("/create_staff", json=sample_data)
        assert response.status_code == 201


def test_invalid_login():
    invalid_data = {"username": "Abs#dkx23", "password": "small"}

    with app.test_client() as client:
        response = client.post("/login", json=invalid_data)
        assert response.status_code == 401
