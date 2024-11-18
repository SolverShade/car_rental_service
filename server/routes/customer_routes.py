from flask import Blueprint, request, jsonify
from server.extensions import db
from ..models.customer import Customer

customer_bp = Blueprint("customers", __name__)


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

    email = data["email"]
    phone_number = data["phone_number"]

    customer = Customer.query.filter_by(email=email).first()
    customer = Customer.query.filter_by(phone_number=phone_number).first()

    if customer:
        return (
            jsonify({"message": "Customer already exists", "id": customer.id}),
            200,
        )

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

    return (
        jsonify({"message": "Customer created successfully", "id": new_customer.id}),
        201,
    )


# @customer_bp.route("/customer_update/<int:reservation_id>", methods=["PATCH"])
# def customer_update(reservation_id):
#   customer = Customer.query.get(reservation_id)


@customer_bp.route("/customers", methods=["GET"])
def get_customers():
    try:
        customers = Customer.query.all()

        customers_list = [
            {
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "email": customer.email,
                "phone_number": customer.phone_number,
                "reservation_id": customer.reservation_id,
            }
            for customer in customers
        ]

        return jsonify(customers_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@customer_bp.route("/get_customer/<int:id>", methods=["GET"])
def get_customer_by_id(id):
    try:
        customer = Customer.query.get(id)

        if not customer:
            return jsonify({"error": "Customer not found"}), 404

        customer_data = {
            "first_name": customer.first_name,
            "last_name": customer.last_name,
            "email": customer.email,
            "phone_number": customer.phone_number,
            "reservation_id": customer.reservation_id,
        }

        return jsonify(customer_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
