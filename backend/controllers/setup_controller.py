#this controller should no be used in a live deployment, it only exists to setup the database when first building  

from flask import Flask, request, jsonify, make_response, Blueprint
from ..models import Student, Assignment, CaseStudy, Answer, Submission, Form, Professor, Class, CaseStudyOption, Enrollment
from datetime import datetime
import json
import os

bp = Blueprint('setup', __name__)

@bp.route('/api/flask/setup/guest', methods=['POST'])
def setup_guest():
    print("setup_guest reached", flush=True)
    try:
        #make guest prof and class
        Professor.post_professor("guest professor", "guestprofessoremail@testmail.com", "$2a$12$2ENfWLUOCsfG9wU5FxLe5O7X/NiPdxgKEb4DnCAdY5JAy.Z1CN51O")
        class_exists = Class.get_class_id_by_class_name("guest class")
        if class_exists is None:
            print("guest class 1 does not exist", flush=True)
            Class.post_class("guest class", Professor.get_professor_id_by_professor_name("guest professor"), "Guest Class")
            print("guest class added", flush=True)
        else:
            print("guest class already exists", flush=True)
            
        class2_exists = Class.get_class_id_by_class_name("guest class 2")
        if class2_exists is None:
            print("Guest class 2 does not exist", flush=True)
            Class.post_class("guest class 2", Professor.get_professor_id_by_professor_name("guest professor"), "Guest Class 2")
            print("guest class 2 added", flush=True)
        else:
            print("guest class 2 already exists", flush=True)
            
        case_study_exists = CaseStudy.get_case_study_by_title("Guest Case Study")
        if case_study_exists is None:
            CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_name("guest class"), 'Guest Case Study', datetime.now())
            print("gues case study added", flush=True)
        else:
            print("guest case study already exists", flush=True)
            
        case_study2_exists = CaseStudy.get_case_study_by_title("Guest Case Study 2")
        if case_study2_exists is None:
            CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_name("guest class 2"), 'Guest Case Study 2', datetime.now())
            print("guest case study 2 added", flush=True)
        else:
            print("guest case study 2 already exists", flush=True)
            
        print("getting case study id", flush=True)
        case_study_id = CaseStudy.get_case_study_id_by_title("Guest Case Study")
        print("getting case study options", flush=True)
        options = CaseStudyOption.get_case_study_options_by_case_study_id(case_study_id)
        if len(options) < 3:
            CaseStudyOption.delete_case_study_options_by_case_study_id(case_study_id)
            CaseStudyOption.post_case_study_option(case_study_id, "Option 1", "Description for Option 1")
            CaseStudyOption.post_case_study_option(case_study_id, "Option 2", "Description for Option 2")
            CaseStudyOption.post_case_study_option(case_study_id, "Option 3", "Description for Option 3")
            print("guest case study options added", flush=True)
        else:
            print("guest case study options already exist", flush=True)
            
        case_study2_id = CaseStudy.get_case_study_id_by_title("Guest Case Study 2")
        #print("getting case study options", flush=True)
        options2 = CaseStudyOption.get_case_study_options_by_case_study_id(case_study2_id)
        if len(options2) < 3:
            CaseStudyOption.delete_case_study_options_by_case_study_id(case_study2_id)
            CaseStudyOption.post_case_study_option(case_study2_id, "Option 1", "Description for Option 1")
            CaseStudyOption.post_case_study_option(case_study2_id, "Option 2", "Description for Option 2")
            CaseStudyOption.post_case_study_option(case_study2_id, "Option 3", "Description for Option 3")
            print("guest case study 2 options added", flush=True)
        else:
            print("guest case study 2 options already exist", flush=True)
        
        return make_response(jsonify({"message":"guest setup successful"}), 201)
    except Exception as e:
        return make_response(jsonify({"message":"error setting up guest mode", "error":f"{e}"}), 500)

@bp.route('/api/flask/setup/forms', methods=['POST'])
def setup_forms():
    print("setup_forms reached", flush=True)
    try:
        #add each of the forms to db
        Form.post_form("dilemma")
        Form.post_form("cons-stakeholders")
        Form.post_form("cons-util-bentham")
        Form.post_form("cons-util-mill")
        Form.post_form("categorical-imperatives")
        Form.post_form("critical-questions")
        Form.post_form("personal-sacrifices")
        Form.post_form("duties-versus-actions")
        Form.post_form("final-questions")
        Form.post_form("care-form")
        Form.post_form("intersect-form")
        Form.post_form("generations-form")
        Form.post_form("virtue-ethics")
        Form.post_form("life-path")
        Form.post_form("universal-principles")
        
        print("Forms added",flush=True)
        return make_response(jsonify({"message":"forms setup successful"}),201)
    except Exception as e:
        print(f"error adding forms {e}", flush=True)
        return make_response(jsonify({"message":"error setting up forms", "error":f"{e}"}),500)