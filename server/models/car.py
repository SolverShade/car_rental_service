from flask_sqlalchemy import SQLAlchemy
from server.extensions import db
from sqlalchemy import Numeric


class Car(db.Model):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    make = db.Column(db.String, nullable=False)
    model = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    daily_cost = db.Column(Numeric(10, 2), nullable=False)
    rented = db.Column(db.Boolean, nullable=False)
    image_url = db.Column(db.String, nullable=False)

    def __init__(self, name, make, model, daily_cost, rented, year, image_url):
        self.name = name
        self.make = make
        self.model = model
        self.daily_cost = daily_cost
        self.year = year
        self.rented = rented
        self.image_url = image_url
