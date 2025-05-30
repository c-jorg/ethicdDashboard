'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { Button } from '@/app/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookie from 'js-cookie';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import ProfessorCommentBox from '@/app/ui/components/prof-comment-box';
import { dilemmaFormSubmitted } from '@/app/utils/is-dilemma-submitted';
import CategoricalImperativesForm from '../action-and-duty/categorical-imperatives-form';
import { useServerInsertedHTML } from 'next/navigation';
import setDilemmaSubmitted from '@/app/ui/components/nav-links';
import { json } from 'stream/consumers';

interface RadioItem {
  id: number;
  label: string;
  description: string;
}

interface Answer {
  content: string;
} 

// Function to get a preview of the description
const getDescriptionPreview = (description: string, wordCount: number = 5): string => {
  return description.split(' ').slice(0, wordCount).join(' ') + (description.split(' ').length > wordCount ? '...' : '');
};

export default function RadioButtonForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [loading, setLoading] = useState(true);
  const formName = 'dilemma';
  const assignmentID = Cookie.get('assignment_id'); 
  const prefix = assignmentID + "-";
  let submitted = false;

  const [removalTriggered, setRemovalTriggered] = useState(false);
  const [lockForm, setLockForm] = useState(false);  
  const [isLoading, setIsLoading] = useState(true);

  const [showStudentInputs, setShowStudentInputs] = useState(false);
  const [studentOptionTitle, setStudentOptionTitle] = useState('');
  const [studentOptionDescription, setStudentOptionDescription] = useState('');

  const [caseOptions, setCaseOptions] = useState<RadioItem[]>([
    {
      id: 0,
      label: 'Conflict of Interest',
      description: 'A situation in which a person or organization has multiple interests, financial or otherwise, which could potentially corrupt the motivation for an act in the official capacity.',
    },
    {
      id: 1,
      label: 'Privacy and Confidentiality',
      description: 'The right of individuals to keep their personal information private and the obligation of organizations to protect that information from unauthorized access.',
    },
    {
      id: 2,
      label: 'Conflicting Loyalties',
      description: 'Situations where a person has to balance their loyalties to multiple parties, which can lead to ethical dilemmas and conflicts in decision-making.',
    }
  ]);

  const shuffledOptions = useMemo(() => {
    return [...caseOptions]
      .map((item, index) => ({ ...item, originalIndex: index })) // Preserve original index
      .sort(() => Math.random() - 0.5); // Shuffle the array
  }, [caseOptions]); // Recalculate only if `caseOptions` changes

  useEffect(() => {
    console.log("shuffled options are", shuffledOptions);
  }, [shuffledOptions])

  const [selectedItem, setSelectedItem] = useState<{ value: string; label: string } | null >(null);
  const [problemText, setProblemText] = useState('');
  const [gatherFactsText1, setGatherFactsText1] = useState('');
  const [gatherFactsText2, setGatherFactsText2] = useState('');
  const [gatherFactsText3, setGatherFactsText3] = useState('');
  const [stakeholders, setStakeholders] = useState<{ name: string; directly: boolean; indirectly: boolean }[]>([
    { name: '', directly: false, indirectly: false },
    { name: '', directly: false, indirectly: false },
    { name: '', directly: false, indirectly: false },
    { name: '', directly: false, indirectly: false },
    { name: '', directly: false, indirectly: false },
    { name: '', directly: false, indirectly: false },
    { name: '', directly: false, indirectly: false },
  ]);
  
  const [options, setOptions] = useState<{ title: string; description: string }[]>([
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },

  ]);

  //removing the test options section
  // const [radioSelections, setRadioSelections] = useState(
  //   Array.from({ length: 5 }, () => ({
  //     harm: '',
  //     publicity: '',
  //     reversible: '',
  //   }))
  // );

  const gatherFactsQuestions = [
    "Why did it happen the way it did?",
    "Where did it happen?",
    "When did it happen?",
  ];


  const [tentativeChoiceIndex, setTentativeChoiceIndex] = useState("");
  const[tentativeChoice, setTentativeChoice] = useState("");

  const [selectedRadioOption, setSelectedRadioOption] = useState<string>('');
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const handleRadioOptionChange = (value: string) => {
    setSelectedRadioOption(value);
    localStorage.setItem(`${prefix}selected-radio-option`, value);
  };

  const maxStakeholders = 12;
  const minStakeholders = 7;
  const maxWords = 200;

  //radio change for top of form
  const handleRadioChange = async (value: string, label: string) => {
    console.log("clicked ");
    let numDilemmas = await getNumCaseStudyOptions();
    if(numDilemmas == 0){
      numDilemmas = 10;
    }
    //console.log("num dilemmas is " + numDilemmas);
    //remove all for this radio button group
    for(let i = 0; i < numDilemmas; i++){
      localStorage.setItem(`${prefix}dilemma-${i}`, 'false');
    }
    setShowStudentInputs(false);
    setSelectedItem({ value, label });
    localStorage.setItem(`${prefix}${label}`, value);
  };

  //this function not needed unless test options are added back in
  //radio change for test options
  // Handling radio button change
  // const handleRadioChange2 = (sectionIndex: number, field: 'harm' | 'publicity' | 'reversible', value: string) => {
  //   const updatedSelections = [...radioSelections];
  //   updatedSelections[sectionIndex][field] = value;
    
  //   setRadioSelections(updatedSelections);


  //   localStorage.setItem(`${prefix}${field}-${value}-${sectionIndex}`, value);
  //   if(value == 'no'){
  //     localStorage.setItem(`${prefix}${field}-yes-${sectionIndex}`, 'false');
  //   }else{
  //     localStorage.setItem(`${prefix}${field}-no-${sectionIndex}`, 'false');
  //   }
    
  // };

  const handleTentativeChoiceChange = ( value: string, button: string) => {
    console.log(`Tentative choice value is handleTentativChoiceChange ${value}`)
    setTentativeChoice(value);
    setTentativeChoiceIndex(button.charAt(button.length - 1));
    
    for (let i = 0; i < 10; i++) {
      const tentativeChoiceKey = `tentative-choice-${i}`;
      if (tentativeChoiceKey !== button) {
        localStorage.setItem(`${prefix}${tentativeChoiceKey}`, 'false');
      }else{
        localStorage.setItem(`${prefix}${button}`, value);
      }
    }
  };

  // Function to handle stakeholder change
  const handleStakeholderChange = (index: number, field: 'name' | 'directly' | 'indirectly', value: any) => {
    const updatedStakeholders = [...stakeholders];
    if (field === 'name') {
      updatedStakeholders[index].name = value;
      localStorage.setItem(`${prefix}stakeholder-name-${index}`, value);
    } else if (field === 'directly') {
      updatedStakeholders[index].directly = value;
      localStorage.setItem(`${prefix}stakeholder-directly-${index}`, value);
    } else if (field === 'indirectly') {
      updatedStakeholders[index].indirectly = value;
      localStorage.setItem(`${prefix}stakeholder-indirectly-${index}`, value);
    }
    setStakeholders(updatedStakeholders);
  };

  // Function to add a new stakeholder card
  const addStakeholder = () => {
    if (stakeholders.length < maxStakeholders) {
      const newStakeholders = [...stakeholders, { name: '', directly: false, indirectly: false }];
      setStakeholders(newStakeholders);
      const index = newStakeholders.length - 1;
      localStorage.setItem(`${prefix}stakeholder-name-${index}`, '');
      localStorage.setItem(`${prefix}stakeholder-directly-${index}`, 'false');
      localStorage.setItem(`${prefix}stakeholder-indirectly-${index}`, 'false');
      localStorage.setItem(`${prefix}num_stakeholders`, String(newStakeholders.length)); 
    }
  };

  /**
   * This function removes a stakeholder card from the form.
   * It first checks if the number of stakeholders is greater than the minimum number of stakeholders allowed.
   * If it is, it removes the stakeholder from the stakeholders array and local storage.
   * It sets removalTriggered to true to trigger the useEffect that removes the stakeholder from local storage.
   * 
   * @param indexToRemove The index of the stakeholder to remove
   */
  const removeStakeholder = (indexToRemove: number) => {
    if (stakeholders.length > minStakeholders) { // Ensure we have more than 7 before allowing removal
    
      const updatedStakeholders = stakeholders.filter((_, index) => index !== indexToRemove);
      setStakeholders(updatedStakeholders); //triggers re-render
      setRemovalTriggered(true);
    }
  };

  /**
   * This useEffect runs when the removalTriggered state is set to true. It removes the stakeholder from the stakeholders array and local storage.
   * It then sets the removalTriggered state back to false.
   */
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
          localStorage.setItem(`${prefix}stakeholder-directly-${i}`, String(stakeholders[i].directly));
          localStorage.setItem(`${prefix}stakeholder-indirectly-${i}`, String(stakeholders[i].indirectly));
      }

      //remove last one
      //console.log("removing from LS at index " + (stakeholders.length));
      localStorage.removeItem(`${prefix}stakeholder-name-${stakeholders.length}`);
      localStorage.removeItem(`${prefix}stakeholder-directly-${stakeholders.length}`);
      localStorage.removeItem(`${prefix}stakeholder-indirectly-${stakeholders.length}`);
      localStorage.removeItem(`${prefix}short-term-${stakeholders.length}`);
      localStorage.removeItem(`${prefix}long-term-${stakeholders.length}`);
        
      localStorage.setItem(`${prefix}num_stakeholders`, String(stakeholders.length));
      //console.log("====END OF REMOVING")
  };

  const countWords = (text: string): number => {
    // Check if text is defined and is a string, then proceed with trimming
    if (typeof text !== 'string') {
      return 0; // If it's not a string, return 0 (no words)
    }
  
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };
  

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, text: string) => {
    if (countWords(text) <= maxWords) {
      setter(text);
    }
  };


  const handleOptionChange = (index: number, field: 'title' | 'description', value: string) => {
    const updatedOptions = [...options];
    if (field === 'title') {
      updatedOptions[index].title = value;
      localStorage.setItem(`${prefix}option-title-${index}`, value);
    } else if (field === 'description') {
      updatedOptions[index].description = value;
      localStorage.setItem(`${prefix}option-description-${index}`, value);
    }
    setOptions(updatedOptions);
  };


  /**
   * This function clears all the local storage data for the form, except for stakeholder name, directly and indirectly.
   * This runs when the form has been submitted/saved to the backend database and the user no longer needs the info kept in local storage.
   */
  const clearLocalStorage = () => {
    for(let i = 0; i < 4; i++){
      localStorage.removeItem(`${prefix}dilemma-${i}`);
      localStorage.removeItem(`${prefix}gather-facts-${i}`);
    }
    //this for loop has to do with the test options section
    // for(let i = 0; i < 5; i++){
    //   localStorage.removeItem(`${prefix}option-title-${i}`);
    //   localStorage.removeItem(`${prefix}option-description-${i}`);
    //   localStorage.removeItem(`${prefix}harm-no-${i}`);
    //   localStorage.removeItem(`${prefix}harm-yes-${i}`);
    //   localStorage.removeItem(`${prefix}publicity-no-${i}`);
    //   localStorage.removeItem(`${prefix}publicity-yes-${i}`);
    //   localStorage.removeItem(`${prefix}reversible-no-${i}`);
    //   localStorage.removeItem(`${prefix}reversible-yes-${i}`);
    //   localStorage.removeItem(`${prefix}tentative-choice-${i}`);
    // }
    localStorage.removeItem(`${prefix}results-1`);
    localStorage.removeItem(`${prefix}results-2`);
    localStorage.removeItem(`${prefix}state-the-problem`);

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
   * Adds professor feedback comments.
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

        //form is locked/submitted, so fetch professor feedback
        fetchFeedback();
      }
    })();
  }, [lockForm]);

  /**
   * This function fetches the feedback data from the backend API and sets the feedback state.
   * The feedback data is stored in the feedback state as a key-value pair, where the key is the answer key and the value is the feedback content.
   */
  const fetchFeedback = async () => {
    //get professor feedback
    interface Feedback {
      content: string;
      key: string;
    }
    let feedbackContent: Feedback[] = [];

    try {
      console.log("inside feedback handler, assigment id is ", assignmentID, " and form name is ", formName);
      const response = await axios.get(`${apiUrl}/api/flask/feedback?assignment_id=${assignmentID}&form_name=${encodeURIComponent(formName)}`);
      const feedbackData = response.data;
      //console.log("Raw API Response: ", response.data);

      // Check if feedback exists and then map it
      if (feedbackData && feedbackData.feedback && feedbackData.feedback.length > 0) {
        feedbackContent = feedbackData.feedback.map((feedback: Feedback) => ({
          content: feedback.content,
          key: feedback.key
        }));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.log("No feedback found for this form");
      } else {
        console.log("Error fetching feedback data: ", error);
      }
    }
    //console.log("Feedback content is: ", feedbackContent);
    const feedbackDict: { [key: string]: string } = {};
    feedbackContent.forEach((item) => {
      feedbackDict[item.key] = item.content;
    });
    setFeedback(feedbackDict);
  }

  async function getNumCaseStudyOptions(): Promise<number> {
        let data;
        try {
          const response = await axios.get(`${apiUrl}/api/flask/case-study/options?case_study_id=${Cookie.get("case_study_id")}`);
          data = response.data.options;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log("No saved data found for this form");
          } else {
            console.log("Error fetching form data: ", error);
          }
        }

        return data ? data.length : 0;
  }


  /**
   * This useEffect runs when the page loads for the first time and populates the form with saved data. 
   * The useEffect makes 2 API calls, one to get professor feedback and one to get the saved form data.
   * 
   * When populating form fields, it first checks for data in the feedback state, based on data from the feedback table (it only populates text-input fields).
   * If there is no feedback data, it then checks the local storage for saved data.
   * If there is no local storage data, it sets the form fields to the answers saved in the answers table.
   * If there is no saved data in the answers table, it sets the form fields to their default values.
   * 
   * Dependencies: feedback
   *  The useEffect will run whenever the feedback state changes, ensuring that the feedback dictionary is populated before going forward.
   */
  useEffect(() => {
    //console.log("use effect is running");
    // Get case study options
    const getOptions = async () => {
      const caseStudyId = Cookie.get('case_study_id') || '';
      let data;
      let optionContent: RadioItem[] = [];
      // fetch data from DB if available
      try {
        const response = await axios.get(`${apiUrl}/api/flask/case-study/options?case_study_id=${caseStudyId}`);
        data = response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("No options found for this form");
        } else {
          console.log("Error fetching option data: ", error);
        }
      }
      console.log("option data is", data);
      // if data exists, set to content
      if (data && data.options && data.options.length > 0) {
        optionContent = data.options.map((caseOption: RadioItem) => ({
          id: caseOption.id,
          label: caseOption.label,
          description: caseOption.description
        }));
      }
      else {
        optionContent = caseOptions;
      }
      console.log("options content is", optionContent);
      const updatedCaseOptions = [...optionContent];
      setCaseOptions(updatedCaseOptions);
    }

    const fetchData = async () => {
      
      try {
        //get saved answers in the answers table
        let data;
        try{
          const assignmentID = Cookie.get('assignment_id'); 
          const userId = localStorage.getItem('id');
          const response = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentID}&form_name=${formName}`);
          data = response.data.data;
        }catch(error){
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log("No saved data found for this form");
          }else{
              console.log("Error fetching form data: ", error);
          }
        }
       
        //populate the form fields, first check local storage, then professor feedback, then plain answers
        //get the saved data from the API call and save in the "content" variable, it is a JSON array
          let content;
          if(data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content){
            content = data[0].answers[0].content;
          }else{
            content = [];
          }
          console.log("content is", content);
          console.log("feedback content in use effect is ", feedback);

          //populate radio button group at top of form
          let numDilemmas = await getNumCaseStudyOptions();
          if(numDilemmas == 0){
            numDilemmas = 10;
          }
          
          let foundInLocalStorage = false;
          for(let i = 0; i < numDilemmas; i++){
            
              const dilemmaKey = `dilemma-${i}`;
              console.log(`Searching for ${prefix}${dilemmaKey} in local storage`);
              if(localStorage.getItem(`${prefix}${dilemmaKey}`) !== null && localStorage.getItem(`${prefix}${dilemmaKey}`) !== 'false'){
                setSelectedItem({ value: localStorage.getItem(`${prefix}${dilemmaKey}`) || '', label: dilemmaKey });
                foundInLocalStorage = true;
                console.log("Found in local storage!!!!!!!!!!!");
                break;
              }
            
          }
         
          if(!foundInLocalStorage){
            console.log("Not found in local storage!!!!!!!!!!!");
            for(let i = 0; i < numDilemmas; i++){
              const dilemmaKey = `dilemma-${i}`;
              console.log(dilemmaKey);
              if(content[dilemmaKey] !== 'false'){
                setSelectedItem({ value: content[dilemmaKey], label: dilemmaKey });
                console.log("Setting selected RADIO BUTTON AT TOP OF FORM");
                break;

              }
            }
          }
          
          // Set problem text
          setProblemText(feedback["state-the-problem"] || localStorage.getItem(`${prefix}state-the-problem`) || content["state-the-problem"] || '');
          
          // Set gather facts text fields
          setGatherFactsText1(feedback["gather-facts-1"] || localStorage.getItem(`${prefix}gather-facts-1`) || content["gather-facts-1"] || '');
          setGatherFactsText2(feedback["gather-facts-2"] || localStorage.getItem(`${prefix}gather-facts-2`) || content["gather-facts-2"] || '');
          setGatherFactsText3(feedback["gather-facts-3"] || localStorage.getItem(`${prefix}gather-facts-3`) || content["gather-facts-3"] || '');
  
          // Extract num_stakeholders and populate stakeholder data
          const numStakeholders = localStorage.getItem(`${prefix}num_stakeholders`) || content["num_stakeholders"] || 7;
          const stakeholdersData = [];
          for (let i = 0; i < numStakeholders; i++) {
            const nameKey = `stakeholder-name-${i}`;
            const directlyKey = `stakeholder-directly-${i}`;
            const indirectlyKey = `stakeholder-indirectly-${i}`;

            const name = feedback[nameKey] || localStorage.getItem(`${prefix}${nameKey}`) || content[nameKey] || '';
            //console.log("found stakeholder name in local storage: " + name);

            let directly;
            if(localStorage.getItem(`${prefix}${directlyKey}`) !== null){
              // console.log(directlyKey);
              // console.log(" does " + localStorage.getItem(`${prefix}${directlyKey}`) + " equal true?");
              // console.log(localStorage.getItem(`${prefix}${directlyKey}`) === 'true');
              directly = localStorage.getItem(`${prefix}${directlyKey}`) === 'true' ? true : false;
            }else{
              directly = content[directlyKey] === 'directly';
            }

            let indirectly;
            if(localStorage.getItem(`${prefix}${indirectlyKey}`) !== null){
              indirectly = localStorage.getItem(`${prefix}${indirectlyKey}`) === 'true' ? true : false;  
            }else{
              indirectly = content[indirectlyKey] === 'indirectly';
            }
  
            stakeholdersData.push({
              name,
              directly,
              indirectly
            });
          }
          setStakeholders(stakeholdersData);
  
          // Set options data
          const optionsData = [];
          for (let i = 0; i < 3; i++) {  // Assuming 3 options
            const titleKey = `option-title-${i}`;
            const descriptionKey = `option-description-${i}`;

            let title: string | null = null;
            title = feedback[titleKey]; //first check for feedback
            if(title == null) title = localStorage.getItem(`${prefix}${titleKey}`); //then check local storage
            if(title == null || title == '') title = content[titleKey]; //then check database answers
            //console.log("content[titlekey] is " + content[titleKey]);
            if(title == null) title = '';

            let desc: string | null = null;
            desc = feedback[descriptionKey]; 
            if(desc == null) desc = localStorage.getItem(`${prefix}${descriptionKey}`);
            if(desc == null) desc = content[descriptionKey];
            if(desc == null) desc = '';

            optionsData.push({
              title: title,
              description: desc,
            });
          }
          setOptions([...optionsData]);
          //console.log("1 options data is " + JSON.stringify(options, null, 2));

          //not needed with no test options section
          // Populate radio button selections 
          // const radioSelectionsData = [];

          // var i = 0;
          // for(i = 0; i < 5; i++){
          //   const harmNo = localStorage.getItem(`${prefix}harm-no-${i}`) || content[`harm-no-${i}`] || '';
          //   const harmYes = localStorage.getItem(`${prefix}harm-yes-${i}`) || content[`harm-yes-${i}`] || '';
          //   const publicityNo = localStorage.getItem(`${prefix}publicity-no-${i}`) || content[`publicity-no-${i}`] || '';
          //   const publicityYes = localStorage.getItem(`${prefix}publicity-yes-${i}`) || content[`publicity-yes-${i}`] || '';
          //   const reversibleNo = localStorage.getItem(`${prefix}reversible-no-${i}`) || content[`reversible-no-${i}`] || '';
          //   const reversibleYes = localStorage.getItem(`${prefix}reversible-yes-${i}`) || content[`reversible-yes-${i}`] || '';

          //   radioSelectionsData.push({
          //     harm: (harmNo != 'false')? harmNo : harmYes,
          //     publicity: (publicityNo != 'false')? publicityNo : publicityYes,
          //     reversible: (reversibleNo != 'false')? reversibleNo : reversibleYes,
          //   })
            
          // }
          // setRadioSelections(radioSelectionsData);

          for(let i = 0; i < 3; i++){
            const choiceKey = `tentative-choice-${i}`;

            if(localStorage.getItem(`${prefix}${choiceKey}`) != null && localStorage.getItem(`${prefix}${choiceKey}`) != 'false'){
              setTentativeChoice(localStorage.getItem(`${prefix}${choiceKey}`) || '');
              setTentativeChoiceIndex(i.toString());
              break;
            }
            if(content[choiceKey] != null && content[choiceKey] != 'false'){
              setTentativeChoice(content[choiceKey]);
              setTentativeChoiceIndex(i.toString());
              break;
            }
          }


          
          //end
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching form data: ", error);
        setLoading(false);
      }
    };
  
    fetchData();
    getOptions();
    
  }, [feedback]);

  

  useEffect(() => {
    //console.log("Updated options:", options);
    setIsLoading(false);
  }, [options]); // This will log whenever `options` changes

  

  /**
   * This displays the Dots Loading component until the form is populated with the saved data or default values.
   */
  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
  }

  

  /**
   * This function handles the form submission. It retrieves the student ID from local storage and the case study ID from the cookie.
   * It then retrieves the form name from the form element, and constructs an object to hold the answers as key-value pairs.
   * It then sends the data to the backend API using axios.
   * 
   * It does this by getting all DOM elements with the class name 'answer-input' and iterating over them.
   * All form inputs you want sent to the backend MUST have the class name 'answer-input'.
   * 
   * @param e  The form submission event
   */
  const submitAssignmentForm = async (e:any) => {
      console.log("Saving dilemma form answers");
      e.preventDefault()
      //console.log("Entered the submit assignment handler")
      const studentID = localStorage.getItem('id'); 
      
      const caseStudyID = Cookie.get('case_study_id');
      const formName = e.currentTarget.getAttribute('data-form-name') || 'dilemma'; // Dynamically get the form name or set a default
      //console.log("form name is " + formName);
      
      const answers: { [key: string]: string | { num_stakeholders: number } } = {}; //an object to hold the answers as key-value pairs

      let caseStudyOptionID = "NaV";

      document.querySelectorAll('.answer-input').forEach(input => {
        const inputElement = input as HTMLInputElement;

        // Handle checkboxes and radio buttons
        if (inputElement.type === 'checkbox' || inputElement.type === 'radio') {
          if(inputElement.checked) {
            answers[inputElement.id] = inputElement.value;
            if(inputElement.id.includes("dilemma")){
              caseStudyOptionID = inputElement.value;
            }
          } else {
            answers[inputElement.id] = 'false';
          }
        } else {
          // Handle other input types (e.g., text inputs)
          answers[inputElement.id] = inputElement.value;
        }
      });

      console.log(answers)

      const numStakeholders = stakeholders.length;
      answers['num_stakeholders'] = String(numStakeholders);

      //for the assignment table
      const data = {
        student_id: studentID,
        assignment_id: assignmentID,
        case_study_id: caseStudyID,
        form_name: formName,
        //num_stakeholders: numStakeholders,
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
          if(localStorage.getItem('guest') == 'true'){
            console.log('user is guest, setting case study option')
            const case_study_data = {
              assignment_id: assignmentID,
              case_study_option: caseStudyOptionID
            }
            const optionResponse = await axios.patch(`${apiUrl}/api/flask/assignment/set-case-study-option`, case_study_data, {
              headers: {
               'Content-Type': 'application/json',
              }
            });
            console.log(`option response ${optionResponse}`)
          }
        }else{
          response = await axios.post(`${apiUrl}/api/flask/assignment/submit-form`, data, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        }
    
        // Handle successful response
        alert(response.data.message); // Assuming your backend returns a message
        //alert(response.data.keys); // Assuming your backend returns a message;
        
        if(submitted) {
          const case_study_data = {
            assignment_id: assignmentID,
            case_study_option: caseStudyOptionID
          }
          response = await axios.patch(`${apiUrl}/api/flask/assignment/set-case-study-option`, case_study_data, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          console.log(`Case study option submit: ${response.data.message}`);
        }

        clearLocalStorage();
        if(submitted || localStorage.getItem("guest") == "true"){
          localStorage.setItem(`${prefix}dilemma-submitted`, "true");
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
    <div className="flex justify-center">
      
      <form onSubmit={submitAssignmentForm} ref={formRef} data-form-name="dilemma" className="w-full max-w-5xl space-y-6 bg-white rounded-lg shadow-md p-6">
        
        
        <FormCompletedCard isVisible={lockForm} />
       
        {/*CASE STUDY OPTIONS*/}
        <h1 className={`${lusitana.className} mb-4 text-2xl text-center`}>
          Select one of the following case studies
        </h1>

        {shuffledOptions.map((item) => (
          <div
            key={`option-${item.originalIndex}`}
            className={`border border-gray-300 rounded-lg p-4 transition-all duration-300 ${selectedItem?.value === `option-${item.originalIndex}` ? 'bg-gray-50' : ''}`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="ethicalConsideration" // Group name for radio buttons
                id={`dilemma-${item.originalIndex}`} 
                value={item.id}
                onChange={() => handleRadioChange(`${item.id}`, `dilemma-${item.originalIndex}`)}
                checked={selectedItem?.value === `${item.id}`} // Check if the current answer matches
                className="answer-input mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
                //disabled={submitted} // Disable if submitted is true
              />
              <label htmlFor={`${item.id}`} className="text-md font-medium text-gray-900">{item.label}</label>
            </div>
            {/* Show description preview only when not selected */}
            {selectedItem?.value !== `${item.id}` && (
              <p className="mt-2 text-md text-gray-700">{getDescriptionPreview(item.description)}</p>
            )}
            {/* Show full description only when selected */}
            {selectedItem?.value === `${item.id}` && (
              <p className="mt-2 text-md text-gray-700">{item.description}</p>
            )}
          </div>
        ))}
        <div className="border border-gray-300 rounded-lg p-4 transition-all duration-300 bg-gray-50">
          <input 
            type="radio"
            name="ethicalConsideration"
            id="dilemma-student"
            value="student-option"
            onChange={() => {
              setSelectedItem({ value: 'student-option', label: 'Student Option'});
              setShowStudentInputs(true);
              localStorage.setItem(`${prefix}dilemma-student`, 'true');
            }}
            checked={selectedItem?.value === 'student-option'}
            className="answer-input mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <label htmlFor="dilemma-student" className="text-md font-medium text-gray-900">
            Enter the details of your hard case and/or difficult decision here - 700 words max
          </label>
          {showStudentInputs && (
          <div className="mt-2 flex flex-col gap-2">
            <input 
              type="text"
              id="student-option-title"
              placeholder="Case Study Title"
              value={studentOptionTitle}
              onChange={e => setStudentOptionTitle(e.target.value)}
              className="answer-input border border-gray-300 rounded-lg p-2"
            />
            <textarea 
              id="student-option-description"
              placeholder="Enter details"
              value={studentOptionDescription}
              onChange={e => setStudentOptionDescription(e.target.value)}
              className="answer-input border border-gray-300 rounded-lg p-2 resize-none"
              rows={3}
            />
          </div>
          )}
        </div>
        {/*Professor Comment Box for key RADIO BUTTONS */}
        {lockForm && feedback["select-dilemma"] && (
          <div className="border border-gray-200 rounded-lg p-4 mt-4">
            <ProfessorCommentBox comment={feedback["select-dilemma"]} />
          </div>
        )}

        {/* Fieldset for stating the problem */}
        <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
          <legend className="font-semibold">State the problem:</legend>
          {!lockForm && (
            <>
              <textarea
                required
                id="state-the-problem"
                placeholder="Think of yourself as a key decision maker in this case. Why does this case present an ethical problem? Why is it hard to know what is the right/wrong choice?"
                rows={4}
                value={problemText}
                disabled={false} 
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  handleInputChange(setProblemText, e.currentTarget.value);
                  const target = e.currentTarget;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                  localStorage.setItem(`${prefix}state-the-problem`, e.currentTarget.value);
                }}
                className="answer-input w-full border border-gray-300 rounded-lg p-2 resize-none"
              />
              <p className={`text-md text-gray-700 ${countWords(problemText) > maxWords ? 'text-red-500' : ''}`}>
                {countWords(problemText)}/{maxWords} words
              </p>
            </>
          )}
          {lockForm && (
            <>
              <div
                className="border border-gray-300 rounded-lg p-2 mt-2"
                dangerouslySetInnerHTML={{
                  __html: problemText ? problemText.replace(
                  /<c>(.*?)<\/c>/g,
                  '<span class="text-red-500">$1</span>'
                  ) : '',
                }}
              />
            </>
          )}
        </fieldset>

        {/* Fieldset for gathering facts */}
        <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
          <legend className="font-semibold">Gather facts:</legend>
          {gatherFactsQuestions.map((question, index) => (
            <div key={index}>
              <label className="block text-md font-medium text-gray-900">{question}</label>
              {!lockForm && (
                <>
                  <textarea
                    required
                    id={`gather-facts-${index + 1}`}
                    placeholder={question}
                    value={[gatherFactsText1, gatherFactsText2, gatherFactsText3][index]}
                    onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                      const setters = [setGatherFactsText1, setGatherFactsText2, setGatherFactsText3];
                      handleInputChange(setters[index], e.currentTarget.value);
                      const target = e.currentTarget;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                      localStorage.setItem(`${prefix}gather-facts-${index + 1}`, e.currentTarget.value);
                    }}
                    className="answer-input mt-1 w-full border border-gray-300 rounded-lg p-2 resize-none"
                    rows={2}
                  />
                  <p className={`text-md text-gray-700 ${countWords([gatherFactsText1, gatherFactsText2, gatherFactsText3][index]) > maxWords ? 'text-red-500' : ''}`}>
                    {countWords([gatherFactsText1, gatherFactsText2, gatherFactsText3][index])}/{maxWords} words
                  </p>
                </>
              )}
              {lockForm && (
                <>
                  <div
                    className="border border-gray-300 rounded-lg p-2 mt-2"
                    dangerouslySetInnerHTML={{
                      __html: [gatherFactsText1, gatherFactsText2, gatherFactsText3][index] ? [gatherFactsText1, gatherFactsText2, gatherFactsText3][index].replace(
                      /<c>(.*?)<\/c>/g,
                      '<span class="text-red-500">$1</span>'
                      ) : '',
                    }}
                  />
                </>
              )}
              
            </div>
          ))}
        </fieldset>

        {/* Fieldset for stakeholders */}
        <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
          <legend className="font-semibold">Identify Stakeholders:</legend>
          {stakeholders.map((stakeholder, index) => (
            <div key={index} className="flex items-center space-x-4">
              {!lockForm && (
                <>
                <input
                  required
                  id={`stakeholder-name-${index}`}
                  type="text"
                  maxLength={50}
                  placeholder={`Stakeholder #${index + 1} Name`}
                  value={stakeholder.name}
                  onChange={(e) => handleStakeholderChange(index, 'name', e.target.value)}
                  className="answer-input w-full border border-gray-300 rounded-lg p-2"
                />
                </>
              
              )}
              {lockForm && (
                <>
                  <div
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  
                    dangerouslySetInnerHTML={{
                    __html: stakeholder.name ? stakeholder.name.replace(
                    /<c>(.*?)<\/c>/g,
                    '<span class="text-red-500">$1</span>'
                    ) : '',
                    }}
                  />
                </>
              )}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 sm:mt-0">
                <label className="flex items-center">
                  <input
                    id={`stakeholder-directly-${index}`}
                    type="checkbox"
                    checked={stakeholder.directly}
                    onChange={(e) => handleStakeholderChange(index, 'directly', e.target.checked)}
                    className="answer-input h-4 w-4"
                    value="directly"
                  />
                  <span className="ml-2 text-md">Directly</span>
                </label>
                <label className="flex items-center mt-2 sm:mt-0">
                  <input
                  id={`stakeholder-indirectly-${index}`}
                  type="checkbox"
                  checked={stakeholder.indirectly}
                  onChange={(e) => handleStakeholderChange(index, 'indirectly', e.target.checked)}
                  className="answer-input h-4 w-4"
                  value="indirectly"
                  />
                  <span className="ml-2 text-md">Indirectly</span>
                </label>
                </div>
              {/* TrashIcon to remove stakeholder */}
              {stakeholders.length > minStakeholders && (
                <button
                  type="button"
                  onClick={() => removeStakeholder(index)}
                  className="ml-4 hover:text-red-800"
                  aria-label="Remove Stakeholder"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          {stakeholders.length < maxStakeholders && (
            <Button type="button" onClick={addStakeholder} className="mt-4">
              Add Stakeholder
            </Button>
          )}
        </fieldset>

         {/* Fieldset for developing options */}
         <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
          <legend className="font-semibold">Develop Options:</legend>
          {!lockForm && options.map((option, index) => (
              <div key={index} className="space-y-2">
                <input
                  required
                  id={'option-title-' + index}
                  type="text"
                  maxLength={50}
                  placeholder="Give it a title"
                  value={option.title}
                  onChange={(e) => handleOptionChange(index, 'title', e.target.value)}
                  className="answer-input w-full border border-gray-300 rounded-lg p-2"
                />
                <textarea
                  required
                  id={'option-description-' + index}
                  placeholder="Describe the decision"
                  rows={3}
                  value={option.description}
                  onChange={(e) => handleInputChange((value) => handleOptionChange(index, 'description', e.currentTarget.value), e.currentTarget.value)}
                  className="answer-input w-full border border-gray-300 rounded-lg p-2 resize-none"
                />
                <p className={`text-md text-gray-700 ${countWords(option.description) > 50 ? 'text-red-500' : ''}`}>
                  {countWords(option.description)}/50 words
                </p>
              </div>
            ))}
            {lockForm && options.map((option, index) => (
                <div key={index} className="space-y-2">
                
                  <div
                    className="border border-gray-300 rounded-lg p-2 mt-2 min-h-[50px]"
                    dangerouslySetInnerHTML={{
                      __html: option.title ? option.title.replace(
                      /<c>(.*?)<\/c>/g,
                      '<span class="text-red-500">$1</span>'
                      ) : '',
                    }}
                  />

                  <div
                    className="border border-gray-300 rounded-lg p-2 mt-2 min-h-[100px]"
                    dangerouslySetInnerHTML={{
                      __html: option.description ? option.description.replace(
                      /<c>(.*?)<\/c>/g,
                      '<span class="text-red-500">$1</span>'
                      ) : '',
                    }}
                  />
                </div>
            ))}
          
        </fieldset>

        {/*Field set for the  Test Options section*/}
        {/*Removing this section*/}
        {/*<fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
            <legend className="font-semibold">Test Options:</legend>
            {options.map((option, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 flex flex-col">

                {!lockForm && (
                  <label className="font-semibold">{option.title || `Option ${index + 1}`}</label>
                )}
                {lockForm && (
                  //remove the <c></c> professor feedback comments
                  <label className="font-semibold">
                   {option.title.replace(/<[^>]*>.*?<\/[^>]*>/g, "") || `Option ${index + 1}`}
                  </label>
                 
                )}
                


                <div className="flex justify-between items-center mt-2">
                    <span className="text-md">Will this cause harm?</span>
                    <div className="flex space-x-2">
                    <label className="flex items-center">
                        <input
                          required
                          id={'harm-yes-' + index}
                          type="radio"
                          name={`harm-${index}`}
                          value="yes"
                          checked={radioSelections[index]?.harm === 'yes'}
                          onChange={() => handleRadioChange2(index, 'harm', 'yes')}
                          className="answer-input mr-1"
                        />
                        Yes
                    </label>
                    <label className="flex items-center">
                        <input
                          required
                          id={'harm-no-' + index}
                          type="radio"
                          name={`harm-${index}`}
                          value="no"
                          checked={radioSelections[index]?.harm === 'no'}
                          onChange={() => handleRadioChange2(index, 'harm', 'no')}
                          className="answer-input mr-1"
                        />
                        No
                    </label>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-md">Will this create negative publicity?</span>
                    <div className="flex space-x-2">
                    <label className="flex items-center">
                        <input
                          required
                          id={'publicity-yes-' + index}
                          type="radio"
                          name={`publicity-${index}`}
                          value="yes"
                          checked={radioSelections[index]?.publicity === 'yes'}
                          onChange={() => handleRadioChange2(index, 'publicity', 'yes')}
                          className="answer-input mr-1"
                        />
                        Yes
                    </label>
                    <label className="flex items-center">
                        <input
                          required
                          id={'publicity-no-' + index}
                          type="radio"
                          name={`publicity-${index}`}
                          value="no"
                          checked={radioSelections[index]?.publicity === 'no'}
                          onChange={() => handleRadioChange2(index, 'publicity', 'no')}
                          className="answer-input mr-1"
                        />
                        No
                    </label>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-md">Can the impacts be reversed?</span>
                    <div className="flex space-x-2">
                    <label className="flex items-center">
                        <input 
                          required
                          id={'reversible-yes-' + index}
                          type="radio"
                          name={`reversible-${index}`}
                          value="yes"
                          checked={radioSelections[index]?.reversible === 'yes'}
                          onChange={() => handleRadioChange2(index, 'reversible', 'yes')}
                          className="answer-input mr-1"
                        />
                        Yes
                    </label>
                    <label className="flex items-center">
                        <input
                          required
                          id={'reversible-no-' + index}
                          type="radio"
                          name={`reversible-${index}`}
                          value="no"
                          checked={radioSelections[index]?.reversible === 'no'}
                          onChange={() => handleRadioChange2(index, 'reversible', 'no')}
                          className="answer-input mr-1"
                        />
                        No
                    </label>
                    </div>
                </div>
                </div>
            ))}

            {/*Professor Comment Box for key TEST-OPTIONS */}
            {/*not needed with no test options sextion*/}
            {/*}
            {lockForm && feedback["test-options"] && (
              <div className="border border-gray-200 rounded-lg p-4">
                <ProfessorCommentBox comment={feedback["test-options"]} />
              </div>
            )}
        </fieldset>
        */}


        {/*Field set for the tentative choice section*/}
        <fieldset className="border border-gray-300 rounded-lg p-4 mt-4">
            <legend className="font-semibold">Make a tentative choice:</legend>
            <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
                <label className="font-semibold">
                  Which option is the best choice based on your analysis so far?
                </label>
                <span className="text-md mb-2">
                  Choose one option to move on to deeper analysis on the Ethics Dashboard.
                </span>


                <div className="flex space-x-4">
                  {options.map((option, index) => (
                      <label key={index} className="flex items-center">
                      <input
                          required
                          id={'tentative-choice-' + index}
                          type="radio"
                          name="tentative-choice"
                          value={`${option.title}`}
                          className="answer-input mr-1"
                          checked={tentativeChoiceIndex === index.toString()} // Bind to state
                          onChange={() => handleTentativeChoiceChange(`${option.title}`, `tentative-choice-${index}`)} // Update state on change
                      />
                      {option.title.replace(/<[^>]*>.*?<\/[^>]*>/g, "") || `Option ${index + 1}`}
                      </label>
                  ))}
                </div>
            </div>
            {/*Professor Comment Box for key TENTATIVE CHOICE */}
            {lockForm && feedback["tentative-choice"] && (
              <div className="border border-gray-200 rounded-lg p-4 mt-4">
                <ProfessorCommentBox comment={feedback["tentative-choice"]} />
              </div>
            )}
        </fieldset>
          

        <div className="flex justify-center mt-6 gap-4">
          <Button
           type="button"
            onClick={(e) => {
              //console.log("save button clicked");
              //if the user is a guest unlock the other forms and set case study option
              if(localStorage.getItem("guest") == "true"){
                localStorage.setItem(`${prefix}dilemma-submitted`, "true")
              }
              submitAssignmentForm(e);
            }} 
            data-html2canvas-ignore className="final-button bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition" data-form-name={formName}>
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