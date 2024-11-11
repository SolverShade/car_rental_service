from flask import Blueprint, request, jsonify
from server.models.car import Car
from server.extensions import db
from datetime import datetime

car_bp = Blueprint("car", __name__)


@car_bp.route("/add_car", methods=["POST"])
def add_car():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        new_car = Car(
            name=data["name"],
            make=data["make"],
            model=data["model"],
            year=data["year"],
            daily_cost=data["daily_cost"],
            rented=data["rented"],
            image_url=data["image_url"],
        )
        db.session.add(new_car)
        db.session.commit()
        return jsonify({"message": "Car added successfully", "car_id": new_car.id}), 201
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@car_bp.route("/list_cars", methods=["GET"])
def list_cars():
    try:
        cars = Car.query.all()
        cars_list = [
            {
                "id": car.id,
                "name": car.name,
                "make": car.make,
                "model": car.model,
                "year": car.year,
                "daily_cost": car.daily_cost,
                "rented": car.rented,
                "image_url": car.image_url,
            }
            for car in cars
        ]
        return jsonify(cars_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@car_bp.route("/remove_car/<int:car_id>", methods=["DELETE"])
def remove_car(car_id):
    try:
        car = Car.query.get(car_id)
        if not car:
            return jsonify({"error": "Car not found"}), 404

        db.session.delete(car)
        db.session.commit()
        return jsonify({"message": "Car removed successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@car_bp.route("/change_car_cost/<int:car_id>", methods=["PUT"])
def change_car_cost(car_id):
    data = request.get_json()
    if not data or "new_cost" not in data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        car = db.session.get(Car, car_id)
        if not car:
            return jsonify({"error": "Car not found"}), 404

        car.daily_cost = data["new_cost"]
        db.session.commit()
        return jsonify({"message": "Car cost updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@car_bp.route("/set_car_rented/<int:car_id>", methods=["PUT"])
def change_car_rented_status(car_id):
    data = request.get_json()
    if not data or "rented" not in data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        car = Car.query.get(car_id)
        if not car:
            return jsonify({"error": "Car not found"}), 404

        car.rented = data["rented"]
        db.session.commit()
        return jsonify({"message": "Car rented status updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@car_bp.route("/get_car_cost/<int:car_id>", methods=["GET"])
def get_car_cost(car_id):
    try:
        car = db.session.get(Car, car_id)
        if not car:
            return jsonify({"error": "Car not found"}), 404

        return jsonify({"daily_cost": car.daily_cost}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
