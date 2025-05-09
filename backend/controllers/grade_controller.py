from flask import Flask, request, jsonify, make_response, Blueprint
import bcrypt
from datetime import datetime, timezone
import pytz
import sys

from ..models import Grade
from ..models import Feedback

bp = Blueprint('grade', __name__)

#=====  ROUTES FOR GRADE ============

@bp.route("/api/flask/grade", methods=["GET"])
def get_grade():
    try:
        form_group = request.args.get('form_group')
        assignment_id = request.args.get('assignment_id')
        print("GET Grade: Form Group: ", form_group, flush=True)
        print("GET Grade: Assignment ID: ", assignment_id, flush=True)

        grade = Grade.get_grade_by_form_group_and_assignment_id(form_group, assignment_id).grade
        print("GET Grade: Grade: ", grade, flush=True)
        
        if grade:
        
            return make_response(jsonify({'grade': grade}), 200)
        else:
            return make_response(jsonify({'message': f'No grade found for form group {form_group}'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting grade', 'error': str(e)}), 500)
    
@bp.route("/api/flask/grades", methods=["GET"])
def get_grades():
    try:
        assignment_id = request.args.get('assignment_id')
        print("GET Grades: Assignment ID: ", assignment_id, flush=True)

        grades = Grade.get_grade_by_assignment_id(assignment_id)
        print("GET Grades: Grades: ", grades, flush=True)
        
        if grades:
            grades_list = [{'form_group': grade.form_group, 'grade': grade.grade} for grade in grades]
            return make_response(jsonify({'grades': grades_list}), 200)
        else:
            return make_response(jsonify({'message': f'No grades found for assignment ID {assignment_id}'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'error getting grades', 'error': str(e)}), 500)
