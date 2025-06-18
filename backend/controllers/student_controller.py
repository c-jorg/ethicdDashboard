from flask import Flask, request, jsonify, make_response, Blueprint, redirect
from flask_cors import cross_origin
from flask_cors import CORS
import bcrypt

from ..models import Student

from ..utils.form_validation import *
from ..utils.exceptions import *

bp = Blueprint('students', __name__)

#from app import app, ma

# =========== ROUTES FOR STUDENT ============


# get all students
@bp.route('/api/flask/students', methods=['GET'])
def get_students():
  print("HEADERS: ", request.headers, flush=True)
  try:
    #students = Student.query.all()
    students = Student.get_students()
    students_data = [{'id': student.id, 'name': student.name, 'email': student.email} for student in students]
    return jsonify(students_data), 200
  except Exception as e:
    return make_response(jsonify({'message': 'error getting student users', 'error': str(e)}), 500)
  
@bp.route('/api/flask/student/consent', methods=['PATCH'])
def update_consent():
  try:
    data = request.get_json()
    id = data['id']
    consented = data['consent']
    if consented == "yes":
      consented = True
    else:
      consented = False
    student = Student.get_student_by_id(id)

    if not student:
      return make_response(jsonify({'message': 'Student not found'}), 404)
    
    print("Updating consent for student: ", student.name, " Consent is: ", consented, flush=True)
    
    student.set_consent(consented)
 
    return jsonify({'message': 'Consent updated successfully'}), 200
  except Exception as e:
    return make_response(jsonify({'message': 'Error updating consent', 'error': str(e)}), 500)
  
@bp.route('/api/flask/student/consent', methods=['GET'])
def get_consent():
  try:
    id = request.args.get('user_id')
    student = Student.get_student_by_id(id)

    if not student:
      return make_response(jsonify({'message': 'Student not found'}), 404)
    
    consented = student.did_consent()
    return jsonify({'consent': consented}), 200
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting consent', 'error': str(e)}), 500)
  
@bp.route('/api/flask/student/email', methods=['GET'])
def get_email():
  try:
    id = request.args.get('student_id')

    if not id:
      return make_response(jsonify({'message': 'No student ID provided'}), 400)
    
    student = Student.get_student_by_id(id)

    if not student:
      return make_response(jsonify({'message': 'Student not found'}), 404)
    
    email = student.email
    return jsonify({'email': email}), 200
  except Exception as e:
    return make_response(jsonify({'message': 'Error getting email', 'error': str(e)}), 500)
 

#app.register_blueprint(student_routes)
      