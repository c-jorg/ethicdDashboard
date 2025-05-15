'use client'
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import { useState, useEffect, useRef } from 'react';
import { TrashIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
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

export default function ConsStakeholdersForm() {
   const formRef = useRef<HTMLFormElement>(null);
   const maxStakeholders = 12;
   const minStakeholders = 7;
   const maxWords = 200;
   const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
   const formName = "cons-stakeholders";
   const assignmentID = Cookie.get('assignment_id'); 
   const prefix = assignmentID + "-";
   let submitted = false; //used to determine if submitted button was pressed when sending data to backend
   const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
   
   const [loading, setLoading] = useState(true);
   const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
   
   const [removalTriggered, setRemovalTriggered] = useState(false);

   const [stakeholders, setStakeholders] = useState<{ name: string; direct: boolean; indirect: boolean; shortTerm: number; longTerm: number }[]>(
    Array(minStakeholders).fill({ name: "", direct: false, indirect: false, shortTerm: 5, longTerm: 5 }) // Default values
  );

  // Function to add a new stakeholder card
  const addStakeholder = () => {
    if (stakeholders.length < maxStakeholders) {
      const newStakeholders = [...stakeholders, { name: '', direct: false, indirect: false, shortTerm: 5, longTerm: 5 }]
      setStakeholders(newStakeholders);
      const index = newStakeholders.length - 1;
      localStorage.setItem(`${prefix}stakeholder-name-${index}`, '');
      localStorage.setItem(`${prefix}stakeholder-directly-${index}`, 'false');
      localStorage.setItem(`${prefix}stakeholder-indirectly-${index}`, 'false');
      localStorage.setItem(`${prefix}long-term-${index}`, '5');
      localStorage.setItem(`${prefix}short-term-${index}`, '5');
      localStorage.setItem(`${prefix}num_stakeholders`, String(newStakeholders.length)); 

      localStorage.setItem(`${prefix}num_stakeholders_sa`, String(newStakeholders.length)); 
    }
  };


  // Function to remove a stakeholder from the array to update state
  const removeStakeholder = (indexToRemove: number) => {
    if (stakeholders.length > minStakeholders) {
      //console.log("Before removing item at index 5: " + JSON.stringify(stakeholders, null, 2));

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
          localStorage.setItem(`${prefix}long-term-${i}`, String(stakeholders[i].longTerm));
          localStorage.setItem(`${prefix}short-term-${i}`, String(stakeholders[i].shortTerm));
      }

      //remove last one
      //console.log("removing from LS at index " + (stakeholders.length));
      localStorage.removeItem(`${prefix}stakeholder-name-${stakeholders.length}`);
      localStorage.removeItem(`${prefix}stakeholder-directly-${stakeholders.length}`);
      localStorage.removeItem(`${prefix}stakeholder-indirectly-${stakeholders.length}`);
      localStorage.removeItem(`${prefix}short-term-${stakeholders.length}`);
      localStorage.removeItem(`${prefix}long-term-${stakeholders.length}`);

      localStorage.setItem(`${prefix}num_stakeholders`, String(stakeholders.length));
      // localStorage.setItem(`${prefix}num_stakeholders_sa`, String(stakeholders.length));
      //console.log("====END OF REMOVING")
  };

  // Function to handle slider and impact changes
  const handleStakeholderChange = (index: number, field: 'name' | 'indirect' | 'direct' | 'shortTerm' | 'longTerm', value: any) => {
    setStakeholders(stakeholders.map((stakeholder, i) => 
      i === index ? { ...stakeholder, [field]: value } : stakeholder
    ));
    if(field === 'name'){
      localStorage.setItem(`${prefix}stakeholder-name-${index}`, value);
      // localStorage.setItem(`${prefix}stakeholder-name-${index}-sa`, value);
    }else if(field === 'direct' || field === 'indirect'){
      localStorage.setItem(`${prefix}stakeholder-${field}ly-${index}`, value);
      // localStorage.setItem(`${prefix}stakeholder-${field}ly-${index}-sa`, value);
    }else{
      if(field === 'shortTerm'){
        localStorage.setItem(`${prefix}short-term-${index}`, value);
      }else{
        localStorage.setItem(`${prefix}long-term-${index}`, value);
      }
    }
  };

  const modifyList = (target: number, index: number) => {
    const newList = [...stakeholders];
    const temp = newList[target];
    newList[target] = newList[index];
    newList[index] = temp;
    setStakeholders(newList);

    //update the local storage
    for(let i = 0; i < newList.length; i++){
      localStorage.setItem(`${prefix}stakeholder-name-${i}`, newList[i].name);
      localStorage.setItem(`${prefix}stakeholder-directly-${i}`, String(newList[i].direct));
      localStorage.setItem(`${prefix}stakeholder-indirectly-${i}`, String(newList[i].indirect));
      localStorage.setItem(`${prefix}short-term-${i}`, String(newList[i].shortTerm));
      localStorage.setItem(`${prefix}long-term-${i}`, String(newList[i].longTerm));
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, text: string) => {
    if (countWords(text) <= maxWords) {
        setter(text);
    }
  };

  const countWords = (text: string): number => {
      return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const calculateRanked = (term : 'shortTerm' | 'longTerm') => {
    //The ranked inputs display the totals adjusted for the ranking—1% higher weighting per place in 
    // the total of the user inputs, e.g. for seven inputs 1st is increased by 7%, 7th is increased by 1%.

    let sum = 0;
    let numStakeholders = stakeholders.length
    for(let stakeholder = 1, weight=numStakeholders; stakeholder <= numStakeholders; stakeholder++, weight--){
      sum += (5-(stakeholders[stakeholder-1][term])) * weight;
    }

    // Push sum into the range 0-100
    const maxPossibleSum = numStakeholders * 5 * (numStakeholders + 1) / 2; // Maximum possible sum with weights
    const normalizedSum = (sum / maxPossibleSum) * 100;

    if(term == 'shortTerm'){
      localStorage.setItem(`${prefix}ranked-short-term`, Math.min(Math.max(normalizedSum, 0), 100).toString());
    }else{
      localStorage.setItem(`${prefix}ranked-long-term`, Math.min(Math.max(normalizedSum, 0), 100).toString());
    }
    
    return Math.min(Math.max(normalizedSum, 0), 100);
  }

  const calculateUnranked = (term : 'shortTerm' | 'longTerm') => {
    //The ranked inputs display the totals adjusted for the ranking—1% higher weighting per place in 
    // the total of the user inputs, e.g. for seven inputs 1st is increased by 7%, 7th is increased by 1%.

    let sum = 0;
    let numStakeholders = stakeholders.length
    for(let stakeholder = 1; stakeholder <= numStakeholders; stakeholder++){
      sum += (5-(stakeholders[stakeholder-1][term]));
    }

    // Push sum into the range 0-100
    const maxPossibleSum = numStakeholders * 5; // Maximum possible sum with weights
    const normalizedSum = (sum / maxPossibleSum) * 100;

    if(term == 'shortTerm'){
      localStorage.setItem(`${prefix}unranked-short-term`, Math.min(Math.max(normalizedSum, 0), 100).toString());
    }else{
      localStorage.setItem(`${prefix}unranked-long-term`, Math.min(Math.max(normalizedSum, 0), 100).toString());
    }

    return Math.min(Math.max(normalizedSum, 0), 100);
  }

  const calculateCumulativeScore = () => {
    /**
     * Stakeholders – Unranked (5)
     * If total benefits exceed total harms: Green = 5, Red = 0
     * If total harms exceed total benefits: Green = 0, Red = 5
  
     * Stakeholders – Ranked (5)
     * If total benefits exceed total harms: Green = 5, Red = 0
     * If total harms exceed total benefits: Green = 0, Red = 5
     */
  
    const unrankedShortTerm = calculateUnranked('shortTerm');
    const unrankedLongTerm = calculateUnranked('longTerm');
  
    // Normalize the unranked scores
    const normalizedUnrankedShortTerm = unrankedShortTerm - 50;
    const normalizedUnrankedLongTerm = unrankedLongTerm - 50;
  
    // Calculate the overall unranked score
    const overallUnrankedScore = normalizedUnrankedShortTerm + normalizedUnrankedLongTerm;
  
    // Determine if benefits exceed harms for unranked scores
    const greenUnrankedBensOrHarms = overallUnrankedScore > 0 ? 5 : 0;
  
    // Calculate the cumulative score for the ranked inputs
    const rankedShortTerm = calculateRanked('shortTerm');
    const rankedLongTerm = calculateRanked('longTerm');
  
    // Normalize the ranked scores
    const normalizedRankedShortTerm = rankedShortTerm - 50;
    const normalizedRankedLongTerm = rankedLongTerm - 50;
  
    // Calculate the overall ranked score
    const overallRankedScore = normalizedRankedShortTerm + normalizedRankedLongTerm;
  
    // Determine if benefits exceed harms for ranked scores
    const greenRankedBensOrHarms = overallRankedScore > 0 ? 5 : 0;
  
    // Return the total green score
    return greenUnrankedBensOrHarms + greenRankedBensOrHarms;
  };

  const clearLocalStorage = () => {
    for(let i = 0; i < stakeholders.length; i++){
      localStorage.removeItem(`${prefix}short-term-${i}`);
      localStorage.removeItem(`${prefix}long-term-${i}`);
    }
    localStorage.removeItem(`${prefix}topic-1`);
    localStorage.removeItem(`${prefix}topic-2`);
    localStorage.removeItem(`${prefix}topic-3`);
    localStorage.removeItem(`${prefix}unranked-short-term`);
    localStorage.removeItem(`${prefix}unranked-long-term`);
    localStorage.removeItem(`${prefix}ranked-short-term`);
    localStorage.removeItem(`${prefix}ranked-long-term`);
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
   */
  useEffect(() => {
    (async () => {
      //check if form has been submitted, if it is then all inputs will be disabled
      await hasBeenSubmitted();
      if(lockForm){
        console.log("This form has been submitted")
        const formElements = document.querySelectorAll('.answer-input, .final-button');
        formElements.forEach((element) => {
          (element as HTMLInputElement).disabled = true;
        });

        // Now check for any feedback - if there is any then overwrite the answer with the feedback
        if(lockForm){
            //fetchFeedback(formName, parseInt(assignmentID || ''), setTopics);
            useFetchFeedback({ formName, assignmentId: assignmentID || '', setFeedback });
        }
        
      }
    })();
  }, [lockForm]);


  const populateSavedData = async () => {
    let thisFormData;
    let data;
    try{
      const userID = localStorage.getItem('id');
      thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=cons-stakeholders`);
      //const dilemmaData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=dilemma`);
        
      data = thisFormData.data.data;
    }catch(isAxiosError){
      if (axios.isAxiosError(isAxiosError) && isAxiosError.response?.status === 404) {
        console.log("No saved data found for this form");
      }else{
        console.log("Error fetching form data: ", isAxiosError);
      }
    }
    
      let content;
      if(data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content){
        content = data[0].answers[0].content;
      }else{
        content = [];
      }
      console.log("stakeholder analysis: content is:", content);

      // populate CQ responses
      criticalQuestions.forEach((_, index) => {
        const topic = feedback[`topic-sa-${index}`] || localStorage.getItem(`${prefix}topic-sa-${index}`) || content[`topic-sa-${index}`];
        setTopics(prevTopics => {
          const newTopics = [...prevTopics];
          newTopics[index] = topic || '';
          return newTopics;
        });
      });

       

      //const dilemmaContent = dilemmaFormData[0].answers[0].content || {};

      // Extract num_stakeholders from content and populate stakeholder data
      let numStakeholders;
      if(localStorage.getItem(`${prefix}num_stakeholders`) !== null){
        
        numStakeholders = parseInt(localStorage.getItem(`${prefix}num_stakeholders`) || '');
      }else{
        numStakeholders = parseInt(content["num_stakeholders"]) || 7;
      }

      const stakeholdersData = [];
      
      // Iterate over the stakeholders
      for (let i = 0; i < numStakeholders; i++) {
        const shortTermKey = `short-term-${i}`;
        const longTermKey = `long-term-${i}`;
        const nameKey = `stakeholder-name-${i}`;
        const impactDirectKey = `stakeholder-directly-${i}`;
        const impactIndirectKey = `stakeholder-indirectly-${i}`;
        
        const name = feedback[nameKey] || localStorage.getItem(`${prefix}${nameKey}`) || content[nameKey] || "";
        //console.log("found name: " + name + " for key: " + nameKey);

        let shortTerm;
        if(localStorage.getItem(`${prefix}${shortTermKey}`) !== null){
          shortTerm = parseInt(localStorage.getItem(`${prefix}${shortTermKey}`) || '');
          //console.log("found local storage short term: " + shortTerm + " for key: " + shortTermKey);
        }else{
          shortTerm = parseInt(content[shortTermKey]) || 2;
          //console.log("found content short term: " + shortTerm + " for key: " + shortTermKey);
        }

        let longTerm;
        if(localStorage.getItem(`${prefix}${longTermKey}`) !== null){
          longTerm = parseInt(localStorage.getItem(`${prefix}${longTermKey}`) || '');
        }else{
          longTerm = parseInt(content[longTermKey]) || 2;
        }  

        let directImpact;
        if(localStorage.getItem(`${prefix}${impactDirectKey}`) !== null){
            directImpact = String(localStorage.getItem(`${prefix}${impactDirectKey}`)) !== 'false' ? true : false;
        }else{
            if(content[impactDirectKey] != null){
              directImpact = String(content[impactDirectKey]) !== 'false' ? true : false;
            }else{
              directImpact = false;
            }
        }

        let indirectImpact;
        if(localStorage.getItem(`${prefix}${impactIndirectKey}`) !== null){
            indirectImpact = String(localStorage.getItem(`${prefix}${impactIndirectKey}`)) !== 'false' ? true : false;
        }else{
            if(content[impactIndirectKey] != null){
              indirectImpact = String(content[impactIndirectKey]) !== 'false' ? true : false;
            }else{
              indirectImpact = false;
            }
        }

        stakeholdersData.push({
          name: name,
          direct: directImpact,
          indirect: indirectImpact,
          shortTerm: shortTerm,
          longTerm: longTerm
        });
      }
      setStakeholders(stakeholdersData);
  }
  
  const [criticalQuestions, setCriticalQuestions] = useState([
    'How did you rank the stakeholders, and how would you defend your choice?',
    'Are short term outcomes more important than long term outcomes, or vice versa, in this case?',
    'How reliable are your predictions? Should consequences be the only consideration in this case, or are there other things that should inform your decision?'
  ]);


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
  
  const [topics, setTopics] = useState(['','',''])
  const setTopic = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };
  
  //runs once when the page first loads
  useEffect(() => {
    //console.log("use effect is running");
    const fetchData = async () => {
      try {
        const userID = localStorage.getItem('id');
        if (userID && assignmentID) {
          populateSavedData();
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

  /**
   * Handles the form submission for the ConsStakeholdersForm component.
   * 
   * This function gathers all the input data from the form, calculates the cumulative score,
   * and sends the data to the backend API for saving or submission. It also handles local storage
   * cleanup and form state updates upon successful submission.
   * 
   * @param e - The event object from the form submission.
   * 
   */
  const submitForm = async (e: any) => {
    e.preventDefault()
    let successfulSubmission = false;
    //console.log("Entered the submit form handler for cons stakeholder form")
    const studentID = localStorage.getItem('id'); 
    const assignmentID = Cookie.get('assignment_id'); 
    const caseStudyID = Cookie.get('case_study_id');
    const formName = e.currentTarget.getAttribute('data-form-name') || 'cons-stakeholders'; // Dynamically get the form name or set a default
    //console.log("form name is " + formName);

    const answers: { [key: string]: string } = {}; //an object to hold the answers as key-value pairs
    //const stakeholderAnswers: { [key: string]: string } = {};

    document.querySelectorAll('.consequences .answer-input').forEach(input => {
      const inputElement = input as HTMLInputElement;

      // Handle checkboxes and radio buttons
      if (inputElement.type === 'checkbox') {
        answers[inputElement.id] = inputElement.checked ? inputElement.value : 'false';
      } else if (inputElement.type === 'range') {
        answers[inputElement.id] = inputElement.value;
        if(inputElement.id != "unranked-long-term" && inputElement.id != "unranked-short-term" && inputElement.id != "ranked-long-term" && inputElement.id != "ranked-short-term"){
          answers[`inverse-${inputElement.id}`] = (5 - parseInt(inputElement.value)).toString();
        }
      } else {
        // Handle other input types (e.g., text inputs)
        answers[inputElement.id] = inputElement.value;
      }
    });

    answers['cumulative-score'] = calculateCumulativeScore().toString();

    //console.log("stakeholder answers: " + JSON.stringify(stakeholderAnswers, null, 2));
   //console.log("answers for cons-stakeholders are " + JSON.stringify(answers))

    const numStakeholders = stakeholders.length;
    //console.log("Number of stakeholders: " + numStakeholders);
    answers['num_stakeholders'] = numStakeholders.toString();
    const unrankedShortTerm = calculateUnranked('shortTerm');
    //console.log("string: " + unrankedShortTerm.toString());
    answers['unranked-short-term'] = calculateUnranked('shortTerm').toFixed(2).toString();
    answers['unranked-long-term'] = calculateUnranked('longTerm').toFixed(2).toString();
    answers['ranked-short-term'] = calculateRanked('shortTerm').toFixed(2).toString();
    answers['ranked-long-term'] = calculateRanked('longTerm').toFixed(2).toString();
    //console.log("Answers for cons-stakeholders are " + JSON.stringify(answers))

    //for the assignment table
    const data = {
      student_id: studentID,
      assignment_id: assignmentID,
      case_study_id: caseStudyID,
      form_name: formName,
      answers: answers
    };

    
    try {
      // Send cons-stakeholders form data to backend API using axios
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

      alert(response.data.message);
      clearLocalStorage();

      if(submitted){
        localStorage.setItem(`${prefix}cons-stakeholders-submitted`, "true");
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
  
  }; //end of submitAssignmentForm




  /* 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    =================================
    HERE BEGINS THE HTML FOR THE FORM
    =================================
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  */


 
  return (
        <div className="flex flex-col items-center">
        <form id="cons-stakeholders-form" className="consequences w-full max-w-5xl space-y-6 bg-white rounded-lg shadow-md p-6" ref={formRef} data-form-name='cons-stakeholders' onSubmit={submitForm}>

          <FormCompletedCard isVisible={lockForm} />

          {/* Fieldset for STAKEHOLDERS */}
          <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
            <legend className="font-semibold">Stakeholders</legend>

            {stakeholders.map((stakeholder, index) => (
              <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">

            <div className="flex flex-col w-full md:w-auto space-y-4 md:space-y-0 md:space-x-4">
              
              <div key={index} className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <label className="w-full md:w-auto">

                  {/* TrashIcon to remove stakeholder */}
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
                  <span className="ml-2 text-md">Stakeholder:</span>

                  {!lockForm && (
                    <input
                      id={`stakeholder-name-${index}`}
                      type="text"
                      maxLength={50}
                      placeholder={`Stakeholder #${index + 1} Name`}
                      value={stakeholder.name}
                      onChange={(e) => handleStakeholderChange(index, 'name', e.target.value)}
                      className="answer-input stakeholder w-full border border-gray-300 rounded-lg p-2"
                      required
                    />
                  )}
                  {lockForm && (
                    <>
                      <div
                        className="border border-gray-300 bg-white rounded-lg p-2 w-full min-w-[200px] md:min-w-[300px] lg:min-w-[400px]"
                        dangerouslySetInnerHTML={{
                          __html: stakeholder.name
                            ? stakeholder.name.replace(
                                /<c>(.*?)<\/c>/g,
                                '<span class="text-red-500">$1</span>'
                              )
                            : '',
                        }}
                      />
                    </>
                  )}


                </label>
                <label className="flex items-center">
                  <input
                    id={`stakeholder-directly-${index}`}
                    type="checkbox"
                    checked={stakeholder.direct}
                    onChange={(e) => handleStakeholderChange(index, 'direct', e.target.checked)}
                    className="answer-input stakeholder h-4 w-4"
                    value="directly"
                  />
                  <span className="ml-2 text-md">Directly</span>
                </label>
                <label className="flex items-center">
                  <input
                    id={`stakeholder-indirectly-${index}`}
                    type="checkbox"
                    checked={stakeholder.indirect}
                    onChange={(e) => handleStakeholderChange(index, 'indirect', e.target.checked)}
                    className="answer-input stakeholder h-4 w-4"
                    value="indirectly"
                  />
                  <span className="ml-2 text-md">Indirectly</span>
                </label>
              </div>

            </div>

            {/* Slider inputs for short term and long term impact */}
            <div className="flex flex-col md:flex-row ml-auto space-y-4 md:space-y-0 md:space-x-6"> {/* This will push sliders to the right */}
              <SliderInput
                slider={[
                  {
                    label: 'Short Term',
                    min: 0,
                    max: 5,
                    value: stakeholder.shortTerm,
                    onChange: (e:any) => handleStakeholderChange(index, 'shortTerm', parseInt(e.target.value)),
                    scale: ['Benefits', 'Harms'],
                    id: `short-term-${index}`,
                  },
                  {
                    label: 'Long Term',
                    min: 0,
                    max: 5,
                    value: stakeholder.longTerm,
                    onChange: (e:any) => handleStakeholderChange(index, 'longTerm', parseInt(e.target.value)),
                    scale: ['Benefits', 'Harms'],
                    id: `long-term-${index}`,
                  },
                ]}
              />
            </div>

            {/* Reorder buttons */}
            <div className="flex flex-row md:flex-col items-center ml-4 space-x-4 md:space-x-0 md:space-y-2">
              <span>
                <ChevronUpIcon 
                  className={`final-button h-5 w-5 ${index === 0 ? 'invisible' : ''}`}
                  onClick={() => lockForm ? '' : modifyList(index - 1, index)}
                />
              </span>
              <span>{`${index + 1}`}</span>
              <span>
                <ChevronDownIcon 
                  className={`final-button h-5 w-5 ${index === stakeholders.length - 1 ? 'invisible' : ''}`}
                  onClick={() => lockForm ? '' : modifyList(index + 1, index)}
                />
              </span>
            </div>
                </div>
                
              </div>
            ))}
            {stakeholders.length < maxStakeholders && (
              <Button type="button" onClick={addStakeholder} className="final-button mt-4">
                Add Stakeholder
              </Button>
            )}
            
          </fieldset>
          {/*Professor Comment Box for STAKEHOLDER ANALYSIS */}
          {lockForm && feedback[`stakeholder-analysis`] && (
            <div className="border border-gray-200 rounded-lg p-4 mt-4">
              <ProfessorCommentBox comment={feedback[`stakeholder-analysis`]} />
            </div>
          )}

          {/* Fieldset for results */}
          <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
            <legend className="font-semibold">Results</legend>
              <div className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md space-y-4">
              <p className={`${lusitana.className} mt-2`}>
                Based on your <em>unranked</em> impartial inputs, your decision will result in: 
              </p>

              <SliderInput
              slider={[{
                label: 'Short Term',
                min: 0,
                max: 100,
                value: 100 - calculateUnranked('shortTerm'),
                onChange: null,
                scale: ['Benefits','Harms'],
                id: 'unranked-short-term',
                readOnly: true,
                className: 'results',
              
              }, {
                label: 'Long Term',
                min: 0,
                max: 100,
                value: 100 - calculateUnranked('longTerm'),
                onChange: null,
                scale: ['Benefits','Harms'],
                id: 'unranked-long-term',
                readOnly: true,
                className: 'results',
              
              }]}
              />
              </div>

            <div className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md space-y-4">
              <p className={`${lusitana.className} mt-2`}>
                Based on your <em>ranked</em> partial inputs, your decision will result in: 
              </p>

              <SliderInput
              slider={[{
                  label: 'Short Term',
                  min: 0,
                  max: 100,
                  value: 100 - calculateRanked('shortTerm'),
                  onChange: null,
                  scale: ['Benefits','Harms'],
                  id: 'ranked-short-term',
                  className: 'consequences',
                  readOnly: true,
              }, {
                  label: 'Long Term',
                  min: 0,
                  max: 100,
                  value: 100 - calculateRanked('longTerm'),
                  onChange: null,
                  scale: ['Benefits','Harms'],
                  id: 'ranked-long-term',
                  className: 'consequences',
                  readOnly: true,
              }]}
              />
            </div>

            {criticalQuestions?.map((question,index)=>(
              <div className="mt-4" key={index}>
                {!lockForm && (
                  <TextInput 
                    key={index}
                    title={question}
                    setter={(value: string) => setTopic(index, value)}
                    value={topics[index]} 
                    id={`topic-sa-`+index} 
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
            <Button type="button" onClick={submitForm} data-html2canvas-ignore className="final-button bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition" data-form-name={formName}>
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
}