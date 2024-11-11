from flask import Blueprint, request, jsonify
from server.models.bill import Bill
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
