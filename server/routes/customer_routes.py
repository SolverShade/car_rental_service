from flask import Blueprint, request, jsonify
from app.extensions import db
from models.customer import Customer

customer_bp = Blueprint("customer", __name__)

@customer_bp.route("/create_customer", methods=["POST"])
def create_customer():
    data = request.get_json() 

    # Validate the data
    required_fields = [
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "reservation_id",
    ]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400
        
    # Create a new Customer
    new_customer = Customer(
        first_name=data["first_name"],
        last_name=data["last_name"],
        email=data["email"],
        phone_number=data["phone_number"],
        reservation_id=data["reservation_id"],
    )

    # Add the new customer to the database
    db.session.add(new_customer)
    db.session.commit()

    return jsonify({"message": "Customer created successfully"}), 201 