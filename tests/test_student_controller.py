
import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt


from werkzeug.datastructures import FileStorage


#CURRENT_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def test_get_email(client, db_session):
    """
    GIVEN POST /api/flask/student/email?student_id={student_id}

    WHEN a correct student ID is supplied
    THEN response should be 200 
    AND the response should contain the students email
    """
    password = bcrypt.hashpw('Password1'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    student = Student('example','example@example.com', password, False, False)
    db_session.add(student)
    db_session.commit()

    response = client.get(
        f'/api/flask/student/email?student_id={student.get_id()}'
    )

    assert response.status_code == 200
    assert "email" in response.json
