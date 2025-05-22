
import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt


from werkzeug.datastructures import FileStorage


#CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def test_new_student(db_session):
    student = Student('exampe','examplenewstudent@example.com', bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'), False)
    db_session.add(student)
    db_session.commit()
    assert student == db_session.query(Student).filter(Student.email == 'examplenewstudent@example.com').first()



def test_login(client):
    """
    GIVEN POST /api/auth/login-student
    WHEN proper credentials are supplied
    THEN response should contain access_token
    """

    token_request = client.post(
        '/api/flask/auth/login-student',
        data = json.dumps({"email":"examplenewstudent@example.com", "password":"Password1"}),
        headers={"Content-Type":"application/json"}
        )


    #assert token_request.json['access_token'] is not None
    assert 'token' in token_request.json
    assert token_request.status_code == 200

def test_login_bad_password(client):
    """
    GIVEN POST /api/auth/login-student
    WHEN wrong password is supplied
    THEN response should not contain access_token and 401
    """

    token_request = client.post(
        '/api/flask/auth/login-student',
        data = json.dumps({"email":"example@example.com", "password":"Password"}),
        headers={"Content-Type":"application/json"}
        )


    #assert token_request.json['access_token'] is not None
    assert 'token' not in token_request.json
    assert token_request.status_code == 401

def test_login_bad_email(client):
    """
    GIVEN POST /api/auth/login-student
    WHEN wrong email is supplied
    THEN response should not contain access_token and 401
    """

    token_request = client.post(
        '/api/flask/auth/login-student',
        data = json.dumps({"email":"example@wrong.com", "password":"Password1"}),
        headers={"Content-Type":"application/json"}
        )


    #assert token_request.json['access_token'] is not None
    assert 'token' not in token_request.json
    assert token_request.status_code == 401

def test_login_no_json(client):
    """
    GIVEN POST /api/flask/auth/login-student
    WHEN no json is supplied
    THEN response should be 400 error
    """

    request = client.post(
        '/api/flask/auth/login-student'
    )

    assert 'token' not in request.json
    assert request.status_code == 400

def test_login_no_email(client):
    """
    GIVEN POST /api/flask/auth/login-student
    WHEN no email is supplied
    THEN response should be 400 error
    """

    request = client.post(
        '/api/flask/auth/login-student',
         data = json.dumps({"password":"Password"}),
         headers={"Content-Type":"application/json"}
    )

    assert 'token' not in request.json
    assert request.status_code == 400

def test_login_no_password(client):
    """
    GIVEN POST /api/flask/auth/login-student
    WHEN no password is supplied
    THEN response should be 400 error
    """

    request = client.post(
        '/api/flask/auth/login-student',
         data = json.dumps({"email":"example@example.com"}),
         headers={"Content-Type":"application/json"}
    )

    assert 'token' not in request.json
    assert request.status_code == 400