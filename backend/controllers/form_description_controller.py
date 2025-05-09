from flask import Flask, request, jsonify, make_response, Blueprint
import bcrypt
from datetime import datetime, timezone
import pytz
import sys

from ..models import Form
from ..models import Assignment
from ..models import FormDescription

bp = Blueprint('form_description', __name__)

#=====  ROUTES FOR FEEDBACK ============

@bp.route("/api/flask/form-description", methods=["GET"])
def get_form_description():
    try:
        form_name = request.args.get('form_name')
        if not form_name:
            return make_response(jsonify({'message': 'form_name is required'}),
                                 400)

        assignment_id = request.args.get('assignment_id')
        if not assignment_id:
            return make_response(jsonify({'message': 'assignment_id is required'}),
                                 400)
        
        try:
            assignment_id = int(assignment_id)
        except ValueError:
            return make_response(jsonify({'message': 'assignment_id must be an integer'}),
                                 400)
        
        form_name = form_name.lower() # make form name case insensitive

        print("GET Form description: Form Name: ", form_name, flush=True)
        print("GET Form description: Assignment ID: ", assignment_id, flush=True)

        form_id = Form.get_form_by_name(form_name).id
        print("GET Form description: Form ID: ", form_id, flush=True)

        if not form_id:
            return make_response(jsonify({'message': f'No form found for name {form_name}'}), 404)

        assignment = Assignment.get_assignment_by_id(assignment_id)

        if not assignment:
            return make_response(jsonify({'message': f'No assignment found for id {assignment_id}'}), 404)

        case_study_id = assignment.case_study_id

        if not case_study_id:
            return make_response(jsonify({'message': f'No case study found for assignment {assignment_id}'}), 404)

        form_desc = FormDescription.get_form_description_by_case_study_id_and_form_id(case_study_id, form_id)
        print("GET Form description: Form Description: ", form_desc, flush=True)

        
        if form_desc:
        
            return make_response(jsonify(form_desc.to_dict()), 200)
        else:
            return make_response(jsonify({'message': f'No description found for form {form_name}'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting form description', 'error': str(e)}), 500)
