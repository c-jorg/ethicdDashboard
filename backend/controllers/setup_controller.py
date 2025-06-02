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
        class_exists = Class.get_class_id_by_class_code("guest111")
        if class_exists is None:
            print("guest class 111 does not exist", flush=True)
            Class.post_class("guest class 111", Professor.get_professor_id_by_professor_name("guest professor"), "guest111")
            print("guest class added", flush=True)
        else:
            print("guest class already exists", flush=True)
            
        # class2_exists = Class.get_class_id_by_class_code("guest222")
        # if class2_exists is None:
        #     print("Guest class 2 does not exist", flush=True)
        #     Class.post_class("guest class 222", Professor.get_professor_id_by_professor_name("guest professor"), "guest222")
        #     print("guest class 2 added", flush=True)
        # else:
        #     print("guest class 2 already exists", flush=True)
            
        case_study_exists = CaseStudy.get_case_study_by_title("Guest Assignment Completed")
        if case_study_exists is None:
            CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_code("guest111"), 'Guest Assignment Completed', datetime.now())
            print("gues case study added", flush=True)
        else:
            print("guest case study already exists", flush=True)
            
        case_study2_exists = CaseStudy.get_case_study_by_title("Ethical Dilemma")
        if case_study2_exists is None:
            CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_code("guest111"), 'Ethical Dilemma', datetime.now())
            print("guest case study 2 added", flush=True)
        else:
            print("guest case study 2 already exists", flush=True)
            
        case_study3_exists = CaseStudy.get_case_study_by_title("Moral Dilemma")
        if case_study3_exists is None:
            CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_code("guest111"), 'Moral Dilemma', datetime.now())
        else:
            print("guest case study 3 already exists", flush=True)
            
        # case_study4_exists = CaseStudy.get_case_study_by_title("guest class 222 assignment 1")
        # if case_study4_exists is None:
        #     CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_code("guest222"), 'guest class 222 assignment 1', datetime.now())
        # else:
        #     print("guest case study 4 already exists", flush=True)
            
        # case_study5_exists = CaseStudy.get_case_study_by_title("guest 222 Final Project")
        # if case_study5_exists is None:
        #     CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_code("guest222"), 'guest 222 Final Project', datetime.now())
        # else:
        #     print("guest case study 5 already exists")
            
        print("getting case study id", flush=True)
        case_study_id = CaseStudy.get_case_study_id_by_title("Guest Assignment Completed")
        print("getting case study options", flush=True)
        options = CaseStudyOption.get_case_study_options_by_case_study_id(case_study_id)
        if len(options) < 2:
            CaseStudyOption.delete_case_study_options_by_case_study_id(case_study_id)
            try:
                print(os.getcwd(), flush=True)
                with open('controllers/guest_assignments/safety_above_all.txt', 'r') as file:
                    safety_text = file.read()
                print(os.getcwd(), flush=True)
                with open('controllers/guest_assignments/doing_wrong_to_do_right.txt', 'r') as file:
                    doing_text = file.read()
            except Exception as e:
                print(f"failed to read case study files {e}", flush=True) 
            CaseStudyOption.post_case_study_option(case_study_id, "Safety Above All", safety_text)
            CaseStudyOption.post_case_study_option(case_study_id, "Doing Wrong to do Right", doing_text)
            #CaseStudyOption.post_case_study_option(case_study_id, "Enter the details of your hard case and/or difficult decision here", "Enter details - 700 words max")
            print("guest case study options added", flush=True)
        else:
            print("guest case study options already exist", flush=True)
            
        case_study2_id = CaseStudy.get_case_study_id_by_title("Ethical Dilemma")
        #print("getting case study options", flush=True)
        options2 = CaseStudyOption.get_case_study_options_by_case_study_id(case_study2_id)
        if len(options2) < 2:
            CaseStudyOption.delete_case_study_options_by_case_study_id(case_study2_id)
            try:
                print(os.getcwd(), flush=True)
                with open('controllers/guest_assignments/safety_above_all.txt', 'r') as file:
                    safety_text = file.read()
                print(os.getcwd(), flush=True)
                with open('controllers/guest_assignments/doing_wrong_to_do_right.txt', 'r') as file:
                    doing_text = file.read()
            except Exception as e:
                print(f"failed to read case study files {e}", flush=True) 
            CaseStudyOption.post_case_study_option(case_study2_id, "Safety Above All", safety_text)
            CaseStudyOption.post_case_study_option(case_study2_id, "Doing Wrong to do Right", doing_text)
            #CaseStudyOption.post_case_study_option(case_study2_id, "Enter the details of your hard case and/or difficult decision here", "Enter details - 700 words max")
            print("guest case study 2 options added", flush=True)
        else:
            print("guest case study 2 options already exist", flush=True)
        
        case_study3_id = CaseStudy.get_case_study_id_by_title("Moral Dilemma")
        #print("getting case study options", flush=True)
        options3 = CaseStudyOption.get_case_study_options_by_case_study_id(case_study3_id)
        if len(options3) < 3:
            CaseStudyOption.delete_case_study_options_by_case_study_id(case_study3_id)
            try:
                print(os.getcwd(), flush=True)
                with open('controllers/guest_assignments/safety_above_all.txt', 'r') as file:
                    safety_text = file.read()
                print(os.getcwd(), flush=True)
                with open('controllers/guest_assignments/doing_wrong_to_do_right.txt', 'r') as file:
                    doing_text = file.read()
            except Exception as e:
                print(f"failed to read case study files {e}", flush=True) 
            CaseStudyOption.post_case_study_option(case_study3_id, "Safety Above All", safety_text)
            CaseStudyOption.post_case_study_option(case_study3_id, "Doing Wrong to do Right", doing_text)
            #CaseStudyOption.post_case_study_option(case_study3_id, "Enter the details of your hard case and/or difficult decision here", "Enter details - 700 words max")
            print("guest case study 3 options added", flush=True)
        else:
            print("guest case study 3 options already exist", flush=True)
            
        # case_study4_id = CaseStudy.get_case_study_id_by_title("guest class 222 assignment 1")
        # #print("getting case study options", flush=True)
        # options4 = CaseStudyOption.get_case_study_options_by_case_study_id(case_study4_id)
        # if len(options4) < 3:
        #     CaseStudyOption.delete_case_study_options_by_case_study_id(case_study4_id)
        #     try:
        #         print(os.getcwd(), flush=True)
        #         with open('controllers/guest_assignments/safety_above_all.txt', 'r') as file:
        #             safety_text = file.read()
        #         print(os.getcwd(), flush=True)
        #         with open('controllers/guest_assignments/doing_wrong_to_do_right.txt', 'r') as file:
        #             doing_text = file.read()
        #     except Exception as e:
        #         print(f"failed to read case study files {e}", flush=True) 
        #     CaseStudyOption.post_case_study_option(case_study4_id, "Safety Above All", safety_text)
        #     CaseStudyOption.post_case_study_option(case_study4_id, "Doing Wrong to do Right", doing_text)
        #     CaseStudyOption.post_case_study_option(case_study4_id, "Enter the details of your hard case and/or difficult decision here", "Enter details - 700 words max")
        #     print("guest case study 4 options added", flush=True)
        # else:
        #     print("guest case study 4 options already exist", flush=True)
            
        # case_study5_id = CaseStudy.get_case_study_id_by_title("guest 222 Final Project")
        # #print("getting case study options", flush=True)
        # options5 = CaseStudyOption.get_case_study_options_by_case_study_id(case_study5_id)
        # if len(options5) < 3:
        #     CaseStudyOption.delete_case_study_options_by_case_study_id(case_study5_id)
        #     try:
        #         print(os.getcwd(), flush=True)
        #         with open('controllers/guest_assignments/safety_above_all.txt', 'r') as file:
        #             safety_text = file.read()
        #         print(os.getcwd(), flush=True)
        #         with open('controllers/guest_assignments/doing_wrong_to_do_right.txt', 'r') as file:
        #             doing_text = file.read()
        #     except Exception as e:
        #         print(f"failed to read case study files {e}", flush=True) 
        #     CaseStudyOption.post_case_study_option(case_study5_id, "Safety Above All", safety_text)
        #     CaseStudyOption.post_case_study_option(case_study5_id, "Doing Wrong to do Right", doing_text)
        #     CaseStudyOption.post_case_study_option(case_study5_id, "Enter the details of your hard case and/or difficult decision here", "Enter details - 700 words max")
        #     print("guest case study 5 options added", flush=True)
        # else:
        #     print("guest case study 5 options already exist", flush=True)
            
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
    

@bp.route('/api/flask/setup/desc-change', methods=['PATCH'])
def manual_option_description():
    try:
        data = request.get_json()
        #student_id = data['student_id']
        option_id = data['option_id']
        description = data['file']
        with open(f'controllers/guest_assignments/{description}', 'r') as file:
            description = file.read()
        CaseStudyOption.update_description(option_id, description)
        return make_response(jsonify({"message":"description updated"}), 201)
    except Exception as e:
        print(f'something went wrong {e}', flush=True)
        return make_response(jsonify({"message":"something went wrong", "error":e}), 500)