import sys

sys.path.append("..")
sys.path.append(".")

from flask import Flask, jsonify
from flask_cors import CORS
from .extensions import db, migrate, bcrypt
from routes.reservation_routes import reservation_bp
from routes.staff_routes import staff_bp
from routes.car_routes import car_bp


def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Default config
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///sample.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
    app.config["SECRET_KEY"] = "tomato"

    # Override config for testing if provided
    if test_config:
        app.config.update(test_config)
        if "SQLALCHEMY_DATABASE_URI" not in test_config:
            app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"

    if test_config:
        app.config.update(test_config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    @app.route("/")
    def hello_world():
        return jsonify(message="Hello, World!")

    app.register_blueprint(reservation_bp)
    app.register_blueprint(staff_bp)
    app.register_blueprint(car_bp)

    # Create tables
    with app.app_context():
        db.create_all()

    return app
