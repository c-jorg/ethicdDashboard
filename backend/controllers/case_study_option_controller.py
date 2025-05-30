from flask import Flask, request, jsonify, make_response, Blueprint
import bcrypt
from datetime import datetime, timezone
import pytz
import sys

from ..models import CaseStudyOption

bp = Blueprint('case_study_option', __name__)

@bp.route('/api/flask/case-study-option/option-id', methods=["GET"])
def get_case_study_option_by_id():
    try:
        option_id = request.args.get('option_id')
        print(f'option_id {option_id}', flush=True)
        if not option_id:
            return make_response(jsonify({"message":"Must give case study option id"}), 400)
        try:
            option_id = int(option_id)
        except Exception as e:
            print(f"error casting option id {e}", flush=True)
        if type(option_id) != int:
            return make_response(jsonify({"message":"invalid data type"}), 400)
        option = CaseStudyOption.get_case_study_option_by_id(option_id)
        print(f"option {option}", flush=True)
        if not option:
            return make_response(jsonify({"message":"No case study option with that id found"}), 404)
        title = option.title
        description = option.description 
        data = {"title":title, "description":description}
        print(f"{data} got option info", flush=True)
        return make_response(jsonify(data),200)
    except Exception as e:
        print(f"Error getting options", flush=True)
        return make_response(jsonify({"message":"Error getting case study options", "error":e}), 500)