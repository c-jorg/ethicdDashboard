import os
from urllib import response
import zipfile
import json
from backend.models import *
import bcrypt
from datetime import datetime

def test_get_slider_questions(client, db_session):
    """
    Given GET /api/flask/slider-questions?case_study_id=1&form_name=example_form

    WHEN case_study_id and form_name are provided
    THEN response should contain slider questions and 200
    """

    # Create a case study
    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.flush()
    db_session.commit()

    #add a form to the db
    form = Form(name="new-form")
    db_session.add(form)
    db_session.flush()
    db_session.commit()
    print("Form added to DB: ", form.id, flush=True)

    #add a slider question
    slider_question = SliderQuestion(case_study_id=case_study.id, form_id=form.id, content="Test Slider Question", left_label="Left", right_label="Right")
    db_session.add(slider_question)
    db_session.flush()
    db_session.commit()

    existing_questions = db_session.query(SliderQuestion).all()
    print("Existing Slider Questions in DB:", existing_questions, flush=True)

  

    response = client.get(
        f'/api/flask/slider-questions?form_name={form.name}&case_study_id={case_study.id}',
        headers={"Content-Type": "application/json"}
    )

    print("GET Slider Questions Response: ", response.json, " ", response.status_code, flush=True)

    assert response.status_code == 200  # Ensure request was successful
    #assert isinstance(response.json, list)  # Ensure response is a list
    assert len(response.json) > 0  # Ensure there are slider questions in the response

def test_get_total_slider_questions(client, db_session):
    """
    Given GET /api/flask/slider-questions/total?case_study_id=1&form_name=example_form

    WHEN case_study_id and form_name are provided
    THEN response should contain total slider questions and 200
    """

    # Create a case study
    case_study = CaseStudy(professor_id=1, class_id=1, title="Test Case Study", last_modified=datetime.now())
    db_session.add(case_study)
    db_session.flush()
    db_session.commit()

    #add a form to the db
    form = Form(name="newer-form")
    db_session.add(form)
    db_session.flush()
    db_session.commit()
    print("Form added to DB: ", form.id, flush=True)

    #add a slider question
    slider_question = SliderQuestion(case_study_id=case_study.id, form_id=form.id, content="Test Slider Question", left_label="Left", right_label="Right")
    db_session.add(slider_question)
    db_session.flush()
    db_session.commit()

    existing_questions = db_session.query(SliderQuestion).all()
    print("Existing Slider Questions in DB:", existing_questions, flush=True)

  

    response = client.get(
        f'/api/flask/slider-questions/total?form_name={form.name}&case_study_id={case_study.id}',
        headers={"Content-Type": "application/json"}
    )
    print("GET Slider Questions Total Response: ", response.json, " ", response.status_code, flush=True)

    assert response.status_code == 200  # Ensure request was successful

   