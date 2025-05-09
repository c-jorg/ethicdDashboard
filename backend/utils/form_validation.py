import re #regular expressions
from .exceptions import NameValidationError, EmailValidationError, PasswordValidationError #import custom exception

# Function to validate the name
def validate_name(name):
    # Check if name contains only letters, spaces, and hyphens
    if len(name) > 80:
        raise NameValidationError("Name cannot be longer than 80 characters")
    
    if not re.match("^[A-Za-z\s-]*$", name):
        raise NameValidationError("Name can only contain letters, spaces, and hyphens. You entered " + name)

    return True


# Function to validate the email
def validate_email(email):
    # Check if email matches a standard email format
    email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    
    if not re.match(email_regex, email):
        raise EmailValidationError("Invalid email format")
    
    return True

# Function to validate the password
def validate_password(password):
    # Ensure the password is at least 6 characters long
    if len(password) < 6:
        raise PasswordValidationError("Password must be at least 6 characters long")

    # Ensure the password contains at least 1 number
    if not re.search(r"\d", password):
        raise PasswordValidationError("Password must contain at least one number")
    
    # Ensure the password contains at least one letter
    if not re.search(r"[a-zA-Z]", password):
        raise PasswordValidationError("Password must contain at least one letter")

    # Ensure the password contains at least one uppercase letter
    if not re.search(r"[A-Z]", password):
        raise PasswordValidationError("Password must contain at least one uppercase letter")

    return True

