import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt

def test_setup_forms(client):
    """
    GIVEN POST /api/flask/setup/forms
    THEN response should contain success message
    """
    response = client.post('/api/flask/setup/forms')
    print(response)
    assert response.status_code == 201
    
def test_setup_forms_repeat(client):
    """
    GIVEN POST /api/flask/setup/forms repeatedly
    THEN Form.get_count_of_forms should return 15
    """
    client.post('/api/flask/setup/forms')
    client.post('/api/flask/setup/forms')
    count = Form.get_count_of_forms()
    assert count == 15

def test_setup_guest(client, db_session):
    """
    Given POST /api/flask/setup/guest
    THEN response should contain success message
    """
    db_session.query(CaseStudy).filter(CaseStudy.title == "").delete()
    print(db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Case Study").count())
    print(db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Case Study").all())
    print(db_session.query(CaseStudy).all())
    response = client.post('/api/flask/setup/guest')
    print(response)
    assert response.status_code ==  201
    assert db_session.query(Class).filter(Class.class_name == "guest class 111").count() == 1
    assert db_session.query(Class).filter(Class.class_name == "guest class 222").count() == 1
    assert db_session.query(Professor).filter(Professor.name == "guest professor").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Assignment 1").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Ethical Dilemma").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Moral Dilemma").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "guest class 222 assignment 1").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "guest 222 Final Project").count() == 1
    
def test_setup_guest_repeat(client, db_session):
    """
    Given POST /api/flask/setup/guest repeatedly
    THEN count of guest class, guest professor and guest case study should be 1
    """
    print(db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Assignment 1").count())
    print(db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Assignment 1").all())
    client.post('/api/flask/setup/guest')
    client.post('/api/flask/setup/guest')
    db_session.expire_all()
    print(db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Assignment 1").all())
    print(db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Assignment 1").count())
    assert db_session.query(Class).filter(Class.class_name == "guest class 111").count() == 1
    assert db_session.query(Class).filter(Class.class_name == "guest class 222").count() == 1
    assert db_session.query(Professor).filter(Professor.name == "guest professor").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Assignment 1").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Ethical Dilemma").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "Guest Moral Dilemma").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "guest class 222 assignment 1").count() == 1
    assert db_session.query(CaseStudy).filter(CaseStudy.title == "guest 222 Final Project").count() == 1