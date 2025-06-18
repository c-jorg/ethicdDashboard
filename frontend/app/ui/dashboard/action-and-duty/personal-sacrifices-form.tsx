"use client";

import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Cookie from 'js-cookie';
import { Button } from '@/app/ui/button';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import TextInput from '@/app/ui/components/text-input';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from '@/app/ui/components/prof-comment-box';
import DescriptionCard from "@/app/ui/components/description-card";
import api from '../../../utils/api-auth'; //applies the auth headers 

export default function PersonalSacrificesForm() {
  const [moralDuties, setMoralDuties] = useState([{ id: 1, duty: "", sacrifice: 5 }]);
  const [criticalQuestions, setCriticalQuestions] = useState([
    'Are you personally responsible for doing your role-determined duty?',
    'Is doing your role-determined duty the right thing in this case?'
  ]);
  const [topics, setTopics] = useState([''])
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const formRef = useRef<HTMLFormElement>(null);
  const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
  const [isRendered, setIsRendered] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [loading, setLoading] = useState(true);
  const formName = 'personal-sacrifices';
  const assignmentID = Cookie.get('assignment_id'); 
  const prefix = assignmentID + "-"; 
  const [removalTriggered, setRemovalTriggered] = useState(false);
  let submitted = false;

  // Function to add a new moral duty
  const addMoralDuty = () => {
    
    setMoralDuties([...moralDuties, { id: moralDuties.length + 1, duty: "", sacrifice: 5 }]);
    localStorage.setItem(`${prefix}moral-duty-${moralDuties.length+1}`, "");
    localStorage.setItem(`${prefix}slider-${moralDuties.length+1}-ps`, "5");
    localStorage.setItem(`${prefix}num-sacrifices`, (moralDuties.length + 1).toString());
    localStorage.setItem(`${prefix}num-sacrifices-ps`, (moralDuties.length + 1).toString());
  };

  // Function to update a moral duty
  const updateMoralDuty = (id: number, field: string, value: string | number) => {
    setMoralDuties(
      moralDuties.map((duty) =>
        duty.id === id ? { ...duty, [field]: value } : duty
      )
    );
    if (typeof value === 'string') {
      localStorage.setItem(`${prefix}moral-duty-${id}`, value.toString());
    }else{
      localStorage.setItem(`${prefix}slider-${id}-ps`, value.toString());
    }
  };

  // Function to remove a moral duty
  const removeMoralDuty = (id: number) => {
    const updatedDuties = moralDuties
      .filter((duty) => duty.id !== id)
      .map((duty, index) => ({ ...duty, id: index + 1 })); // Re-number duties sequentially
    setMoralDuties(updatedDuties);
    setRemovalTriggered(true);

  };

  const calculateAverage = () => {
    let sum = 0;
    moralDuties.forEach((duty) => {
      sum += duty.sacrifice;
    });
    return Math.round(sum / moralDuties.length);
  }

  const removeMoralDutyFromLocalStorage = () => {
    //shift the indexes of the other duties in local storage
    let i = 1;
    for(i; i <= moralDuties.length; i++){
        //console.log("trying to reset moral-duty-" + i);
        localStorage.setItem(`${prefix}moral-duty-${i}`, moralDuties[i-1].duty);
        //console.log("trying to reset slider-" + i);
        localStorage.setItem(`${prefix}slider-${i}-ps`, moralDuties[i-1].sacrifice.toString());
    }

    //remove the last duty from local storage because it is a duplicate
    //console.log("trying to remove moral duty moral-duty-" + (i-1));
    localStorage.removeItem(`${prefix}moral-duty-${moralDuties.length+1}`);
    //console.log("trying to remove slider slider-" + (i-1));
    localStorage.removeItem(`${prefix}slider-${moralDuties.length+1}-ps`);

    localStorage.setItem(`${prefix}num-sacrifices`, (moralDuties.length).toString());
  };

  useEffect(() => {
    if(removalTriggered){
      setRemovalTriggered(false);
      //console.log("removal triggered");
      removeMoralDutyFromLocalStorage();
    }
  }, [removalTriggered, moralDuties]);

  const clearLocalStorage = () => {
    for(let i = 1; i <= moralDuties.length; i++){
      localStorage.removeItem(`${prefix}moral-duty-${i}`);
      localStorage.removeItem(`${prefix}slider-${i}-ps`);
    }
    localStorage.removeItem(`${prefix}num-sacrifices`);
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
      const response = await api.get<HasBeenSubmittedResponse>(`${apiUrl}/api/flask/assignment/is-form-submitted?student_id=${userId}&assignment_id=${assignmentID}&form_name=${formName}`);
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
   * Makes sure the DOM is rendered before disabling inputs, otherwise formElements will be empty and it won't disable.
   * 
   * This runs when it notices a change in the lockForm state or when the DOM is rendered.
   */
  useEffect(() => {
    (async () => {
      //check if form has been submitted, if it is then all inputs will be disabled
      await hasBeenSubmitted();

      // Delay execution to give DOM time to render
      setTimeout(() => {
        //console.log("lockForm value:", lockForm);
        if (isRendered && lockForm) {
          //console.log("This form has been submitted");
          
          const formElements = document.querySelectorAll('.answer-input, .final-button');
          console.log(formElements); // Log the selected elements
          
          formElements.forEach((element) => {
            (element as HTMLInputElement).disabled = true;
          });
          //console.log("disabled inputs");
        }
      }, 0); // Delay to allow DOM to render

      // Now check for any feedback - if there is any then overwrite the answer with the feedback
      const assignmentId = Cookie.get('assignment_id');
      if(lockForm){
        //fetchFeedback(formName, parseInt(assignmentId || ''), setTopics);
        useFetchFeedback({ formName, assignmentId: assignmentId || '', setFeedback });
      }

    })();
  }, [lockForm, isRendered]);

 
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

  

  useEffect(() => {
    //console.log("use effect is running");
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('id');
        const assignmentId = Cookie.get('assignment_id');

        let data;
        try{
          const response = await api.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=${formName}`);
          data = response.data.data;
        }catch(error){
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log("No saved data found for this form");
          }else{
            console.log("Error fetching form data: ", error);
          }
        }

       
        let content;
        if(data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content){
          content = data[0].answers[0].content;
        }else{
          content = [];
        }
        console.log("content is", content);

        const length = localStorage.getItem(`${prefix}num-sacrifices-ps`) || content['num-sacrifices'] || 1;
        //console.log("length is " + length);

        let newMoralDuties = []; 
        for (let i = 1; i <= length; i++) {
          const duty = feedback[`moral-duty-${i}`] || localStorage.getItem(`${prefix}moral-duty-${i}`) || content[`moral-duty-${i}`] || "";
          //console.log("duty is " + duty);
          const sacrifice = localStorage.getItem(`${prefix}slider-${i}-ps`) || content[`slider-${i}`];
          //console.log("sacrifice is " + sacrifice);

          newMoralDuties.push({ id: i, duty: duty, sacrifice: Number(sacrifice) });
        }
        setMoralDuties(newMoralDuties);

        criticalQuestions.forEach((_, index) => {
          const topic =  feedback[`topic-ps-${index}`] || localStorage.getItem(`${prefix}topic-ps-${index}`) || content[`topic-ps-${index}`];
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
  
    fetchData();
  }, [criticalQuestions, feedback]);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
  }

 //this successfully sends the data to the backend
 const submitAssignmentForm = async (e:any) => {
    e.preventDefault()
    //console.log("Entered the submit assignment handler")
    const studentID = localStorage.getItem('id'); 
    
    const caseStudyID = Cookie.get('case_study_id');
    const formName = e.currentTarget.getAttribute('data-form-name') || 'personal-sacrifices'; // Dynamically get the form name or set a default
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

    answers['num-sacrifices'] = moralDuties.length.toString();
    answers['average-sacrifice'] = calculateAverage().toString();
    answers['cumulative-score'] = calculateAverage().toString();

    //console.log(answers)

    //for the assignment table
    const data = {
      student_id: studentID,
      assignment_id: assignmentID,
      case_study_id: caseStudyID,
      form_name: formName,
      answers: answers
    };

    //console.log(data.toString())

    try {
      // Send data to backend API using axios
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      console.log("Data being sent: " + JSON.stringify(data, null, 2));
      let response;
        if(!submitted){
          response = await api.post(`${apiUrl}/api/flask/assignment/save-form`, data, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        }else{
          response = await api.post(`${apiUrl}/api/flask/assignment/submit-form`, data, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        }

      // Handle successful response
      alert(response.data.message); // Assuming your backend returns a message
      clearLocalStorage();
      if(submitted){
        localStorage.setItem(`${prefix}personal-sacrifices-submitted`, "true");
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="w-full max-w-screen-2xl bg-blue-700 text-white text-center py-4 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">ACTION AND DUTY</h1>
      </div>

      {/* Instructions */}
      <DescriptionCard 
      
        formName={formName} 
        defaultDescription="In some cases, your role in an organization or institution may determine your moral
          obligations. These professional obligations may not align with what you would endorse
          personally. Defense lawyers, for example, are obligated to provide clients with the
          strongest possible defense even if they believe their client is guilty of a heinous
          crime. List at least three moral duties relative to your role. Does doing your duty
          require personal sacrifice? (Assuming you aspire to do the right thing.)"
        assignmentID={assignmentID?.toString() || ''}
        style={2}
      
      />

      {/* Moral Duties Form */}
      <form ref={formRef} onSubmit={submitAssignmentForm} data-form-name="personal-sacrifices" className="w-full max-w-screen-2xl">
        <div className="mt-6 w-full bg-white p-6 rounded-lg shadow-md space-y-6" data-form-name="personal-sacrifices">

          <FormCompletedCard isVisible={lockForm} />

          {moralDuties.map((duty) => (
            <div
              key={duty.id}
              className="relative border border-gray-300 p-4 rounded-lg space-y-4"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeMoralDuty(duty.id)}
                className="final-button absolute top-6 right-2 bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Remove
              </button>

              {/* Moral Duty Input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Moral Duty {duty.id}:
                </label>


                {!lockForm && (
                  <input
                    type="text"
                    value={duty.duty}
                    onChange={(e) => updateMoralDuty(duty.id, "duty", e.target.value)}
                    placeholder="Enter moral duty..."
                    className="answer-input w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                    id={`moral-duty-${duty.id}`}
                    required
                  />
                )}
                {lockForm && (
                   <>
                    <div
                      className="border border-gray-300 rounded-lg p-2 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: duty.duty ? duty.duty.replace(
                        /<c>(.*?)<\/c>/g,
                        '<span class="text-red-500">$1</span>'
                        ) : '',
                      }}
                    />
                  </>
                )}

              </div>

              {/* Personal Sacrifice Slider */}
              <div>
                <label className="block text-gray-700 font-medium">Personal Sacrifice:</label>
                <div className="flex items-center mt-2">
                  <span className="text-gray-500 mr-2">High</span>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={duty.sacrifice}
                    onChange={(e) =>
                      updateMoralDuty(duty.id, "sacrifice", Number(e.target.value))
                    }
                    className="answer-input flex-1"
                    id={`slider-${duty.id}`}
                  />
                  <span className="text-gray-500 ml-2">Low</span>
                </div>
              </div>
            </div>
          ))}

          {/* Add Moral Duty Button */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={addMoralDuty}
              className="final-button bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              + Add Another Moral Duty
            </button>
          </div>

          {/*Professor Comment Box for MORAL DUTIES */}
          {lockForm && feedback[`moral-duties`] && (
            <div className="border border-gray-200 rounded-lg p-4 mt-4">
              <ProfessorCommentBox comment={feedback[`moral-duties`]} />
            </div>
          )}



          {/* Critical Questions */}
          {criticalQuestions?.map((question,index)=>(
            <div className="mt-4" key={index}>
              {!lockForm && (
                <TextInput 
                  key={index}
                  title={question}
                  setter={(value: string) => setTopic(index, value)}
                  value={topics[index]} 
                  id={`topic-ps-`+index} 
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

          {/* Save Button */}
        <div className="mt-6 w-full max-w-screen-2xl flex justify-end gap-4">
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
