import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt
from datetime import datetime
import pytest

@pytest.fixture(scope='module', autouse=True)
def guest_fixture(client, db_session):
    client.post('/api/flask/setup/guest')
    

def test_register_guest(client):
    """
    Given POST /api/flask/auth/register-guest
    THEN response should contain access_token
    """

    token_request = client.post(
        'api/flask/auth/register-guest'
    )

    assert 'token' in token_request.json
    assert token_request.status_code == 200

def test_guest_assignments(client):
    """
    Given GET /api/flask/assignments/get-assignments?user_id=user_id
    WHEN user_id is supplied
    THEN response should contain assignmets and 200
    """

    os.chdir('backend')
    #Professor.post_professor("guest professor", "guestprofessor@mail.com", '$2b$12$TnMgrTctCScx8htInEAbJeXmk66t2gexYWw1V0FgGyTltTb7OaVtu')
    #Class.post_class("guest class", Professor.get_professor_id_by_professor_name("guest professor"))
    #CaseStudy.post_case_study(Professor.get_professor_id_by_professor_name("guest professor"), Class.get_class_id_by_class_name("guest class"), 'Guest Case Study', datetime.now())
    #client.post('/api/flask/setup/guest')

    response = client.post('api/flask/auth/register-guest')
    response_data = response.json
    print(response_data)
    guest_id = response_data['id']
    print(f'guest_id: {guest_id} data type: {type(guest_id)}')

    assignments_response = client.get(f'/api/flask/assignments?user_id={guest_id}')
    print(assignments_response.json)
    assignments_data = assignments_response.get_json()
    null_count = 0
    for assignment in assignments_data:
        print(f'assignment data {assignment}', flush=True)
        if assignment['case_study_option_id'] is None:
            null_count += 1

    assert  len(assignments_response.json) == 3
    assert assignments_response.status_code == 200
    assert null_count == 2
    #assert 'token' not in response.json

def test_get_guest_enrollments(client):
    """
    Given GET /api/flask/enrollments?user_id=user_id
    WHEN user_id is supplied
    THEN response should contain enrollments and 200
    """
    guest = client.post('api/flask/auth/register-guest')
    guest_data = guest.json
    guest_id = guest_data['id']
    print(f"Guest id in enrollment test: {guest_id}",flush=True)
    response = client.get(f'/api/flask/enrollments?student_id={guest_id}')
    response_data = response.json
    print(response_data)
    enrollment_1 = response_data['classes'][0]
    #enrollment_2 = response_data['classes'][1]

    assert(len(response_data['classes']) == 1)
    assert(response.status_code == 200)
    assert(enrollment_1['class_name'] == 'guest class 111')
    assert(enrollment_1['professor'] == 'guest professor')
   # assert(enrollment_2['class_name'] == 'guest class 222')
    #assert(enrollment_2['professor'] == 'guest professor')
    assert(enrollment_1['class_id'] != None)
    #assert(enrollment_2['class_id'] != None)
    
def test_delete_guests(client, db_session):
    """
    GIVEN DELETE /api/flask/guest/delete-guests
    ASSUMING there is guest data in the database
    THEN response should be 201 and no guest info should be in database
    """
    
    response = client.post('/api/flask/auth/register-guest')
    delete_response = client.delete('/api/flask/guest/delete-guests')
    
    assert response.status_code == 200
    assert delete_response.status_code == 201
    assert db_session.query(Student).filter(Student.guest == True).count() == 0
    #students are needed in several other tables so it is the last to be deleted, if there are no students then everything else has to be gone