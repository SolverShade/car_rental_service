from flask import Flask, jsonify
from .extensions import db, migrate, bcrypt
from routes.reservation_routes import reservation_bp


def create_app(test_config=None):
    app = Flask(__name__)

    # Default config
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///sample.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "tomato"

    # Override config for testing if provided
    if test_config:
        app.config.update(test_config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    app.register_blueprint(reservation_bp)

    # Create tables
    with app.app_context():
        db.create_all()

    return app
