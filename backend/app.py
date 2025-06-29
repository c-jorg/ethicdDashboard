import secrets
from flask import Flask, request, jsonify, make_response, session
#from flask_sqlalchemy import SQLAlchemy
#from flask_marshmallow import Marshmallow
from flask_cors import CORS
from os import environ
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_jwt_extended.exceptions import  NoAuthorizationError, InvalidHeaderError, JWTDecodeError
from .models.db import db, ma
from .models import *
from .controllers import student_controller, assignment_controller, auth, question_controller, guest_controller, feedback_controller, grade_controller, enrollment_controller, form_description_controller, case_study_controller, slider_question_controller, setup_controller, case_study_option_controller
from .utils.exceptions import errors_bp



# Initialize Flask app
def create_app():
  app = Flask(__name__)

  app.config['JWT_SECRET_KEY'] = '343f018754c2dda5d2c5e771dd39f0b3d86ad369b5f31eb457f5bd973e206843'  # Replace with a strong key
  app.config['JWT_TOKEN_LOCATION'] = ['headers']  # Store JWT in cookies
  app.config['JWT_COOKIE_SECURE'] = True  # Set to True for HTTPS

  # Enable CORS for all routes
  CORS(app, supports_credentials=True)
  #CORS(app, '*')
  # Set up the database URI
  app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
  print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}", flush=True)
  # app.config.from_mapping(
  #         SECRET_KEY='dev',
  #     )
  app.secret_key = 'dev'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking
  #app.config['JWT_TOKEN_LOCATION'] = ['headers']
  #app.config('FLASK_ENV') = environ.get('FLASK_ENV')
    # Configure SQLAlchemy connection pool
  # app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
  #     'pool_size': 10,
  #     'max_overflow': 20,
  #     'pool_timeout': 30,
  #     'pool_recycle': 1800
  # }

  # Initialize SQLAlchemy and Marshmallow
  db.init_app(app)
  ma.init_app(app)
  jwt = JWTManager()
  jwt.init_app(app)
  # db = SQLAlchemy(app)
  # ma = Marshmallow(app)


  app.register_blueprint(student_controller.bp)
  app.register_blueprint(assignment_controller.bp)
  app.register_blueprint(auth.bp)
  app.register_blueprint(question_controller.bp)
  app.register_blueprint(guest_controller.bp)
  app.register_blueprint(feedback_controller.bp)
  app.register_blueprint(grade_controller.bp)
  app.register_blueprint(enrollment_controller.bp)
  app.register_blueprint(form_description_controller.bp)
  app.register_blueprint(case_study_controller.bp)
  app.register_blueprint(slider_question_controller.bp)
  app.register_blueprint(errors_bp)
  app.register_blueprint(setup_controller.bp)
  app.register_blueprint(case_study_option_controller.bp)

  with app.app_context():
      db.create_all()
  #list of endpoints that will skip the jwt auth
  EXEMPT_ENDPOINTS = [
    'auth.login_student',
    'auth.create_student',
    'auth.register_guest',
    'auth.ping',
    'auth.validate_token',
    'guest.delete_guests'
  ]
  @app.before_request
  def require_jwt_for_all_except():
    print("app.py before request headers:  ", request.headers, flush=True)
    if request.endpoint in EXEMPT_ENDPOINTS:
      return
    #skip OPTIONS
    if request.method == 'OPTIONS':
      return 
    try:
      verify_jwt_in_request()
    except NoAuthorizationError:
      print("invalid or missing token", flush=True)
      return make_response(jsonify({"message": "Invalid or missing JWT token"}), 401)
    except (InvalidHeaderError, JWTDecodeError) as e:
        print("JWT error:", str(e), flush=True)
        return make_response(jsonify({"message": "JWT error", "error": str(e)}), 422)
    except Exception as e:
      print("Error", str(e), flush=True)
      return make_response(jsonify({"message":"An error occured validating token", "error": str(e)}), 422)
      
  return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host ='0.0.0.0', port=4000)

    
