from flask_sqlalchemy import SQLAlchemy
from ..extensions import db


class Reservation(db.Model):
    __tablename__ = "reservations"

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    pickup_location = db.Column(db.String(255), nullable=False)
    dropoff_location = db.Column(db.String(255), nullable=False)
    customer_id = db.Column(db.Integer, nullable=True)
    car_id = db.Column(db.Integer, nullable=True)
    bill_id = db.Column(db.Integer, nullable=True)

    def __init__(
        self,
        start_date,
        end_date,
        start_time,
        end_time,
        pickup_location,
        dropoff_location,
        customer_id=None,
        bill_id=None,
        car_id=None,
    ):
        self.start_date = start_date
        self.end_date = end_date
        self.start_time = start_time
        self.end_time = end_time
        self.pickup_location = pickup_location
        self.dropoff_location = dropoff_location
        self.customer_id = customer_id
        self.car_id = car_id
        self.bill_id = bill_id
