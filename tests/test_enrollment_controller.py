
import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt


from werkzeug.datastructures import FileStorage


#CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def test_get_enrollments(client, db_session):
    """
    GIVEN GET /api/flask/enrollments?student_id={student_id}

    WHEN a correct student ID is supplied
    THEN response should be 200 
    AND the response should contain the students classes/enrollments
    """

    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()
    print("Student: ", student, flush=True)

    prof = Professor('Ruth Lowe-Walker', 'prof@mail.com', 'password')
    db_session.add(prof)
    db_session.commit()
    print("Professor: ", prof, flush=True)

    course = Class('Philosophy 331', f'{prof.get_id()}')
    db_session.add(course)
    db_session.commit()
    print("Course: ", course, flush=True)

    enrollment = Enrollment(course.get_id(), student.get_id())
    db_session.add(enrollment)
    db_session.commit()
    print("Enrollment: ", enrollment, flush=True)

    response = client.get(
        f'/api/flask/enrollments?student_id={student.get_id()}'
    )

    print("Response: ", response, flush=True)
    print("Response JSON: ", response.json, flush=True)

    assert response.status_code == 200
    assert "classes" in response.json

def test_enroll_student(client, db_session):
    """
    GIVEN POST /api/flask/enrollment

    WHEN a correct student ID and class ID are supplied
    THEN response should be 200
    AND the response should contain a message saying enrolled successfully
    """

    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()
    print("Student: ", student, flush=True)

    prof = Professor('Ruth Lowe-Walker', 'prof@mail.com', 'password')
    db_session.add(prof)
    db_session.commit()
    print("Professor: ", prof, flush=True)

    course = Class('Philosophy 331', f'{prof.get_id()}')
    db_session.add(course)
    db_session.commit()
    print("Course: ", course, flush=True)

    response = client.post(
        f'/api/flask/enrollment',
        data = json.dumps({
            'student_id': student.get_id(),
            'class_id': course.get_id()
        }),
        headers={"Content-Type":"application/json"}
    )

    print("Response: ", response, flush=True)
    print("Response JSON: ", response.json, flush=True)

    assert response.status_code == 201
    assert response.json['message'] == 'Student enrolled in class successfully'

def test_enroll_student_already_enrolled(client, db_session):
    """
    GIVEN POST /api/flask/enrollment

    WHEN a correct student ID and class ID are supplied but the student is already enrolled
    THEN response should be 400
    AND the response should contain a message saying the student is already enrolled
    """

    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()
    print("Student: ", student, flush=True)

    prof = Professor('Ruth Lowe-Walker', 'prof@mail.com', 'password')
    db_session.add(prof)
    db_session.commit()
    print("Professor: ", prof, flush=True)

    course = Class('Philosophy 331', f'{prof.get_id()}')
    db_session.add(course)
    db_session.commit()
    print("Course: ", course, flush=True)

    enrollment = Enrollment(course.get_id(), student.get_id())
    db_session.add(enrollment)
    db_session.commit()
    print("Enrollment: ", enrollment, flush=True)

    response = client.post(
        f'/api/flask/enrollment',
        data = json.dumps({
            'student_id': student.get_id(),
            'class_id': course.get_id()
        }),
        headers={"Content-Type":"application/json"}
    )

    print("Response: ", response, flush=True)
    print("Response JSON: ", response.json, flush=True)

    assert response.status_code == 400
    assert response.json['message'] == 'Student is already enrolled in this class'