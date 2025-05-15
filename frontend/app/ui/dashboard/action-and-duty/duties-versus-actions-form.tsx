"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import axios from 'axios';
import Cookie from 'js-cookie';
import { Button } from '@/app/ui/button';
import TextInput from '@/app/ui/components/text-input'; // Import TextInput component
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from "@/app/ui/components/prof-comment-box";
import { set } from "zod";
import DescriptionCard from "@/app/ui/components/description-card";

export default function DutiesVersusActionsForm() {
  const [fidelitySlider1, setFidelitySlider1] = useState(5);
  const [fidelitySlider2, setFidelitySlider2] = useState(5);
  const [reparationSlider1, setReparationSlider1] = useState(5);
  const [reparationSlider2, setReparationSlider2] = useState(5);
  const [gratitudeSlider1, setGratitudeSlider1] = useState(5);
  const [gratitudeSlider2, setGratitudeSlider2] = useState(5);

  const [percentageActionTaken, setPercentageActionTaken] = useState(100);
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const [criticalQuestions, setCriticalQuestions] = useState([
    `Based on your inputs, you will meet ${percentageActionTaken}% of your duties. Is that an acceptable level of action?`,
    'Are duties based on past actions in this case less or more important than role-determined duties?'
  ]);

  const [topics, setTopics] = useState(['','']); //holds the answers from the user for the critical questions

  const [numQuestions, setNumQuestions] = useState(-1); //used to track the number of critical questions when including the ones from the DB
  const [questionsInitialized, setQuestionsInitialized] = useState(false); //set to true once critical qs have been fetched from DB

  const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
  const [isRendered, setIsRendered] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const formName = 'duties-versus-actions';
  const [loading, setLoading] = useState(true);
  const maxWords = 200;
  const assignmentID = Cookie.get('assignment_id'); 
  const prefix = assignmentID + "-"; 
  let submitted = false;

  const calcPercentageActionTaken = useCallback(() => {
     const dutyTotal = (10-fidelitySlider1) + (10-reparationSlider1) + (10-gratitudeSlider1);
     const actionTotal = (10-fidelitySlider2) + (10-reparationSlider2) + (10-gratitudeSlider2);

     const percentage = (actionTotal/dutyTotal)*100;

     //console.log("percentage is", Math.round(percentage));

     localStorage.setItem(`${prefix}percentage-action-taken`, Math.round(percentage).toString());
     setPercentageActionTaken(Math.round(percentage));

     //Make sure the new value is reflected in the critical questions

   
     //update the first critical question with the new percentage
    setCriticalQuestions(prevQuestions => {
      const updatedQuestion = `Based on your inputs, you will meet ${Math.round(percentage)}% of your duties. Is that an acceptable level of action?`;
  
      // Only update state if the question actually changes
      if (prevQuestions[0] !== updatedQuestion) {
        return [updatedQuestion, ...prevQuestions.slice(1)];
      }
      return prevQuestions;
    });
     

     console.log("percentage action taken is", percentageActionTaken);
     return Math.round(percentage);
  }, [fidelitySlider1, fidelitySlider2, reparationSlider1, reparationSlider2, gratitudeSlider1, gratitudeSlider2]);

  const calculateCumulativeScore = () => {
      //The percentage from fidelity, reparation and gratitude:  0–3 = Red, 4-6 = Grey, 7-10 = Green
      let percentage = calcPercentageActionTaken();
      let normalizedPercentage = Math.round(percentage / 10);
      return normalizedPercentage
  }

  const handleSliderChange = (e: any, id: string) => {
    localStorage.setItem(`${prefix}${id}`, e.target.value);
    if(id === 'fidelity-slider-1') setFidelitySlider1(Number(e.target.value));
    if(id === 'fidelity-slider-2') setFidelitySlider2(Number(e.target.value));
    if(id === 'reparation-slider-1') setReparationSlider1(Number(e.target.value));
    if(id === 'reparation-slider-2') setReparationSlider2(Number(e.target.value));
    if(id === 'gratitude-slider-1') setGratitudeSlider1(Number(e.target.value));
    if(id === 'gratitude-slider-2') setGratitudeSlider2(Number(e.target.value));
  }

  const clearLocalStorage = () => {
    localStorage.removeItem(`${prefix}fidelity-slider-1`);
    localStorage.removeItem(`${prefix}fidelity-slider-2`);
    localStorage.removeItem(`${prefix}reparation-slider-1`);
    localStorage.removeItem(`${prefix}reparation-slider-2`);
    localStorage.removeItem(`${prefix}gratitude-slider-1`);
    localStorage.removeItem(`${prefix}gratitude-slider-2`);
    localStorage.removeItem(`${prefix}percentage-action-taken`);

  };

  useEffect(() => {
    calcPercentageActionTaken();
  }, [fidelitySlider1, fidelitySlider2, reparationSlider1, reparationSlider2, gratitudeSlider1, gratitudeSlider2]);

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
        console.log("Has been submitted: This form has not been submitted");
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
          //console.log(formElements); // Log the selected elements
          
          formElements.forEach((element) => {
            (element as HTMLInputElement).disabled = true;
          });
          //console.log("disabled inputs");

          // Now check for any feedback - if there is any then overwrite the answer with the feedback
          const assignmentId = Cookie.get('assignment_id'); 
          useFetchFeedback({ formName, assignmentId: assignmentId || '', setFeedback });
          

        }
      }, 1000); // Delay to allow DOM to render

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
    if(updatedCriticalQs.length > 0){
      setNumQuestions(updatedCriticalQs.length);
    }
    
    // Update state with the new questions
    setCriticalQuestions(updatedCriticalQs);
    //setQuestionsInitialized(true);  // Set this after criticalQuestions has been updated

    //set topics to same length as critical questions
    setTopics(new Array(updatedCriticalQs.length).fill(''));
  };

  /** Get questions from DB */
  useEffect(() => {
    const initializeForm = async () => {
      await getQuestions();
      setQuestionsInitialized(true);
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
      //Saved data for the form should only be fetched after critical questions have been fetched
      if (!questionsInitialized) return;

      console.log("fetching saved data");
      console.log("Critical questions as I am about to fetch data is ", criticalQuestions);
      console.log("Questions initializeD? ", questionsInitialized);
      try {
        //printLocalStorage();
        const userId = localStorage.getItem('id');
        const assignmentId = Cookie.get('assignment_id');

        let data;
        try{
          const response = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=${formName}`);
          data = response.data.data;
        }catch(error){
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log("Fetch Data: No saved data found for this form");
            //setTimeout(() => {}, 2000);
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
        //console.log("content is", content);

        if(localStorage.getItem(`${prefix}fidelity-slider-1`) !== null){
          setFidelitySlider1(parseInt(localStorage.getItem(`${prefix}fidelity-slider-1`) || '5'));
        }else{
          if(content[`fidelity-slider-1`]){
            setFidelitySlider1(10 - content[`fidelity-slider-1`]);
          }else{
            setFidelitySlider1(5);
          }
        }

        if(localStorage.getItem(`${prefix}fidelity-slider-2`) !== null){
          setFidelitySlider2(parseInt(localStorage.getItem(`${prefix}fidelity-slider-2`) || '5'));  
        }else{
          if(content[`fidelity-slider-2`]){
            setFidelitySlider2(10 - content['fidelity-slider-2']);
          }else{
            setFidelitySlider2(5);
          }
        }

        if(localStorage.getItem(`${prefix}reparation-slider-1`) !== null){
          setReparationSlider1(parseInt(localStorage.getItem(`${prefix}reparation-slider-1`) || '5'));    
        }else{
          if(content[`reparation-slider-1`]){
            setReparationSlider1(10 - content['reparation-slider-1']);
          }else{
            setReparationSlider1(5);
          }
        }

        if(localStorage.getItem(`${prefix}reparation-slider-2`) !== null){
          setReparationSlider2(parseInt(localStorage.getItem(`${prefix}reparation-slider-2`) || '5'));
        }else{
          if(content[`reparation-slider-2`]){
           setReparationSlider2(10 - content['reparation-slider-2']);
          }else{
            setReparationSlider2(5);
          }
        }

        if(localStorage.getItem(`${prefix}gratitude-slider-1`) !== null){
          setGratitudeSlider1(parseInt(localStorage.getItem(`${prefix}gratitude-slider-1`) || '5'));
        }else{
          if(content[`gratitude-slider-1`]){
            setGratitudeSlider1(10 - content['gratitude-slider-1']);
          }else{
            setGratitudeSlider1(5);
          }
        }

        if(localStorage.getItem(`${prefix}gratitude-slider-2`) !== null){
          setGratitudeSlider2(parseInt(localStorage.getItem(`${prefix}gratitude-slider-2`) || '5'));
        }else{
          if(content[`gratitude-slider-2`]){
            setGratitudeSlider2(10 - content['gratitude-slider-2']);
          }else{
            setGratitudeSlider2(5);
          }
        }

        //console.log("MAPPING CRITICAL QUESTIONS IN FETCH DATA ", criticalQuestions);
        criticalQuestions.forEach((question, index) => {
          //console.log("LOAD SAVED DATA: Feedback is ", feedback);
          const topic = feedback[`topic-dva-${index}`] || localStorage.getItem(`${prefix}topic-dva-${index}`) || content[`topic-dva-${index}`];
          //console.log("LOAD SAVED DATA: topic is", topic);
          setTopics(prevTopics => {
            const newTopics = [...prevTopics];
            
              newTopics[index] = topic || '';
            
            return newTopics;
          });
        });

        setTimeout(() => {
          setLoading(false);
        }, 1000)
       
      } catch (error) {
        console.error("Error fetching form data: ", error);
        setLoading(false);
      }
    };
  
    fetchData();
    calcPercentageActionTaken();
  }, [feedback, questionsInitialized]);

  useEffect(() => {
    console.log("Check for questionsInitiaized: ", questionsInitialized);
}, [questionsInitialized]);

  useEffect(() => {
    console.log("CHECK TOPICS USE EFFECT: topics variable contains ", topics);
  }, [topics]);

  useEffect(() => {
    if(criticalQuestions.length == numQuestions){
      console.log("bruhhhhhh!!!!!!!!!!!!!!!!!!!!!!!!!!!!  ");
      setLoading(false);
    }
  }, [criticalQuestions, numQuestions])
 

 
  if (loading) {
    const bool = criticalQuestions.length !== numQuestions;
    console.log("bool is ", bool);
    console.log("Critical question is ", criticalQuestions);
    console.log("Numquestions is ", numQuestions);
    return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
  }

 

 //this successfully sends the data to the backend
 const submitAssignmentForm = async (e:any) => {
    e.preventDefault()
    //console.log("Entered the submit assignment handler")
    const studentID = localStorage.getItem('id'); 
    
    const caseStudyID = Cookie.get('case_study_id');
    const formName = e.currentTarget.getAttribute('data-form-name') || 'duties-versus-actions'; // Dynamically get the form name or set a default
    //console.log("form name is " + formName);
    
    const answers: { [key: string]: string } = {}; //an object to hold the answers as key-value pairs

    document.querySelectorAll('.answer-input').forEach(input => {
      const inputElement = input as HTMLInputElement;

      // Handle checkboxes and radio buttons
      if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
        answers[inputElement.id] = inputElement.checked ? inputElement.value : 'false';
      } else {
        // Handle other input types (e.g., text inputs)
        //console.log("input is " + inputElement.value);
        const inputValue = Number(inputElement.value);
        if (!isNaN(inputValue)) {
          //if its a number then its a slider value and we need to reverse the number to be range 10-0 instead of 0-10
          const value = (10 - inputValue);
          //console.log("value after 10-value is " + value);
          answers[inputElement.id] = value.toString();
        } else {
          answers[inputElement.id] = inputElement.value;
        }
      }
    });
    answers['percentage-action-taken'] = calcPercentageActionTaken().toString();
    answers['cumulative-score'] = calculateCumulativeScore().toString();

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
        localStorage.setItem(`${prefix}duties-versus-actions-submitted`, "true");
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

      
      <DescriptionCard 
        formName={formName} 
        style={2}
        assignmentID={assignmentID}
        defaultDescription="Ethical decision-making often involves considering how the situation came about, the
          history of events that led to the need for action. Some duties are based on past actions.
          Does the past impose moral duties of fidelity, reparation, or gratitude in this case?"    
      />

      {/* Form Sections */}
      
      <form ref={formRef} onSubmit={submitAssignmentForm} data-form-name="duties-versus-actions" className="w-full max-w-screen-2xl">
      <div className="mt-6 w-full max-w-screen-2xl bg-white p-6 rounded-lg shadow-md space-y-6" data-form-name={formName}>

        <FormCompletedCard isVisible={lockForm} />

        {/* Duties of Fidelity */}
        <div className="border border-gray-300 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">DUTIES OF FIDELITY</h2>
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-700 flex-1">
              Has a promise, or have promises, been made?
            </label>
            <div className="flex-1">
              <div className="flex justify-between text-gray-700 text-xs mb-1">
                <span>Yes</span>
                <span>Partially</span>
                <span>No</span>
              </div>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={fidelitySlider1}
                  onChange={(e) => handleSliderChange(e, `fidelity-slider-1`) }
                  className="answer-input w-full h-2 bg-gray-300 rounded-lg appearance-none m-3"
                  id={`fidelity-slider-1`}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <label className="text-sm text-gray-700 flex-1">
              Will you keep that promise, or those promises?
            </label>
            <div className="flex-1">
              <div className="flex justify-between text-gray-700 text-xs mb-1">
                <span>Yes</span>
                <span>Partially</span>
                <span>No</span>
              </div>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={fidelitySlider2}
                  onChange={(e) => handleSliderChange(e, `fidelity-slider-2`) }
                  className="answer-input w-full h-2 bg-gray-300 rounded-lg appearance-none m-3"
                  id={`fidelity-slider-2`}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Duties of Reparation */}
        <div className="border border-gray-300 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">DUTIES OF REPARATION</h2>
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-700 flex-1">
              Do you have to make amends for previous wrong-doing?
            </label>
            <div className="flex-1">
              <div className="flex justify-between text-gray-700 text-xs mb-1">
                <span>Yes</span>
                <span>Partially</span>
                <span>No</span>
              </div>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={reparationSlider1}
                  onChange={(e) => handleSliderChange(e, `reparation-slider-1`) }
                  className="answer-input w-full  h-2 bg-gray-300 rounded-lg appearance-none m-3"
                  id={`reparation-slider-1`}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <label className="text-sm text-gray-700 flex-1">Will you make amends?</label>
            <div className="flex-1">
              <div className="flex justify-between text-gray-700 text-xs mb-1">
                <span>Yes</span>
                <span>Partially</span>
                <span>No</span>
              </div>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={reparationSlider2}
                  onChange={(e) => handleSliderChange(e, `reparation-slider-2`) }
                  className="answer-input w-full h-2 bg-gray-300 rounded-lg appearance-none m-3"
                  id={`reparation-slider-2`}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Duties of Gratitude */}
        <div className="border border-gray-300 p-4 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">DUTIES OF GRATITUDE</h2>
          <div className="flex items-center space-x-4">
            <label className="text-sm text-gray-700 flex-1">
              Is anyone deserving of gratitude for their help or support?
            </label>
            <div className="flex-1">
              <div className="flex justify-between text-gray-700 text-xs mb-1">
                <span>Yes</span>
                <span>Partially</span>
                <span>No</span>
              </div>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={gratitudeSlider1}
                  onChange={(e) => handleSliderChange(e, `gratitude-slider-1`) }
                  className="answer-input w-full h-2 bg-gray-300 rounded-lg appearance-none m-3"
                  id={`gratitude-slider-1`}
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <label className="text-sm text-gray-700 flex-1">
              Will you express proportionally appropriate gratitude?
            </label>
            <div className="flex-1">
              <div className="flex justify-between text-gray-700 text-xs mb-1">
                <span>Yes</span>
                <span>Partially</span>
                <span>No</span>
              </div>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={gratitudeSlider2}
                  onChange={(e) => handleSliderChange(e, `gratitude-slider-2`) }
                  className="answer-input w-full h-2 bg-gray-300 rounded-lg appearance-none m-3"
                  id={`gratitude-slider-2`}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        {/*Professor Comment Box for SLIDERS */}
        {lockForm && feedback[`duties-sliders`] && (
          <div className="border border-gray-200 rounded-lg p-4 mt-4">
            <ProfessorCommentBox comment={feedback[`duties-sliders`]} />
          </div>
        )}
        

        {/* Critical Questions */}
        
     
          <>
            {/* {console.log("Numquestions before rendering is ", numQuestions)}
        
            {console.log("Critical Questions before rendering:", criticalQuestions)}
            {console.log("Questions initialized before rendering: ", questionsInitialized)} */}
            {criticalQuestions?.map((question, index) => (
              <div className="mt-4" key={index}>
                {!lockForm && (
                  <TextInput
                    key={question}
                    title={question}
                    setter={(value: string) => setTopic(index, value)}
                    value={topics[index]}
                    id={`topic-dva-` + index}
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
                        __html: topics[index]
                          ? topics[index].replace(
                              /<c>(.*?)<\/c>/g,
                              '<span class="text-red-500">$1</span>'
                            )
                          : '',
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          </>


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
