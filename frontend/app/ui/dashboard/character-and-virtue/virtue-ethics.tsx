"use client";

import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Cookie from 'js-cookie';
import { Button } from '@/app/ui/button';
import DotsLoading from '@/app/ui/components/loading';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import TextInput from '@/app/ui/components/text-input';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import OpenAI from "openai";
import Head from 'next/head';
import FeedbackDisplay from '@/app/ui/components/feedback-display';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from '@/app/ui/components/prof-comment-box';
import DescriptionCard from "@/app/ui/components/description-card";
import Papa from 'papaparse';
import { string } from "zod";


export default function VirtueEthicsForm() {
    const formName = 'virtue-ethics';
    const formRef = useRef<HTMLFormElement>(null);
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [loading, setLoading] = useState(true);
    const assignmentID = Cookie.get('assignment_id');
    const prefix = assignmentID + "-";
    const maxWords = 200;
    const minDomains = 5;
    const maxDomains = 10;
    const [removalTriggered, setRemovalTriggered] = useState(false);
    let submitted = false;
    const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
    const [isRendered, setIsRendered] = useState(false);
    const [allSuggestions, setAllSuggestions] = useState<string[]>([]);

    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
    const [questionsInitialized, setQuestionsInitialized] = useState(false); //set to true once critical qs have been fetched from DB

    const apiKey = "";
    const openai = new OpenAI({apiKey, dangerouslyAllowBrowser: true});

    const [domainToLabels, setDomainLabels] = useState<{ domain: string; deficiency: string; virtue: string; excess: string }[]>([]);

    /*
        | Sphere of Action (Domain)        | Vice of Deficiency           | Virtue (Mean)            | Vice of Excess             |
        |----------------------------------|------------------------------|--------------------------|----------------------------|
        | Facing Danger                    | Cowardice                    | Courage                  | Recklessness               |
        | Enjoying Life’s Pleasures        | Self-Denial                  | Moderation               | Indulgence                 |
        | Managing Wealth                  | Stinginess                   | Generosity               | Extravagance               |
        | Pursuit of Goals                 | Lack of Ambition             | Ambition                 | Ruthlessness               |
        | Self-Worth                        | Undervaluing Yourself        | Confidence               | Arrogance                  |
        | Managing Emotions                 | Apathy                       | Patience                 | Anger (Short-Tempered)     |
        | Expressing Truth                 | Deceit (Dishonesty)          | Honesty                  | Bluntness (Tactlessness)   |
        | Humor & Conversation             | Humorlessness                | Wit                      | Foolishness                |
        | Social Interactions              | Coldness (Aloofness)         | Friendliness             | Excessive Friendliness     |
        | Sense of Shame                   | Shamelessness                | Humility                 | Over-Sensitivity           |
        | Social Media Use                 | Disconnection                | Mindful Engagement       | Addiction (Overuse)        |
        | Environmental Responsibility     | Neglect                      | Sustainability           | Eco-Fanaticism (Zealotry)  |
        | Work-Life Balance                | Apathy                       | Work-Life Balance        | Workaholism                |
        | Financial Management             | Frugality (Stinginess)       | Financial Prudence       | Consumerism (Over-Spending)|
        | Digital Communication            | Aloofness (Non-response)     | Digital Civility         | Oversharing                |
        | Personal Health                  | Neglect (Laziness)           | Wellness                 | Obsession (Health Fixation)|
        | Data Privacy                     | Carelessness                 | Cautiousness             | Paranoia                   |
        | Cultural Sensitivity             | Cultural Ignorance           | Open-mindedness          | Cultural Appropriation     |
        | Assertiveness                     | Passivity                    | Assertiveness            | Aggressiveness             |
        | Compassion and Empathy           | Indifference                 | Compassion               | Over-Identifying (Self-sacrifice) |
        | Technology Adoption              | Resistance (Luddism)         | Adaptability             | Tech Dependence            |
        | Ethical Consumption              | Indifference to Ethics       | Ethical Consumerism      | Moral Elitism              |
        | Diversity and Inclusion          | Exclusion                    | Inclusivity              | Tokenism                   |
    */

    // this is the old list of domains, replacing with csv file of them
    // const domainToLabels = [
    //     {domain: 'Facing Danger', deficiency: 'Cowardice', virtue: 'Courage', excess: 'Recklessness'},
    //     {domain: 'Enjoying Life’s Pleasures', deficiency: 'Self-Denial', virtue: 'Moderation', excess: 'Indulgence'},
    //     {domain: 'Managing Wealth', deficiency: 'Stinginess', virtue: 'Generosity', excess: 'Extravagance'},
    //     {domain: 'Pursuit of Goals', deficiency: 'Lack of Ambition', virtue: 'Ambition', excess: 'Ruthlessness'},
    //     {domain: 'Self-Worth', deficiency: 'Undervaluing Yourself', virtue: 'Confidence', excess: 'Arrogance'},
    //     {domain: 'Managing Emotions', deficiency: 'Apathy', virtue: 'Patience', excess: 'Anger (Short-Tempered)'},
    //     {domain: 'Expressing Truth', deficiency: 'Deceit (Dishonesty)', virtue: 'Honesty', excess: 'Bluntness (Tactlessness)'},
    //     {domain: 'Humor & Conversation', deficiency: 'Humorlessness', virtue: 'Wit', excess: 'Foolishness'},
    //     {domain: 'Social Interactions', deficiency: 'Coldness (Aloofness)', virtue: 'Friendliness', excess: 'Excessive Friendliness'},
    //     {domain: 'Sense of Shame', deficiency: 'Shamelessness', virtue: 'Humility', excess: 'Over-Sensitivity'},
    //     {domain: 'Social Media Use', deficiency: 'Disconnection', virtue: 'Mindful Engagement', excess: 'Addiction (Overuse)'},
    //     {domain: 'Environmental Responsibility', deficiency: 'Neglect', virtue: 'Sustainability', excess: 'Eco-Fanaticism (Zealotry)'},
    //     {domain: 'Work-Life Balance', deficiency: 'Apathy', virtue: 'Work-Life Balance', excess: 'Workaholism'},
    //     {domain: 'Financial Management', deficiency: 'Frugality (Stinginess)', virtue: 'Financial Prudence', excess: 'Consumerism (Over-Spending)'},
    //     {domain: 'Digital Communication', deficiency: 'Aloofness (Non-response)', virtue: 'Digital Civility', excess: 'Oversharing'},
    //     {domain: 'Personal Health', deficiency: 'Neglect (Laziness)', virtue: 'Wellness', excess: 'Obsession (Health Fixation)'},
    //     {domain: 'Data Privacy', deficiency: 'Carelessness', virtue: 'Cautiousness', excess: 'Paranoia'},
    //     {domain: 'Cultural Sensitivity', deficiency: 'Cultural Ignorance', virtue: 'Open-mindedness', excess: 'Cultural Appropriation'},
    //     {domain: 'Assertiveness', deficiency: 'Passivity', virtue: 'Assertiveness', excess: 'Aggressiveness'},
    //     {domain: 'Compassion and Empathy', deficiency: 'Indifference', virtue: 'Compassion', excess: 'Over-Identifying (Self-sacrifice)'},
    //     {domain: 'Technology Adoption', deficiency: 'Resistance (Luddism)', virtue: 'Adaptability', excess: 'Tech Dependence'},
    //     {domain: 'Ethical Consumption', deficiency: 'Indifference to Ethics', virtue: 'Ethical Consumerism', excess: 'Moral Elitism'},
    //     {domain: 'Diversity and Inclusion', deficiency: 'Exclusion', virtue: 'Inclusivity', excess: 'Tokenism'}

    // ]

    useEffect(() => {
        // get csv domain labels
        fetch('/domains.csv')
        .then(response => response.text())
        .then(csvText => {
            const data = Papa.parse(csvText, { header: true});
            const formattedData = data.data.map((row : any) => ({
                domain: row['Sphere of Action (Domain)'],
                deficiency: row['Vice of Deficiency'],
                virtue: row['Virtue (Mean)'],
                excess: row['Vice of Excess'],
            }));
            setDomainLabels(formattedData);
            console.log("domains added " + JSON.stringify(formattedData,null,2));
             const allSuggestions = new Set<string>();
            formattedData.forEach(row => {
            Object.values(row).forEach(val => {
                if (val && typeof val === 'string') allSuggestions.add(val);
            });
        });
        setAllSuggestions(Array.from(allSuggestions));
        });
    }, []);

    const aiPrompt = `pick at least two domains from this list of domains which the word '@' is the closest synonym for, return your response as only the ` +
                      `text for the name of the domain, do not include quotations in your response, the deficiency, virtue, and excess are only there ` +
                      `for more context, you can consider them in your synonym search but you should ONLY return the domain text. Further, if you find an exact match ` +
                      `for the domain, you should return the exact domain text. If you include more than one domain in your answer, delimit them with commas, do not use spaces after the commas. Here is the list of domains:` +
                        `${JSON.stringify(domainToLabels)}
                    `;
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const [question, setQuestion] = useState('');
    const [reflection, setReflection] = useState('');
    const [focusedDomainId, setFocusedDomainId] = useState(-1);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [virtueOrVicious, setVirtueOrVicious] = useState('');
    const [domains, setDomains] = useState([
        { id: 1, domain: "", vice: 10 },
        { id: 2, domain: "", vice: 10 },
        { id: 3, domain: "", vice: 10 },
        { id: 4, domain: "", vice: 10 },
        { id: 5, domain: "", vice: 10 },
    ]);

    //These labels will populate based on what the user enters into the domain text fields
    const [sliderLabels, setSliderLabels] = useState<{ deficiency: string; virtue: string; excess: string }[]>([
        { deficiency: '', virtue: '', excess: '' },
        { deficiency: '', virtue: '', excess: '' },
        { deficiency: '', virtue: '', excess: '' },
        { deficiency: '', virtue: '', excess: '' },
        { deficiency: '', virtue: '', excess: '' }
    ]);

    const [criticalQuestions, setCriticalQuestions] = useState([
        `Based on your inputs, your character is more ${virtueOrVicious}. Do you agree?`,
        'Is this a good way to think about what makes a person virtuous?'
    ]);

    const [topics, setTopics] = useState(['',''])

    const handleFocus = (domainId: number) => {
        setFocusedDomainId(domainId);  // Track the currently focused input
        const currentDomain = domains.find(domain => domain.id === domainId)?.domain || '';
        if(currentDomain.length === 0){
            // if no string entered show all domains as suggestions
            setSuggestions(domainToLabels.map(item => item.domain));
        }
    };
    
    const handleBlur = () => {
        setFocusedDomainId(-1);  // Remove focus state when input is blurred
    };

    // Function to add a new domain
    const addDomain = () => {
        if (domains.length >= maxDomains) {
            alert(`You cannot add more than ${maxDomains} domains.`);
            return;
        }
        setDomains([...domains, { id: domains.length + 1, domain: "", vice: 10 }]);
        localStorage.setItem(`${prefix}domain-${domains.length + 1}`, "");
        localStorage.setItem(`${prefix}vice-${domains.length + 1}`, "0");
        localStorage.setItem(`${prefix}num-domains`, (domains.length + 1).toString());
    };

    /**
     * When the user types into a domain text box, it updates the domain in the state and local storage.
     * It also calls the function which does the ChatGPT API call.
     * @param id ID of the domain the user is typing in
     * @param field 
     * @param value 
     */
    const updateDomain = (id: number, field: string, value: string | number) => {
        setDomains(
            domains.map((domain) =>
                domain.id === id ? { ...domain, [field]: value } : domain
            )
        );

        //the text field was updated
        if (typeof value === 'string') {
            localStorage.setItem(`${prefix}domain-${id}`, value.toString());

            //if the user has inputted something, show suggestions
            if(value.length > 0){
                // let synonym: string | null = null;
                // //look for synonyms from chatgpt if the user has not typed in the past 3 seconds
                // if (debounceTimeout.current) {
                //     clearTimeout(debounceTimeout.current);
                // }

                // debounceTimeout.current = setTimeout(async () => {
                //     synonym = await getSynonym(value.toString());
                //     console.log("synonym is ", synonym);
                //     if (synonym) {
                //         const synonymSuggestions = synonym.split(',').map(s => s.trim());
                //         setSuggestions(synonymSuggestions);
                //     }
                // }, 1000);

                // // const filteredSuggestions = domainToLabels.map((item) => item.domain).filter((domain) =>
                // //     domain.toLowerCase().startsWith(value.toString().toLowerCase())
                // // );
                // // setSuggestions(filteredSuggestions);
                // //console.log("suggestions are ", filteredSuggestions);

                // //if the value equals a domain then populate the slider labels
                
                // const domainData = domainToLabels.find(
                //     (item) => item.domain.trim().toLowerCase() === value.trim().toLowerCase()
                // );
                // //console.log("domain data is ", domainData);
                // if(domainData) updateSliderLabels(id, value);
                // const filteredSuggestions = domainToLabels
                //     .map((item) => item.domain)
                //     .filter((domain) => 
                //         domain.toLowerCase().includes(value.toLowerCase())
                // );
                if(value.length > 0) {
                    const filteredSuggestions = allSuggestions.filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase()));
                    setSuggestions(filteredSuggestions);
                }
            }else{
                //if the text field is empty, do not show any suggestions
                //setSuggestions(domainToLabels.map(item => item.domain));
                setSuggestions(allSuggestions);
            }
        
        
        //the slider was updated
        } else if (field === "vice") {

            localStorage.setItem(`${prefix}vice-${id}`, value.toString());
            const average = calculateAverage();
            setVirtueOrVicious(virtueOrVice(average));
            const string = virtueOrVice(average);

            //set the first critical question to use the string
            setCriticalQuestions(prevQuestions => {
                const updatedQuestion = `Based on your inputs, your character is more ${string}. Do you agree?`;
            
                // Only update state if the question actually changes
                if (prevQuestions[0] !== updatedQuestion) {
                  return [updatedQuestion, ...prevQuestions.slice(1)];
                }
                return prevQuestions;
            });
        }
    };

    /**
     * This function makes an API call to chatGPT to get synonyms for the domain entered by the user.
     * ChatGPT is prompted to return a comma delimited list of synonyms, which populate the drop down menu for the user.
     * The API is called after the user has stopped typing for 1 second.
     * 
     * @param domain The domain entered by the user
     * @returns A string which is a comma delimited list of synonyms for the domain entered by the user
     */
    async function getSynonym(domain: string) {
        console.log("getting synonym for ", domain);
        const maxRetries = 5;
        let attempt = 0;

        const promptWithDomain = aiPrompt.replace('@', domain);
        //console.log("prompt with domain is ", promptWithDomain);

        while (attempt < maxRetries) {
            try {
                const completion = await openai.chat.completions.create({
                    model: "gpt-4-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant."
                        },
                        {
                            role: "user",
                            content: promptWithDomain,
                        }
                    ],
                });
                console.log("response is ", completion.choices[0].message.content);
                return completion.choices[0].message.content;
            } catch (error: any) {
                if (error.response && error.response.status === 429) {
                    const retryAfter = error.response.headers['retry-after'] || Math.pow(2, attempt);
                    console.log(`Rate limited. Retrying after ${retryAfter} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                    attempt++;
                } else {
                    console.log("Error fetching OpenAI completion: ", error);
                    return null;
                }
            }
        }
        console.log("Max retries reached. Could not fetch synonym.");
        return null;
    }

    // Handle suggestion click and update the input
    const handleSuggestionClick = (suggestion: string, id: number) => {
        console.log("Suggestion clicked: ", suggestion);
        // setDomains((prevDomains) =>
        //     prevDomains.map((domain) =>
        //         domain.id === id ? { ...domain, domain: suggestion } : domain
        //     )
        // );
        // localStorage.setItem(`${prefix}domain-${id}`, suggestion.toString());

        // setSuggestions([]); // Clear suggestions after selection

        // setFocusedDomainId(-1);  // Remove focus state after selection
        // updateSliderLabels(id, suggestion);
        // //console.log("slider labels are ", sliderLabels);
        const domainData = domainToLabels.find(
            (row) =>
                row.domain === suggestion ||
                row.deficiency === suggestion ||
                row.virtue === suggestion ||
                row.excess === suggestion
        );

        // Set the domain input to the suggestion
        // setDomains((prevDomains) =>
        //     prevDomains.map((domain) =>
        //         domain.id === id ? { ...domain, domain: suggestion } : domain
        //     )
        // );
        if (domainData) {
            setDomains((prevDomains) =>
                prevDomains.map((domain) =>
                    domain.id === id ? { ...domain, domain: domainData.domain } : domain
                )
            );
            localStorage.setItem(`${prefix}domain-${id}`, domainData.domain);
        } else {
            // fallback: just use the suggestion
            setDomains((prevDomains) =>
                prevDomains.map((domain) =>
                    domain.id === id ? { ...domain, domain: suggestion } : domain
                )
            );
        }
        localStorage.setItem(`${prefix}domain-${id}`, suggestion.toString());

        setSuggestions([]);
        setFocusedDomainId(-1);

        // If a row was found, update the slider labels
        if (domainData) {
            setSliderLabels((prevLabels) =>
                prevLabels.map((label, index) =>
                    index === id - 1
                        ? {
                            deficiency: domainData.deficiency,
                            virtue: domainData.virtue,
                            excess: domainData.excess,
                        }
                        : label
                )
            );
        }
    };

    const updateSliderLabels = (id: number, domain: string) => {
        // Strip HTML tags from the inputted domain string incase it has prof comments on it
        const strippedDomain = domain.replace(/<[^>]+>([\s\S]*?)<\/[^>]+>/g, "").trim().toLowerCase();
        console.log("stripped domain is ", strippedDomain);
        
        const domainData = domainToLabels.find(
            (item) => item.domain.trim().toLowerCase() === strippedDomain
        );
        
        if (domainData) {
            setSliderLabels((prevLabels) =>
                prevLabels.map((label, index) =>
                    index === id - 1
                        ? {
                            deficiency: domainData.deficiency,
                            virtue: domainData.virtue,
                            excess: domainData.excess,
                        }
                        : label
                )
            );
        }
    };


    // Function to remove a domain
    const removeDomain = (id: number) => {
        if (domains.length <= minDomains) {
            alert(`You must have at least ${minDomains} domains.`);
            return;
        }
        const updatedDomains = domains
            .filter((domain) => domain.id !== id)
            .map((domain, index) => ({ ...domain, id: index + 1 })); // Re-number domains sequentially
        setDomains(updatedDomains);
        setRemovalTriggered(true);
    };

    const removeDomainFromLocalStorage = () => {
        let i = 1;
        for (i; i <= domains.length; i++) {
            localStorage.setItem(`${prefix}domain-${i}`, domains[i - 1].domain);
            localStorage.setItem(`${prefix}vice-${i}`, domains[i - 1].vice.toString());
        }

        localStorage.removeItem(`${prefix}domain-${i}`);
        localStorage.removeItem(`${prefix}vice-${i}`);

        localStorage.setItem(`${prefix}num-domains`, (domains.length).toString());
    };

    useEffect(() => {
        if (removalTriggered) {
            setRemovalTriggered(false);
            removeDomainFromLocalStorage();
        }
    }, [removalTriggered, domains]);

    const calculateAverage = (): number => {
        // The average of all virtues and vices.
        // Values between 7 and 13 = Virtue 
        // Values between 0 and 6 = Vice (Lack)
        // Values between 14 and 21 = Vice (Excess)
        let total = 0;
        domains.forEach((domain) => {
            
            if(domain.vice > 10){
                total += 21 - domain.vice;
            }else{
                total += domain.vice;
            }
        });
        let average = total / domains.length;
        //average = (average / 21) * 10;
        //console.log("average is " + average);
        return Math.floor(average);
    }

    const virtueOrVice = (average: number): string => {
        if (average >= 7 && average <= 10) {
            return "Virtuous than Vicious";
        } else {
            return "Vicious than Virtuous";
        } 
    };


    const clearLocalStorage = () => {
        for (let i = 1; i <= domains.length; i++) {
            localStorage.removeItem(`${prefix}domain-${i}`);
            localStorage.removeItem(`${prefix}vice-${i}`);
        }
        localStorage.removeItem(`${prefix}num-domains`);
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
                if(lockForm){
                    useFetchFeedback({ formName, assignmentId: assignmentID || '', setFeedback });
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
        let updatedCriticalQs = await fetchQuestions({
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
    
    /**
     * Populates the form on page load with the user's saved data.
     */
    useEffect(() => {
        //console.log(aiPrompt);
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('id');
                const assignmentId = Cookie.get('assignment_id');

                let data;
                try {
                    const response = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=${formName}`);
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

                const length = localStorage.getItem(`${prefix}num-domains`) || content['num-domains'] || 5;

                let newDomains = [];
                for (let i = 1; i <= length; i++) {
                    const domain = feedback[`domain-${i}`] || localStorage.getItem(`${prefix}domain-${i}`) || content[`domain-${i}`] || "";
                    const vice = localStorage.getItem(`${prefix}vice-${i}`) || content[`vice-${i}`] || 10;

                    newDomains.push({ id: i, domain, vice: Number(vice) });
                }
                setDomains(newDomains);

                // Set slider labels
                setSliderLabels(newDomains.map((domain, index) => {
                    console.log("domains are " + domainToLabels);

                    //remove professor comments
                    const strippedDomain = domain.domain.replace(/<[^>]+>([\s\S]*?)<\/[^>]+>/g, "").trim().toLowerCase();


                    //console.log("UE: stripped domain is ", strippedDomain);
                    const domainData = domainToLabels.find(
                        (item) => item.domain.trim().toLowerCase() === strippedDomain.trim().toLowerCase()
                    );
                    if (domainData) {
                        return {
                            deficiency: String(domainData.deficiency),
                            virtue: String(domainData.virtue),
                            excess: String(domainData.excess),
                        };
                    }
                    return { deficiency: '', virtue: '', excess: '' };
                }));


                setQuestion(localStorage.getItem(`${prefix}question-ve`) || content['question-ve'] || '');
                setReflection(localStorage.getItem(`${prefix}reflection-ve`) || content['reflection-ve'] || '');
                
                const average = calculateAverage();
                const string = virtueOrVice(average)
                setVirtueOrVicious(string);

                criticalQuestions.forEach((_, index) => {
                    const topic = feedback[`topic-ve-${index}`] || localStorage.getItem(`${prefix}topic-ve-${index}`) || content[`topic-ve-response-${index}`];
                    setTopics(prevTopics => {
                      const newTopics = [...prevTopics];
                      newTopics[index] = topic || '';
                      return newTopics;
                    });
                });
                
                //add the virtue or vicious dynamic string to first critical question
                setCriticalQuestions(prevQuestions => {
                    const updatedQuestion = `Based on your inputs, your character is more ${string}. Do you agree?`;
                
                    // Only update state if the question actually changes
                    if (prevQuestions[0] !== updatedQuestion) {
                      return [updatedQuestion, ...prevQuestions.slice(1)];
                    }
                    return prevQuestions;
                });


                setLoading(false);
            } catch (error) {
                console.error("Error fetching form data: ", error);
                setLoading(false);
            }
        };

        fetchData();

    }, [questionsInitialized,feedback]);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
    }

    const submitAssignmentForm = async (e: any) => {
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
            } else {
                // Handle other input types (e.g., text inputs)
                answers[inputElement.id] = inputElement.value;
            }
        });

        answers['num-domains'] = domains.length.toString();

        const average = calculateAverage();
        answers['vv-average'] = average.toString();
        answers['cumulative-score'] = average.toString();
        

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
                localStorage.setItem(`${prefix}virtue-ethics-submitted`, "true");
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
        <>
        <Head>
            <title>Virtue Ethics</title>
        </Head>
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            
            
            
            {/* Header */}
            <div className="w-full max-w-5xl bg-blue-700 text-white text-center py-4 rounded-lg shadow-md">
                <h1 className="text-2xl md:text-3xl font-bold">Virtue Ethics</h1>
            </div>

            {/* Instructions */}
            <div className="mt-4">
                <DescriptionCard
                    defaultDescription="Virtue ethics is a theory that focuses on the character of the decision maker. Building a virtuous character requires practicing the virtues until the moral agent knows the right thing to do in the right time, in the right place, and in the right way.
                                        To begin, one must achieve a stable equilibrium of the soul by balancing various influences – both internal and external – that might interfere with good judgment."
                    formName={formName}
                    assignmentID={assignmentID}
                />
            </div>

            {/* Image */}
            <img
                src="/placeholderTheSoul.png"
                alt="Soul Diagram"
                className="w-70 h-64 object-cover mt-4 rounded-lg shadow-md mx-auto"
            />

            {/* Form */}
            <form ref={formRef} data-form-name={formName} onSubmit={submitAssignmentForm} className="w-full max-w-5xl">
                <div className="mt-6 w-full bg-white p-6 rounded-lg shadow-md space-y-6">

                    <FormCompletedCard isVisible={lockForm} />

                    <div>Click a suggestion to fill the slider labels</div>
                    {domains.map((domain) => (
                        <div key={domain.id} className="relative border border-gray-300 p-4 rounded-lg space-y-4">
                            {domains.length >= 6 && (
                                <button
                                    type="button"
                                    onClick={() => removeDomain(domain.id)}
                                    className="final-button absolute top-2 right-2 bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition shadow-md"
                                >
                                    Remove
                                </button>
                            )}
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className="flex-1">
                                    <label className="block text-gray-700 font-medium mb-2">Domain {domain.id}:</label>

                                    {!lockForm && (
                                        <input
                                            id={`domain-${domain.id}`}
                                            type="text"
                                            value={domain.domain}
                                            onChange={(e) => updateDomain(domain.id, "domain", e.target.value)}
                                            placeholder="Enter domain"
                                            className="answer-input w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
                                            required
                                            onFocus={() => handleFocus(domain.id)}  // Set focus state
                                            onBlur={handleBlur}  // Remove focus state when input loses focus
                                        />
                                    )}
                                    {lockForm && (
                                        <>
                                            <div
                                            className="border border-gray-300 bg-white rounded-lg p-2 w-full min-w-[200px] md:min-w-[300px] lg:min-w-[400px]"
                                            dangerouslySetInnerHTML={{
                                                __html: domain.domain
                                                ? domain.domain.replace(
                                                    /<c>(.*?)<\/c>/g,
                                                    '<span class="text-red-500">$1</span>'
                                                    )
                                                : '',
                                            }}
                                            />
                                        </>
                                    )}

                                    {/* Suggestions Drop Down */}
                                    {suggestions.length > 0 && focusedDomainId === domain.id && (
                                    <ul className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                        key={index}
                                        onMouseDown={() => handleSuggestionClick(suggestion, domain.id)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        >
                                        {suggestion}
                                        </li>
                                    ))}
                                    </ul>
                                    )}
                                
                                </div>

                                {/* Sliders for vice deficiency and excess */}
                                <div className="flex-1 relative w-full mt-4 md:mt-0">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm text-gray-600">Vice (Deficiency): {sliderLabels[domain.id - 1]?.deficiency || 'Auto fill'}</span>
                                        <span className="text-sm text-gray-600">Virtue: {sliderLabels[domain.id - 1]?.virtue || 'Auto fill'}</span>
                                        <span className="text-sm text-gray-600">Vice (Excess): {sliderLabels[domain.id - 1]?.excess || 'Auto fill'}</span>
                                    </div>
                                    <input
                                        id={`vice-${domain.id}`}
                                        type="range"
                                        min="0"
                                        max="21"
                                        value={domain.vice}
                                        onChange={(e) => updateDomain(domain.id, "vice", Number(e.target.value))}
                                        className="answer-input w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            onClick={addDomain}
                            className="final-button bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                        >
                            + Add Domain
                        </button>
                    </div>
                    {/*Professor Comment Box for domains */}
                    {lockForm && feedback[`domains`] && (
                        <div className="border border-gray-200 rounded-lg p-4 mt-4">
                        <ProfessorCommentBox comment={feedback[`domains`]} />
                        </div>
                    )}


                    {criticalQuestions?.map((question,index)=>(
                        <div className="mt-4" key={index}>
                            {!lockForm && (
                                <TextInput 
                                    key={index}
                                    title={question}
                                    setter={(value: string) => setTopic(index, value)}
                                    value={topics[index]} 
                                    id={`topic-ve-`+index} 
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
                    <div className="mt-6 w-full max-w-screen-2xl flex justify-end gap-4">
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

                    {/*Professor Comment Box for key WHOLE FORM */}
                    {lockForm && feedback[`${formName}`] && (
                        <div className="border border-gray-200 rounded-lg p-4 mt-4">
                        <ProfessorCommentBox comment={feedback[`${formName}`]} />
                        </div>
                    )}
                </div>

            </form>
        </main>
        </>
    );
}
