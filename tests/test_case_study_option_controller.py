import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt
from datetime import datetime
import pytest

def test_get_case_study_option_success(client, setup_fixture):
    """
    GIVEN /api/flask/case-study-option/option-id
    WHEN request is valid
    THEN response should be 200 and the case study option information
    """
    prof_id, class_id, case_study_id, student_id, enrollment_id, assignment_id, case_study_option_id = setup_fixture
    print(case_study_option_id)
    response = client.get(f'/api/flask/case-study-option/option-id?option_id={case_study_option_id}')
    data = response.json
    print(data)
    assert response.status_code == 200
    assert data['title'] == 'option 1'
    assert data['description'] == 'option 1 description'
    
def test_get_case_study_option_404(client, setup_fixture):
    """
    GIVEN /api/flask/case-study-option/option-id
    WHEN request contains an id that does not exist 
    THEN response should be 404
    """
    response = client.get(f'/api/flask/case-study-option/option-id?option_id=827482')
    data = response.json
    assert response.status_code == 404
    assert data["message"] == "No case study option with that id found"
    
def test_get_case_study_option_no_id(client, setup_fixture):
    """
    GIVEN /api/flask/case-study-option/option-id
    WHEN reqeuest does not contain an option id
    THEN response should be 400
    """
    response = client.get(f'/api/flask/case-study-option/option-id')
    data = response.json
    assert response.status_code == 400
    assert data['message'] == 'Must give case study option id'
    
def test_get_case_study_option_bad_id(client, setup_fixture):
    """
    GIVEN /api/flask/case-study-option/option-id
    WHEN reqeuest contains an invalid id data type
    THEN response should be 400
    """
    response = client.get(f'/api/flask/case-study-option/option-id?option_id=a')
    data = response.json
    assert response.status_code == 400
    assert data['message'] == 'invalid data type'