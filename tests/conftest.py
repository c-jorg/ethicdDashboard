from datetime import datetime
import functools
from bcrypt import hashpw, gensalt
from flask import Flask, request, jsonify, make_response
from flask.testing import FlaskClient
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import pytest 
from backend.models.db import db, ma
from backend.models import *
from werkzeug.datastructures import Headers

#from ethics_dashboard_models import Form
#from ethics_dashboard_models import db, ma
from backend import create_app
import os

#change the environment database url to a temp memmory one
os.environ['DATABASE_URL'] = 'sqlite:///:memory:'
#os.environ['NEXT_PUBLIC_API_URL'] = 'http://localhost:4000'
os.environ['NEXT_PUBLIC_API_URL'] = 'http://http://4.206.215.51/:4000'

#add the token (generated from dev_token.py might have to regenerate every month) header to all requests
class CustomClient(FlaskClient):
    def open(self, *args, **kwargs):
        default_headers = Headers({'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjAsImV4cCI6MTc1Mjc5MjUzNCwibmFtZSI6IkRldmVsb3BlciJ9.a1DT-nEp6cXxcwqqAxONcYhhIvUDXDRas0-juvAZCp0'})
        headers = kwargs.pop('headers', Headers())
        headers.extend(default_headers)
        kwargs['headers'] = headers
        return super().open(*args, **kwargs)

#this function does initialization
@pytest.fixture(scope = 'module')
def app():
    #hopefully setting the environ database url works
    app = create_app()
    app.config['TESTING'] = True
    print(F"{app.config['SQLALCHEMY_DATABASE_URI']}")
    #app.test_client_class = CustomClient
    
    with app.app_context():
        db.create_all()

        #setup forms
        Form.post_form('dilemma')
        Form.post_form('cons-stakeholders')
        Form.post_form('cons-util-bentham')
        Form.post_form('cons-util-mill')
        Form.post_form('categorical-imperatives')
        Form.post_form('critical-questions')
        Form.post_form('personal-sacrifices')
        Form.post_form('duties-versus-actions')
        Form.post_form('final-questions')
        Form.post_form('care-form')
        Form.post_form('intersect-form')
        Form.post_form('generations-form')
        Form.post_form('virtue-ethics')
        Form.post_form('life-path')
        Form.post_form('universal-principles')

        #send the db session
        yield app

        #drop the db after 
        db.drop_all()

#this function return a testing app
@pytest.fixture(scope='module')
def client(app):
    client_ = app.test_client()
    client_.environ_base["HTTP_AUTHORIZATION"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwIiwiZXhwIjoxNzUyNzk0MTEwLCJuYW1lIjoiRGV2ZWxvcGVyIn0.jTSxC_Vh3JBMkYuvtzjK9rJyPmtW81Vz6-smapImQX8" 
    #return app.test_client()
    return client_

# this returns a db.session
@pytest.fixture(scope='module')
def db_session(app):
    with app.app_context():
        session = db.session
        session.begin()
        yield db.session
        session.rollback()
        
@pytest.fixture(scope='module',autouse=False)
def setup_fixture(client, db_session):
    Professor.post_professor('example','example@example.com', hashpw('Letmein1'.encode('utf-8'), gensalt()).decode('utf-8'))
    prof_id = Professor.get_professor_by_email('example@example.com').id
    Class.post_class('example class',prof_id,'example111')
    class_id = Class.get_class_id_by_class_code('example111')
    CaseStudy.post_case_study(prof_id,class_id,'example 1',datetime.now())
    case_study_id = CaseStudy.get_case_study_id_by_title('example 1')
    Student.post_student('example student','examplestudent@example.com', hashpw('Letmein1'.encode('utf-8'), gensalt()).decode('utf-8'), False)
    student_id = Student.get_student_by_email('examplestudent@exmple.com')
    Enrollment.enroll_student(class_id,student_id)
    enrollment_id = Enrollment.get_enrollments_by_student_id(student_id)[0].id
    CaseStudyOption.post_case_study_option(case_study_id, 'option 1', 'option 1 description')
    case_study_option_id = CaseStudyOption.get_case_study_options_by_case_study_id(case_study_id)[0].id
    Assignment.post_assignment(student_id,case_study_id,case_study_option_id)
    assignment_id = Assignment.get_all_assignment_ids_by_student_id(student_id)[0]
    return prof_id, class_id, case_study_id, student_id, enrollment_id, assignment_id, case_study_option_id