from flask import Blueprint, request, jsonify
from ..models.bill import Bill
from server.extensions import db

bill_bp = Blueprint("bill", __name__)


@bill_bp.route("/create_bill", methods=["POST"])
def create_bill():
    data = request.get_json()

    totalcost = data.get("totalcost")
    isPayed = data.get("isPayed")
    inPerson = bool(data.get("inPerson"))
    credit_card = data.get("credit_card")
    card_name = data.get("card_name")
    card_expiration_data = data.get("card_expiration_data")
    card_cvc = data.get("card_cvc")

    if inPerson is False and None in (
        [credit_card, card_name, card_expiration_data, card_cvc]
    ):
        return jsonify({"error": "Missing data or data incorrect"}), 400

    if inPerson is True and None in ([totalcost, isPayed]):
        return jsonify({"error": "Missing data or data incorrect"}), 400

    new_bill = Bill(totalcost=totalcost, isPayed=isPayed)
    new_bill.inPerson = inPerson
    if not inPerson:
        new_bill.credit_card = credit_card
        new_bill.card_name = card_name
        new_bill.card_expiration_data = card_expiration_data
        new_bill.card_cvc = card_cvc

    db.session.add(new_bill)
    db.session.commit()

    return (
        jsonify({"message": "Bill created successfully", "bill_id": new_bill.id}),
        201,
    )


@bill_bp.route("/pay_bill", methods=["POST"])
def pay_bill():
    data = request.get_json()
    bill_id = data.get("bill_id")

    bill = Bill.query.get(bill_id)
    if not bill:
        return jsonify({"error": "Bill not found"}), 404

    bill.isPayed = True
    db.session.commit()

    return jsonify({"message": "Bill paid successfully"}), 200


@bill_bp.route("/get_bill/<int:bill_id>", methods=["GET"])
def get_bill(bill_id):
    bill = Bill.query.get(bill_id)
    if not bill:
        return jsonify({"error": "Bill not found"}), 404

    bill_data = {
        "id": bill.id,
        "totalcost": bill.totalcost,
        "isPayed": bill.isPayed,
        "inPerson": bill.inPerson,
        "credit_card": bill.credit_card,
        "card_name": bill.card_name,
        "card_expiration_data": bill.card_expiration_data,
        "card_cvc": bill.card_cvc,
    }

    return jsonify(bill_data), 200
