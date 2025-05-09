
import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt
import sqlalchemy
from datetime import datetime


from werkzeug.datastructures import FileStorage
import time


#CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def test_change_email(client, db_session):
    """
    GIVEN POST /api/flask/auth/change-student-email

    WHEN a student supplies a correct password and valid email
    THEN response should be 200 
    AND the change should be reflected in the DB
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()

    request = client.post(
        '/api/flask/auth/change-student-email',
         data = json.dumps({
             "new_email":"new_example@example.com",
             "password":f"Password1",
             "student_id":f"{student.get_id()}"
        }),
         headers={"Content-Type":"application/json"}
    )

    assert request.status_code == 200
    assert student == db_session.query(Student).filter(Student.email == 'new_example@example.com').first()

def test_change_email_bad_password(client, db_session):
    """
    GIVEN POST /api/flask/auth/change-student-email

    WHEN a student supplies a wrong password
    THEN response should be 401
    AND the change should not be reflected in the DB
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()

    request = client.post(
        '/api/flask/auth/change-student-email',
         data = json.dumps({
             "new_email":"new_example@example.com",
             "password":f"i am a password which does not exist",
             "student_id":f"{student.get_id()}"
        }),
         headers={"Content-Type":"application/json"}
    )

    assert request.status_code == 401
    assert "msg" in request.json == {"msg" : "Your password is incorrect."}

def test_change_email_bad_email(client, db_session):
    """
    GIVEN POST /api/flask/auth/change-student-email

    WHEN a student supplies a wrong email
    THEN response should be 400
    AND the change should not be reflected in the DB
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()

    request = client.post(
        '/api/flask/auth/change-student-email',
         data = json.dumps({
             "new_email":"bad email",
             "password":f"Password1",
             "student_id":f"{student.get_id()}"
        }),
         headers={"Content-Type":"application/json"}
    )

    assert request.status_code == 400
    assert "msg" in request.json == {"msg" : "Invalid email format"}

def test_change_email_no_email(client, db_session):
    """
    GIVEN POST /api/flask/auth/change-student-email

    WHEN a student supplies no email
    THEN response should be 400
    AND the change should not be reflected in the DB
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()

    request = client.post(
        '/api/flask/auth/change-student-email',
         data = json.dumps({
             "password":f"Password1",
             "student_id":f"{student.get_id()}"
        }),
         headers={"Content-Type":"application/json"}
    )

    assert request.status_code == 400
    assert "msg" in request.json == {"msg" : "Missing email or password in request body"}
    

def test_change_email_no_password(client, db_session):
    """
    GIVEN POST /api/flask/auth/change-student-email

    WHEN a student supplies no password
    THEN response should be 400
    AND the change should not be reflected in the DB
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()

    request = client.post(
        '/api/flask/auth/change-student-email',
         data = json.dumps({
             "new_email":"mail@mail.com",
             "student_id":f"{student.get_id()}"
        }),
         headers={"Content-Type":"application/json"}
    )

    assert request.status_code == 400
    assert "msg" in request.json == {"msg" : "Missing email or password in request body"}

def test_change_email_no_id(client, db_session):
    """
    GIVEN POST /api/flask/auth/change-student-email

    WHEN a student supplies no student id
    THEN response should be 400
    AND the change should not be reflected in the DB
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()

    request = client.post(
        '/api/flask/auth/change-student-email',
         data = json.dumps({
             "new_email":"email@mail.com",
             "password":f"Password1"
        }),
         headers={"Content-Type":"application/json"}
    )

    assert request.status_code == 400
    assert "msg" in request.json == {"msg" : "Error: No student ID found in request body"}

def test_soft_delete_student(client, db_session):
    """
    GIVEN DELETE /api/flask/auth/student

    WHEN a student supplies a correct password and the student has consented to keep their data
    THEN response should be 200 
    AND the student should be soft deleted from the DB
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, True)
    db_session.add(student)
    db_session.commit()

    response = client.delete(
        '/api/flask/auth/student',
         data = json.dumps({
             "student_id":f"{student.get_id()}",
             "password":f"Password1"
        }),
         headers={"Content-Type":"application/json"}
    )

    try:
        student = db_session.query(Student).filter(Student.id == student.get_id()).first()
    except sqlalchemy.orm.exc.ObjectDeletedError:
        student = None
    print("Student after deleting is: ", student, flush=True)

    assert response.status_code == 200
    assert student.email == None
    assert student != None
    assert student.deleted == True

def test_hard_delete_student(client, db_session):
    """
    GIVEN DELETE /api/flask/auth/student

    WHEN a student supplies a correct password and the student has not consented to keep their data
    THEN response should be 200 
    AND the student should be hard deleted from the DB
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()

    response = client.delete(
        '/api/flask/auth/student',
         data = json.dumps({
             "student_id":f"{student.get_id()}",
             "password":f"Password1"
        }),
         headers={"Content-Type":"application/json"}
    )

    try:
        student = db_session.query(Student).filter(Student.id == student.get_id()).first()
    except sqlalchemy.orm.exc.ObjectDeletedError:
        student = None
    print("Student after deleting is: ", student, flush=True)

    assert response.status_code == 200
    assert student == None

# def test_delete_student_with_assignment(client, db_session):
#     """
#     GIVEN DELETE /api/flask/auth/student

#     WHEN a student supplies a correct password
#     THEN response should be 200 
#     AND the student should be deleted from the DB and so should their corresponding assignments
#     """
#     password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
#     student = Student('example','example@example.com', password, False, False)
#     db_session.add(student)
#     db_session.commit()


#     assignment = Assignment(student.get_id(), 1, False, False, datetime.now())
#     db_session.add(assignment)
#     db_session.commit()
#     stu_id = student.get_id()
#     print("student id is ", stu_id, flush=True)

#     response = client.delete(
#         '/api/flask/auth/student',
#          data = json.dumps({
#              "student_id":f"{stu_id}",
#              "password":f"Password1"
#         }),
#          headers={"Content-Type":"application/json"}
#     )

#     # Flush the session to ensure the changes are written to the database
#     db_session.flush()
#     db_session.commit()

#     deleted_student = False
#     try:
#         student = db_session.query(Student).filter(Student.id == stu_id).first()
#         print("success fetching student", flush=True)
#         print("Student after not deleting is: ", student, flush=True)
#     except sqlalchemy.orm.exc.ObjectDeletedError:
#         print("deletion error thrown for student", flush=True)
#         student = None
#         deleted_student = True
#     #print("Student after deleting is: ", student, flush=True)

#     deleted_assignment = False
#     try:
#         assignment = db_session.query(Assignment).filter(Assignment.student_id == stu_id).first()
#         print("success fetching assignment", flush=True)
#         print("assignment after not deleting is: ", assignment, flush=True)
#     except sqlalchemy.orm.exc.ObjectDeletedError:
#         print("deletion error thrown for assignment", flush=True)
#         assignment = None
#         deleted_assignment = True

#     #print("Assignment after deleting is: ", assignment, flush=True)
#     print("Deleted student is: ", deleted_student, flush=True)
#     print("Deleted assignment is: ",
#           deleted_assignment, flush=True)

#     assert response.status_code == 200
#     assert student == None
#     assert assignment == None
