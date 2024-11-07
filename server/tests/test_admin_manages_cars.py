# Tests for client picking up car
import sys

sys.path.append("..")
sys.path.append(".")

from app.myapp import create_app

app = create_app({"TESTING": True, "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"})


def test_valid_add_car():
    sample_data = {
        "daily_cost": "50.00",
        "id": 1,
        "image_url": "https://imgur.com/a/mT32py3",
        "make": "Toyota",
        "model": "Corolla",
        "name": "Toyota Corolla",
        "rented": False,
        "year": 2022,
    }

    with app.test_client() as client:
        response = client.post("/add_car", json=sample_data)
        assert response.status_code == 201


def test_invalid_add_car():
    sample_data = {
        "daily_cost": "50.00",
        "id": 1,
        "image_url": "https://imgur.com/a/mT32py3",
        "make": "Toyota",
        "model": "Corolla",
        "name": "Toyota Corolla",
        "rented": False,
        # missing year
    }

    with app.test_client() as client:
        response = client.post("/add_car", json=sample_data)
        assert response.status_code == 400


def test_update_daily_cost():
    sample_data = {
        "daily_cost": "50.00",
        "id": 1,
        "image_url": "https://imgur.com/a/mT32py3",
        "make": "Toyota",
        "model": "Corolla",
        "name": "Toyota Corolla",
        "rented": False,
        "year": 2022,
    }

    with app.test_client() as client:
        response = client.post("/add_car", json=sample_data)
        assert response.status_code == 201

        response = client.put("/change_car_cost/1", json={"new_cost": 60})
        assert response.status_code == 200

        response = client.get("/get_car_cost" + "/1")
        assert response.status_code == 200
        data = response.get_json()
        assert data["daily_cost"] == "60.00"
