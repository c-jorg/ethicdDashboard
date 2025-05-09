
import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt
from datetime import datetime


from werkzeug.datastructures import FileStorage


def test_get_form_description(client, db_session):
    """
    GIVEN GET /api/flask/form-description?assignment_id={case_study_id}&form_name={form_name}

    WHEN a correct assignment ID and form name is supplied
    THEN response should be 200 
    AND the response should contain the students classes/enrollments
    """

    form = Form.get_form_by_name("dilemma")
    print("Form: ", form, flush=True)

    case_study = CaseStudy(1, 1, 'Title', datetime.now())
    db_session.add(case_study)
    db_session.commit()
    print("Case Study: ", case_study, flush=True)

    assignment = Assignment(1, case_study.id, None, False, False, datetime.now())
    db_session.add(assignment)
    db_session.commit()
    print("Assignment: ", assignment, flush=True)

    form_description = FormDescription(case_study.id, form.id, 'Description')
    db_session.add(form_description)
    db_session.commit()
    print("Form Description: ", form_description, flush=True)

    response = client.get(
        f'/api/flask/form-description?assignment_id={assignment.id}&form_name={form.name}'
    )

    print("Response: ", response, flush=True)
    print("Response JSON: ", response.json, flush=True)

    assert response.status_code == 200
    assert "description" in response.json

def test_get_form_description_no_description(client, db_session):
    """
    GIVEN GET /api/flask/form-description?assignment_id={case_study_id}&form_name={form_name}

    WHEN a correct form name and assignment ID is supplied but there is no description
    THEN response should be 404
    AND the response should contain a message saying none found
    """

    form = Form.get_form_by_name("dilemma")
    print("Form: ", form, flush=True)

    case_study = CaseStudy(1, 1, 'Title', datetime.now())
    db_session.add(case_study)
    db_session.commit()
    print("Case Study: ", case_study, flush=True)

    assignment = Assignment(1, case_study.id, None, False, False, datetime.now())
    db_session.add(assignment)
    db_session.commit()
    print("Assignment: ", assignment, flush=True)


    response = client.get(
        f'/api/flask/form-description?assignment_id={assignment.id}&form_name={form.name}'
    )

    print("Response: ", response, flush=True)
    print("Response JSON: ", response.json, flush=True)

    assert response.status_code == 404
    assert "message" in response.json
    assert "No description found for form" in response.json["message"]


