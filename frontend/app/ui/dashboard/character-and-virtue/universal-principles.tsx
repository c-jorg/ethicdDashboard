"use client";

import { useState, useEffect, useRef } from "react";
import { lusitana } from '@/app/ui/fonts';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Button } from '@/app/ui/button';
import DotsLoading from '@/app/ui/components/loading';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import TextInput from '@/app/ui/components/text-input';
import SliderInput from '@/app/ui/components/slider-input';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import { fetchSliderQuestions } from '@/app/utils/get-slider-questions';
import FeedbackDisplay from '@/app/ui/components/feedback-display';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from '@/app/ui/components/prof-comment-box';
import DescriptionCard from "@/app/ui/components/description-card";
import api from '../../../utils/api-auth'; //applies the auth headers 

export default function UniversalPrinciplesForm() {
    const formName = 'universal-principles';
    const formRef = useRef<HTMLFormElement>(null);
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [loading, setLoading] = useState(true);
    const assignmentID = Cookie.get('assignment_id');
    const prefix = assignmentID + "-";
    const maxWords = 200;
    const [removalTriggered, setRemovalTriggered] = useState(false);
    let submitted = false;
    const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
    const [isRendered, setIsRendered] = useState(false);
    const [doneLoadingQuestions, setDoneLoadingQuestions] = useState(false);
    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

    const [reverenceForLife, setReverenceForLife] = useState(5);
    const [interdependence, setInterdependence] = useState(5);
    const [societyResponsibility, setSocietyResponsibility] = useState(5);
    const [globalJustice, setGlobalJustice] = useState(5);
    const [environmentalStewardship, setEnvironmentalStewardship] = useState(5);
    const [reverenceForPlace, setReverenceForPlace] = useState(5);

    const [criticalQuestions, setCriticalQuestions] = useState([
        'Are Universal Principles helpful in this case of? Why or why not?',
        'What are some of the pitfalls of trying to define global ethics?'
    ]);

    const calculateCumulativeScore = () => {
        //The average of all sliders:  0–5 = Red, 6-8 = Grey, 9-10 = Green
        let total = 0;
        total += (10 - Number(reverenceForLife));
        total += (10 - Number(interdependence));
        total += (10 - Number(societyResponsibility));
        total += (10 - Number(globalJustice));
        total += (10 - Number(environmentalStewardship));
        total += (10 - Number(reverenceForPlace));
        return Math.floor(total / 6);
    }

    const clearLocalStorage = () => {
        localStorage.removeItem(`${prefix}slider-reverence-for-life`);
        localStorage.removeItem(`${prefix}slider-interdependence`);
        localStorage.removeItem(`${prefix}slider-society-responsibility`);
        localStorage.removeItem(`${prefix}slider-global-justice`);
        localStorage.removeItem(`${prefix}slider-environmental-stewardship`);
        localStorage.removeItem(`${prefix}slider-reverence-for-place`);
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
      
      const [topics, setTopics] = useState(['',''])
      const setTopic = (index: number, value: string) => {
        const newTopics = [...topics];
        newTopics[index] = value;
        setTopics(newTopics);
      };

    // Fetch form data
    useEffect(() => {
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
                //sliders
                setReverenceForLife(localStorage.getItem(`${prefix}slider-reverence-for-life`) !== null ? parseInt(localStorage.getItem(`${prefix}slider-reverence-for-life`) as string) : (content['slider-reverence-for-life-value'] !== undefined ? content['slider-reverence-for-life-value'] : 5));
                setInterdependence(localStorage.getItem(`${prefix}slider-interdependence`) !== null ? parseInt(localStorage.getItem(`${prefix}slider-interdependence`) as string) : (content['slider-interdependence-value'] !== undefined ? content['slider-interdependence-value'] : 5));
                setSocietyResponsibility(localStorage.getItem(`${prefix}slider-society-responsibility`) !== null ? parseInt(localStorage.getItem(`${prefix}slider-society-responsibility`) as string) : (content['slider-society-responsibility-value'] !== undefined ? content['slider-society-responsibility-value'] : 5));
                setGlobalJustice(localStorage.getItem(`${prefix}slider-global-justice`) !== null ? parseInt(localStorage.getItem(`${prefix}slider-global-justice`) as string) : (content['slider-global-justice-value'] !== undefined ? content['slider-global-justice-value'] : 5));
                setEnvironmentalStewardship(localStorage.getItem(`${prefix}slider-environmental-stewardship`) !== null ? parseInt(localStorage.getItem(`${prefix}slider-environmental-stewardship`) as string) : (content['slider-environmental-stewardship-value'] !== undefined ? content['slider-environmental-stewardship-value'] : 5));
                setReverenceForPlace(localStorage.getItem(`${prefix}slider-reverence-for-place`) !== null ? parseInt(localStorage.getItem(`${prefix}slider-reverence-for-place`) as string) : (content['slider-reverence-for-place-value'] !== undefined ? content['slider-reverence-for-place-value'] : 5));
                
                //text inputs
                criticalQuestions.forEach((_, index) => {
                    const topic = feedback[`topic-up-${index}`] || localStorage.getItem(`${prefix}topic-up-${index}`) || content[`topic-up-${index}`];
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

    const submitAssignmentForm = async (e:any) => {
        e.preventDefault()
        console.log("Entered the submit assignment handler")
        const studentID = localStorage.getItem('id');

        const caseStudyID = Cookie.get('case_study_id');
        const formName = e.currentTarget.getAttribute('data-form-name') || 'virtue-ethics'; // Dynamically get the form name or set a default
        console.log("form name is " + formName);

        const answers: { [key: string]: string } = {}; //an object to hold the answers as key-value pairs

        document.querySelectorAll('.answer-input').forEach(input => {
            const inputElement = input as HTMLInputElement;

            // Handle checkboxes and radio buttons
            if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
                answers[inputElement.id] = inputElement.checked ? inputElement.value : 'false';
            } else if (inputElement.type === 'range') {
                // Handle range inputs
                answers[`${inputElement.id}-value`] = inputElement.value;
                answers[`${inputElement.id}`] = (10 - Number(inputElement.value)).toString();
            } else {
                // Handle other input types (e.g., text inputs)
                answers[inputElement.id] = inputElement.value;
            }
        });
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
                localStorage.setItem(`${prefix}universal-principles-submitted`, "true");
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
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Header */}
            <div className="w-full max-w-5xl bg-blue-700 text-white text-center py-4 rounded-lg shadow-md">
                <h1 className="text-2xl md:text-3xl font-bold">Universal Principles</h1>
            </div>

            {/* Introduction */}
            <div className="mt-4">
                <DescriptionCard 
                    formName={formName} 
                    assignmentID={assignmentID}
                    defaultDescription="Many professionals are governed by a code of ethics that is over and above that the law requires or 
                                        allows.  The principles of ethical codes capture the aspirational goals of the profession.  
                                        The idea of universal, or global ethics, is the attempt to come up with set of principles that 
                                        work as aspirational goals for all people everywhere.  Think about each of these principles 
                                        and whether, or not, they guided your choice in this case. "
                />
            </div>

            {/* Form */}
            <form onSubmit={submitAssignmentForm} ref={formRef} data-form-name={formName} className="w-full max-w-5xl mt-6 bg-white p-6 rounded-lg shadow-md space-y-6">
               
                <FormCompletedCard isVisible={lockForm} />

                {/* Slider Inputs */}
                <div className="space-y-6">
                    <SliderInput
                        slider={[
                            {
                                label: "Reverence for life (in all its forms)",
                                min: 0,
                                max: 10,
                                scale: ['Lack of Reverence', 'Reverence for Life'],
                                value: reverenceForLife,
                                onChange: (e: any) => {
                                    const value = parseInt(e.target.value);
                                    setReverenceForLife(value);
                                    localStorage.setItem(`${prefix}slider-reverence-for-life`, value.toString());
                                },
                                id: 'slider-reverence-for-life',
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-5',
                            },
                        ]}
                    />
                    <SliderInput
                        slider={[
                            {
                                label: "Interdependence & responsibility for the 'whole'",
                                min: 0,
                                max: 10,
                                scale: ['Isolation', 'Interdependence'],
                                value: interdependence,
                                onChange: (e: any) => {
                                    const value = parseInt(e.target.value);
                                    setInterdependence(value);
                                    localStorage.setItem(`${prefix}slider-interdependence`, value.toString());
                                },
                                id: 'slider-interdependence',
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-5',
                            },
                        ]}
                    />
                    <SliderInput
                        slider={[
                            {
                                label: "Society before self / social responsibility",
                                min: 0,
                                max: 10,
                                scale: ['Selfish', 'Society Responsible'],
                                value: societyResponsibility,
                                onChange: (e: any) => {
                                    const value = parseInt(e.target.value);
                                    setSocietyResponsibility(value);
                                    localStorage.setItem(`${prefix}slider-society-responsibility`, value.toString());
                                },
                                id: 'slider-society-responsibility',
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-5',
                            },
                        ]}
                    />
                    <SliderInput
                        slider={[
                            {
                                label: "Global justice (as reflected by international laws)",
                                min: 0,
                                max: 10,
                                scale: ['Injustice', 'Global Justice'],
                                value: globalJustice,
                                onChange: (e: any) => {
                                    const value = parseInt(e.target.value);
                                    setGlobalJustice(value);
                                    localStorage.setItem(`${prefix}slider-global-justice`, value.toString());
                                },
                                id: 'slider-global-justice',
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-5',
                            },
                        ]}
                    />
                    <SliderInput
                        slider={[
                            {
                                label: "Environmental stewardship",
                                min: 0,
                                max: 10,
                                scale: ['Neglect', 'Stewardship'],
                                value: environmentalStewardship,
                                onChange: (e: any) => {
                                    const value = parseInt(e.target.value);
                                    setEnvironmentalStewardship(value);
                                    localStorage.setItem(`${prefix}slider-environmental-stewardship`, value.toString());
                                },
                                id: 'slider-environmental-stewardship',
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-5',
                            },
                        ]}
                    />
                    <SliderInput
                        slider={[
                            {
                                label: "Reverence for place",
                                min: 0,
                                max: 10,
                                scale: ['Disrespect', 'Reverence'],
                                value: reverenceForPlace,
                                onChange: (e: any) => {
                                    const value = parseInt(e.target.value);
                                    setReverenceForPlace(value);
                                    localStorage.setItem(`${prefix}slider-reverence-for-place`, value.toString());
                                },
                                id: 'slider-reverence-for-place',
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-5',
                            },
                        ]}
                    />
                </div>
                {/*Professor Comment Box for sliders */}
                {lockForm && feedback[`up-sliders`] && (
                    <div className="border border-gray-200 rounded-lg p-4 mt-4">
                        <ProfessorCommentBox comment={feedback[`up-sliders`]} />
                    </div>
                )}

                {/* Text Inputs */}
                {criticalQuestions?.map((question,index)=>(
                    <div className="mt-4" key={index}>
                    {!lockForm && (
                        <TextInput 
                            key={index}
                            title={question}
                            setter={(value: string) => setTopic(index, value)}
                            value={topics[index]} 
                            id={`topic-up-`+index} 
                            assignmentId={assignmentID?.toString() || ''}
                            required={true}
                        />
                    )}
                    {lockForm && (
                        <FeedbackDisplay question={question} index={index} topics={topics} />
                    )}
                    </div>
                ))}

                {/* Save Button */}
                <div className="mt-6 w-full max-w-screen-2xl flex justify-center gap-4">
                    <Button type="submit" data-html2canvas-ignore className="final-button bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition" onClick={submitAssignmentForm} data-form-name={formName}>
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
        </main>
    );
}
