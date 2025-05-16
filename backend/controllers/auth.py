
import random
import string
from flask import Flask, request, jsonify, make_response, Blueprint, redirect, session, url_for, current_app
import functools
import bcrypt
from flask_jwt_extended import create_access_token #will need this in the future when we create sessions
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
import datetime
import jwt


from ..models import Student
from ..models import Professor
from ..models import TA
from ..models import Assignment
from ..utils.form_validation import *
from ..utils.exceptions import *
from .guest_controller import populate_guest_assignments
#from ..models import db #remove when all references to db are removed

bp = Blueprint('auth', __name__)

# register a student
@bp.route('/api/flask/auth/register-student', methods=['POST'])
def create_student():
  try:
    data = request.get_json()
    
    #validate the data
    name = str(data['name'])
    validate_name(name)
    email = str(data['email'])
    validate_email(email)
    password = str(data['password'])
    validate_password(password)
    consent = str(data['consent'])
    
    #check if the student is invited, if they are then return the student object from the DB
    invited_student = studentIsInvited(email)
   
    #hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    #turn consent to boolean
    if consent == 'yes':
       consent = True
    else:
        consent = False

    #update the information for the invited student

    # invited_student.name = name
    # invited_student.password = hashed_password
    # db.session.commit()  
    print("create student ", name, email, hashed_password, False, consent, flush=True);
    Student.update_student(name, email, hashed_password, False, consent)
    print("did it update", flush=True)


    #return success (201 created) as well as json to represent the object that was created, this is just a response for the API to give
    #this has nothing to do with the database
    return jsonify({
        'id': invited_student.id,
        'name': invited_student.name,
        'email': invited_student.email,
        'password': invited_student.password
    }), 201  
  
  except NameValidationError as ve:
    return make_response(jsonify({'message': str(ve)}), 400)
  except EmailValidationError as ve:
     return make_response(jsonify({'message': str(ve)}), 400)
  except PasswordValidationError as ve:
    return make_response(jsonify({'message': str(ve)}), 400)
  except AccountAlreadyExistsError as ve:
    return make_response(jsonify({'message': "Account already exists"}), 400)
  except NotInvitedError as ve:
    return make_response(jsonify({'message': "You have not been invited to create an account"}), 400)
  except Exception as e:
    return make_response(jsonify({'message': 'Error creating student user', 'error': str(e)}), 500)


def studentIsInvited(email):
  existing_student = Student.get_student_by_email(email)#Student.query.filter_by(email=email).first()
  if existing_student and not existing_student.password:
    return existing_student
  elif existing_student and existing_student.password:
    raise AccountAlreadyExistsError #if we have the email and they have a password, then the student already made their account
  else:
    raise NotInvitedError #if the email is not in the database, this person was not invited to make an account


@bp.route('/api/flask/auth/login-student', methods=['POST'])
def login_student():
   if request.method == 'POST':
     if not request.is_json:
       return jsonify({"msg": "Missing JSON in request"}), 400
     
     try:
       email = request.json.get('email', None)
       password = request.json.get('password', None)

       if email is None or password is None:
         return jsonify({"msg": "No email or password is provided"}), 400

       print("email: "+ email,flush=True)
       print("password: "+ password,flush=True)
       
       student = Student.get_student_by_email(email)
       if not student:
          return jsonify({"msg": f"No student found with that email."}), 401

       if student:
           encrypted_password = student.get_password()

           
           password_matches = bcrypt.checkpw(password.encode('utf-8'), encrypted_password.encode('utf-8')) #check if pw matches
          
           if  password_matches:
             access_token = jwt.encode(
                {'email': email, 'exp': datetime.datetime.now() + datetime.timedelta(hours=1)},
                current_app.config['JWT_SECRET_KEY'],
                algorithm='HS256'
              )
             #print("making the response",flush=True)
             response = jsonify({
               "message": "Login successful",
               "token": access_token,
               "id": student.id,
               "name": student.name
               })
             #print("response made",flush=True)
             expire_date = datetime.datetime.now() + datetime.timedelta(days=500)
             #print(f"response: {response['message']} {response['token']} {response['id']} {response['name']}", flush=True)
             #print(json.dumps(response),flush=True)
             return response, 200
           else:
              return jsonify({"msg": f"Incorrect email or password."}), 401
       else:
           return jsonify({"msg": f"Incorrect email or password."}), 401

     except Exception as e:
       print(f"Error: {str(e)}")
       return make_response(jsonify({'message': 'Error logging in student in auth.py', 'error': str(e)}), 500)



@bp.route('/api/flask/auth/validate-token', methods=['POST'])
def validate_token():
    token = request.json.get('token', None)
    if not token:
        return jsonify({"message": "Missing token"}), 400

    try:
        decoded = jwt.decode(token, current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
        return jsonify({"message": "Token is valid", "user": decoded['email']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401


@bp.route('/api/flask/auth/change-student-password', methods=['POST'])
def change_password():
   if request.method == 'POST':
     if not request.is_json:
       return jsonify({"msg": "Missing JSON in request"}), 400
     
     try:
       id = request.json.get('id', None)
       old_password = request.json.get('oldPassword', None)
       new_password = request.json.get('newPassword', None)

       if old_password is None or new_password is None:
         return jsonify({"msg": "Please fill in all fields"}), 400
       
       if id is None:
          return jsonify({"msg": "Error: No user ID found"}), 500

       student = Student.get_student_by_id(id)
        
       if student:
           encrypted_password = student.get_password()  # Access the encrypted password
           password_matches = bcrypt.checkpw(old_password.encode('utf-8'), encrypted_password.encode('utf-8')) #check if pw matches
          
           if  password_matches:
             validate_password(new_password)
             hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
             #student.password = hashed_password
             student.set_password(hashed_password)
             #Student.update_password_by_id(id, hashed_password)

             response = jsonify({
               "msg": "Password change successful",
             })
             return response, 200
           else:
              return jsonify({"msg": f"Your password is incorrect."}), 401
       else:
           return jsonify({"msg": f"Error: Student not found in database by ID"}), 500

     except PasswordValidationError as pe:
       return make_response(jsonify({'msg': str(pe)}), 400)
     except Exception as e:
       print(f"Error: {str(e)}")
       return make_response(jsonify({'msg': 'Error changing student password in auth.py', 'error': str(e)}), 500)
   
@bp.route('/api/flask/auth/change-student-email', methods=['POST'])
def change_email():
   if request.method == 'POST':
     if not request.is_json:
       return jsonify({"msg": "Missing JSON in request"}), 400
     
     try:
       id = request.json.get('student_id', None)
       password = request.json.get('password', None)
       new_email = request.json.get('new_email', None)

       if new_email is None or password is None:
         return jsonify({"msg": "Missing email or password in request body"}), 400
       
       if id is None:
          return jsonify({"msg": "Error: No student ID found in request body"}), 400

       student = Student.get_student_by_id(id)
        
       if student:
           encrypted_password = student.get_password()  # Access the encrypted password
           password_matches = bcrypt.checkpw(password.encode('utf-8'), encrypted_password.encode('utf-8')) #check if pw matches
          
           if  password_matches:
             validate_email(new_email)
             student.set_email(new_email)

             response = jsonify({
               "msg": "Email change successful, your new email is " + new_email,
             })
             return response, 200
           else:
              return jsonify({"msg": f"Your password is incorrect."}), 401
       else:
           return jsonify({"msg": f"Error: Student not found in database by ID"}), 500

     except EmailValidationError as pe:
       return make_response(jsonify({'msg': str(pe)}), 400)
     except Exception as e:
       print(f"Error: {str(e)}")
       return make_response(jsonify({'msg': 'Error changing student email in auth.py', 'error': str(e)}), 500)
     
@bp.route('/api/flask/auth/student', methods=['DELETE'])
def delete_student_account():
   print("delete_student_account called", flush=True)
   if request.method == 'DELETE':
     if not request.is_json:
       return jsonify({"msg": "Missing JSON in request"}), 400
     

     try:
       id = request.json.get('student_id', None)
       password = request.json.get('password', None)
       print("id: "+ str(id), flush=True)
       print("password: "+ str(password), flush=True)

       if id is None or password is None:
         return jsonify({"msg": "Missing student ID or password in request body"}), 400

       student = Student.get_student_by_id(id)
       print("student: "+ str(student), flush=True)
        
       if student:
           encrypted_password = student.get_password()  # Access the encrypted password
           password_matches = bcrypt.checkpw(password.encode('utf-8'), encrypted_password.encode('utf-8')) #check if pw matches
          
           if  password_matches:
             print("password matches", flush=True)

             #check if they have consented to keep their data for 5 years
             consented = student.did_consent()

             if consented:
                print("Calling soft delete", flush=True)
                Student.soft_delete_student(id)
                response = jsonify({
                    "msg": "Your account has been successfully deleted. However, your data will be retained in our database for research purposes as per your consent. If you wish to revoke this consent, please contact us at edinfo@lowe-walker.org.",
                    "consent":"true"
                })
             else:
                print("Calling hard delete", flush=True)
                #delete their account and all associated data
                Student.hard_delete_student(id)
                response = jsonify({
                  "msg": "Your account and all associated data has been deleted.",
                  "consent":"false"
                })

             
             return response, 200
           else:
              return jsonify({"msg": f"Your password is incorrect."}), 401
       else:
           return jsonify({"msg": f"Error: Student not found in database by ID"}), 500

     except Exception as e:
       print(f"Error: {str(e)}")
       return make_response(jsonify({'msg': 'Error deleting student account in auth.py', 'error': str(e)}), 500)

# PROFESSOR ROUTES

# register a professor
@bp.route('/api/flask/auth/register-professor', methods=['POST'])
def create_professor():
  try:
    data = request.get_json()
    
    #validate the data
    name = str(data['name'])
    validate_name(name)
    email = str(data['email'])
    validate_email(email)
    password = str(data['password'])
    validate_password(password)

    #check if the student is invited, if they are then return the student object from the DB
    invited_professor = professorIsInvited(email)
   
    #hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    #update the information for the invited student
    # invited_professor.name = name
    # invited_professor.password = hashed_password
    # db.session.commit()  
    Professor.update_professor(name, email, hashed_password)

    #return success (201 created) as well as json to represent the object that was created, this is just a response for the API to give
    #this has nothing to do with the database
    return jsonify({
        'id': invited_professor.id,
        'name': invited_professor.name,
        'email': invited_professor.email,
        'password': invited_professor.password
    }), 201  
  
  except NameValidationError as ve:
    return make_response(jsonify({'message': str(ve)}), 400)
  except EmailValidationError as ve:
     return make_response(jsonify({'message': str(ve)}), 400)
  except PasswordValidationError as ve:
    return make_response(jsonify({'message': str(ve)}), 400)
  except AccountAlreadyExistsError as ve:
    return make_response(jsonify({'message': "Account already exists"}), 400)
  except NotInvitedError as ve:
    return make_response(jsonify({'message': "You have not been invited to create an account"}), 400)
  except Exception as e:
    return make_response(jsonify({'message': 'Error creating student user', 'error': str(e)}), 500)
  
def professorIsInvited(email):
  existing_prof = Professor.get_professor_by_email(email)#Professor.query.filter_by(email=email).first()
  if existing_prof and not existing_prof.password:
    return existing_prof
  elif existing_prof and existing_prof.password:
    raise AccountAlreadyExistsError #if we have the email and they have a password, then the student already made their account
  else:
    raise NotInvitedError #if the email is not in the database, this person was not invited to make an account

@bp.route('/api/flask/auth/login-professor', methods=['POST'])
def login_professor():
   if request.method == 'POST':
     if not request.is_json:
       return jsonify({"msg": "Missing JSON in request"}), 400
     
     try:
       email = request.json.get('email', None)
       password = request.json.get('password', None)

       if email is None or password is None:
         return jsonify({"msg": "No email or password is provided"}), 400

       print("email: "+ email,flush=True)
       print("password: "+ password,flush=True)
       
       professor = Professor.get_professor_by_email(email)
       if not professor:
          return jsonify({"msg": f"No professor found with that email."}), 401

       if professor:
           encrypted_password = professor.get_password()

           password_matches = False
           email = professor.email
          #  if(email == "testprof@mail.com"):
          #     password_matches = password == encrypted_password
          #  else:
           password_matches = bcrypt.checkpw(password.encode('utf-8'), encrypted_password.encode('utf-8')) #check if pw matches
           
          
           if  password_matches:
             access_token = jwt.encode(
                {'email': email, 'exp': datetime.datetime.now() + datetime.timedelta(hours=1)},
                current_app.config['JWT_SECRET_KEY'],
                algorithm='HS256'
              )
 
             response = jsonify({
               "message": "Login successful",
               "token": access_token,
               "id": professor.id,
               "name": professor.name
               })
             expire_date = datetime.datetime.now() + datetime.timedelta(days=500)
             return response, 200
           else:
              return jsonify({"msg": f"Incorrect email or password."}), 401
       else:
           return jsonify({"msg": f"Incorrect email or password."}), 401

     except Exception as e:
       print(f"Error: {str(e)}")
       return make_response(jsonify({'message': 'Error logging in professor in auth.py', 'error': str(e)}), 500)

   

# TA ROUTES

# PROFESSOR ROUTES

# register a TA
@bp.route('/api/flask/auth/register-ta', methods=['POST'])
def create_TA():
  try:
    data = request.get_json()
    
    #validate the data
    name = str(data['name'])
    validate_name(name)
    email = str(data['email'])
    validate_email(email)
    password = str(data['password'])
    validate_password(password)

    #check if the student is invited, if they are then return the student object from the DB
    invited_ta = taIsInvited(email)
   
    #hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    #update the information for the invited student
    # invited_ta.name = name
    # invited_ta.password = hashed_password
    # db.session.commit() 
    TA.update_ta(name, email, hashed_password)

    #return success (201 created) as well as json to represent the object that was created, this is just a response for the API to give
    #this has nothing to do with the database
    return jsonify({
        'id': invited_ta.id,
        'name': invited_ta.name,
        'email': invited_ta.email,
        'password': invited_ta.password
    }), 201  
  
  except NameValidationError as ve:
    return make_response(jsonify({'message': str(ve)}), 400)
  except EmailValidationError as ve:
     return make_response(jsonify({'message': str(ve)}), 400)
  except PasswordValidationError as ve:
    return make_response(jsonify({'message': str(ve)}), 400)
  except AccountAlreadyExistsError as ve:
    return make_response(jsonify({'message': "Account already exists"}), 400)
  except NotInvitedError as ve:
    return make_response(jsonify({'message': "You have not been invited to create an account"}), 400)
  except Exception as e:
    return make_response(jsonify({'message': 'Error creating TA user', 'error': str(e)}), 500)
  
def taIsInvited(email):
  existing_ta = TA.get_ta_by_email(email)#TA.query.filter_by(email=email).first()
  if existing_ta and not existing_ta.password:
    return existing_ta
  elif existing_ta and existing_ta.password:
    raise AccountAlreadyExistsError #if we have the email and they have a password, then the student already made their account
  else:
    raise NotInvitedError #if the email is not in the database, this person was not invited to make an account

@bp.route('/api/flask/auth/login-ta', methods=['POST'])
def login_TA():
   if request.method == 'POST':
     if not request.is_json:
       return jsonify({"msg": "Missing JSON in request"}), 400
     
     try:
       email = request.json.get('email', None)
       password = request.json.get('password', None)

       if email is None or password is None:
         return jsonify({"msg": "No email or password is provided"}), 400

       print("email: "+ email)
       print("password: "+ password)
       
       ta = TA.get_ta_by_email(email)
       if not ta:
          return jsonify({"msg": f"No TA found with that email."}), 401

       if ta:
           encrypted_password = ta.get_password()
           password_matches = bcrypt.checkpw(password.encode('utf-8'), encrypted_password.encode('utf-8')) #check if pw matches
          
           if  password_matches:
             access_token = jwt.encode(
                {'email': email, 'exp': datetime.datetime.now() + datetime.timedelta(hours=1)},
                current_app.config['JWT_SECRET_KEY'],
                algorithm='HS256'
              )
 
             response = jsonify({
               "message": "Login successful",
               "token": access_token,
               "id": ta.id,
               "name": ta.name
               })
             expire_date = datetime.datetime.now() + datetime.timedelta(days=500)
             return response, 200
           else:
              return jsonify({"msg": f"Incorrect email or password."}), 401
       else:
           return jsonify({"msg": f"Incorrect email or password."}), 401

     except Exception as e:
       print(f"Error: {str(e)}")
       return make_response(jsonify({'message': 'Error logging in TA in auth.py', 'error': str(e)}), 500)


  #make a guest user
@bp.route('/api/flask/auth/register-guest', methods=['POST'])
def register_guest():
  print("register_guest called")
  try:
   # generate an email and password (what are the odds of two 20 length random string being the same)
    name = 'guest'
    #last_student = Student.get_students.order_vy(Student.id.desc()).first()
    random_number = random.randrange(0, 2_000_000_000)
    email = f"guestuser{random_number}@testmail.com"
    while (Student.get_student_by_email(email)):
      random_number = random.randrange(0, 2_000_000_000)
      email = f"guestuser{random_number}@testmail.com"

    password = ''.join(random.choices(string.ascii_letters + string.digits, k=50))
    hashed_password =  bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    #guest = Student(name, email, hashed_password, True)
    Student.post_student(name, email, hashed_password, True)
    print('made the guest student',flush=True)
    guest = Student.get_student_by_email(email)
    print(guest)
    #db.session.add(guest)
    #db.session.commit()  

    print(guest, flush=True)
    #populate the database with the premade assignments, this section might be pretty long
    #this is a blank one
    #will just always use case study 1 for now, later can add a new case study in case the guest one gets deleted
    print(f"guest.id: {guest.id} case_study.id: 1", flush=True)
    # try:
    #   print(f"In the try catch to make assignment guest.id: {guest.id}",flush=True)
    #   Assignment.post_assignment(guest.id, 1)
    #   assignment1 = Assignment.get_all_assignments_by_student(guest.id)
    #   #db.session.add(assignment1)
    #   #db.session.commit()
    #   print(assignment1, flush=True)
    # except Exception as e:
    #     return make_response(jsonify({'message': 'Error creating assignment', 'error': str(e)}), 500)
    





    #call the login_guest method to login the new guest user
    print("calling login_guest and populate assignments", flush=True)
    populate_guest_assignments(guest.id)
    return login_guest(email, password)

    #return success (201 created) as well as json to represent the object that was created, this is just a response for the API to give
    #this has nothing to do with the database
    # return jsonify({
    #     'id': guest.id,
    #     'name': guest.name,
    #     'email': guest.email,
    #     'password': guest.password
    # }), 201  
  
  except Exception as e:
    return make_response(jsonify({'message': 'Error creating guest user', 'error': str(e)}), 500)
  
  # login the registered guest, no api route because it will only be called internally from the register-guest method
def login_guest(email, password):
     print("top of login_guest", flush=True)
     try:
       if email is None or password is None:
         return jsonify({"msg": "No email or password is provided"}), 400

       print("email: "+ email, flush=True)
       print("password: "+ password, flush=True)
       
       student = Student.get_student_by_email(email)
       if not student:
          return jsonify({"msg": f"No student found with that email."}), 401

       if student:
           encrypted_password = student.get_password()
           password_matches = bcrypt.checkpw(password.encode('utf-8'), encrypted_password.encode('utf-8')) #check if pw matches
          
           if  password_matches:
             access_token = jwt.encode(
                {'email': email, 'exp': datetime.datetime.now() + datetime.timedelta(hours=5)},
                current_app.config['JWT_SECRET_KEY'],
                algorithm='HS256'
              )
 
             response = jsonify({
               "message": "Login successful",
               "token": access_token,
               "id": student.id,
               "name": student.name
               })
             #print(f"logging in guest, response will be {response.data}", flush=True)
             expire_date = datetime.datetime.now() + datetime.timedelta(days=500)
             return response, 200
           else:
              return jsonify({"msg": f"Incorrect email or password."}), 401
       else:
           return jsonify({"msg": f"Incorrect email or password."}), 401

     except Exception as e:
       print(f"Error: {str(e)}")
       return make_response(jsonify({'message': 'Error logging in student in auth.py', 'error': str(e)}), 500)
     
@bp.route('/api/flask/ping', methods=['GET'])
def ping():
   return make_response(jsonify({"message": "pong"}), 200)