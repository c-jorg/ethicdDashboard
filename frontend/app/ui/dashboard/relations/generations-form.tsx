'use client';

import { useState, useEffect, useRef } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import SliderInput from '@/app/ui/components/slider-input';
import TextInput from '@/app/ui/components/text-input';
import axios from 'axios';
import Cookie from 'js-cookie';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import { fetchSliderQuestions } from '@/app/utils/get-slider-questions';
import FeedbackDisplay from '@/app/ui/components/feedback-display';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from '@/app/ui/components/prof-comment-box';

export default function GenerationsForm() {
    const maxWords = 200;
    const formRef = useRef<HTMLFormElement>(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const formName = 'generations-form';
    const [loading, setLoading] = useState(true);
    const assignmentID = Cookie.get('assignment_id'); 
    const prefix = assignmentID + "-";
    let submitted = false;
    const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
    const [isRendered, setIsRendered] = useState(false);
    const [doneLoadingQuestions, setDoneLoadingQuestions] = useState(false); //set to true when the questions have been loaded
    let formData: any;

    const [topics, setTopics] = useState(['', '', '']);
    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

    const setTopic = (index: number, value: string) => {
        const newTopics = [...topics];
        newTopics[index] = value;
        setTopics(newTopics);
    };

    // State for sliders
    const [scales, setScales] = useState([
        5,
        5,
        5,
    ]);

    //state for slider scales
    const [scalesLabels, setScalesLabels] = useState([
        ['Humans', 'Natural World'],
        ['Exploiting the Past', 'Paying it Forward'],
        ['Present', 'Future'],
    ]);

    const [sliderQuestions, setSliderQuestions] = useState([
        'Is your decision prioritizing humans over the natural world or are the impacts balanced?',
        'Is it taking advantage of an inheritance or is it striking a balance with a view to pay it forward?',
        'Is it focused on the needs of the present or future generations or are they balanced?',
    ]);

    const [criticalQuestions, setCriticalQuestions] = useState([
        'How is a seven generations perspective different from the analysis of consequences for stakeholders?',
        'Is it possible to balance the demands of humans versus the natural world?  Is it necessary?',
        'Do you know what future humans will need?  Does that hamper your ability to take future generations into account?',
    ]);


    const handleScaleChange = (index: number, value: number) => {
        const newScales = [...scales];
        newScales[index] = value;
        setScales(newScales);
        localStorage.setItem(`${prefix}slider-${index}`, value.toString());
    };

    const countWords = (text: string): number => {
        return text.trim() ? text.trim().split(/\s+/).length : 0;
    };

    const calculateCumulativeScore = () => {
        //The average of responses:  0–3 = Red, 4-6 = Grey, 7-10 = Green
        let total = 0;
        scales.forEach((scale) => {
            total += Number(scale);
        });
        return Math.round(total / scales.length);
    }

    const clearLocalStorage = () => {
        sliderQuestions.forEach((_, index) => {
            localStorage.removeItem(`${prefix}slider-${index}`);
        });
        criticalQuestions.forEach((_, index) => {
            localStorage.removeItem(`${prefix}topic-sg-${index}`);
        });
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
            console.log("This form has not been submitted");
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
                if (isRendered && lockForm && doneLoadingQuestions) {
                    //console.log("This form has been submitted");
                    
                    const formElements = document.querySelectorAll('.answer-input, .final-button');
                    //console.log(formElements); // Log the selected elements
                    
                    
                    formElements.forEach((element) => {
                        (element as HTMLInputElement).disabled = true;
                    });
                    console.log("LOCK FORM: disabled inputs");

                    // Now check for any feedback - if there is any then overwrite the answer with the feedback
                    if(lockForm){
                        //fetchFeedback(formName, parseInt(assignmentID || ''), setTopics);
                        useFetchFeedback({ formName, assignmentId: assignmentID || '', setFeedback });
                    }
                }
            }, 0); // Delay to allow DOM to render
        })();

    }, [lockForm, isRendered, doneLoadingQuestions, sliderQuestions]);

    /**
     * Get data from the back end and populate the form with it
     * First check if data in local storage, if not then use database data, if no database data use default data
     */
    const fetchData = async () => {
        try {
            const userId = localStorage.getItem('id');
            const assignmentId = Cookie.get('assignment_id');
            const caseStudyId = Cookie.get('case_study_id') || '';

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
  
          
            let content;
            if(data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content){
                content = data[0].answers[0].content;
                formData = content;
            }else{
                content = [];
            }
            console.log("content for seven generations is", content);

            const newScales = sliderQuestions.map((_, index) => {
                const localStorageValue = localStorage.getItem(`${prefix}slider-${index}`);
                if(localStorageValue){
                    return Number(localStorageValue);
                }else{
                    if(content[`slider-${index}`]){
                        return content[`slider-${index}`];  
                    }else{
                        return 5;
                    }
                }
            });
            setScales(newScales);
            //console.log(newScales);
            //console.log(scales);

            //console.log("FETCH DATA: critical questions length is ", criticalQuestions.length);
            criticalQuestions.forEach((_, index) => {
                //console.log(`FETCH DATA: ${index} critical questions length is `, criticalQuestions.length);
                const topic = feedback[`topic-sg-${index}`] || localStorage.getItem(`${prefix}topic-sg-${index}`) || content[`topic-sg-${index}`];
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
        //console.log("updated critical questions is now ", updatedCriticalQs);
        //console.log("critical question is now ", criticalQuestions);
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

    /**
     * Fetches the saved form data from localstorage/the backend and updates the state variables
     * This runs when the criticalQuestions state changes, ensuring it has been populated before going forward
     */
    useEffect(() => {
        fetchData();
    }, [criticalQuestions, feedback, sliderQuestions]);
    
    if (loading) {
        return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
    }

    //this successfully sends the data to the backend
    const submitAssignmentForm = async (e:any) => {
        e.preventDefault()
        console.log("Entered the submit assignment handler")
        const studentID = localStorage.getItem('id'); 
        
        const caseStudyID = Cookie.get('case_study_id');
        const formName = e.currentTarget.getAttribute('data-form-name') || 'generations-form'; // Dynamically get the form name or set a default
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
        answers['num-sliders'] = sliderQuestions.length.toString();
        answers['cumulative-score'] = calculateCumulativeScore().toString();
        console.log(answers)

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
                localStorage.setItem(`${prefix}generations-form-submitted`, "true");
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
        <div className="flex flex-col items-center">
            <form className="w-full max-w-5xl space-y-6 bg-white rounded-lg shadow-md p-6" ref={formRef} data-form-name={formName} onSubmit={submitAssignmentForm}>
                
                <FormCompletedCard isVisible={lockForm} />
                
                {/* Fieldset for stakeholders */}
                <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
                    <legend className="font-semibold">Stakeholders</legend>
                    {/* Slider inputs for considerations */}
                    {scales.map((scale, index) => (
                        <SliderInput
                            key={index}
                            
                            slider={[{
                                label: sliderQuestions[index],
                                min: 0,
                                max: 10,
                                scale: scalesLabels[index],
                                value: scale,
                                disabled: lockForm,
                                onChange: (e: any) => handleScaleChange(index, parseInt(e.target.value)),
                                id: `slider-${index}`,
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-3',
                            }]}
                        />
                    ))}
                    {/*Professor Comment Box for stakeholders */}
                    {lockForm && feedback[`generations-stakeholders`] && (
                        <div className="border border-gray-200 rounded-lg p-4 mt-4">
                            <ProfessorCommentBox comment={feedback[`generations-stakeholders`]} />
                        </div>
                    )}
                </fieldset>


                {/* Fieldset for results */}
                <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
                    <legend className="font-semibold">Results</legend>
                    <div>
                        {criticalQuestions.map((question, index) => (
                            <div className="mt-4" key={index}>
                                {!lockForm && (
                                    <TextInput
                                        key={index}
                                        title={question}
                                        maxWords={maxWords}
                                        setter={(value: string) => setTopic(index, value)}
                                        value={topics[index]}
                                        className="answer-input"
                                        id={`topic-sg-${index}`}
                                        assignmentId={assignmentID?.toString() || ''}
                                        required={true}
                                    />
                                )}
                                {lockForm && (
                                    <FeedbackDisplay question={question} index={index} topics={topics} />
                                )}
                            </div>
                        ))}
                    </div>
                </fieldset>

            <div className="flex justify-center mt-6 gap-4">
                <Button type="submit" data-html2canvas-ignore className="final-button bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition" onClick={submitAssignmentForm} data-form-name={formName}>
                    Save
                </Button>
                <SubmitButtonWithConfirmation formRef={formRef} buttonText="Submit" onClick={(e) => { 
                    e.preventDefault();
                    submitted = true; 
                    console.log("submitted is now " + submitted);
                }}/>
            </div>

            {/*Professor Comment Box for key WHOLE FORM */}
            {lockForm && feedback[`${formName}`] && (
                <div className="border border-gray-200 rounded-lg p-4 mt-4">
                    <ProfessorCommentBox comment={feedback[`${formName}`]} />
                </div>
            )}

        </form>
        </div>
    );
};