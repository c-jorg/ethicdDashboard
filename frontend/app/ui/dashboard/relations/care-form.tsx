'use client';

import { useState, useEffect, useRef } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import SliderInput from '@/app/ui/components/slider-input';
import TextInput from '@/app/ui/components/text-input';
import axios from 'axios';
import Cookie from 'js-cookie';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import FeedbackDisplay from '@/app/ui/components/feedback-display';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from '@/app/ui/components/prof-comment-box';

export default function CareForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const formName = 'care-form';
    const [loading, setLoading] = useState(true);
    const assignmentID = Cookie.get('assignment_id'); 
    const prefix = assignmentID + "-";
    let submitted = false;
    const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
    const [isRendered, setIsRendered] = useState(false);
    
    const [removalTriggered, setRemovalTriggered] = useState(false);

    const maxStakeholders = 12;
    const minStakeholders = 7;
    const maxWords = 200;

    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
    const [topics, setTopics] = useState(['',''])

    const [criticalQuestions, setCriticalQuestions] = useState([
        'What was your lowest score? Why do you think that score was lower relative to the other features of care analysis?',
        'Is care an important type of analysis for this case? Why or why not?'
      ]);

    const [scores, setScores] = useState<{attentiveness: number; competence: number; responsiveness: number}>(
        {attentiveness:50, competence:50, responsiveness:50}
    );

    const [stakeholders, setStakeholders] = useState<{ name: string; direct: boolean; indirect: boolean; notApplicable: boolean; attentiveness: number; competence: number; responsiveness: number }[]>(
        Array(minStakeholders).fill({ name: '', direct: false, indirect: false, notApplicable: false, attentiveness: 5  , competence: 5, responsiveness: 5 }) // Default values
    );

    // Function to add a new stakeholder card
    const addStakeholder = () => {
        if (stakeholders.length < maxStakeholders) {
            const newStakeholders = [...stakeholders, { name: '', direct:false, indirect:false, notApplicable: false, attentiveness: 5, competence: 5, responsiveness: 5 }];
            setStakeholders(newStakeholders);
            const index = newStakeholders.length - 1;
            localStorage.setItem(`${prefix}stakeholder-name-${index}`, '');
            localStorage.setItem(`${prefix}stakeholder-directly-${index}`, 'false');
            localStorage.setItem(`${prefix}stakeholder-indirectly-${index}`, 'false');
            localStorage.setItem(`${prefix}stakeholder-notApplicable-${index}`, 'false');
            localStorage.setItem(`${prefix}attentiveness-${index}`, '5');
            localStorage.setItem(`${prefix}competence-${index}`, '5');
            localStorage.setItem(`${prefix}responsiveness-${index}`, '5');
            localStorage.setItem(`${prefix}num_stakeholders`, String(newStakeholders.length)); //update for all forms
        }
    };

    // Function to remove a stakeholder
    const removeStakeholder = (indexToRemove: number) => {
        if (stakeholders.length > minStakeholders) {
            const updatedStakeholders = stakeholders.filter((_, index) => index !== indexToRemove);
            setStakeholders(updatedStakeholders); //triggers re-render
            setRemovalTriggered(true);
        }
    };

    useEffect(() => {
    if(removalTriggered){
        setRemovalTriggered(false);
        console.log("removal triggered");
        removeStakeholderFromLocalStorage();
    }
    }, [removalTriggered, stakeholders]);

    //remove the stakeholder from local storage
    const removeStakeholderFromLocalStorage = () => {
        console.log("rewriting whole list of stakeholders to local storage");

        console.log("Have now removed that stakeholder from the array, the new array is: " + JSON.stringify(stakeholders, null, 2));
        //rewrite whole list of stakeholders to local storage
        let i = 0;
        for(i; i < stakeholders.length; i++){
            console.log("rewriting LS at index " + i + " where stakeholder name is " + stakeholders[i].name);
            localStorage.setItem(`${prefix}stakeholder-name-${i}`, stakeholders[i].name);
            localStorage.setItem(`${prefix}stakeholder-directly-${i}`, String(stakeholders[i].direct));
            localStorage.setItem(`${prefix}stakeholder-indirectly-${i}`, String(stakeholders[i].indirect));
            localStorage.setItem(`${prefix}stakeholder-notApplicable-${i}`, String(stakeholders[i].notApplicable));
            localStorage.setItem(`${prefix}attentiveness-${i}`, String(stakeholders[i].attentiveness));
            localStorage.setItem(`${prefix}competence-${i}`, String(stakeholders[i].competence));
            localStorage.setItem(`${prefix}responsiveness-${i}`, String(stakeholders[i].responsiveness));
        }

        //remove last one
        console.log("removing from LS at index " + (stakeholders.length));
        localStorage.removeItem(`${prefix}stakeholder-name-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}stakeholder-directly-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}stakeholder-indirectly-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}stakeholder-notApplicable-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}attentiveness-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}competence-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}responsiveness-${stakeholders.length}`);

        localStorage.setItem(`${prefix}num_stakeholders`, String(stakeholders.length));
        console.log("====END OF REMOVING")
    };

    // Function to handle slider and impact changes
    const handleStakeholderChange = (index: number, field: 'name' | 'indirect' | 'direct' | 'notApplicable' | 'attentiveness' | 'competence' | 'responsiveness', value: any) => {
        setStakeholders(stakeholders.map((stakeholder, i) => 
            i === index ? { ...stakeholder, [field]: value } : stakeholder
        ));
        if(field != 'name' && field != 'direct' && field != 'indirect' && field != 'notApplicable'){
            //attentiveness, competence, responsiveness
            localStorage.setItem(`${prefix}${field}-${index}`, value);
        }else if(field == 'direct' || field == 'indirect' || field == 'notApplicable'){
            //direct and indirect
            localStorage.setItem(`${prefix}stakeholder-${field}ly-${index}`, value);
            //localStorage.setItem(`${prefix}stakeholder-${field}ly-${index}-ce`, value);
        }else{
            //name
            localStorage.setItem(`${prefix}stakeholder-${field}-${index}`, value);
            //localStorage.setItem(`${prefix}stakeholder-${field}-${index}-ce`, value);
        }
        calcAverageStakeholderCare();
    };

 

    // Function to calculate average care values
    const calcAverageStakeholderCare = () => {
        const applicableStakeholders = stakeholders.filter(s => !s.notApplicable)
        const length = applicableStakeholders.length || 1;
        console.log(`stakeholders length ${stakeholders.length
            
        }`)
        let att: number = 0;
        let com: number = 0;
        let res: number = 0;
        applicableStakeholders.forEach((stakeholder,index) => {
            att+=stakeholder.attentiveness;
            com+=stakeholder.competence;
            res+=stakeholder.responsiveness;
            
        });
        //console.log("Attentiveness Sum:", att);
        //console.log("Competence Sum:", com);
        //console.log("Responsiveness Sum:", res);
        setScores({attentiveness: Math.round((att*10)/length), competence: Math.round((com*10)/length), responsiveness: Math.round((res*10)/length)});
    };

    const calculateCumulativeScore = () => {
        //The average of attentiveness, competence and responsiveness for all stakeholders ignoring not applicable ones
        const applicableStakeholders = stakeholders.filter(s => !s.notApplicable);
        const length = applicableStakeholders.length || 1;
        let total = 0;
        applicableStakeholders.forEach((stakeholder) => {
            if(!stakeholder.notApplicable){
                total += stakeholder.attentiveness + stakeholder.competence + stakeholder.responsiveness;
            }
        });
        return Math.round(total / (3 * length));
    }

    const clearLocalStorage = () => {
        for (let i = 0; i < stakeholders.length + 1; i++) {
            localStorage.removeItem(`${prefix}attentiveness-${i}`);
            localStorage.removeItem(`${prefix}competence-${i}`);
            localStorage.removeItem(`${prefix}responsiveness-${i}`);
        }
        localStorage.removeItem(`${prefix}results-1-ce`);
        localStorage.removeItem(`${prefix}results-2-ce`);

    };

    useEffect(() => {
        //need to make sure this finishes before any math is done with the numbers in the scores array
        calcAverageStakeholderCare();
    }, [stakeholders]);


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

    const populateSavedData = async (userId: string, assignmentId: string) => {

        let data;
        try{
            const thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=${formName}`);
    
            data = thisFormData.data.data;

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
        console.log("content is:", content);

        // Extract num_stakeholders from content and populate stakeholder data
        const numStakeholders = parseInt(localStorage.getItem(`${prefix}num_stakeholders`) || content["num_stakeholders"]) || 7;
        console.log("num stakeholders in care form: " + numStakeholders);
        console.log("content says num stakeholders is: " + content["num_stakeholders"]);
        console.log("local storage says num stakeholders is: " + localStorage.getItem(`${prefix}num_stakeholders`));
        const stakeholdersData = [];
    
        // Iterate over the stakeholders
        for (let i = 0; i < numStakeholders; i++) {
            const nameKey = `stakeholder-name-${i}`;
            const impactDirectKey = `stakeholder-directly-${i}`;
            const impactIndirectKey = `stakeholder-indirectly-${i}`;
            const notApplicableKey = `stakeholder-notApplicable-${i}`;

            const attentivenessKey = `attentiveness-${i}`;
            const competenceKey = `competence-${i}`;
            const responsivenessKey = `responsiveness-${i}`;
            
            const name = feedback[nameKey] || localStorage.getItem(`${prefix}${nameKey}`) || content[nameKey] || "";   
            console.log("feed back is ", feedback);

            let directImpact;
            if(localStorage.getItem(`${prefix}${impactDirectKey}`) !== null){
                directImpact = String(localStorage.getItem(`${prefix}${impactDirectKey}`)) === 'true';
            }else if(content && content[impactDirectKey] !== undefined){
                //only if there is data saved can we use this logic
                directImpact = content[impactDirectKey] === 'true';      
            }else{
                //if there is no data saved then it is always false
                directImpact = false;
            }

            let indirectImpact;
            if(localStorage.getItem(`${prefix}${impactIndirectKey}`) !== null){
               indirectImpact = String(localStorage.getItem(`${prefix}${impactIndirectKey}`)) === 'true';
            }else if(content && content[impactIndirectKey] !== undefined){
                //only if there is data saved can we use this logic
                indirectImpact = content[impactIndirectKey] === 'true';      
            }else{
                //if there is no data saved then it is always false
                indirectImpact = false;
            }

            let noImpact;
            if(localStorage.getItem(`${prefix}${notApplicableKey}`) !== null){
                noImpact = String(localStorage.getItem(`${prefix}${notApplicableKey}`)) === 'true';
            }else if(content && content[notApplicableKey] !== undefined){
                //only if there is data saved can we use this logic
                noImpact = content[notApplicableKey] === 'true';      
            }else{
                //if there is no data saved then it is always false
                noImpact = false;
            }

            let attentiveness1;
            if(localStorage.getItem(`${prefix}${attentivenessKey}`) !== null){
                attentiveness1 = parseInt(localStorage.getItem(`${prefix}${attentivenessKey}`) || '-1');
                if(attentiveness1 == -1) attentiveness1 = 0;
            }else{
                attentiveness1  = parseInt(content[attentivenessKey]) || 5;
            }

            let competence1;
            if(localStorage.getItem(`${prefix}${competenceKey}`) !== null){
                competence1 = parseInt(localStorage.getItem(`${prefix}${competenceKey}`) || '-1');
                if(competence1 == -1) competence1 = 0;
            }else{
                competence1 = parseInt(content[competenceKey]) || 5;
            }
        
            let responsiveness1;
            if(localStorage.getItem(`${prefix}${responsivenessKey}`) !== null){
                responsiveness1 = parseInt(localStorage.getItem(`${prefix}${responsivenessKey}`) || '-1');
                if(responsiveness1 == -1) responsiveness1 = 0;
            }else{
                responsiveness1 = parseInt(content[responsivenessKey]) || 5;
            }

            stakeholdersData.push({
            name: name,
            direct: directImpact,
            indirect: indirectImpact,
            notApplicable: noImpact,
            attentiveness: attentiveness1,
                competence: competence1,
                responsiveness: responsiveness1,
            });
        }
        setStakeholders(stakeholdersData);
        calcAverageStakeholderCare();
        //console.log("stakeholders data in the useEffect: " + JSON.stringify(stakeholdersData, null, 2));
        
        criticalQuestions.forEach((_, index) => {
            const topic = feedback[`topic-cf-${index}`] || localStorage.getItem(`${prefix}topic-cf-${index}`) || content[`topic-cf-${index}`];
            setTopics(prevTopics => {
              const newTopics = [...prevTopics];
              newTopics[index] = topic || '';
              return newTopics;
            });
          });
         
      }

     


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
        console.log("use effect is running");
        const fetchData = async () => {
          try {
            const userId = localStorage.getItem('id');
            const assignmentId = Cookie.get('assignment_id');
    
            if (userId && assignmentId) {
              populateSavedData(userId, assignmentId);
             // printLocalStorage();
            } 
              
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
        //let successfulSubmission = false;
        console.log("Entered the submit assignment handler")
        const studentID = localStorage.getItem('id'); 
       
        const caseStudyID = Cookie.get('case_study_id');
        const formName = e.currentTarget.getAttribute('data-form-name') || 'care-form'; // Dynamically get the form name or set a default
        console.log("form name is " + formName);
        
        const answers: { [key: string]: string } = {}; //an object to hold the answers as key-value pairs
        //const stakeholderAnswers: { [key: string]: string } = {};

   
        document.querySelectorAll('.answer-input').forEach(input => {
            const inputElement = input as HTMLInputElement;
            
            // Handle checkboxes and radio buttons
            if (inputElement.type === 'checkbox') {
                //stakeholderAnswers[inputElement.id] = inputElement.checked ? inputElement.value : 'false';
                answers[inputElement.id] = inputElement.checked ? 'true' : 'false';
            } else {
                answers[inputElement.id] = inputElement.value;
            }
            
        });
        // console.log("Stakeholder answers: ");
        // console.log(stakeholderAnswers);
        answers['num_stakeholders'] = stakeholders.length.toString();
        answers['cumulative-score'] = calculateCumulativeScore().toString();
        console.log("answers to send to backend are: ");
        console.log(answers);
        const numStakeholders = stakeholders.length;
        //answers["num_stakeholders"] = numStakeholders.toString();

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
            alert(response.data.message);
            clearLocalStorage();

            if(submitted){
                localStorage.setItem(`${prefix}care-form-submitted`, "true");
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
                
                {/* Fieldset for stakeholders*/}
                <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4 w-full shadow-md">
                <legend className="font-semibold text-gray-700">Stakeholder:</legend>

                {stakeholders.map((stakeholder, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg border border-gray-200 shadow space-y-3">
                    
                    <div className="">
                                    <span className="font-semibold">Stakeholder:</span>
                    </div>

                    {/* Stakeholder Input */}
                    {!lockForm ? (
                        <input
                        id={`stakeholder-name-${index}`}
                        type="text"
                        maxLength={50}
                        placeholder="Enter name"
                        value={stakeholder.name}
                        onChange={(e) => handleStakeholderChange(index, 'name', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 text-sm answer-input"
                        required
                        />
                    ) : (
                        <div className="border border-gray-300 bg-white rounded-lg p-2 w-full">
                        <span dangerouslySetInnerHTML={{ __html: stakeholder.name }} />
                        </div>
                    )}

                    {/* Impact Checkboxes */}
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold">Impact:</span>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={stakeholder.direct}
                                onChange={(e) => handleStakeholderChange(index, 'direct', e.target.checked)}
                                className="h-4 w-4 answer-input"
                                id={`stakeholder-directly-${index}`}
                            />
                            <span className="ml-1">Direct</span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={stakeholder.indirect}
                                onChange={(e) => handleStakeholderChange(index, 'indirect', e.target.checked)}
                                className="h-4 w-4 answer-input"
                                id={`stakeholder-indirectly-${index}`}
                            />
                            <span className="ml-1">Indirect</span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={stakeholder.notApplicable}
                                onChange={(e) => handleStakeholderChange(index, 'notApplicable', e.target.checked)}
                                className="h-4 w-4 answer-input"
                                id={`stakeholder-notApplicable-${index}`}
                            />
                            <span className="ml-1">Not Applicable</span>
                        </label>
                    </div>



                    {/* Sliders for desktop */}
                    {window.innerWidth >= 1024 && (
                        <>
                        
                        <SliderInput 
                            slider={[
                                {
                                    label: 'Attentiveness',
                                    min: 0,
                                    max: 10,
                                    scale: ['Low','High'],
                                    value: stakeholder.attentiveness,
                                    onChange: (e: any) => handleStakeholderChange(index, 'attentiveness', parseInt(e.target.value)),
                                    id: `attentiveness-${index}`,
                                    style: 2,
                                },
                            ]}
                        />
                        <SliderInput 
                            slider={[
                                {
                                    label: 'Competence',
                                    min: 0,
                                    max: 10,
                                    scale: ['Low','High'],
                                    value: stakeholder.competence,
                                    onChange: (e: any) => handleStakeholderChange(index, 'competence', parseInt(e.target.value)),
                                    id: `competence-${index}`,
                                    style: 2,
                                },
                            ]}
                        />
                        <SliderInput 
                            slider={[
                                {
                                    label: 'Responsiveness',
                                    min: 0,
                                    max: 10,
                                    scale: ['Low','High'],
                                    value: stakeholder.responsiveness,
                                    onChange: (e: any) => handleStakeholderChange(index, 'responsiveness', parseInt(e.target.value)),
                                    id: `responsiveness-${index}`,
                                    style: 2,
                                },
                            ]}
                        />
                        </>
                    )}

                    {/* Sliders for mobile */}
                    {window.innerWidth < 1024 && (
                        <>
                        <SliderInput
                        slider={[
                            {
                                label: 'Attentiveness',
                                min: 0,
                                max: 10,
                                scale: ['Low','High'],
                                value: stakeholder.attentiveness,
                                onChange: (e: any) => handleStakeholderChange(index, 'attentiveness', parseInt(e.target.value)),
                                id: `attentiveness-${index}`,
                              
                            },
                        ]}
                    />
                    <SliderInput
                        slider={[
                            {
                                label: 'Competence',
                                min: 0,
                                max: 10,
                                scale: ['Low','High'],
                                value: stakeholder.competence,
                                onChange: (e: any) => handleStakeholderChange(index, 'competence', parseInt(e.target.value)),
                                id: `competence-${index}`,
                              
                            },
                        ]}
                    />
                    <SliderInput
                        slider={[
                            {
                                label: 'Responsiveness',
                                min: 0,
                                max: 10,
                                scale: ['Low','High'],
                                value: stakeholder.responsiveness,
                                onChange: (e: any) => handleStakeholderChange(index, 'responsiveness', parseInt(e.target.value)),
                                id: `responsiveness-${index}`,
                              
                            },
                        ]}
                    />
                    </>
                    )}

                    {/* Remove Stakeholder Button */}
                    {stakeholders.length > minStakeholders && (
                        <button
                        type="button"
                        onClick={() => removeStakeholder(index)}
                        className="text-red-500 text-sm hover:text-red-800"
                        aria-label="Remove Stakeholder"
                        >
                        Remove
                        </button>
                    )}
                    </div>
                ))}

                {/* Add Stakeholder Button */}
                {stakeholders.length < maxStakeholders && (
                    <button type="button" onClick={addStakeholder} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600">
                    Add Stakeholder
                    </button>
                )}
                </fieldset>



                {/*Professor Comment Box for stakeholders*/}
                {lockForm && feedback[`care-form-stakeholders`] && (
                    <div className="border border-gray-200 rounded-lg p-4 mt-4">
                        <ProfessorCommentBox comment={feedback[`care-form-stakeholders`]} />
                    </div>
                )}


                {/* Fieldset for results */}
                <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
                    <legend className="font-semibold">Results</legend>
                    <div className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md space-y-4">
                        <p className={`${lusitana.className} mt-2`}>
                            Based on your inputs, your overall care scores are:
                        </p>
                        <div className="flex justify-between mt-2 w-1/2">
                            <span>Attentiveness:</span>
                            <span>{scores.attentiveness+'%'}</span>
                        </div>
                        <div className="flex justify-between mt-2 w-1/2">
                            <span>Competence:</span>
                            <span>{scores.competence+'%'}</span>
                        </div>
                        <div className="flex justify-between mt-2 w-1/2">
                            <span>Responsiveness:</span>
                            <span>{scores.responsiveness+'%'}</span>
                        </div>
                    </div>
                    {criticalQuestions?.map((question,index)=>(
                        <div className="mt-4">
                        {!lockForm && (
                            <TextInput 
                                key={index}
                                title={question}
                                setter={(value: string) => setTopic(index, value)}
                                value={topics[index]} 
                                id={`topic-cf-`+index} 
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

            <div className="flex justify-center mt-6 gap-4">
                <Button type="submit" data-html2canvas-ignore className="bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition" onClick={submitAssignmentForm} data-form-name={formName}>
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