from flask import Flask, request, jsonify, make_response, Blueprint, redirect
from flask_cors import cross_origin
from flask_cors import CORS
import bcrypt

from ..models import SliderQuestion
from ..models import Form

from ..utils.form_validation import *
from ..utils.exceptions import *

#from ..models import db #remove when all db mentions are removed

bp = Blueprint('slider_questions', __name__)

#from app import app, ma

# =========== ROUTES FOR SLIDER QUESTION ============

@bp.route('/api/flask/slider-questions', methods=['GET'])
def get_slider_questions():
  print("Reached the API!", flush=True)
  try:
    case_study_id = request.args.get('case_study_id')
    form_name = request.args.get('form_name')
    print("GET Slider Questions: Case Study ID: ", case_study_id, flush=True)
    print("GET Slider Questions: Form Name: ", form_name, flush=True)

    form_id = Form.get_form_by_name(form_name).id
    print("GET Slider Questions: Form ID: ", form_id, flush=True)

    questions = SliderQuestion.get_slider_questions_by_case_study_id_and_form_id(case_study_id, form_id)

    if questions is None:
        return make_response(jsonify({'message': 'No questions found for the given case study and form'}), 404)
    print("GET Slider Questions: Questions: ", questions, flush=True)

    # { question_text: "", right_label: "", left_label: "" }

    if questions:
        # Extract the question_text values
        question_texts = [question.question_text for question in questions]

        # Extract the right_label and left_label values
        right_labels = [question.right_label for question in questions]
        left_labels = [question.left_label for question in questions]

        # Combine them into a list of dictionaries
        question_data = []
        for i in range(len(questions)):
            question_data.append({
                'question_text': question_texts[i],
                'right_label': right_labels[i],
                'left_label': left_labels[i]
            })

        # Return the combined data  
        return make_response(jsonify({'questions': question_data}), 200)

    else:
        return make_response(jsonify({'message': f'No slider questions found for form {form_name}'}), 404)

  except Exception as e:
    return make_response(jsonify({'message': 'error getting slider questions users', 'error': str(e)}), 500)
  

@bp.route('/api/flask/slider-questions/total', methods=['GET'])
def get_total_questions():
  print("Reached the API!", flush=True)
  try:
    case_study_id = request.args.get('case_study_id')
    form_name = request.args.get('form_name')
    print("GET Slider Questions Total: Case Study ID: ", case_study_id, flush=True)
    print("GET Slider Questions Total: Form Name: ", form_name, flush=True)

    form_id = Form.get_form_by_name(form_name).id
    print("GET Slider Questions Total: Form ID: ", form_id, flush=True)

    total = SliderQuestion.get_total_slider_questions_by_form_id_and_case_study_id(form_id, case_study_id)
    print("GET Slider Questions Total: Total: ", total, flush=True)

    if total:
        # return just the total
        return make_response(jsonify({'total': total}), 200)
    else:
        return make_response(jsonify({'message': f'No questions found for form {form_name}'}), 404)

  except Exception as e:
    return make_response(jsonify({'message': 'error getting dynamic questions users', 'error': str(e)}), 500)
 