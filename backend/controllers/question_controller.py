from flask import Flask, request, jsonify, make_response, Blueprint, redirect
from flask_cors import cross_origin
from flask_cors import CORS
import bcrypt

from ..models import Question
from ..models import Form

from ..utils.form_validation import *
from ..utils.exceptions import *

#from ..models import db #remove when all db mentions are removed

bp = Blueprint('questions', __name__)

#from app import app, ma

# =========== ROUTES FOR QUESTION ============

@bp.route('/api/flask/questions', methods=['GET'])
def get_students():
  print("Reached the API!", flush=True)
  try:
    case_study_id = request.args.get('case_study_id')
    form_name = request.args.get('form_name')
    print("GET Questions: Case Study ID: ", case_study_id, flush=True)
    print("GET Questions: Form Name: ", form_name, flush=True)

    form_id = Form.get_form_by_name(form_name).id
    print("GET Questions: Form ID: ", form_id, flush=True)

    questions = Question.get_questions_by_case_study_id_and_form_id(case_study_id, form_id)
    print("GET Questions: Questions: ", questions, flush=True)

    if questions:
        # Extract only the question_text values
        question_texts = [question.question_text for question in questions]
        return make_response(jsonify({'questions': question_texts}), 200)
    else:
        return make_response(jsonify({'message': f'No questions found for form {form_name}'}), 404)

  except Exception as e:
    return make_response(jsonify({'message': 'error getting dynamic questions users', 'error': str(e)}), 500)
  

@bp.route('/api/flask/questions/total', methods=['GET'])
def get_total_questions():
  print("Reached the API!", flush=True)
  try:
    case_study_id = request.args.get('case_study_id')
    form_name = request.args.get('form_name')
    print("GET Questions Total: Case Study ID: ", case_study_id, flush=True)
    print("GET Questions Total: Form Name: ", form_name, flush=True)

    form_id = Form.get_form_by_name(form_name).id
    print("GET Questions Total: Form ID: ", form_id, flush=True)

    total = Question.get_total_questions_by_form_id_and_case_study_id(form_id, case_study_id)
    print("GET Questions Total: Total: ", total, flush=True)

    if total:
        # return just the total
        return make_response(jsonify({'total': total}), 200)
    else:
        return make_response(jsonify({'message': f'No questions found for form {form_name}'}), 404)

  except Exception as e:
    return make_response(jsonify({'message': 'error getting dynamic questions users', 'error': str(e)}), 500)
 