from flask import Flask, request, jsonify, make_response, Blueprint, json, current_app

from backend.controllers import assignment_controller
from ..models import Student, Assignment, CaseStudy, Answer, Submission, Form, Professor, Class, CaseStudyOption, Enrollment
from datetime import datetime
import json
import os 

bp = Blueprint('guest', __name__)

# @bp.route('/api/flask/guest/setup', methods=['POST'])
# def setup():
#     print("setup reached", flush=True)
#     try:
#         #make guest prof and class
#         Professor.post_professor("guest professor", "guestprofessoremail@testmail.com", "$2a$12$2ENfWLUOCsfG9wU5FxLe5O7X/NiPdxgKEb4DnCAdY5JAy.Z1CN51O")
#         Class.post_class("guest class", Professor.get_professor_id_by_professor_name("guest professor"))
#         CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_name("guest class"), 'Guest Case Study', datetime.now())
#         return make_response(jsonify({"message":"guest setup successful"}), 201)
#     except Exception as e:
#         return make_response(jsonify({"message":"error setting up guest mode", "error":f"{e}"}), 500)

@bp.route('/api/flask/guest/delete-guests', methods=['DELETE'])
def delete_guests():
    print("delete_guests reached", flush=True)
    #return make_response(jsonify({'message':"delete_guests reached succesfully"}), 200)
    try:
        guest_ids = Student.get_all_guest_ids()
        print("got guest ids", flush=True)
        #for each guest delete the submissions, then answers, then assignment, then enrollment, then student
        for guest_id in guest_ids:
            assignment_ids = Assignment.get_all_assignment_ids_by_student_id(guest_id)
            print("Got assignment ids for the guest", flush=True)
            #submissions have student_id so they can be deleted with the guest id
            Submission.delete_all_submissions_by_student_id(guest_id)
            print("Submissions deleted",flush=True)
            #loop to delete answers ans the assignment
            for assignment_id in assignment_ids:
                Answer.delete_answers_by_assignment_id(assignment_id)
                print("Answers deleted",flush=True)
            #delete the assignments
            Assignment.delete_assignments_by_student_id(guest_id)
            print("Assignments deleted",flush=True)
            #delete the enrollment
            Enrollment.delete_enrollment_by_student_id(guest_id)
            print("Enrollment deleted",flush=True)
        #lastly delete all the guest users
        Student.delete_all_guests()
        print("all guests deleted",flush=True)
        return make_response(jsonify({"message":"guests deleted successfully"}), 201)
    except Exception as e:
        return make_response(jsonify({"message":"error deleting guest users", "error":f"{e}"}), 500)

def populate_guest_assignments(guest_id):
    print(f"populate_guest_assignments called with guest_id: {guest_id}", flush=True)
    try:
        print("top of try",flush=True)
        class_id = Class.get_class_id_by_class_code("guest111")
        #class2_id = Class.get_class_id_by_class_code("guest222")
        print(f"enrolling guest in classes with class id {class_id}",flush=True)
        Enrollment.enroll_student(class_id, guest_id)
        #Enrollment.enroll_student(class2_id, guest_id)
        prof_id = Professor.get_professor_id_by_professor_name("guest professor")
        print("got prof_id",flush=True)

        print("got class_id",flush=True)
        #CaseStudy.post_case_study(prof_id, class_id, 'Guest Case Study', datetime.now())
        #print(f"Case study list length {len(CaseStudy.get_case_study_by_title('Guest Case Study'))}")
        #print("Case study made",flush=True)
        #CaseStudyOption.post_case_study_option(CaseStudy.get_case_study_by_title('Guest Case Study').id, 'Guest Case Study Option', 'Guest Case Study Option Description')
        #print("case study option made",flush=True)
        #case_study = CaseStudy.get_case_study_by_title('Guest Case Study')
        case_study_id = CaseStudy.get_case_study_id_by_title('Guest Assignment Completed')
        case_study2_id = CaseStudy.get_case_study_id_by_title('Ethical Dilemma')
        case_study3_id = CaseStudy.get_case_study_id_by_title('Moral Dilemma')
        #case_study4_id = CaseStudy.get_case_study_id_by_title('guest class 222 assignment 1')
        #case_study5_id = CaseStudy.get_case_study_id_by_title('guest 222 Final Project')
        print(f'case study ids {case_study_id} {case_study2_id} {case_study3_id}', flush=True)
        
        Assignment.post_assignment(guest_id, case_study_id, None)
        Assignment.post_assignment(guest_id, case_study2_id, None)
        Assignment.post_assignment(guest_id, case_study3_id, None)
        #Assignment.post_assignment(guest_id, case_study4_id, None)
        #Assignment.post_assignment(guest_id, case_study5_id, None)
        print("Made 3 assignments",flush=True)
        #print(F"length of assignments {Assignment.get_all_assignments_by_student(guest_id)}")
        #empty_assignment = Assignment.get_all_assignments_by_student(guest_id)[0]
        #half_assignment = Assignment.get_all_assignments_by_student(guest_id)[1]
        #done_assignment = Assignment.get_all_assignments_by_student(guest_id)[2]
        assignments = Assignment.get_all_assignments_by_student(guest_id)
        print(f"from guest controller: {assignments}, assignments len: {len(assignments)}",flush=True)
        empty_assignment = assignments[0][0]
        half_assignment = assignments[1][0]
        done_assignment = assignments[2][0]

        print(f"assignment ids : {empty_assignment.id} {half_assignment.id} {done_assignment.id} setting case study option", flush=True)
        option_id = CaseStudyOption.get_case_study_option_id_by_title_and_case_study_id("Safety Above All", case_study_id)
        print(f'option id {option_id}',flush=True)
        Assignment.set_case_study_option_by_id(done_assignment.id, option_id)
        
        form_list = [
            'dilemma', 
            'care-form', 
            'categorical-imperatives', 
            'cons-stakeholders', 
            'cons-util-bentham',
            'cons-util-mill',
            'critical-questions',
            'duties-versus-actions',
            'generations-form',
            'intersect-form',
            'life-path',
            'personal-sacrifices',
            'universal-principles',
            'virtue-ethics'
            ]

        for form in form_list:
            with open(f'controllers/guest_assignments/{form}.json', 'r') as file:
                form_data = json.load(file)
                #print(f'{form} form loaded without crashin',flush=True)
            form_data['student_id'] = guest_id
            form_data['assignment_id'] = done_assignment.id
            form_data['case_study_id'] = case_study_id
            if form == 'dilemma':
                form_data['answers']['dilemma-0'] = str(option_id)
                print(f'Form was dilemma, updating the value of the selected option id {option_id}', flush=True)
            #print(f'form loaded {form_data}', flush=True)
            with current_app.test_client() as client:
                #print('making post request', flush=True)
                response = client.post('/api/flask/assignment/save-form',
                data=json.dumps(form_data),
                content_type='application/json'
                )
                #response = assignment_controller.save_form()
                #print("saved form, response ", response.data, flush=True)
        print('guest answers made', flush=True)
        # print(os.getcwd(),flush=True)
        # #I have some saved answers in the guest_assignments folder
        # with open('controllers/guest_assignments/dilemma.json', 'r') as file:
        #     dilemma = json.load(file)
        #     print("Dilemma loaded", flush=True)
        # with open('controllers/guest_assignments/care-form.json', 'r') as file:
        #     care_form = json.load(file)
        #     print("care form loaded", flush=True)
        # with open('controllers/guest_assignments/categorical-imperatives.json', 'r') as file:
        #     categorical_imperatives = json.load(file)
        #     print("categorical impertacit loaded", flush=True)
        # with open('controllers/guest_assignments/cons-stakeholders.json', 'r') as file:
        #     cons_stakeholders = json.load(file)
        #     print("cons stakeholer loaded", flush=True)
        # with open('controllers/guest_assignments/cons-util-bentham.json', 'r') as file:
        #     cons_util_bentham = json.load(file)
        #     print("bentham loaded", flush=True)
        # with open('controllers/guest_assignments/cons-util-mill.json', 'r') as file:
        #     cons_util_mill = json.load(file)
        #     print("util mill loaded", flush=True)
        # with open('controllers/guest_assignments/critical-questions.json', 'r') as file:
        #     critical_questions = json.load(file)
        #     print("cri questions loaded", flush=True)
        # with open('controllers/guest_assignments/duties-versus-actions.json', 'r') as file:
        #     duties_versus_actions = json.load(file)
        #     print("duty v action loaded", flush=True)
        # with open('controllers/guest_assignments/generations-form.json', 'r') as file:
        #     generations_form = json.load(file)
        #     print("generations loaded", flush=True)
        # with open('controllers/guest_assignments/intersect-form.json', 'r') as file:
        #     intersect_form = json.load(file)
        #     print("intersect loaded", flush=True)
        # with open('controllers/guest_assignments/life-path.json', 'r') as file:
        #     life_path = json.load(file)
        #     print("life path loaded", flush=True)
        # with open('controllers/guest_assignments/personal-sacrifices.json', 'r') as file:
        #     personal_sacrifices = json.load(file)
        #     print("sacrifics loaded", flush=True)
        # with open('controllers/guest_assignments/universal-principles.json', 'r') as file:
        #     universal_principles = json.load(file)
        #     print("universal principles loaded", flush=True)
        # with open('controllers/guest_assignments/virtue-ethics.json', 'r') as file:
        #     virtue_ethics = json.load(file)
        #     print("virtue ethics loaded", flush=True)
            
    #     #for each file add the answers to the tables
    #     #one will have all of them
    #     print("making dilemma answers",flush=True)
    #     #print(dilemma,flush=True)
    #     #print(half_assignment,flush=True)
    #     print(done_assignment, flush=True)
    #     for item in dilemma:
    #         #print(item, flush=True)
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         #Answer.post_answer(half_assignment.id, Form.get_form_id_by_name("dilemma"), key, value_string, value_int, datetime.now(), datetime.now())
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("dilemma"), key, value_string, value_int, datetime.now(), datetime.now())

    #    # Submission.post_submission(half_assignment.id, Form.get_form_id_by_name("dilemma"), datetime.now(), guest_id)
    #    # Submission.post_submission(done_assignment.id, Form.get_form_id_by_name("dilemma"), datetime.now(), guest_id)
    #     print("making care form",flush=True)
    #     for item in care_form:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("care-form"), key, value_string, value_int, datetime.now(), datetime.now())

    #     print("Making imperatives form",flush=True)
    #     for item in categorical_imperatives:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("categorical-imperatives"), key, value_string, value_int, datetime.now(), datetime.now())
    #         #Answer.post_answer(half_assignment.id, Form.get_form_id_by_name("categorical-imperatives"), key, value_string, value_int, datetime.now(), datetime.now())


    #     print("making stakeholder form",flush=True)
    #     for item in cons_stakeholders:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("cons-stakeholders"), key, value_string, value_int, datetime.now(), datetime.now())
    #         #Answer.post_answer(half_assignment.id, Form.get_form_id_by_name("cons-stakeholders"), key, value_string, value_int, datetime.now(), datetime.now())


    #     print("making bentham form",flush=True)
    #     for item in cons_util_bentham:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("cons-util-bentham"), key, value_string, value_int, datetime.now(), datetime.now())
    #         #Answer.post_answer(half_assignment.id, Form.get_form_id_by_name("cons-util-bentham"), key, value_string, value_int, datetime.now(), datetime.now())


    #     print("making mill form",flush=True)
    #     for item in cons_util_mill:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("cons-util-mill"), key, value_string, value_int, datetime.now(), datetime.now())
    #        # Answer.post_answer(half_assignment.id, Form.get_form_id_by_name("cons-util-mill"), key, value_string, value_int, datetime.now(), datetime.now())


    #     print("making critical quesion form",flush=True)
    #     for item in critical_questions:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("critical-questions"), key, value_string, value_int, datetime.now(), datetime.now())

    #     print("making duties actions form",flush=True)
    #     for item in duties_versus_actions:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("duties-versus-actions"), key, value_string, value_int, datetime.now(), datetime.now())

    #     print("making generations form",flush=True)
    #     for item in generations_form:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("generations-form"), key, value_string, value_int, datetime.now(), datetime.now())

    #     print("making intersect form",flush=True)
    #     for item in intersect_form:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("intersect-form"), key, value_string, value_int, datetime.now(), datetime.now())

    #     print("making life path form",flush=True)
    #     for item in life_path:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("life-path"), key, value_string, value_int, datetime.now(), datetime.now())

    #     print("making personal sacrifices form",flush=True)
    #     for item in personal_sacrifices:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("personal-sacrifices"), key, value_string, value_int, datetime.now(), datetime.now())

    #     print("making universal principlsd form",flush=True)
    #     for item in universal_principles:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("universal-principles"), key, value_string, value_int, datetime.now(), datetime.now())

    #     print("making virtue ethics form",flush=True)
    #     for item in virtue_ethics:
    #         key = item['key']
    #         value_string = item['value_string']
    #         value_int = item['value_int']
    #         Answer.post_answer(done_assignment.id, Form.get_form_id_by_name("virtue-ethics"), key, value_string, value_int, datetime.now(), datetime.now())

        print("guest assignments populated",flush=True)
        
    except Exception as e:
        print(e, flush=True)
        
@bp.route('/api/flask/guest/is-guest', methods=['GET'])
def is_guest():
    print("Checking if student is guest", flush=True)
    try:
        student_id = request.args.get('student_id')
        guest = Student.get_guest_by_id(student_id)
        print(f'guest {guest}', flush=True)
        return make_response(jsonify({"guest":guest}),200)
    except Exception as e:
        return jsonify({"message":"Error checking guest", "error":e},500)