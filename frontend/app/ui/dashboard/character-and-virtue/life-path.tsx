'use client';

import { useState, useEffect, useRef } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import SliderInput from '@/app/ui/components/slider-input';
import TextInput from '@/app/ui/components/text-input';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import Cookie from 'js-cookie';
import axios from 'axios';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import { fetchSliderQuestions } from '@/app/utils/get-slider-questions';
import FeedbackDisplay from '@/app/ui/components/feedback-display';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from '@/app/ui/components/prof-comment-box';
import DescriptionCard from '@/app/ui/components/description-card';
import api from '../../../utils/api-auth'; //applies the auth headers 

export default function LifePathForm() {
    const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
    const [isRendered, setIsRendered] = useState(false);
    const [doneLoadingQuestions, setDoneLoadingQuestions] = useState(false);
    const formName = 'life-path';
    const formRef = useRef<HTMLFormElement>(null);
    let submitted = false;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [loading, setLoading] = useState(true);
    const assignmentID = Cookie.get('assignment_id');
    const prefix = assignmentID + "-";
    const maxWords = 200;
    const [removalTriggered, setRemovalTriggered] = useState(false);
    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});


    //state for text boxes
    const [topics, setTopics] = useState(['',''])

    // State for sliders
    const [sliders, setSliders] = useState([
      5,
      5,
      5,
    ]);

    //state for slider scales
    const [scalesLabels, setScalesLabels] = useState([
      ['Ignorance', 'Wisdom'],
      ['Hatred', 'Kindness'],
      ['Greed', 'Generosity'],
    ]);

    const [sliderQuestions, setSliderQuestions] = useState([
      'Does it expose a lack of effort and ignorance, or does it reflect your pursuit of wisdom?',
      'Is it promoting divisions or ill-will toward others, or is it cultivating love and kindness?',
      'Are you looking out for your own interests or are you putting the needs of others first?',
    ]);

    const [criticalQuestions, setCriticalQuestions] = useState([
      'Based on your inputs, do you feel you are on the right or wrong life path?',
      'Is it possible to always pursue wisdom, loving kindness, and generosity in competitive environments?'
    ]);


    // Function to get a scale value
    const getSliderScale = (sliderIndex: number, scaleIndex: number) => {
      return scalesLabels[sliderIndex][scaleIndex];
    };


  // Handle text input changes
  const handleTextChange = (setter: React.Dispatch<React.SetStateAction<string>>, text: string) => {
    if (countWords(text) <= maxWords) {
      setter(text);
    }
  };

  const handleSliderChange = (value: number, index: number) => {
    setSliders({ ...sliders, [index]: value });
    localStorage.setItem(`${prefix}slider-value-${index}`, value.toString());
  };

  const countWords = (text: string): number => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const calculateCumulativeScore = () => {
    //The average of responses:  0–3 = Red, 4-6 = Grey, 7-10 = Green
    let total = 0;
    for(let i = 0; i < sliders.length; i++) {
        total += sliders[i];
    }
    return Math.floor(total / sliders.length);
  }

  const clearLocalStorage = () => {
    for(let i = 0; i < sliders.length; i++){
        localStorage.removeItem(`${prefix}slider-value-${i}`);
    }
    for(let i = 1; i < sliderQuestions.length; i++){
        localStorage.removeItem(`${prefix}response-${i}-lp`);
    }
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
          //console.log(formElements); // Log the selected elements
          
          formElements.forEach((element) => {
            (element as HTMLInputElement).disabled = true;
          });
          //console.log("disabled inputs");
        }
        // Now check for any feedback - if there is any then overwrite the answer with the feedback
        const assignmentId = Cookie.get('assignment_id');
        if(lockForm){
            //fetchFeedback(formName, parseInt(assignmentId || ''), setTopics);
            useFetchFeedback({ formName, assignmentId: assignmentId || '', setFeedback });
        }
      }, 0); // Delay to allow DOM to render
    })();
  }, [lockForm, isRendered, doneLoadingQuestions, sliderQuestions]);

  
  /**
   * Fetches the dynamic/critical questions from the backend and updates the state with the new questions.
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

  /**
  * Fetches the slider questions and labels from the backend and updates the state with the new questions.
  */
  const getSliderQuestions = async () => {
    const caseStudyId = Cookie.get('case_study_id') || '';

    // Call fetchSliderQuestions and directly update sliderQuestions and scaleLabels
    const { updatedQuestions, updatedLabels } = await fetchSliderQuestions({
        formName: formName,
        caseStudyId: caseStudyId,
        sliderQuestions,
        sliderLabels: scalesLabels
    });

    setSliderQuestions(updatedQuestions);
    setScalesLabels(updatedLabels);
  };

  /**
   * Fetches the dynamic/critical questions from the backend and updates the state with the new questions.
   */
  useEffect(() => {
      const initializeForm = async () => {
          await getQuestions();
          await getSliderQuestions();
          setDoneLoadingQuestions(true); // Set to true after loading questions
          console.log("DONE LOADING QUESTIONS");
      };
      initializeForm();
  }, []);
  
  
  const setTopic = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  /**
   * Fetches the form data from the server and populates the form with the saved data.
   */
  const fetchData = async () => {
    try {
        const userId = localStorage.getItem('id');
        const assignmentId = Cookie.get('assignment_id');

        let data;
        try {
            const response = await api.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=${formName}`);
            data = response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.log("No saved data found for this form");
            } else {
                console.log("Error fetching form data: ", error);
            }
        }

        let content;
        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
            content = data[0].answers[0].content;
        } else {
            content = [];
        }

        //populate the form
        let sliderValues = [];

        for(let i = 0; i < scalesLabels.length; i++) {
            if(localStorage.getItem(`${prefix}slider-value-${i}`) != null) {
                let value = parseInt(localStorage.getItem(`${prefix}slider-value-${i}`) as string);
                sliderValues.push(value);
            }else{
                let value;
                if(content[`slider-value-${i}`] != null){
                  value = parseInt(content[`slider-value-${i}`]);
                }else{
                  value = 5;
                }
                sliderValues.push(value);
            }
        }

        setSliders(sliderValues);

        criticalQuestions.forEach((_, index) => {
          const topic = feedback[`topic-lp-${index}`] || localStorage.getItem(`${prefix}topic-lp-${index}`) || content[`topic-lp-${index}`];
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

  // Fetch form data and questions on component mount
  useEffect(() => {
    fetchData();
  }, [criticalQuestions, feedback, sliderQuestions]);

  const submitAssignmentForm = async (e: any) => {
    e.preventDefault()
    console.log("Entered the submit assignment handler")
    const studentID = localStorage.getItem('id');

    const caseStudyID = Cookie.get('case_study_id');
    const formName = e.currentTarget.getAttribute('data-form-name') || 'life-path'; // Dynamically get the form name or set a default
    console.log("form name is " + formName);

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

    // Add slider scales to the answers object
    for(let i = 0; i < scalesLabels.length; i++) {
        answers[`slider-scale-${i}`] = scalesLabels[i].join(',');
    }
    console.log(answers)

    answers[`num-sliders-lp`] = scalesLabels.length.toString();
    answers[`cumulative-score`] = calculateCumulativeScore().toString();

    //for the assignment table
    const data = {
        student_id: studentID,
        assignment_id: assignmentID,
        case_study_id: caseStudyID,
        form_name: formName,
        answers: answers
    };

    console.log(data.toString())

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
          localStorage.setItem(`${prefix}life-path-submitted`, "true");
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


  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
  }


  /* 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    =================================
    HERE BEGINS THE HTML FOR THE FORM
    =================================
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  */

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4" >
      {/* Header */}
      <div className="w-full max-w-5xl bg-blue-700 text-white text-center py-4 mb-4 rounded-lg shadow-md">
          <h1 className="text-2xl md:text-3xl font-bold">Life Path Analysis</h1>
      </div>

      {/* Introduction */}
      <div className="mb-4">
        <DescriptionCard
          formName={formName}
          assignmentID={assignmentID}
          defaultDescription="The ethics of some Buddhist traditions put an emphasis on cultivation virtuous ways of thinking and 
                              behaving that minimize suffering in the world.  These ideas can be a helpful way to assess the impact 
                              of our decisions and action on not only other people and society but also our own life path.  
                              Is your decision in this case keeping you on the right path, or leading you astray?"
        />
      </div>

      <form className="w-full max-w-5xl space-y-6 bg-white rounded-lg shadow-md p-6" ref={formRef} data-form-name={formName} onSubmit={submitAssignmentForm}>


        <FormCompletedCard isVisible={lockForm} />

        {/* Fieldset for sliders */}
        <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
          <legend className="font-semibold">Think about your choice in this case:</legend>

          {sliderQuestions.map((question, index) => {
            const sliderKey = Object.keys(sliders)[index] as keyof typeof sliders;
            return (
              <SliderInput
          key={index}
          slider={[
            {
              label: question,
              min: 0,
              max: 10,
              scale: scalesLabels[index],
              value: sliders[sliderKey],
              onChange: (e: any) => handleSliderChange(parseInt(e.target.value), index),
              id: `slider-value-${index}`,
              className: 'h-2 bg-gray-300 rounded-lg appearance-none m-5',
            },
          ]}
              />
            );
          })}

          {/*Professor Comment Box for sliders */}
          {lockForm && feedback[`life-path-sliders`] && (
            <div className="border border-gray-200 rounded-lg p-4 mt-4">
                <ProfessorCommentBox comment={feedback[`life-path-sliders`]} />
            </div>
          )}
        </fieldset>


        {/* Textarea responses */}
        <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
          <legend className="font-semibold">Your Reflections</legend>
          {criticalQuestions?.map((question,index)=>(
            <div className="mt-4" key={index}>
              {!lockForm && (
                <TextInput 
                  key={index}
                  title={question}
                  setter={(value: string) => setTopic(index, value)}
                  value={topics[index]} 
                  id={`topic-lp-`+index} 
                  assignmentId={assignmentID?.toString() || ''}
                  required={true}
                />
              )}
              {lockForm && (
                <FeedbackDisplay question={question} index={index} topics={topics} />
              )}
            </div>
          ))}
        </fieldset>

        {/* Submit button */}
        <div className="flex justify-center mt-6 gap-4">
          <Button type="submit" onClick={submitAssignmentForm} data-html2canvas-ignore className="final-button bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition">
            Save
          </Button>
          {localStorage.getItem("guest") == "false" && (
            <SubmitButtonWithConfirmation formRef={formRef} buttonText="Submit" onClick={(e) => { 
                e.preventDefault();
                submitted = true; 
                console.log("submitted is now " + submitted);
            }}/>
          )}
        </div>

        {/*Professor Comment Box for WHOLE FORM */}
        {lockForm && feedback[`${formName}`] && (
          <div className="border border-gray-200 rounded-lg p-4 mt-4">
              <ProfessorCommentBox comment={feedback[`${formName}`]} />
          </div>
        )}
      </form>
    </div>
  );
}
