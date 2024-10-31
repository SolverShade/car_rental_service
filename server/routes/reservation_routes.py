from flask import Blueprint, request, jsonify
from server.models.reservation import Reservation
from app.extensions import db
from datetime import datetime

reservation_bp = Blueprint("reservation", __name__)


@reservation_bp.route("/reservations", methods=["GET"])
def get_reservations():
    try:
        # Query the database for all reservations
        reservations = Reservation.query.all()

        reservations_list = [
            {
                "id": reservation.id,
                "start_date": reservation.start_date.strftime("%Y-%m-%d"),
                "end_date": reservation.end_date.strftime("%Y-%m-%d"),
                "start_time": reservation.start_time.strftime("%H:%M:%S"),
                "end_time": reservation.end_time.strftime("%H:%M:%S"),
                "pickup_location": reservation.pickup_location,
                "dropoff_location": reservation.dropoff_location,
            }
            for reservation in reservations
        ]

        return jsonify(reservations_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@reservation_bp.route("/create_reservation", methods=["POST"])
def create_reservation():
    data = request.get_json()

    # Extract fields from the request data
    start_date_str = data.get("start_date")
    end_date_str = data.get("end_date")
    start_time_str = data.get("start_time")
    end_time_str = data.get("end_time")
    pickup_location = data.get("pickup_location")
    dropoff_location = data.get("dropoff_location")

    # Validate required fields
    if not all(
        [
            start_date_str,
            end_date_str,
            start_time_str,
            end_time_str,
            pickup_location,
            dropoff_location,
        ]
    ):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Convert date and time strings to datetime objects
        start_date = datetime.strptime(start_date_str, "%m/%d/%y").date()
        end_date = datetime.strptime(end_date_str, "%m/%d/%y").date()
        start_time = datetime.strptime(start_time_str, "%H:%M:%S").time()
        end_time = datetime.strptime(end_time_str, "%H:%M:%S").time()
    except ValueError as e:
        return jsonify({"error": f"Invalid date or time format: {str(e)}"}), 400

    # Check if start time is before end time
    if start_time >= end_time:
        return jsonify({"error": "Start time must be before end time"}), 400

    if start_date >= end_date:
        return jsonify({"error": "Start date must be before end End date"}), 400

    # Create a new Reservation object
    new_reservation = Reservation(
        start_date=start_date,
        end_date=end_date,
        start_time=start_time,
        end_time=end_time,
        pickup_location=pickup_location,
        dropoff_location=dropoff_location,
    )

    try:
        db.session.add(new_reservation)
        db.session.commit()
        return jsonify(
            {
                "message": "Reservation created successfully",
                "reservation_id": new_reservation.id,
            }
        ), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@reservation_bp.route("/reservation/<int:reservation_id>", methods=["GET"])
def get_reservation(reservation_id):
    reservation = Reservation.query.get(reservation_id)
    if reservation is None:
        return jsonify({"error": "Reservation not found"}), 404

    reservation_data = {
        "id": reservation.id,
        "start_date": reservation.start_date.strftime("%m/%d/%y"),
        "end_date": reservation.end_date.strftime("%m/%d/%y"),
        "start_time": reservation.start_time.strftime("%H:%M:%S"),
        "end_time": reservation.end_time.strftime("%H:%M:%S"),
        "pickup_location": reservation.pickup_location,
        "dropoff_location": reservation.dropoff_location,
    }

    return jsonify(reservation_data), 200
