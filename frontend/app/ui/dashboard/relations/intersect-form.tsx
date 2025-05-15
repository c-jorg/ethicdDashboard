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

export default function IntersectForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const formName = 'intersect-form';
    const [loading, setLoading] = useState(true);
    const assignmentID = Cookie.get('assignment_id');
    const prefix = assignmentID + "-";
    const [removalTriggered, setRemovalTriggered] = useState(false);
    let submitted = false;
    const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
    const [isRendered, setIsRendered] = useState(false);

    const maxStakeholders = 12;
    const minStakeholders = 7;
    const maxWords = 200;

    const [privilegeGreater, setPrivilegeGreater] = useState<boolean>(false);
    const [topics, setTopics] = useState(['','',''])
    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

    const [questionsInitialized, setQuestionsInitialized] = useState(false); //set to true once critical qs have been fetched from DB

    const [stakeholders, setStakeholders] = useState<{ 
        name: string; direct: boolean; indirect: boolean; sexism: number; racism: number; ableism: number; ageism: number 
    
    }[]>(
        Array(minStakeholders).fill({ name: "", direct: false, indirect: false, sexism: 10, racism: 10, ableism: 10, ageism: 10 }) // Default values
    );

    const [criticalQuestions, setCriticalQuestions] = useState([
        `Based on your inputs, the sum of privileges is ${privilegeGreater ? 'greater' : 'less than'} than the sum of oppressions.  What does that say about your decision?`,
        'Is your choice working to redress social injustices in society, or the reinforce inequalities?',
        'Are there some stakeholders that should be given special consideration because of their social location?'
    ]);

    // Function to add a new stakeholder card
    const addStakeholder = () => {
        if (stakeholders.length < maxStakeholders) {
            const newStakeholders = [...stakeholders, { name: '', direct: false, indirect: false, sexism: 5, racism: 5, ableism: 5, ageism: 5 }];
            setStakeholders(newStakeholders);
            const index = newStakeholders.length - 1;
            //save the data to local storage

            //save for all forms
            localStorage.setItem(`${prefix}stakeholder-name-${index}`, '');
            localStorage.setItem(`${prefix}stakeholder-directly-${index}`, 'false');
            localStorage.setItem(`${prefix}stakeholder-indirectly-${index}`, 'false');
            localStorage.setItem(`${prefix}sexism-${index}`, '5');
            localStorage.setItem(`${prefix}racism-${index}`, '5');
            localStorage.setItem(`${prefix}ableism-${index}`, '5');
            localStorage.setItem(`${prefix}ageism-${index}`, '5');
            localStorage.setItem(`${prefix}num_stakeholders`, String(newStakeholders.length)); 
        }
    };

    // Function to remove a stakeholder
    const removeStakeholder = (indexToRemove: number) => {
        let oldLength = stakeholders.length;
        if (stakeholders.length > minStakeholders) {
            const updatedStakeholders = stakeholders.filter((_, index) => index !== indexToRemove);
            setStakeholders(updatedStakeholders); //triggers re-render
            setRemovalTriggered(true);
        }
    };

    useEffect(() => {
        if(removalTriggered){
            setRemovalTriggered(false);
            //console.log("removal triggered");
            removeStakeholderFromLocalStorage();
        }
    }, [removalTriggered, stakeholders]);

    //remove the stakeholder from local storage
    const removeStakeholderFromLocalStorage = () => {
        //console.log("rewriting whole list of stakeholders to local storage");

        //console.log("Have now removed that stakeholder from the array, the new array is: " + JSON.stringify(stakeholders, null, 2));
        //rewrite whole list of stakeholders to local storage
        let i = 0;
        for(i; i < stakeholders.length; i++){
            //console.log("rewriting LS at index " + i + " where stakeholder name is " + stakeholders[i].name);
            localStorage.setItem(`${prefix}stakeholder-name-${i}`, stakeholders[i].name);
            localStorage.setItem(`${prefix}stakeholder-directly-${i}`, String(stakeholders[i].direct));
            localStorage.setItem(`${prefix}stakeholder-indirectly-${i}`, String(stakeholders[i].indirect));
            localStorage.setItem(`${prefix}sexism-${i}`, String(stakeholders[i].sexism));
            localStorage.setItem(`${prefix}racism-${i}`, String(stakeholders[i].racism));
            localStorage.setItem(`${prefix}ableism-${i}`, String(stakeholders[i].ableism));
            localStorage.setItem(`${prefix}ageism-${i}`, String(stakeholders[i].ageism));
        }

        //remove last one
        //console.log("removing from LS at index " + (stakeholders.length));
        localStorage.removeItem(`${prefix}stakeholder-name-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}stakeholder-directly-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}stakeholder-indirectly-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}sexism-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}racism-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}ageism-${stakeholders.length}`);
        localStorage.removeItem(`${prefix}ableism-${stakeholders.length}`);

        localStorage.setItem(`${prefix}num_stakeholders`, String(stakeholders.length));
        //console.log("====END OF REMOVING")
    };

    // Function to handle slider and impact changes
    const handleStakeholderChange = (index: number, field: 'name' | 'direct' | 'indirect' | 'sexism' | 'racism' | 'ableism' | 'ageism', value: any) => {
        setStakeholders(stakeholders.map((stakeholder, i) => 
            i === index ? { ...stakeholder, [field]: value } : stakeholder
        ));
        if(field != 'name' && field != 'direct' && field != 'indirect'){
            localStorage.setItem(`${prefix}${field}-${index}`, value); //racism, sexism, ableism, ageism
            compareScores();

        }else if(field == 'direct' || field == 'indirect'){
            localStorage.setItem(`${prefix}stakeholder-${field}ly-${index}`, value);  //directly and indirectly
        
        }else{
            localStorage.setItem(`${prefix}stakeholder-${field}-${index}`, value); //name
       
        }
        
    };

    const compareScores = () => {
        let sum = 0;
        stakeholders.forEach((stakeholder) => {
            sum += Number(stakeholder.sexism) + Number(stakeholder.racism) + Number(stakeholder.ableism) + Number(stakeholder.ageism);
        });

        let bool;
        if (sum > stakeholders.length * 20) { // total score > average
            setPrivilegeGreater(true);
            bool = true;
        } else { // total score < average
            setPrivilegeGreater(false);
            bool = false;
        }

        console.log("Sum is " + sum + " and bool is " + bool);

        // let updatedQuestion = "";
        // if (sum === stakeholders.length * 20) {
        //     updatedQuestion = `Based on your inputs, the sum of privileges is equal to the sum of oppressions.  What does that say about your decision?`;
        // }else{
        //     updatedQuestion = `Based on your inputs, the sum of privileges is ${bool ? 'greater' : 'less than'} than the sum of oppressions.  What does that say about your decision?`;
        // }

        //update the critical questions text for the 1st one so it shows the correct comparison
        setCriticalQuestions(prevQuestions => {
            const updatedQuestion = `Based on your inputs, the sum of privileges is ${bool ? 'greater' : 'less than'} than the sum of oppressions.  What does that say about your decision?`;
        
            // Only update state if the question actually changes
            if (prevQuestions[0] !== updatedQuestion) {
                return [updatedQuestion, ...prevQuestions.slice(1)];
            }
            return prevQuestions;
        });
        
    };

    const calculateCumulativeScore = () => {
        let oppressionTotal = 0;
        let privilegeTotal = 0;
    
        stakeholders.forEach((stakeholder) => {
            // Process each category for a stakeholder
            ['sexism', 'racism', 'ableism', 'ageism'].forEach((category) => {
                const value = stakeholder[category as keyof typeof stakeholder];
    
                if (Number(value) > 10) {
                    // Privilege: Subtract from 20 to get the reverse
                    privilegeTotal += (20 - Number(value));
                } else {
                    // Oppression: Direct value
                    oppressionTotal += Number(value);
                }
            });
        });
    
        // Calculate average per stakeholder
        const totalStakeholders = stakeholders.length;
        const totalValues = totalStakeholders * 4; // 4 values per stakeholder (sexism, racism, ableism, ageism)
  
        const average2 = (privilegeTotal + oppressionTotal) / totalValues;
        return Math.round(average2);
    }
    

    const clearLocalStorage = () => {
        for(let i = 0; i < stakeholders.length; i++){
            localStorage.removeItem(`${prefix}ableism-${i}`);
            localStorage.removeItem(`${prefix}ageism-${i}`);
            localStorage.removeItem(`${prefix}racism-${i}`);
            localStorage.removeItem(`${prefix}sexism-${i}`);
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
            console.log("This form has not been submitted into submissions table");
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
                    console.log("This form has been submitted");
                    
                    const formElements = document.querySelectorAll('.answer-input, .final-button');
                    //console.log(formElements); // Log the selected elements
                    
                    formElements.forEach((element) => {
                        (element as HTMLInputElement).disabled = true;
                    });
                    //console.log("disabled inputs");
                }
            }, 0); // Delay to allow DOM to render

            // Now check for any feedback - if there is any then overwrite the answer with the feedback
            if(lockForm){
                //fetchFeedback(formName, parseInt(assignmentID || ''), setTopics);
                useFetchFeedback({ formName, assignmentId: assignmentID || '', setFeedback });
            }
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

        //console.log("content is:", content);

        // Extract num_stakeholders from content and populate stakeholder data
        const numStakeholders = parseInt(localStorage.getItem(`${prefix}num_stakeholders`) || content["num_stakeholders"]) || 7;
        const stakeholdersData = [];
        
        // Iterate over the stakeholders
        for (let i = 0; i < numStakeholders; i++) {
        const nameKey = `stakeholder-name-${i}`;
        const impactDirectKey = `stakeholder-directly-${i}`;
        const impactIndirectKey = `stakeholder-indirectly-${i}`;

        const sexismKey = `sexism-${i}`;
        const racismKey = `racism-${i}`;
        const ableismKey = `ableism-${i}`;
        const ageismKey = `ageism-${i}`;

        const name = feedback[nameKey] || localStorage.getItem(`${prefix}${nameKey}`) || content[nameKey] || "";   

        let directImpact;
        if(localStorage.getItem(`${prefix}${impactDirectKey}`) !== null){
            directImpact = String(localStorage.getItem(`${prefix}${impactDirectKey}`)) !== 'false' ? true : false;
        }else{
            if(content[impactDirectKey] != null){
                directImpact = String(content[impactDirectKey]) !== 'false' ? true : false;
            }else{
                directImpact= false;
            }
        }

        let indirectImpact;
        if(localStorage.getItem(`${prefix}${impactIndirectKey}`) !== null){
            indirectImpact = String(localStorage.getItem(`${prefix}${impactIndirectKey}`)) !== 'false' ? true : false;
        }else{
            if(content[impactIndirectKey] != null){
                indirectImpact = String(content[impactIndirectKey]) !== 'false' ? true : false;
            }else{
                indirectImpact= false;
            }
        }
        
        let sexism = localStorage.getItem(`${prefix}${sexismKey}`) || content[sexismKey] || 10;
        let racism = localStorage.getItem(`${prefix}${racismKey}`) || content[racismKey] || 10;
        let ableism = localStorage.getItem(`${prefix}${ableismKey}`) || content[ableismKey] || 10;
        let ageism = localStorage.getItem(`${prefix}${ageismKey}`) || content[ageismKey] || 10;

        stakeholdersData.push({
            name: name,
            direct: directImpact,
            indirect: indirectImpact,
            sexism: sexism,
            racism: racism,
            ableism: ableism,
            ageism: ageism,
        });
        }
        
        setStakeholders(stakeholdersData);

        criticalQuestions.forEach((_, index) => {
            const topic = feedback[`topic-if-${index}`] || localStorage.getItem(`${prefix}topic-if-${index}`) || content[`topic-if-${index}`];
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
          try {
            const userId = localStorage.getItem('id');
            const assignmentId = Cookie.get('assignment_id');
    
            if (userId && assignmentId) {
              await populateSavedData(userId, assignmentId);
            } 
            compareScores();

            //printLocalStorage();
              
            setLoading(false);
          } catch (error) {
            console.error("Error fetching form data: ", error);
            setLoading(false);
          }
        };
      
        fetchData();
      }, [questionsInitialized, privilegeGreater, feedback]);
    
      if (loading) {
        return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
      }


    //this successfully sends the data to the backend
    const submitAssignmentForm = async (e:any) => {
        e.preventDefault()
        let successfulSubmission = false;
        //console.log("Entered the submit assignment handler")
        const studentID = localStorage.getItem('id'); 
         
        const caseStudyID = Cookie.get('case_study_id');
        const formName = e.currentTarget.getAttribute('data-form-name') || 'intersect-form'; // Dynamically get the form name or set a default
        //console.log("form name is " + formName);
        
        const answers: { [key: string]: string } = {}; //an object to hold the answers as key-value pairs
        //const stakeholderAnswers: { [key: string]: string } = {};

        document.querySelectorAll('.answer-input').forEach(input => {
            const inputElement = input as HTMLInputElement;

            // Handle checkboxes and radio buttons
            if (inputElement.type === 'checkbox') {
                //stakeholderAnswers[inputElement.id] = inputElement.checked ? inputElement.value : 'false';
                answers[inputElement.id] = inputElement.checked ? inputElement.value : 'false';
            } else {

                answers[inputElement.id] = inputElement.value;

            }
            answers['num_stakeholders'] = stakeholders.length.toString();
            

            
        });
        answers['cumulative-score'] = calculateCumulativeScore().toString();

        //console.log(answers)
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
                //console.log("saving form");
                response = await axios.post(`${apiUrl}/api/flask/assignment/save-form`, data, {
                    headers: {
                    'Content-Type': 'application/json',
                    }
                });
            }else{
                //console.log("submitting form");
                response = await axios.post(`${apiUrl}/api/flask/assignment/submit-form`, data, {
                    headers: {
                    'Content-Type': 'application/json',
                    }
                });
            }

            alert(response.data.message);
            clearLocalStorage();
            if(submitted){
                localStorage.setItem(`${prefix}intersect-form-submitted`, "true");
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
            <form className="w-full max-w-5xl space-y-6 bg-white rounded-lg shadow-md p-2 md:text-2xl" ref={formRef} data-form-name={formName} onSubmit={submitAssignmentForm}>
                
                <FormCompletedCard isVisible={lockForm} />
                
                {/* Fieldset for stakeholders */}
                <fieldset className="border border-gray-300 rounded-lg p-2 space-y-4 mx-auto">
                    <legend className="font-semibold">Stakeholders</legend>
                    {stakeholders.map((stakeholder, index) => (
                        <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md space-y-4">
                            <div className="flex justify-between items-center">


                                
                            
                                {/* Stakeholder Name Input and Checkboxes */}
                                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                                    {/* Stakeholder Name Label and Input */}
                                    <div className="flex items-center space-x-2 md:w-1/2">
                                        <span className="font-semibold whitespace-nowrap text-sm md:text-md">Stakeholder:</span>
                                        <input
                                            id={`stakeholder-name-${index}`}
                                            type="text"
                                            maxLength={50}
                                            placeholder={`Stakeholder #${index + 1} Name`}
                                            value={stakeholder.name}
                                            onChange={(e) => handleStakeholderChange(index, 'name', e.target.value)}
                                            className="stakeholder answer-input stakeholder w-full border border-gray-300 rounded-lg p-2"
                                            required
                                        />
                                    </div>

                                    {/* Impacted Checkboxes */}
                                    <div className="flex items-center space-x-4">
                                        <span className="font-semibold whitespace-nowrap text-sm md:text-md">Impacted:</span>
                                        <label className="flex items-center">
                                            <input
                                                id={`stakeholder-directly-${index}`}
                                                type="checkbox"
                                                checked={stakeholder.direct}
                                                onChange={(e) => handleStakeholderChange(index, 'direct', e.target.checked)}
                                                className="stakeholder answer-input stakeholder h-4 w-4"
                                                value="directly"
                                            />
                                            <span className="ml-2 md:text-md text-sm">Directly</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                id={`stakeholder-indirectly-${index}`}
                                                type="checkbox"
                                                checked={stakeholder.indirect}
                                                onChange={(e) => handleStakeholderChange(index, 'indirect', e.target.checked)}
                                                className="stakeholder answer-input stakeholder h-4 w-4"
                                                value="indirectly"
                                            />
                                            <span className="ml-2 md:text-md text-sm">Indirectly</span>
                                        </label>
                                    </div>
                                </div>







                                <div className="flex items-center space-x-4">
                                {stakeholders.length > minStakeholders && (
                                    <button
                                    type="button"
                                    onClick={() => removeStakeholder(index)}
                                    className="final-button ml-4 hover:text-red-800"
                                    aria-label="Remove Stakeholder"
                                    >
                                    <TrashIcon className="h-5 w-5" />
                                    </button>
                                )}
                                </div>
                            </div>
                        {/* Slider inputs for stakeholder social positions */}
                        <SliderInput
                            slider={[{
                                label: 'Sexism',
                                min: 0,
                                max: 20,
                                scale: ['Oppression','Privilege'],
                                value: stakeholder.sexism,
                                onChange: (e:any) => handleStakeholderChange(index,'sexism',parseInt(e.target.value)),
                                id: `sexism-${index}`,
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-3',
                            }]}
                        />
                        <SliderInput
                            slider={[{
                                label: 'Racism',
                                min: 0,
                                max: 20,
                                scale: ['Oppression','Privilege'],
                                value: stakeholder.racism,
                                onChange: (e:any) => handleStakeholderChange(index,'racism',parseInt(e.target.value)),
                                id: `racism-${index}`,
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-3',
                            }]}
                        />
                        <SliderInput
                            slider={[{
                                label: 'Ableism',
                                min: 0,
                                max: 20,
                                scale: ['Oppression','Privilege'],
                                value: stakeholder.ableism,
                                onChange: (e:any) => handleStakeholderChange(index,'ableism',parseInt(e.target.value)),
                                id: `ableism-${index}`,
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-3',
                            }]}
                        />
                        <SliderInput
                            slider={[{
                                label: 'Ageism',
                                min: 0,
                                max: 20,
                                scale: ['Oppression','Privilege'],
                                value: stakeholder.ageism,
                                onChange: (e:any) => handleStakeholderChange(index,'ageism',parseInt(e.target.value)),
                                id: `ageism-${index}`,
                                className: 'h-2 bg-gray-300 rounded-lg appearance-none m-3',
                            }]}
                        />

                        {/*Professor Comment Box for each stakeholder */}
                        {lockForm && feedback[`stakeholder-feedback-${index}`] && (
                            <div className="border border-gray-200 rounded-lg p-4 mt-4 bg-white">
                                <ProfessorCommentBox comment={feedback[`stakeholder-feedback-${index}`]} />
                            </div>
                        )}

                        </div>
                    
                    ))}
                    {stakeholders.length < maxStakeholders && (
                        <Button type="button" onClick={addStakeholder} className="final-button mt-4">
                            Add Stakeholder
                        </Button>
                    )}
                </fieldset>

                {/* Fieldset for results */}
                <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
                    <legend className="font-semibold">Results</legend>
                    {criticalQuestions?.map((question,index)=>(
                        <div className="mt-4" key={index}>
                            {!lockForm && (
                                <TextInput 
                                    key={index}
                                    title={question}
                                    setter={(value: string) => setTopic(index, value)}
                                    value={topics[index]} 
                                    id={`topic-if-`+index} 
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
        </form>
        </div>
    );
};