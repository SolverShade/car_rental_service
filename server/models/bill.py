from flask_sqlalchemy import SQLAlchemy
from app.extensions import db
from sqlalchemy import Numeric


class Bill(db.Model):
    __tablename__ = "bills"

    id = db.Column(db.Integer, primary_key=True)
    totalcost = db.Column(Numeric(10, 2), nullable=False)
    isPayed = db.Column(db.Boolean, nullable=False)

    def __init__(self, totalcost, isPayed):
        self.totalcost = totalcost
        self.isPayed = isPayed
