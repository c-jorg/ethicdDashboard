from flask import Flask, request, jsonify, make_response, Blueprint
import bcrypt
from datetime import datetime, timezone
import pytz
import sys

from ..models import Enrollment
from ..models import Class

bp = Blueprint('enrollment', __name__)

#=====  ROUTES FOR ENROLLMENT ============

@bp.route("/api/flask/enrollments", methods=["GET"])
def get_enrollments_with_names_and_profs():
    print("top of get enrollments",flush=True)
    try:
        if request.method != 'GET':
            return make_response(jsonify({'message': 'Method not allowed'}), 405)
        
        student_id = request.args.get('student_id')

        if student_id == None:
            return make_response(jsonify({'message': 'student_id is required'}), 400)
        
        try:
            student_id = int(student_id)
        except:
            return make_response(jsonify({'message': 'student_id must be an integer'}), 400)

        enrollments = Enrollment.get_enrollments_by_student_id(student_id)
        print("GET Enrollments: Enrollments: ", enrollments, flush=True)

        if enrollments:
            # Convert enrollments to dictionaries
            enrollments_dict = []
            for enrollment in enrollments:
                class_name = Class.get_class_name_by_class_id(enrollment.class_id)
                professor = Class.get_prof_name_by_class_id(enrollment.class_id)
                
                # Convert each enrollment object to a dictionary
                enrollments_dict.append({
                    "class_id": enrollment.class_id,
                    "class_name": class_name,
                    "professor": professor
                })
            
            print("GET Enrollments: Enrollments with names and profs: ", enrollments_dict, flush=True)
            return make_response(jsonify({'classes': enrollments_dict}), 200)
           
        else:
            return make_response(jsonify({'message': f'No classes found for student with ID {student_id}'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'Error getting classes in controller', 'error': str(e)}), 500)
    

@bp.route ("/api/flask/enrollment", methods=["POST"])
def enroll_student():
    try:
        if request.method != 'POST':
            return make_response(jsonify({'message': 'Method not allowed'}), 405)
        
        data = request.get_json()
        student_id = data.get('student_id')
        class_id = data.get('class_id')
        print("POST Enrollments: Data: ", data, flush=True)

        if student_id == None or class_id == None:
            return make_response(jsonify({'message': 'Student ID and Class ID are required'}), 400)
        
        try:
            student_id = int(student_id)
        except:
            return make_response(jsonify({'message': 'Please enter a valid student ID'}), 400)
        
        try:
            class_id = int(class_id)
        except:
            return make_response(jsonify({'message': 'Please enter a valid class code'}), 400)
    
        # Check if student is already enrolled in class
        enrollments = Enrollment.get_enrollments_by_student_id(student_id)
        print("Existing student enrollments: ", enrollments, flush=True)
        for enrollment in enrollments:
            if enrollment.class_id == class_id:
                return make_response(jsonify({'message': 'Student is already enrolled in this class'}), 400)
            
        # Get name of class
        class_name = Class.get_class_name_by_class_id(class_id)
        print("Class name: ", class_name, flush=True)
            
        enrollment = Enrollment.enroll_student(class_id, student_id)
        print("POST Enrollments: Enrollment: ", enrollment, flush=True)
        return make_response(jsonify({'message': 'Student enrolled in class successfully', 'class_name': class_name}), 201)
    except Exception as e:
        return make_response(jsonify({'message': 'Error enrolling student in class in controller', 'error': str(e)}), 500)
    