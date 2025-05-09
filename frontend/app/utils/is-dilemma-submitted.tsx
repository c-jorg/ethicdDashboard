import axios from 'axios';

/**
 * Checks if the dilemma form has been submitted yet, users should not be able to access this form if it is not already submitted.
 * 
 * @param userID The user ID to check submission status.
 * @param assignmentID The assignment ID to check the form submission.
 * @param apiUrl The API URL where the form submission status can be fetched.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the dilemma form has been submitted, else `false`.
 */
export const dilemmaFormSubmitted = async (
  userID: string | null,
  assignmentID: string,
  apiUrl: string
): Promise<boolean> => {
  let data;
  try {
    if (!userID) {
      console.log("User ID is not found in localStorage.");
      return false;
    }

    //check local storage first to make it faster and reduce API calls
    const localSubmitted = localStorage.getItem(`${assignmentID}-dilemma-submitted`);
    if (localSubmitted) {
      return localSubmitted === "true";
    }

    const thisFormData = await axios.get(
      `${apiUrl}/api/flask/assignment/is-form-submitted?student_id=${userID}&assignment_id=${assignmentID}&form_name=dilemma`
    );

    data = thisFormData.data.message;

    if (data) {
      return data === "true";
    } else {
      return false;
    }

  } catch (isAxiosError) {
    if (axios.isAxiosError(isAxiosError) && isAxiosError.response?.status === 404) {
      console.log("No saved data found for this form");
    } else {
      console.log("Error fetching form data: ", isAxiosError);
    }
    return false;
  }
};
