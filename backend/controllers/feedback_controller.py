from flask import Flask, request, jsonify, make_response, Blueprint
import bcrypt
from datetime import datetime, timezone
import pytz
import sys


from ..models import Assignment
from ..models import Answer
from ..models import Form
from ..models import Submission
from ..models import Feedback

bp = Blueprint('feedback', __name__)

#=====  ROUTES FOR FEEDBACK ============

@bp.route("/api/flask/feedback", methods=["GET"])
def get_feedback():
    try:
        form_name = request.args.get('form_name')
        assignment_id = request.args.get('assignment_id')
        print("GET Feedback: Form Name: ", form_name, flush=True)
        print("GET Feedback: Assignment ID: ", assignment_id, flush=True)

        form_id = Form.get_form_by_name(form_name).id
        print("GET Feedback: Form ID: ", form_id, flush=True)

        #answers has form id, assignment id, key, value_string, value_int, created, last_modified
        feedbacks = Feedback.get_feedbacks_by_assignment_id_and_form_id(assignment_id, form_id)
        print("GET Feedback: Feedbacks: ", feedbacks, flush=True)

        
        if feedbacks:
        
            return make_response(jsonify({'feedback': feedbacks}), 200)
        else:
            return make_response(jsonify({'message': f'No feedback found for form {form_name}'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting feedback', 'error': str(e)}), 500)
