from flask import Flask, request, jsonify, make_response, Blueprint
import bcrypt
from datetime import datetime, timezone
import pytz
import sys
import re


from ..models import Assignment
from ..models import Answer
from ..models import Form
from ..models import Submission

#from backend import db, ma, app

bp = Blueprint('assignment', __name__)

#=====  ROUTES FOR ASSIGNMENT ============

@bp.route('/api/flask/assignment/save-form', methods=['POST'])
def save_form():
  print("reached the api", flush=True)
  try:
    print("getting data", flush=True)
    if(request.is_json): # check if request body is valid JSON
      data = request.json 
    else: # else, return bad request
       return jsonify({'message': 'Request contains invalid formatting.'}), 400

    student_id = data.get('student_id')
    assignment_id = data.get('assignment_id')
    case_study_id = data.get('case_study_id')
    form_name = data.get('form_name')
    #num_stakeholders = data.get('num_stakeholders')
    answers = data.get('answers') #assuming there are many answers
    print("got request data", flush=True)
    form_id = Form.get_form_by_name(form_name).id
    print("got form id " + str(form_id) + " for form " + form_name, flush=True)


    #update the last modified column in the assignments table
    pacific_tz = pytz.timezone('America/Vancouver')

    last_modified = datetime.now(pacific_tz) # Store the datetime object directly
    print("last modified is " + str(last_modified), flush=True)

    #assignment = Assignment.get_assignment_by_id(assignment_id)
    #assignment.set_last_modified(last_modified)
    Assignment.set_last_modified_by_id(assignment_id, last_modified)

    #delete the previous answers for this form and this assignment
    print("Deleting previous answers for this form and this assignment",flush=True)
    Answer.delete_answers_by_assignment_id_and_form_id(assignment_id, form_id)
    print("committing delete", flush=True)
    #db.session.commit()
    
    # answer = Answer(
    #         assignment_id=assignment_id,
    #         content=answers,  # Entire JSON array is stored in the content column
    #         form=form_name,
    #         last_modified=last_modified
    #     )
    # db.session.add(answer)
    #print(answers, flush=True)
    print("top of loop", flush=True)
    for key, value in answers.items():
      #print(answer)
      #print("in loop", flush=True)
      #print(key, value)
      #new_answer = Answer(assignment_id, form_id, key, value if isinstance(value, str) else None, value if isinstance(value, int) else None, datetime.now(), last_modified)
      if isinstance(value,str):
        value = ' '.join(value.split()) # compress spaces
        if value.count(' ') < 199: # word count < 200 words (199 spaces)
          valueStr = value
        else: # word count > 200 words (199 spaces)
          keyLimits = {"stakeholder-name-": 50,
                       "option-title-": 50
                       } # dict of text input max length *exceptions*
          n = [valueLimit for keyLimit, valueLimit in keyLimits.items() if key.startswith(keyLimit)]
          n = 200 if not n else n[0]
          start = value.find(' ')
          while start >= 0 and n > 1:
              start = value.find(' ', start+1)
              n -= 1
          valueStr = value[:start] # slice string to 200th word (199th space)
      else: # value isn't a string
         valueStr = None
      Answer.post_answer(assignment_id, form_id, key, valueStr, value if isinstance(value, int) else None, datetime.now(), last_modified)
      #db.session.add(new_answer)

    
    #db.session.commit()  # Commit all new answers to the database
    
    return jsonify({'message': 'Answers saved successfully!'}), 201
  except Exception as e:
    return make_response(jsonify({'message': 'Error saving answers in assignment controller', 'error': str(e)}), 500)
  

# @bp.route('/api/flask/assignment/submit-form', methods=['POST'])
# def submit_form():
#   #print("reached the api", flush=True)
#   #print("in the submit form api handler", flush=True)

#   assignmentSubmitted = False
#   try:
#     #print("getting data", flush=True)
#     if(request.is_json): # check if request body is valid JSON
#       data = request.json 
#     else: # else, return bad request
#        return jsonify({'message': 'Request contains invalid formatting.'}), 400

#     student_id = data.get('student_id')
#     assignment_id = data.get('assignment_id')
#     case_study_id = data.get('case_study_id')
#     form_name = data.get('form_name')
#     #num_stakeholders = data.get('num_stakeholders')
#     answers = data.get('answers') #assuming there are many answers
#     #print("got request data", flush=True)
#     form_id = Form.get_form_by_name(form_name).id
#     #print("got form id", flush=True)

#     #print("hello?", flush=True)
#     #update the last modified column in the assignments table
#     pacific_tz = pytz.timezone('America/Vancouver')
#     #print("getting last modified", flush=True)
#     last_modified = datetime.now(pacific_tz) #for some reason this gets the date
#     #print("last modified is " + str(last_modified), flush=True)
#     #assignment = Assignment.get_assignment_by_id(assignment_id)
#     #print("check 1 ", flush=True)
#     #assignment.set_last_modified(last_modified)
#     Assignment.set_last_modified_by_id(assignment_id, last_modified)
#     #print("check 2", flush=True)
#     #assignment.update_submitted_form(form_name)
#     #print("check 3", flush=True)

#     #delete last submission
#     #print("deleting previous submission", flush=True)

#     #Submission.get_submission_by_id(1)
#     Submission.delete_submissions_by_assignment_id_form_id_and_student_id(assignment_id, form_id, student_id)
#     #db.session.commit()
#     #print("deleted previous submission", flush=True)

#     #add a submission to the submissions table

    
#     try:
#       #print("adding submission", flush=True)
#       # submission = Submission(assignment_id=assignment_id, form_id=form_id, submitted_time=last_modified, student_id=student_id)
#       # db.session.add(submission)
#       # db.session.commit()
#       Submission.post_submission(assignment_id, form_id, last_modified, student_id)
#       response = jsonify({"message": "Submission added successfully"})
#       response.status_code = 200
#       #print("added submission", flush=True)

#       #check if the whole assignment is submitted now and set it as submitted if it is
#       print("checking if assignment is submitted", flush=True)
#       #Query the database for the forms
#       formsCount = Form.get_count_of_forms()

#       if not formsCount:
#         return jsonify({'message': 'No forms found'}), 404

#       print("form count is " + str(formsCount), flush=True)

#       submitted = Submission.is_assignment_submitted(assignment_id, formsCount)
#       print("submitted is " + str(submitted), flush=True)

#       #change submission boolean column in assignments table if all forms have been submitted
#       if(submitted):
#         assignment = Assignment.get_assignment_by_id(assignment_id)
#         assignment.set_submitted(True)
#         assignmentSubmitted = True
    

#     except Exception as e:
#         print("!!!failed to add submission", flush=True)
#         #db.session.rollback()
#         response = jsonify({"error": str(e)})
#         print(str(e), flush=True)
#         response.status_code = 500
#         return response

#     #delete the previous answers for this form and this assignment
#     #print("Deleting previous answers for this form and this assignment",flush=True)
#     Answer.delete_answers_by_assignment_id_and_form_id(assignment_id, form_id)
#     print("committing delete", flush=True)
#     db.session.commit()
    
#     answer = Answer(
#             assignment_id=assignment_id,
#             content=answers,  # Entire JSON array is stored in the content column
#             form=form_name,
#             last_modified=last_modified
#         )
#     db.session.add(answer)
#     print(answers, flush=True)
#     # print("top of loop", flush=True)
#     # missingKeys = []
#     # groupMemory = {}
#     # for key, value in answers.items():
#     #   #print(answer)
#     #   print("in loop", flush=True)
#     #   #print(key, value)
#     #   #new_answer = Answer(assignment_id, form_id, key, value if isinstance(value, str) else None, value if isinstance(value, int) else None, datetime.now(), datetime.now())
#     #   #db.session.add(new_answer)
#     #   truncKey = key[:key.rfind('-')]
#     #   if re.search("\d$",key):
#     #     if not truncKey in groupMemory:
#     #         groupMemory[truncKey] = value
#     #     elif groupMemory[truncKey] == "false" and value != "false":
#     #         groupMemory[truncKey] = value
#     #   if value is None or ' '.join(value.split()) == "":
#     #     if truncKey not in groupMemory or groupMemory[truncKey] == "false":
#     #       missingKeys.append(key)
#     #   if isinstance(value,str):
#     #     value = ' '.join(value.split()) # compress spaces
#     #     if value.count(' ') < 199: # word count < 200 words (199 spaces)
#     #       valueStr = value
#     #     else: # word count > 200 words (199 spaces)
#     #       keyLimits = {"stakeholder-name-": 50,
#     #                    "option-title-": 50
#     #                    } # dict of text input max length *exceptions*
#     #       n = [valueLimit for keyLimit, valueLimit in keyLimits.items() if key.startswith(keyLimit)]
#     #       n = 200 if not n else n[0]
#     #       start = value.find(' ')
#     #       while start >= 0 and n > 1:
#     #           start = value.find(' ', start+1)
#     #           n -= 1
#     #       valueStr = value[:start] # slice string to 200th word (199th space)
#     #   else: # value isn't a string
#     #      valueStr = None
#     #   if not missingKeys:
#     #     Answer.post_answer(assignment_id, form_id, key, valueStr, value if isinstance(value, int) else None, datetime.now(), datetime.now())
#     # for group, value in groupMemory.items():
#     #   if value == "false":
#     #      missingKeys.append(group)
#     # if not missingKeys:
#     if(assignmentSubmitted):
#         print("assignmentSubmitted before check:", assignmentSubmitted, flush=True)
#         return jsonify({'message': 'Answers submitted successfully! That was the last form, you are now finished with this case study.'}), 201
#     else:
#       return jsonify({'message': 'Answers submitted successfully!'}), 201
#     # else:
#     #   return jsonify({'message': 'Some answer(s) missing content', 'keys': missingKeys}), 400
#     #db.session.commit()  # Commit all new answers to the database
    

#   except Exception as e:
#     return make_response(jsonify({'message': 'Error submitting answers in assignment controller', 'error': str(e)}), 500)
  

@bp.route('/api/flask/assignment/submit-form', methods=['POST'])
def submit_form():
  print("reached the api", flush=True)
  print("in the submit form api handler", flush=True)
  assignmentSubmitted = False
  try:
    print("getting data", flush=True)
    if(request.is_json): # check if request body is valid JSON
      data = request.json 
    else: # else, return bad request
       return jsonify({'message': 'Request contains invalid formatting.'}), 400

    student_id = data.get('student_id')
    assignment_id = data.get('assignment_id')
    case_study_id = data.get('case_study_id')
    form_name = data.get('form_name')
    #num_stakeholders = data.get('num_stakeholders')
    answers = data.get('answers') #assuming there are many answers
    print("got request data", flush=True)
    form_id = Form.get_form_by_name(form_name).id
    print("got form id", flush=True)

    #print("hello?", flush=True)
    #update the last modified column in the assignments table
    pacific_tz = pytz.timezone('America/Vancouver')
    #print("getting last modified", flush=True)
    last_modified = datetime.now(pacific_tz) #for some reason this gets the date
    #print("last modified is " + str(last_modified), flush=True)
    #assignment = Assignment.get_assignment_by_id(assignment_id)
    print("check 1 ", flush=True)
    #assignment.set_last_modified(last_modified)
    Assignment.set_last_modified_by_id(assignment_id, last_modified)
    print("check 2", flush=True)
    #assignment.update_submitted_form(form_name)
    print("check 3", flush=True)

    #delete last submission
    print("deleting previous submission", flush=True)

    #Submission.get_submission_by_id(1)
    Submission.delete_submissions_by_assignment_id_form_id_and_student_id(assignment_id, form_id, student_id)
    #db.session.commit()
    print("deleted previous submission", flush=True)

    #add a submission to the submissions table
    try:
      print("adding submission", flush=True)
      # submission = Submission(assignment_id=assignment_id, form_id=form_id, submitted_time=last_modified, student_id=student_id)
      # db.session.add(submission)
      # db.session.commit()
      Submission.post_submission(assignment_id, form_id, last_modified, student_id)
      response = jsonify({"message": "Submission added successfully"})
      response.status_code = 200
      print("added submission", flush=True)

      #check if the whole assignment is submitted now and set it as submitted if it is
      print("checking if assignment is submitted", flush=True)
      #Query the database for the forms
      formsCount = Form.get_count_of_forms()

      if not formsCount:
        return jsonify({'message': 'No forms found'}), 404

      print("form count is " + str(formsCount), flush=True)

      submitted = Submission.is_assignment_submitted(assignment_id, formsCount)
      print("submitted is " + str(submitted), flush=True)

      #change submission boolean column in assignments table if all forms have been submitted
      if(submitted):
        assignment = Assignment.get_assignment_by_id(assignment_id)
        assignment.set_submitted(True)
        assignmentSubmitted = True

    except Exception as e:
        print("!!!failed to add submission", flush=True)
        #db.session.rollback()
        response = jsonify({"error": str(e)})
        print(str(e), flush=True)
        response.status_code = 500
        return response

    #delete the previous answers for this form and this assignment
    print("Deleting previous answers for this form and this assignment",flush=True)
    Answer.delete_answers_by_assignment_id_and_form_id(assignment_id, form_id)
    print("committing delete", flush=True)
    #db.session.commit()
    
    # answer = Answer(
    #         assignment_id=assignment_id,
    #         content=answers,  # Entire JSON array is stored in the content column
    #         form=form_name,
    #         last_modified=last_modified
    #     )
    # db.session.add(answer)
    #print(answers, flush=True)
    print("top of loop", flush=True)
    for key, value in answers.items():
      #print(answer)
      #print("in loop", flush=True)
      #print(key, value)
      #new_answer = Answer(assignment_id, form_id, key, value if isinstance(value, str) else None, value if isinstance(value, int) else None, datetime.now(), datetime.now())
      #db.session.add(new_answer)
      if isinstance(value,str):
        value = ' '.join(value.split()) # compress spaces
        if value.count(' ') < 199: # word count < 200 words (199 spaces)
          valueStr = value
        else: # word count > 200 words (199 spaces)
          keyLimits = {"stakeholder-name-": 50,
                       "option-title-": 50
                       } # dict of text input max length *exceptions*
          n = [valueLimit for keyLimit, valueLimit in keyLimits.items() if key.startswith(keyLimit)]
          n = 200 if not n else n[0]
          start = value.find(' ')
          while start >= 0 and n > 1:
              start = value.find(' ', start+1)
              n -= 1
          valueStr = value[:start] # slice string to 200th word (199th space)
      else: # value isn't a string
         valueStr = None
      Answer.post_answer(assignment_id, form_id, key, valueStr, value if isinstance(value, int) else None, datetime.now(), datetime.now())

    
    #db.session.commit()  # Commit all new answers to the database
    
    if(assignmentSubmitted):
        print("assignmentSubmitted before check:", assignmentSubmitted, flush=True)
        return jsonify({'message': 'Answers submitted successfully! That was the last form, you are now finished with this case study.'}), 201
    else:
      return jsonify({'message': 'Answers submitted successfully!'}), 201

  except Exception as e:
    return make_response(jsonify({'message': 'Error submitting answers in assignment controller', 'error': str(e)}), 500)
 

#Route to populate forms with data when the user has already made a submission
@bp.route('/api/flask/assignment/get-answers', methods=['GET'])
def get_answers():
    print("getting answers", flush=True)
    try:
        # Get user_id and form_name from the query parameters
        user_id = request.args.get('user_id')
        if not user_id:
            return jsonify({'message': 'Missing user_id'}), 400
        try:
            user_id = int(user_id)
        except (ValueError, TypeError):
            return jsonify({'message': 'Invalid user_id'}), 400
        
        form_name = request.args.get('form_name')
        if not form_name:
            return jsonify({'message': 'Missing form_name'}), 400
        print("form name is " + form_name)

        assignment_id = request.args.get('assignment_id')
        if not assignment_id:
            return jsonify({'message': 'Missing assignment_id'}), 400
        try:
            assignment_id = int(assignment_id)
        except (ValueError, TypeError):
            return jsonify({'message': 'Invalid assignment_id'}), 400

        # Query the database for answers submitted by the user for the form, first check if they have any assignments
        assignment = Assignment.get_assignment_by_student(user_id, assignment_id)

        if not assignment:
          return jsonify({'message': 'No data found for this user'}), 404

        assignment_data = []
       
        # Query the answers related to this assignment and this form
        #answers = Answer.get_answers_by_assignment_and_form(assignment.id, form_name)
        form = Form.get_form_by_name(form_name)
        answers = Answer.get_answers_by_assignment_id_and_form_id(assignment.id, form.id)

        if not answers:
           return jsonify({'message': 'No answers found for this form'}), 404
        
        # Serialize the answers into the format you want
        #form_data = [{'content': answer.content} for answer in answers]
        print("building form data")
        try:
            #form_data = [{'content': {answer.key : answer.value_int if answer.value_int is not None else answer.value_string}} for answer in answers]
            form_data = [{'content' : {}}]
            for answer in answers:
                #print(answer.key, flush=True)
                #content = {f"{answer.key}" : answer.value_int if answer.value_int is not None else f"{answer.value_string}"}
                content = answer.value_int if answer.value_int is not None else answer.value_string
                form_data[0]['content'][answer.key] = content
        except Exception as e:
            return make_response(jsonify({'message': 'Error building form data', 'error': str(e)}), 500)
        # Add to the assignment data with only the form data
        assignment_info = {
            'assignment_id': assignment.id,
            'answers': form_data
        }
        assignment_data.append(assignment_info)

        #print("ASSIGNMENT DAtA: ", assignment_data, flush=True)

        # Serialize the data into a list of dictionaries
        return make_response(jsonify({'message': 'Form data retrieved successfully', 'data': assignment_data}), 200)

    except Exception as e:
        return make_response(jsonify({'message': 'Error retrieving form data', 'error': str(e)}), 500)

#Endpoint to return all assignments assigned to a particular student/user
@bp.route('/api/flask/assignments', methods=['GET'])
def get_assignments():
    print("top of get assignments", flush=True)
    try:
        # Get user_id from parameters
        user_id = request.args.get('user_id')

        if not user_id:
            return jsonify({'message': 'Missing user_id'}), 400
        
        try:
          user_id = int(user_id)
        except (ValueError, TypeError):
          return jsonify({'message': 'Invalid user_id'}), 400

        class_id = request.args.get('class_id')
        print("class id is " + str(class_id), flush=True)
        assignments = []
        if not class_id:
             # Query the database for assignments assigned to a user
            assignments = Assignment.get_all_assignments_by_student(user_id)
            print("no class id", flush=True)
        else:
            try:
                class_id = int(class_id)
            except (ValueError, TypeError):
                return jsonify({'message': 'Invalid class_id'}), 400
            # Query the database for assignments assigned to a user in a particular class
            print("class is exists",flush=True)
            assignments = Assignment.get_all_assignments_by_student_and_class(user_id, class_id) 

        print(f"assignments: {assignments}",flush=True)
        if not assignments:
          if not class_id:
            return jsonify({'message': f'No assignments found for student with ID {user_id}'}), 404
          else:
            return jsonify({'message': f'No assignments found for student with ID {user_id} in class with ID {class_id}'}), 404
        
        # Serialize the assignments into JSON
        #assignments_data = [assignment.json() for assignment in assignments]
         # Serialize the assignments into JSON
        assignments_data = [
            {
                **assignment.json(),
                "case_study_title": title
            }
            for assignment, title in assignments
        ]

        return jsonify(assignments_data), 200


    except Exception as e:
        return make_response(jsonify({'message': 'Error retrieving form data', 'error': str(e)}), 500)

#Endpoint to check if a form has been submitted
@bp.route('/api/flask/assignment/is-form-submitted', methods=['GET'])
def is_form_submitted():
   try:
      #Get the form name from the parameters
      form_name = request.args.get('form_name')
      if not form_name:
          return jsonify({'message': 'Missing form_name'}), 400
      
      if any(char.isdigit() for char in form_name):
          return jsonify({'message': 'Form name contains numbers'}), 400
         
      
      print("form name is " + form_name, flush=True)
      

      # Get the assignment ID from the parameters
      assignment_id = request.args.get('assignment_id')
      if not assignment_id:
          return jsonify({'message': 'Missing assignment_id'}), 400
      try:
          assignment_id = int(assignment_id)
      except (ValueError, TypeError):
          return jsonify({'message': 'Invalid assignment_id'}), 400

      # Get the student ID from the parameters
      student_id = request.args.get('student_id')
      if not student_id:
          return jsonify({'message': 'Missing student_id'}), 400
      try:
          student_id = int(student_id)
      except (ValueError, TypeError):
          return jsonify({'message': 'Invalid student_id'}), 400
      
      #Query the database for the form
      form = Form.get_form_by_name(form_name)

      if not form:
        return jsonify({'message': 'Form not found'}), 404

      print("form id is " + str(form.id), flush=True)
      submitted = Submission.get_submissions_by_assignment_id_form_id_and_student_id(assignment_id, form.id, student_id)

      if submitted:
        print("form was submitted: " + str(form) + " - " + str(submitted), flush=True)
        return jsonify({'message': 'true'}), 200
      else:
        return jsonify({'message': 'false'}), 404


    
   except Exception as e:
      return make_response(jsonify({'message': 'Error retrieving form data', 'error': str(e)}), 500)
   
#Endpoint for setting assignment case study option
@bp.route('/api/flask/assignment/set-case-study-option', methods=['PATCH'])
def set_case_study_option():
  try:
    if request.is_json:
      data = request.json
    else:
      return jsonify({'message': 'Request contains invalid formatting'}), 400
    
    assignment_id = data.get('assignment_id')
    case_study_option = data.get('case_study_option')

    if not assignment_id or not case_study_option:
       return jsonify({'message': 'Missing data in request'}), 400

    if type(case_study_option) == str and case_study_option != 'student-option':
      return make_response(jsonify({'message': 'Invalid case study option'}), 400)
    
    if case_study_option == 'student-option':
      case_study_option = None
    
    Assignment.set_case_study_option_by_id(assignment_id,case_study_option)

    return jsonify({'message': 'Case study option updated successfully!'}), 201
  except Exception as e:
     return jsonify({'message': 'Error updating case study option', 'error': str(e)}), 500
  

#Endpoint to check if an assignment has been submitted
@bp.route('/api/flask/assignment/submitted', methods=['GET'])
def is_assignment_submitted():
    print("entering is assignment submitted", flush=True)
    #check if all forms have been submitted for this assignment
    try:
        assignment_id = request.args.get('assignment_id')
        if not assignment_id:
            return jsonify({'message': 'Missing assignment_id'}), 400
        try:
            assignment_id = int(assignment_id)
        except (ValueError, TypeError):
            return jsonify({'message': 'Invalid assignment_id'}), 400
        
        #Query the database for the forms
        formsCount = Form.get_count_of_forms()

        if not formsCount:
          return jsonify({'message': 'No forms found'}), 404

        print("form count is " + str(formsCount), flush=True)

        submitted = Submission.is_assignment_submitted(assignment_id, formsCount)
        print("submitted is " + str(submitted), flush=True)

        #change submission boolean column in assignments table
        if(submitted):
          assignment = Assignment.get_assignment_by_id(assignment_id)
          assignment.set_submitted(True)
        

        if submitted:
          print("form was submitted: " + str(formsCount) + " - " + str(submitted), flush=True)
          return jsonify({'message': 'true'}), 200
        else:
          return jsonify({'message': 'false'}), 404


    
    except Exception as e:
        return make_response(jsonify({'message': 'Error retrieving form data', 'error': str(e)}), 500)
      
@bp.route('/api/flask/assignment/option', methods=['GET'])
def get_case_study_option_id():
  try:
    assignment_id = request.args.get('assignment_id')
    if not assignment_id:
      return make_response(jsonify({"message":"Must provide an assignment id"}), 400)
    try:
      assignment_id = int(assignment_id)
    except Exception as e:
      print(f"eror casting assignment id {e}", flush=True)
    if type(assignment_id) != int:
      return make_response(jsonify({"message":"Invalid data type"}), 400)
    if not Assignment.get_assignment_by_id(assignment_id):
      return make_response(jsonify({"message":"No assignment with that id found"}), 404)
    option_id = Assignment.get_case_study_option_id_by_assignment_id(assignment_id)
    if not option_id:
      print(f'no assignments for id {assignment_id}', flush=True)
      return make_response(jsonify({"message":"No case study option set for this assignment"}), 404)
    return make_response(jsonify({"message":"Successfully got case study option id", "option_id":option_id}), 200)
  except Exception as e:
    print(f"something went wrong {e}", flush=True)
    return make_response(jsonify({"message":"Error getting case study option","error":e}), 500)