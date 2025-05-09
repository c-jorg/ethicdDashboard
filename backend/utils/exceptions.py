from flask import Flask, jsonify, request, Blueprint
from werkzeug.exceptions import HTTPException

errors_bp = Blueprint('errors', __name__)
 
#from .. import app

class NameValidationError(Exception):
    pass

class EmailValidationError(Exception):
    pass

class PasswordValidationError(Exception):
    pass

class AccountAlreadyExistsError(Exception):
    pass

class NotInvitedError(Exception):
    pass

# Error handler for NameValidationError
@errors_bp.app_errorhandler(NameValidationError)
def handle_name_validation_error(error):
    response = {
        'error': 'NameValidationError',
        'message': str(error)
    }
    return jsonify(response), 400

# Error handler for EmailValidationError
@errors_bp.app_errorhandler(EmailValidationError)
def handle_email_validation_error(error):
    response = {
        'error': 'EmailValidationError',
        'message': str(error)
    }
    return jsonify(response), 400

# Error handler for PasswordValidationError
@errors_bp.app_errorhandler(PasswordValidationError)
def handle_password_validation_error(error):
    response = {
        'error': 'PasswordValidationError',
        'message': str(error)
    }
    return jsonify(response), 400

# Error handler for AccountAlreadyExistsError
@errors_bp.app_errorhandler(AccountAlreadyExistsError)
def handle_account_already_exists_error(error):
    response = {
        'error': 'AccountAlreadyExistsError',
        'message': str(error)
    }
    return jsonify(response), 400

# Error handler for NotInvitedError
@errors_bp.app_errorhandler(NotInvitedError)
def not_invited_error(error):
    response = {
        'error': 'NotInvitedError',
        'message': str(error)
    }
    return jsonify(response), 400

# Generic error handler to catch all other exceptions
@errors_bp.app_errorhandler(Exception)
def handle_generic_error(error):
    response = {
        'error': 'GeneralError',  # Provide a fallback error type
        'message': 'An unexpected error occurred. Please try again.'  # General error message
    }
    return jsonify(response), 500