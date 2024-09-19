from flask import Flask, jsonify
from .extensions import db, migrate, bcrypt


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

    @app.route("/", methods=["GET"])
    def hello_world():
        return jsonify(message="Hello, World!")

    # TODO: Register blueprints

    # Create tables
    with app.app_context():
        db.create_all()

    return app
