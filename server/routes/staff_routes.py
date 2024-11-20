from flask import Blueprint, request, jsonify
from server.extensions import db
from ..models.staff import Staff


staff_bp = Blueprint("staff", __name__)


@staff_bp.route("/create_staff", methods=["POST"])
def create_staff():
    data = request.get_json()

    # Validate the data
    required_fields = [
        "first_name",
        "last_name",
        "email",
        "phone_number",
        "username",
        "password",
        "isAdmin",
    ]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    # Create a new Staff instance
    new_staff = Staff(
        first_name=data["first_name"],
        last_name=data["last_name"],
        email=data["email"],
        phone_number=data["phone_number"],
        username=data["username"],
        password=data["password"],
        isAdmin=data["isAdmin"],
    )

    # Add the new staff member to the database
    db.session.add(new_staff)
    db.session.commit()

    return jsonify({"message": "Staff member created successfully"}), 201


@staff_bp.route("/login", methods=["POST"])
def confirm_login():
    data = request.get_json()

    if "username" not in data or "password" not in data:
        return jsonify({"error": "Missing username or password"}), 400

    username = data["username"]
    password = data["password"]

    user = Staff.query.filter_by(username=username).first()

    if user and user.password == password:
        return (
            jsonify(
                {
                    "login_successful": True,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                }
            ),
            200,
        )
    else:
        return jsonify({"login_successful": False}), 401


@staff_bp.route("/list_staff", methods=["GET"])
def list_staff():
    staff_members = Staff.query.all()
    staff_list = [
        {
            "id": staff.id,
            "first_name": staff.first_name,
            "last_name": staff.last_name,
            "email": staff.email,
            "phone_number": staff.phone_number,
            "username": staff.username,
            "password": staff.password,
            "isAdmin": staff.isAdmin,
        }
        for staff in staff_members
    ]
    return jsonify(staff_list), 200
