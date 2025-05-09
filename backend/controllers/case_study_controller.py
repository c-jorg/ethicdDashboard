from flask import Flask, request, jsonify, make_response, Blueprint
import bcrypt
from datetime import datetime, timezone
import pytz
import sys

from ..models import CaseStudyOption

bp = Blueprint('case_study', __name__)

#=====  ROUTES FOR CASE STUDY ============

@bp.route('/api/flask/case-study/options', methods=["GET"])
def get_options():
    try:
        case_study = request.args.get('case_study_id')
        options = CaseStudyOption.get_case_study_options_by_case_study_id(case_study)
        if options:
            options_dict = []
            for option in options:
                options_dict.append({
                    "id": option.id,
                    "label": option.title,
                    "description": option.description
                })
            return jsonify({'options':options_dict}),200
        else:
            return jsonify({'message':f'No options found for case study ID {case_study}'}),404
    except Exception as e:
        return jsonify({'message':'error getting CS options','error':str(e)}),500