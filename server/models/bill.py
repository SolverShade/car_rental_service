from flask_sqlalchemy import SQLAlchemy
from server.extensions import db
from sqlalchemy import Numeric


class Bill(db.Model):
    __tablename__ = "bills"

    id = db.Column(db.Integer, primary_key=True)
    totalcost = db.Column(Numeric(10, 2), nullable=False)
    isPayed = db.Column(db.Boolean, nullable=False)
    inPerson = db.Column(db.Boolean, nullable=False)
    credit_card = db.Column(db.Integer, nullable=True)
    card_name = db.Column(db.String, nullable=True)
    card_expiration_data = db.Column(db.String, nullable=True)
    card_cvc = db.Column(db.String, nullable=True)

    def __init__(self, totalcost, isPayed):
        self.totalcost = totalcost
        self.isPayed = isPayed
