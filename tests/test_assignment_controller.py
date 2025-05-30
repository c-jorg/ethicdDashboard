import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt
from datetime import datetime

def test_get_assignments_for_student(client, db_session):
    """
    Given GET /api/flask/assignments?user_id=1

    WHEN user_id is supplied
    THEN response should contain assignments and 200

    Assumes that user with ID of the student has assignments assigned to them
    """
    # add a class to the db
    class1 = Class(class_name='example class', prof_id=1, class_code='exampleclass1')
    db_session.add(class1)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    # Add assignments to the test database for student with ID 1
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()
    db_session.refresh(student)

    print("Student: ", student, flush=True)

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.id, case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    assignment2 = Assignment(student_id=student.get_id(), case_study_id=case_study.id, case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.add(assignment2)
    db_session.commit()

    print("Assignment1: ", assignment1, flush=True)
    print("Assignment2: ", assignment2, flush=True)

    response = client.get(
        f'/api/flask/assignments?user_id={student.get_id()}'
    )

    assignments = db_session.query(Assignment).filter(Assignment.student_id == student.get_id()).all()
    assert len(assignments) > 0

    print(assignments[0])
    print(assignments[1])

    print("Response: ", response.json, flush=True)

    assert response.status_code == 200  # Ensure request was successful
    assert isinstance(response.json, list)  # Ensure response is a list
    assert len(response.json) > 0  # Ensure there are assignments

    # Check that all assignments belong to the correct student
    for assignment in response.json:
        assert assignment["student_id"] == student.get_id()  # Ensure student_id is correct

def test_get_assignments_for_student_no_assignments(client):
    """
    Given GET /api/flask/assignments?user_id=982368923

    WHEN user_id is supplied
    THEN response should contain assignments and 200

    Assumes that user with ID 982368923 has no assignments assigned to them
    """

    response = client.get(
        '/api/flask/assignments?user_id=982368923'
    )

    """
    example response:
        {
            "message": "No assignments found for this user"
        }   
    """

    assert response.status_code == 404  # Ensure request return not found
    assert "message" in response.json  # Ensure response contains message

def test_get_assignments_for_student_invalid_id(client):
    """
    Given GET /api/flask/assignments?user_id=not_a_number
    """

    response = client.get(
        '/api/flask/assignments?user_id=not_a_number'
    )

    assert response.status_code == 400  # Ensure request returns bad request
    assert "message" in response.json  # Ensure response contains error message


def test_is_form_submitted(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id=1&student_id=1
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain submitted and 200

    """
    
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    assignment1 = Assignment(student_id=1, case_study_id=1, case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")

    #add submission for student
    submission = Submission(student_id=student.get_id(), form_id=form.get_id(), assignment_id=assignment1.get_id(), submitted_time=datetime.now())
    db_session.add(submission)
    db_session.commit()

    print("TEST: Submission is ", submission, flush=True)


    response = client.get(
        f"/api/flask/assignment/is-form-submitted?form_name={form.get_name()}&assignment_id={assignment1.get_id()}&student_id={student.get_id()}"
    )

    assert response.status_code == 200  # Ensure request was successful
    assert "message" in response.json  # Ensure response contains submitted

def test_is_form_submitted_no_submission(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id=1&student_id=1
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain submitted and 200

    """
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    assignment1 = Assignment(student_id=1, case_study_id=1, case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    response = client.get(
        f"/api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id={assignment1.get_id()}&student_id={student.get_id()}"
    )

    assert response.status_code == 404  # Ensure request was successful
    assert "message" in response.json  # Ensure response contains submitted

def test_is_form_submitted_form_doesnt_exist(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?form_name=not_a_form&assignment_id=1&student_id=1
    """

    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    assignment1 = Assignment(student_id=1, case_study_id=1, case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    response = client.get(
        f"/api/flask/assignment/is-form-submitted?form_name=not_a_form&assignment_id={assignment1.get_id()}&student_id={student.get_id()}"
    )

    assert response.status_code == 404  # Ensure request returns not found
    assert "message" in response.json  # Ensure response contains error message

def test_is_form_submitted_with_numbers_in_form_name(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?form_name=1212&assignment_id=1&student_id=1
    """

    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    assignment1 = Assignment(student_id=1, case_study_id=1, case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    response = client.get(
        f"/api/flask/assignment/is-form-submitted?form_name=1212&assignment_id={assignment1.get_id()}&student_id={student.get_id()}"
    )

    assert response.status_code == 400  # Ensure request returns not found
    assert "message" in response.json  # Ensure response contains error message

def test_is_form_submitted_invalid_assignment_id(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id=not_a_number&student_id=1
    """

    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    response = client.get(
        f"/api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id=bad_id&student_id={student.get_id()}"
    )

    assert response.status_code == 400  # Ensure request returns not found
    assert "message" in response.json  # Ensure response contains error message

def test_is_form_submitted_invalid_student_id(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id=1&student_id=not_a_number
    """

    response = client.get(
        f"/api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id=1&student_id=bad_id"
    )

    assert response.status_code == 400  # Ensure request returns not found
    assert "message" in response.json  # Ensure response contains error message

def test_is_form_submitted_no_form_name(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?assignment_id=1&student_id=1
    """

    response = client.get(
        f"/api/flask/assignment/is-form-submitted?assignment_id=1&student_id=1"
    )

    assert response.status_code == 400  # Ensure request returns not found
    assert "message" in response.json  # Ensure response contains error message

def test_is_form_submitted_no_assignment_id(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?form_name=dilemma&student_id=1
    """

    response = client.get(
        f"/api/flask/assignment/is-form-submitted?form_name=dilemma&student_id=1"
    )

    assert response.status_code == 400  # Ensure request returns not found
    assert "message" in response.json  # Ensure response contains error message

def test_is_form_submitted_no_student_id(client, db_session):
    """
    Given GET api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id=1
    """

    response = client.get(
        f"/api/flask/assignment/is-form-submitted?form_name=dilemma&assignment_id=1"
    )

    assert response.status_code == 400  # Ensure request returns not found
    assert "message" in response.json  # Ensure response contains error message
    
def test_save_answers_student_option(client, db_session):
    """
    GIVEN PATCH api/flask/assignment/set-case-study-option
    WHEN case_study_option is student-option
    THEN response should contain message and 201
    AND assignment.case_study_option_id should be null
    """
    response = client.patch(f"/api/flask/assignment/set-case-study-option",
            data = json.dumps({
                "student_id": 1,
                "assignment_id": 1,
                "case_study_option": "student-option"
            }),
            headers={"Content-Type": "application/json"}
            )
    option_id = Assignment.get_case_study_option_id_by_assignment_id(1)
    assert response.status_code == 201
    assert option_id is None
    
def test_get_answers(client, db_session):
    """
    Given GET api/flask/assignment/get-answers?form_name=dilemma&assignment_id=1&student_id=1
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain answers and 200 if the answers exist

    """

    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")

    answer = Answer(assignment_id=assignment1.get_id(), form_id=form.get_id(), key="key", value_string="value", value_int=1, created=datetime.now(), last_modified=datetime.now())
    db_session.add(answer)
   
    db_session.commit()
    print("answer: ", answer, flush=True)

    print("request: ", f"/api/flask/assignment/get-answers?form_name={form.get_name()}&assignment_id={assignment1.get_id()}&student_id={student.get_id()}", flush=True)
    

    response = client.get(
        f"/api/flask/assignment/get-answers?form_name={form.get_name()}&assignment_id={assignment1.get_id()}&user_id={student.get_id()}"
    )

    print(response.json, flush=True)
    assert response.status_code == 200  # Ensure request returns OK
   
    assert "message" in response.json  # Ensure response contains error message

def test_get_answers_no_answers(client, db_session):
    """
    Given GET api/flask/assignment/get-answers?form_name=dilemma&assignment_id=1&student_id=1
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain answers and 200 if the answers exist, otherwise 404

    """
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")

    print("request: ", f"/api/flask/assignment/get-answers?form_name={form.get_name()}&assignment_id={assignment1.get_id()}&student_id={student.get_id()}", flush=True)
    

    response = client.get(
        f"/api/flask/assignment/get-answers?form_name={form.get_name()}&assignment_id={assignment1.get_id()}&user_id={student.get_id()}"
    )

    print(response.json, flush=True)
    assert response.status_code == 404  # Ensure request returns 404
   
    assert "message" in response.json  # Ensure response contains error message


def test_get_answers_no_form(client, db_session):
    """
    Given GET api/flask/assignment/get-answers?assignment_id=1&student_id=1
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain answers and 200 if the answers exist, otherwise 404

    """
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")


    response = client.get(
        f"/api/flask/assignment/get-answers?&assignment_id={assignment1.get_id()}&user_id={student.get_id()}"
    )

    print(response.json, flush=True)
    assert response.status_code == 400  # Ensure request returns 400
   
    assert "message" in response.json  # Ensure response contains error message

def test_get_answers_no_assignment_id(client, db_session):
    """
    Given GET api/flask/assignment/get-answers?form_name=dilemma&student_id=1
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain answers and 200 if the answers exist, otherwise 404

    """
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")


    response = client.get(
        f"/api/flask/assignment/get-answers?&user_id={student.get_id()}&form_name={form.get_name()}"
    )

    print(response.json, flush=True)
    assert response.status_code == 400  # Ensure request returns 400
   
    assert "message" in response.json  # Ensure response contains error message

def test_get_answers_no_student_id(client, db_session):
    """
    Given GET api/flask/assignment/get-answers?form_name=dilemma&assignment_id=1
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain answers and 200 if the answers exist, otherwise 404

    """
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")


    response = client.get(
        f"/api/flask/assignment/get-answers?&assignment_id={assignment1.get_id()}&form_name={form.get_name()}"
    )

    print(response.json, flush=True)
    assert response.status_code == 400  # Ensure request returns 400
   
    assert "message" in response.json  # Ensure response contains error message

def test_get_answers_invalid_assignment_id(client, db_session):
    """
    Given GET api/flask/assignment/get-answers?form_name=dilemma&assignment_id=not_a_number&student_id=1
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain answers and 200 if the answers exist, otherwise 404

    """
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")

    response = client.get(
        f"/api/flask/assignment/get-answers?&assignment_id=invalid&form_name={form.get_name()}&user_id={student.get_id()}"
    )

    print(response.json, flush=True)
    assert response.status_code == 400  # Ensure request returns 400
   
    assert "message" in response.json  # Ensure response contains error message

def test_get_answers_invalid_student_id(client, db_session):
    """
    Given GET api/flask/assignment/get-answers?form_name=dilemma&assignment_id=not_a_number&student_id=invalid
    
    WHEN form_name, assignment_id, and student_id are supplied
    THEN response should contain answers and 200 if the answers exist, otherwise 404

    """
    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")

    response = client.get(
        f"/api/flask/assignment/get-answers?&assignment_id={assignment1.get_id()}&form_name={form.get_name()}&user_id=invalid"
    )

    print(response.json, flush=True)
    assert response.status_code == 400  # Ensure request returns 400
   
    assert "message" in response.json  # Ensure response contains error message

def test_submit_answers(client, db_session):
    """
    Given POST api/flask/assignment/submit-form
    
    WHEN form_name, assignment_id, student_id, and answers are supplied
    THEN response should contain message and 201 created
    """

    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")

    response = client.post(
        f"/api/flask/assignment/submit-form",
        data = json.dumps({
            "student_id": student.get_id(),
            "assignment_id": assignment1.get_id(),
            "case_study_id": case_study.get_id(),
            "form_name": form.get_name(),
            "answers": {
                "dilemma-0": "conflict_of_interest",
                "dilemma-1": "false",
                "dilemma-2": "false"
            }
        }),
        headers={"Content-Type":"application/json"}
    )

    print(response.json, flush=True)
    assert response.status_code == 201  # Ensure request returns created

def test_save_answers(client, db_session):
    """
    Given POST api/flask/assignment/save-form
    
    WHEN form_name, assignment_id, student_id, and answers are supplied
    THEN response should contain message and 201 created
    """

    student = Student(name="Test Student", email="test@mail.com", password="password", guest=False, consented=True)
    db_session.add(student)
    db_session.commit()

    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.commit()

    assignment1 = Assignment(student_id=student.get_id(), case_study_id=case_study.get_id(), case_study_option_id=1, submitted=False, graded=False, last_modified=datetime.now())
    db_session.add(assignment1)
    db_session.commit()

    form = Form.get_form_by_name("dilemma")

    response = client.post(
        f"/api/flask/assignment/save-form",
        data = json.dumps({
            "student_id": student.get_id(),
            "assignment_id": assignment1.get_id(),
            "case_study_id": case_study.get_id(),
            "form_name": form.get_name(),
            "answers": {
                "dilemma-0": "conflict_of_interest",
                "dilemma-1": "false",
                "dilemma-2": "false"
            }
        }),
        headers={"Content-Type":"application/json"}
    )

    print(response.json, flush=True)
    assert response.status_code == 201  # Ensure request returns created
   
    assert "message" in response.json  # Ensure response contains 
    
def test_get_option_id_success(client, setup_fixture):
    """
    GIVEN  GET /api/flask/assignment/option
    ASSUMING a case study option has been given
    WHEN assignment id is valid 
    THEN response should be 200 and have option id
    """
    prof_id, class_id, case_study_id, student_id, enrollment_id, assignment_id, case_study_option_id = setup_fixture
    response = client.get(f'/api/flask/assignment/option?assignment_id={assignment_id}')
    data = response.json
    assert response.status_code == 200
    assert data['message'] == 'Successfully got case study option id'
    assert data['option_id'] == case_study_option_id
    
def test_get_option_id_no_id(client, setup_fixture):
    """
    GIVEN  GET /api/flask/assignment/option
    WHEN assignment id is not provided
    THEN response should be 400
    """
    prof_id, class_id, case_study_id, student_id, enrollment_id, assignment_id, case_study_option_id = setup_fixture
    response = client.get(f'/api/flask/assignment/option')
    data = response.json
    assert response.status_code == 400
    assert data['message'] == 'Must provide an assignment id'

def test_get_option_id_bad_id(client, setup_fixture):
    """
    GIVEN  GET /api/flask/assignment/option
    WHEN assignment id is no an int 
    THEN response should be 400
    """
    prof_id, class_id, case_study_id, student_id, enrollment_id, assignment_id, case_study_option_id = setup_fixture
    response = client.get(f'/api/flask/assignment/option?assignment_id=et')
    data = response.json
    assert response.status_code == 400
    assert data['message'] == 'Invalid data type'
    
def test_get_option_id_404(client, setup_fixture):
    """
    GIVEN  GET /api/flask/assignment/option
    WHEN assignment id does not exist
    THEN response should be 404
    """
    prof_id, class_id, case_study_id, student_id, enrollment_id, assignment_id, case_study_option_id = setup_fixture
    response = client.get(f'/api/flask/assignment/option?assignment_id=7373')
    data = response.json
    assert response.status_code == 404
    assert data['message'] == 'No assignment with that id found'
    
def test_get_option_id_not_set(client, setup_fixture, db_session):
    """
    GIVEN  GET /api/flask/assignment/option
    ASSUMING a case study option has not been set
    WHEN assignment id is valid 
    THEN response should be 404
    """
    prof_id, class_id, case_study_id, student_id, enrollment_id, assignment_id, case_study_option_id = setup_fixture
    #Assignment.post_assignment(student_id, case_study_id, None)
    assignment2 = Assignment(student_id, case_study_id, None, False, False, datetime.now())
    db_session.add(assignment2)
    db_session.commit()
    response = client.get(f'/api/flask/assignment/option?assignment_id={assignment2.id}')
    data = response.json
    assert response.status_code == 404
    assert data['message'] == 'No case study option set for this assignment'