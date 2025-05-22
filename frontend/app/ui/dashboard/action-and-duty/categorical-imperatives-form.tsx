"use client";

import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Cookie from 'js-cookie';
import { Button } from '@/app/ui/button';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import useFetchFeedback from "@/app/utils/feedback-fetcher";
import ProfessorCommentBox from "@/app/ui/components/prof-comment-box";

export default function CategoricalImperativesForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [virtuesInput, setVirtuesInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [tentativeChoice, setTentativeChoice] = useState("");
  const [primaryVirtueAlways, setPrimaryVirtueAlways] = useState("");
  const [primaryVirtueNever, setPrimaryVirtueNever] = useState("");
  const [universalizability, setUniversalizability] = useState("");
  const [consistency, setConsistency] = useState("");
  
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
  const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
  const [isRendered, setIsRendered] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [loading, setLoading] = useState(true);
  const formName = "categorical-imperatives";
  const assignmentID = Cookie.get('assignment_id'); 
  const prefix = assignmentID + "-";
  let submitted = false;

  // Predefined list of virtues and vices
  const predefinedVirtues = [
    "Honesty",
    "Loyalty",
    "Kindness",
    "Courage",
    "Integrity",
    "Humility",
    "Generosity",
    "Patience",
    "Forgiveness",
    "Empathy",
    "Fairness",
    "Compassion",
    "Self-discipline",
    "Respect",
    "Justice",
  ];

  
  /**
   * After the DOM fully loads this sets isRendered to true
   */
  useEffect(() => {
    setIsRendered(true);
  }, []); // Set to true after the initial render

  // Handle input change and provide suggestions for the last typed word
  const handleVirtuesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setVirtuesInput(input);
    localStorage.setItem(`${prefix}moral-virtues`, input);

    const lastWord = input.split(",").pop()?.trim(); // Get the last word after a comma
    if (lastWord) {
      const filteredSuggestions = predefinedVirtues.filter((virtue) =>
        virtue.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleUniversalizabilityChange = (event:any) => {
    setUniversalizability(event.target.value);

    const result = event.target.value;
    if(result == 'fail'){
      localStorage.setItem(`${prefix}universalizability-pass`, 'false');
      localStorage.setItem(`${prefix}universalizability-fail`, 'true');
    }else{
      localStorage.setItem(`${prefix}universalizability-pass`, 'true');
      localStorage.setItem(`${prefix}universalizability-fail`, 'false');
    }
  };

  const handleConsistencyChange = (event:any) => {
    setConsistency(event.target.value);

    const result = event.target.value;
    if(result == 'fail'){
      localStorage.setItem(`${prefix}consistency-pass`, 'false');
      localStorage.setItem(`${prefix}consistency-fail`, 'true');
    }else{
      localStorage.setItem(`${prefix}consistency-pass`, 'true');
      localStorage.setItem(`${prefix}consistency-fail`, 'false');
    }

  };

  const handlePrimaryVirtueAlwaysChange = (event:any) => {
    setPrimaryVirtueAlways(event.target.value);
    localStorage.setItem(`${prefix}primary-virtue-always`, event.target.value);
  };

  const handlePrimaryVirtueNeverChange = (event:any) => {
    setPrimaryVirtueNever(event.target.value);
    localStorage.setItem(`${prefix}primary-virtue-never`, event.target.value);
  };

  // Handle suggestion click and append it to the input
  const handleSuggestionClick = (suggestion: string) => {
    const parts = virtuesInput.split(","); // Split input by commas
    parts.pop(); // Remove the last partial word
    const updatedInput = [...parts, suggestion].join(", ").trim(); // Append the suggestion
    setVirtuesInput(updatedInput); // Update the input
    setSuggestions([]); // Clear suggestions after selection
  };

  const clearLocalStorage = () => {
    localStorage.removeItem(`${prefix}consistency-fail`);
    localStorage.removeItem(`${prefix}consistency-pass`);
    localStorage.removeItem(`${prefix}moral-virtues`);
    localStorage.removeItem(`${prefix}primary-virtue-always`);
    localStorage.removeItem(`${prefix}primary-virtue-never`);
    localStorage.removeItem(`${prefix}universalizability-fail`);
    localStorage.removeItem(`${prefix}universalizability-pass`);
  };

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
      //console.log(`HAS ${formName} BEEN SUBMITTED? ` + data.message);
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
   * Makes sure the DOM is rendered before disabling inputs, otherwise formElements will be empty and it won't disable.
   */
  useEffect(() => {
    (async () => {
      //check if form has been submitted, if it is then all inputs will be disabled
      await hasBeenSubmitted();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Delay execution to give DOM time to render
      setTimeout(() => {
        //console.log("lockForm value:", lockForm);
        console.log("isRendered value:", isRendered);
        console.log("lockForm value:", lockForm);
        if (isRendered && lockForm) {
          //console.log("This form has been submitted");
          
          const formElements = document.querySelectorAll('.categorical .answer-input, .categorical .final-button');
          //console.log(formElements); // Log the selected elements
          
          formElements.forEach((element) => {
            (element as HTMLInputElement).disabled = true;
          });
          //console.log("disabled inputs");

          //get feedback
          const assignmentID = Cookie.get('assignment_id'); 
            useFetchFeedback({ formName, assignmentId: assignmentID || '', setFeedback });
          }
      }, 0); // Delay to allow DOM to render
    })();
  }, [lockForm, isRendered]);

  useEffect(() => {
    //console.log("use effect is running");
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('id');
        const assignmentId = Cookie.get('assignment_id');

        let dilemmaData;
        try{
          const dilemmaResponse = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=dilemma`);
          dilemmaData = dilemmaResponse.data.data;
        }catch(error){
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log("No saved data found for the dilemma form");
          }else{
            console.log("Error fetching form data: ", error);
          }
        }

        let data;
        try{
          const response = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=${formName}`);
          data = response.data.data;
        }catch(error){
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log("No saved data found for this form");
          }else{
            console.log("Error fetching form data: ", error);
          }
        }



        //fill out the tentative choice from the answer in the dilemma form
        if (dilemmaData && dilemmaData.length > 0) {
          let content;
          if(dilemmaData[0].answers && dilemmaData[0].answers[0] && dilemmaData[0].answers[0].content){
             content = dilemmaData[0].answers[0].content;
          }else{
            content = [];
          }
          //console.log("dilemma content is", content);
          
          let tentativeChoice;
          for(let i = 0; i < 5; i++){
            let choiceKey = `tentative-choice-${i}`;
            if(localStorage.getItem(`${prefix}${choiceKey}`) != null && localStorage.getItem(`${prefix}${choiceKey}`) != 'false'){
              tentativeChoice = localStorage.getItem(`${prefix}${choiceKey}`);
              break;
            }
            if(content[choiceKey] != 'false'){
              tentativeChoice = content[choiceKey];
              break;
            }
          }
          console.log("tentativeChoice is", tentativeChoice);
          setTentativeChoice(tentativeChoice);
        }

       
        let content;
        if(data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content){
          content = data[0].answers[0].content;
        }else{
          content = [];
        }
        //console.log("content is", content);

     
        setVirtuesInput(feedback['moral-virtues'] || localStorage.getItem(`${prefix}moral-virtues`) || content['moral-virtues']);
        setPrimaryVirtueAlways(feedback['primary-virtue-always'] || localStorage.getItem(`${prefix}primary-virtue-always`) || content['primary-virtue-always']);
        setPrimaryVirtueNever(feedback['primary-virtue-never'] || localStorage.getItem(`${prefix}primary-virtue-never`) || content['primary-virtue-never']);

        if(localStorage.getItem(`${prefix}consistency-pass`) == 'true'){
          setConsistency('pass');
        }else if(localStorage.getItem(`${prefix}consistency-fail`) == 'true'){
          setConsistency('fail');
        }else{
          if(content.length == 0){
            //the user has not saved or submitted the form yet so there is no radio button selection to fill
            //console.log("im in here");
            
          }else{
            if(content['consistency-pass'] == 'false' && content['consistency-fail'] == 'false'){
              //do not set anything
            }else{
              content['consistency-pass'] != 'false' ? setConsistency('pass') : setConsistency('fail');
            }
          }
        }

        if(localStorage.getItem(`${prefix}universalizability-pass`) == 'true'){
          setUniversalizability('pass');
        }else if(localStorage.getItem(`${prefix}universalizability-fail`) == 'true'){
          setUniversalizability('fail');
        }else{
          if(content.length == 0){
            //the user has not saved or submitted the form yet so there is no radio button selection to fill
            //console.log("im in here");
          }else{
            if(content['universalizability-pass'] == 'false' && content['universalizability-fail'] == 'false'){
              //do not set anything
            }else{
              content['universalizability-pass'] != 'false' ? setUniversalizability('pass') : setUniversalizability('fail');
            }
          }
        }
        


        setLoading(false);
      } catch (error) {
        console.error("Error fetching form data: ", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
  }

  //this successfully sends the data to the backend
  const submitAssignmentForm = async (e:any) => {
    e.preventDefault()
    //console.log("Entered the submit assignment handler")
    const studentID = localStorage.getItem('id'); 
    
    const caseStudyID = Cookie.get('case_study_id');
    const formName = e.currentTarget.getAttribute('data-form-name') || 'categorical-imperatives'; // Dynamically get the form name or set a default
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

    //for the assignment table
    const data = {
      student_id: studentID,
      assignment_id: assignmentID,
      case_study_id: caseStudyID,
      form_name: formName,
      answers: answers
    };

    try {
      // Send data to backend API using axios
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      console.log("Data being sent: " + JSON.stringify(data, null, 2));

      let response;
        if(!submitted){
          //console.log("saving form");
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
        localStorage.setItem(`${prefix}categorical-imperatives-submitted`, "true");
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



  /* 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    =================================
    HERE BEGINS THE HTML FOR THE FORM
    =================================
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  */

  return (
    <main className="flex flex-col items-center justify-center text-sm md:text-lg">
      {/* Header */}
      {/* <div className="w-full max-w-screen-2xl bg-blue-700 text-white text-center py-4 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">ACTION AND DUTY</h1>
      </div> */}

      {/* Form Container */}
      <form ref={formRef} onSubmit={submitAssignmentForm} data-form-name="categorical-imperatives" className="categorical w-full max-w-screen-2xl">
      
      
      
      <div className="mt-6 w-full max-w-screen-2xl bg-white p-8 rounded-lg shadow-md" >
        <FormCompletedCard isVisible={lockForm} />
        <h2 className="text-lg font-bold text-gray-800">TESTING CATEGORICAL IMPERATIVES</h2>

        {/* Section 1 */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            Does your tentative choice follow a universal law of morality?
          </label>
          <input
            type="text"
            readOnly={false}
            placeholder="Auto fill chosen option from Seven Step Method"
            value={tentativeChoice}
            onChange={e => setTentativeChoice(e.target.value)}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Section 2 with Autofill */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">
            What moral virtues or vices are enshrined in your choice?{" "}
            <span className="text-gray-500">(e.g., Honesty, Loyalty, etc.)</span>
          </label>

          {!lockForm && (
            <>
              <textarea
                id="moral-virtues"
                rows={3}
                value={virtuesInput}
                onChange={handleVirtuesChange}
                placeholder="Start typing to see suggestions..."
                className="categorical answer-input mt-2 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <ul className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
          {lockForm && (
            <>
              <div
                className="border border-gray-300 rounded-lg p-2 mt-2 min-h-[100px]"
                dangerouslySetInnerHTML={{
                  __html: virtuesInput ? virtuesInput.replace(
                  /<c>(.*?)<\/c>/g,
                  '<span class="text-red-500">$1</span>'
                  ) : '',
                }}
              />
            </>
          )}

        </div>

        {/* Restate the Primary Virtue */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">
            Restate the primary virtue as a universal law of moral action:
          </label>
          <div className="mt-2 flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="text-gray-500 ">You should always</span>

              {!lockForm && (
                <input
                  id="primary-virtue-always"
                  value={primaryVirtueAlways}
                  onChange={handlePrimaryVirtueAlwaysChange}
                  type="text"
                  placeholder="Enter here"
                  className="answer-input mx-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none w-full max-w-xs min-w-0"
                  required
                />
              )}
              {lockForm && (
                <div
                  className="border border-gray-300 rounded-lg p-2 ml-2 min-h-[40px]"
                  dangerouslySetInnerHTML={{
                    __html: primaryVirtueAlways ? primaryVirtueAlways.replace(
                    /<c>(.*?)<\/c>/g,
                    '<span class="text-red-500">$1</span>'
                    ) : '',
                  }}
                />
              )}

            </div>
            <div className="flex items-center">
              <span className="text-gray-500 ">or never</span>

              {!lockForm && (
                <input
                  id="primary-virtue-never"
                  value={primaryVirtueNever}
                  onChange={handlePrimaryVirtueNeverChange}
                  type="text"
                  placeholder="Enter here"
                  className="answer-input mx-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none w-full max-w-xs min-w-0"
                  required
                />
              )}
              {lockForm && (
                <div
                className="border border-gray-300 rounded-lg p-2 ml-2 min-h-[40px]"
                dangerouslySetInnerHTML={{
                  __html: primaryVirtueNever ? primaryVirtueNever.replace(
                  /<c>(.*?)<\/c>/g,
                  '<span class="text-red-500">$1</span>'
                  ) : '',
                }}
              />
              )}

            </div>
          </div>
          <p className="mt-4 text-gray-500 ">
            Regardless of your desires, inclinations, the consequences, or circumstances.
          </p>
        </div>

        {/* Test Its Universalizability */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">
            TEST ITS UNIVERSALIZABILITY:
          </label>
          <p className="text-gray-500">
            Can this law help you determine the right thing to do in all times and places?
          </p>
          <div className="mt-4">
            <span className="text-gray-700 font-medium">Does it Pass or Fail this test?</span>
            <div className="mt-2 flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  id="universalizability-pass"
                  defaultChecked={universalizability === 'pass'}
                  type="radio"
                  name="universalizability"
                  value="pass"
                  className="answer-input h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300"
                  onChange={handleUniversalizabilityChange}
                  required
                />
                <span className="text-gray-700">Pass</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  id="universalizability-fail"
                  defaultChecked={universalizability === 'fail'}
                  type="radio"
                  name="universalizability"
                  value="fail"
                  className="answer-input h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300"
                  onChange={handleUniversalizabilityChange}
                  required
                />
                <span className="text-gray-700">Fail</span>
              </label>
            </div>
          </div>
        </div>

        {/* Test Its Consistency */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">
            TEST ITS CONSISTENCY:
          </label>
          <p className="text-gray-500">
            Could you live in a world where everyone always followed this moral law?
          </p>
          <div className="mt-4">
            <span className="text-gray-700 font-medium">Does it Pass or Fail this test?</span>
            <div className="mt-2 flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  id="consistency-pass"
                  checked={consistency === 'pass'}
                  type="radio"
                  name="consistency"
                  value="pass"
                  className="answer-input h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300"
                  onChange={handleConsistencyChange}
                  required
                />
                <span className="text-gray-700">Pass</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  id="consistency-fail"
                  checked={consistency === 'fail'}
                  type="radio"
                  name="consistency"
                  value="fail"
                  className="answer-input h-4 w-4 text-blue-600 focus:ring focus:ring-blue-300"
                  onChange={handleConsistencyChange}
                  required
                />
                <span className="text-gray-700">Fail</span>
              </label>
            </div>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="mt-8 text-right flex gap-4 justify-end">
          <Button type="submit" data-html2canvas-ignore className="final-button bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition" onClick={submitAssignmentForm} data-form-name={formName}>
              Save
          </Button>
          {localStorage.getItem("guest") == "false" && (
            <SubmitButtonWithConfirmation formRef={formRef} buttonText="Submit" onClick={(e) => { 
              e.preventDefault();
              submitted = true; 
              //console.log("submitted is now " + submitted);
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
