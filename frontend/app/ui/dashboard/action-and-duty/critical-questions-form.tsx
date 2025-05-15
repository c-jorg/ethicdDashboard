"use client";

/** Imports */
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Cookie from 'js-cookie';
import { Button } from '@/app/ui/button';
import TextInput from "@/app/ui/components/text-input";
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from '@/app/ui/components/prof-comment-box';

export default function CriticalQuestionsForm() {
  /** Declarations */
  const formRef = useRef<HTMLFormElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const formName = "critical-questions";
  const assignmentID = Cookie.get('assignment_id');
  const prefix = assignmentID + "-";
  let submitted = false;
  const [loading, setLoading] = useState(true);

  const [isRendered, setIsRendered] = useState(false);
  const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted

  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const [topics, setTopics] = useState(['','',''])
  const [criticalQuestions, setCriticalQuestions] = useState([
    'Is your moral law universal and consistent? (Consider the difference between moral laws that are descriptive versus prescriptive in your response.)',
    'Could your moral law help you make the right decision in this case?',
    'Would the world be a better place if everyone always followed your moral law?'
  ]);

  const clearLocalStorage = () => {
    //todo: implement to clear LS
  };

  /**
   * After the DOM fully loads this sets isRendered to true
   */
  useEffect(() => {
    setIsRendered(true);
  }, []); // Set to true after the initial render

  interface HasBeenSubmittedResponse {
    message: string;
  }

  /**
   * Checks if the form has been submitted by the user.
   * 
   * This function makes an asynchronous request to the server to determine if the form
   * has already been submitted by the user. It retrieves the user ID from local storage
   * and sends a GET request to the specified API endpoint with the user ID, assignment ID,
   * and form name as query parameters.
   * 
   * If the form has been submitted, it sets the `lockForm` state to true.
   * When the lockForm state is true, the Form Completed Card will show on the top of the form, and a useEffect will disable the form inputs.
   * 
   * @returns {Promise<boolean>} A promise that resolves to `true` if the form has been submitted,
   *                             otherwise `false`.
   * 
   * @throws Will log an error message if the request fails for any reason other than a 404 status.
   */
  const hasBeenSubmitted = async (): Promise<boolean> => {
    let data: HasBeenSubmittedResponse;
    try {
      const userId = localStorage.getItem('id');
      const response = await axios.get<HasBeenSubmittedResponse>(`${apiUrl}/api/flask/assignment/is-form-submitted?student_id=${userId}&assignment_id=${assignmentID}&form_name=${formName}`);
      data = response.data;
      //console.log("HAS BEEN SUBMITTED? " + data.message);
      if(data.message == "true"){
        //disable all inputs
        //return true
        setLockForm(true);
        return true;
      }else{
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log("No saved data found for this form");
      } else {
        console.log("Error fetching form data: ", error);
      }
      return false;
    }
  };
  
  /**
   * Runs the hasBeenSubmitted function when the component mounts.
   * Disables form inputs if hasBeenSubmitted set lockForm to true.
   * Displays professor feedback.
   * Makes sure the DOM is rendered before disabling inputs, otherwise formElements will be empty and it won't disable.
   * 
   * This runs when it notices a change in the lockForm state or when the DOM is rendered.
   */
  useEffect(() => {
    (async () => {
      //check if form has been submitted, if it is then all inputs will be disabled and feedback will be shown
      await hasBeenSubmitted();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Delay execution to give DOM time to render
      setTimeout(() => {
        //console.log("lockForm value:", lockForm);
        if (isRendered && lockForm) {
          //console.log("This form has been submitted");
          
          const formElements = document.querySelectorAll('.critical .answer-input, .critical .final-button');
          //console.log(formElements); // Log the selected elements
          
          formElements.forEach((element) => {
            (element as HTMLInputElement).disabled = true;
          });
          //console.log("disabled inputs");
        }
      }, 0); // Delay to allow DOM to render

      // Now check for any feedback - if there is any then overwrite the answer with the feedback
      const assignmentId = Cookie.get('assignment_id');
      if(lockForm){
        useFetchFeedback({ formName, assignmentId: assignmentId || '', setFeedback });
      }

    })();
  }, [lockForm, isRendered]);

  // useEffect(() => {
  //   console.log("topics are ", topics);
  // }, [topics]); 


  /**
  Fetches the dynamic/critical questions from the backend and updates the state with the new questions.
  */
  const getQuestions = async () => {
    const caseStudyId = Cookie.get('case_study_id') || '';
    
    // Call fetchQuestions and directly update criticalQuestions
    const updatedCriticalQs = await fetchQuestions({
      formName,
      caseStudyId,
      criticalQuestions,
    });
    
    // Update state with the new questions
    setCriticalQuestions(updatedCriticalQs);
  };

  /** Get questions from DB */
  useEffect(() => {
    const initializeForm = async () => {
      await getQuestions();
    };
    initializeForm();
  }, []);
  
  
  const setTopic = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };



  /** Get answers from DB/local 
   * Non-agnostic
  */
  const fetchData = async () => {
    try {
      const userId = localStorage.getItem('id');
      const assignmentId = Cookie.get('assignment_id');

      let data;
      let response;
      try{
        response = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=${formName}`);
        data = response.data.data;
      }catch(error){
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("No saved data found for this form");
        }else{
          console.log("Error fetching form data: ", error);
        }
      }

      let ansContent;
      if(data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content){
        ansContent = data[0].answers[0].content;
      }else{
        ansContent = [];
      }
      //console.log("content is", ansContent);

      //fix critical questions with saved answers
      criticalQuestions.forEach((_, index) => {
        let topic = feedback[`topic-cq-${index}`] || localStorage.getItem(`${prefix}topic-cq-${index}`) || ansContent[`topic-cq-${index}`];
        setTopics(prevTopics => {
          const newTopics = [...prevTopics];
          newTopics[index] = topic || '';
          return newTopics;
        });
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching form data: ", error);
      setLoading(false);
    }
  };

  /** Fetch saved answers when CQ gets updated */
  useEffect(() => {  
    fetchData();
  }, [criticalQuestions, feedback]);

  /** Send data to backend to store */
  const submitAssignmentForm = async (e:any) => {
    e.preventDefault()
    //console.log("Entered the submit assignment handler")
    const studentID = localStorage.getItem('id'); 
    
    const caseStudyID = Cookie.get('case_study_id');
    const formName = e.currentTarget.getAttribute('data-form-name') || 'critical-questions'; // Non-agnostic: Modify default here
    //console.log("form name is " + formName);
    
    const answers: { [key: string]: string } = {}; //an object to hold the answers as key-value pairs

    document.querySelectorAll('.answer-input').forEach(input => {
      const inputElement = input as HTMLInputElement;

      // Handle checkboxes and radio buttons
      if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
        answers[inputElement.id] = inputElement.checked ? inputElement.value : 'false';
      } else {
        // Handle other input types (e.g., text inputs)
        answers[inputElement.id] = inputElement.value;
      }
    });

    //console.log(answers)

    /** Establish data format
     * Non-agnostic
     */
    const data = {
      student_id: studentID,
      assignment_id: assignmentID,
      case_study_id: caseStudyID,
      form_name: formName,
      answers: answers
    };

    /** Submit data to DB
     * Non-agnostic */
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      console.log("Data being sent: " + JSON.stringify(data, null, 2));
      let response;
        if(!submitted){
          response = await axios.post(`${apiUrl}/api/flask/assignment/save-form`, data, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        }else{
          response = await axios.post(`${apiUrl}/api/flask/assignment/submit-form`, data, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        }
  
      // Handle successful response
      alert(response.data.message); // Assuming your backend returns a message
      clearLocalStorage();
      if(submitted){
        localStorage.setItem(`${prefix}critical-questions-submitted`, "true"); // Non-agnostic: Modify tag here
        //force refresh so the nav links update
        window.location.reload();
      }

    } catch (error) {
      // Handle error
      if (axios.isAxiosError(error) && error.response) {
        const { data } = error.response;
        alert(data.message || 'An unexpected error occurred while submitting the form.');
      } else {
        alert('An unexpected error occurred while submitting the form.');
      }
    }
  
  };  

  /** Don't display page until all data has been gotten */
  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
  }

  return (
    <main className="flex flex-col items-center bg-gray-100">
      {/* Header */}
      {/* <div className="w-full max-w-screen-2xl bg-blue-700 text-white text-center py-4 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">TEST YOUR MORAL LAW</h1>
      </div> */}

      {/* Form Container */}
      <form ref={formRef} onSubmit={submitAssignmentForm} data-form-name="critical-questions" className="critical w-full max-w-screen-2xl">
      <div className="mt-6 w-full max-w-screen-2xl bg-white p-8 rounded-lg shadow-md">

        <FormCompletedCard isVisible={lockForm} />

        <h2 className="text-lg font-bold text-gray-800">TEST YOUR MORAL LAW</h2>

        {criticalQuestions?.map((question, index) => (
          <div className="mt-4" key={index}>
            {!lockForm && (
              <TextInput
                title={question}
                setter={(value: string) => setTopic(index, value)}
                value={topics[index]}
                id={`topic-cq-` + index}
                assignmentId={assignmentID?.toString() || ''}
                required={true}
              />
            )}
            {lockForm && (
              <>
                <div className="text-gray-800">{question}</div>
                <div
                  className="border border-gray-300 rounded-lg p-2 mt-2 min-h-[100px]"
                  dangerouslySetInnerHTML={{
                    __html: topics[index] ? topics[index].replace(
                    /<c>(.*?)<\/c>/g,
                    '<span class="text-red-500">$1</span>'
                    ) : '',
                  }}
                />
              </>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="mt-8 text-right flex gap-4 justify-end">
          <Button type="submit" data-html2canvas-ignore className="final-button bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition" onClick={submitAssignmentForm} data-form-name={formName}>
              Save
          </Button>
          {localStorage.getItem("guest") == "false" && (
            <SubmitButtonWithConfirmation formRef={formRef} buttonText="Submit" onClick={(e) => { 
              e.preventDefault();
              submitted = true; 
            // console.log("submitted is now " + submitted);
            }}/>
          )}
        </div>

        {/*Professor Comment Box for key WHOLE FORM */}
        {lockForm && feedback[`${formName}`] && (
          <div className="border border-gray-200 rounded-lg p-4 mt-4">
            <ProfessorCommentBox comment={feedback[`${formName}`]} />
          </div>
        )}
        
      </div>

      
      </form>
    </main>
  );
}
