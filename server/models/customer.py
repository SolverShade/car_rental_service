from flask_sqlalchemy import SQLAlchemy
from server.extensions import db


class Customer(db.Model):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), unique=True, nullable=False)
    reservation_id = db.Column(db.Integer, nullable=True)

    def __init__(self, first_name, last_name, email, phone_number, reservation_id=None):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.phone_number = phone_number
        self.reservation_id = reservation_id
