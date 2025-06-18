'use client'
import { Button } from '../../button';
import { useState, useEffect, useRef } from 'react';
import SliderInput from '@/app/ui/components/slider-input'
import axios from 'axios';
import Cookie from 'js-cookie';
import SubmitButtonWithConfirmation from '@/app/ui/components/submit-button-with-conf';
import DotsLoading from '@/app/ui/components/loading';
import LockedFormCard from '@/app/ui/components/locked-form-card';
import FormCompletedCard from '@/app/ui/components/form-completed-card';
import { fetchQuestions } from '@/app/utils/get-critical-questions';
import TextInput from '@/app/ui/components/text-input';
import FeedbackDisplay from '@/app/ui/components/feedback-display';
import useFetchFeedback from '@/app/utils/feedback-fetcher';
import ProfessorCommentBox from '../../components/prof-comment-box';
import api from '../../../utils/api-auth'; //applies the auth headers 

export default function UtilitarianFormMill() {
    const formRef = useRef<HTMLFormElement>(null);
    type effect = {name: effectName; metrics: {pain: number | undefined; pleasure: number | undefined; }};
    type effectName = {name: string; scale: string[], description: string};
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const formName = 'cons-util-mill';
    const assignmentID = Cookie.get('assignment_id'); 
    const prefix = assignmentID + "-";
    const [lockForm, setLockForm] = useState(false); //locks form if it has been submitted
    
    let submitted = false;

    const [topics, setTopics] = useState([''])
    const [feedback, setFeedback] = useState<{ [key: string]: string }>({});
    const [benthamSubmitted, setBenthamSubmitted] = useState(false);

    const [scores, setScores] = useState<effect[]>([
        {name: {name: 'intensity', scale: ['Low','High'], description: 'Intensity (I): How strong is the higher pleasure or pain your decision will produce?'}, 
            metrics: {pain: 5, pleasure: 5}},
        {name: {name: 'duration', scale: ['Short','Long'], description: 'Duration (Du): How long or short will the higher pleasure or pain last?'}, 
            metrics: {pain: 5, pleasure: 5}},
        {name: {name: 'certainty', scale: ['Not likely','Likely'], description: 'Certainty (C): What is the probability that the higher pleasure or pain will occur?'},
            metrics: {pain: 5, pleasure: 5}},
        {name: {name: 'propinquity', scale: ['Near','Far'], description: 'Propinquity (P): How far off in the future is the higher pleasure or pain?'},
            metrics: {pain: 5, pleasure: 5}},
        {name: {name: 'fecundity', scale: ['Not likely','Likely'], description: 'Fecundity (F): What is the probability that the higher pleasure will lead to other pleasures?'}, 
            metrics: {pain: undefined, pleasure: 5}},
        {name: {name: 'deterioration', scale: ['Not likely','Likely'], description: 'Deterioration (De): What is the probability that the pain will lead to other pains?'},
            metrics: {pain: 5, pleasure: undefined}},
        {name: {name: 'extent', scale: ['Few','Many'], description: 'Extent (E): How many persons are affected?'},
            metrics: {pain: 5, pleasure: 5}},
    ]);
    
    const [pleasurePainRatio, setRatio] = useState(0);
    const [reflection, setReflection] = useState('');

    const handleScoreChange = (index: number, field: 'pain' | 'pleasure', value: any) => {
        setScores(scores.map((score, i) => 
            i === index ? { ...score, metrics: {...score.metrics, [field]: value} } : score
        ));
        localStorage.setItem(`${prefix}mill-${field}-${index}`, value);
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, text: string) => {
      
          setter(text);
        
      };

    useEffect(() => {
        //need to make sure this finishes before any math is done with the numbers in the scores array
        calcRatio();
    }, [scores]);

    const calcTotalPleasure = () => {
        const totalPleasure = scores.reduce(
            (accumulator, currentValue) => {
                if(currentValue.name.name != 'extent')
                    accumulator += ((currentValue.metrics.pleasure === undefined) ? 0 : currentValue.metrics.pleasure);
                else
                    accumulator *= ((currentValue.metrics.pleasure === undefined) ? 1 : currentValue.metrics.pleasure);
                return accumulator;
            },0
        );
        localStorage.setItem(`${prefix}mill-total-pleasure`, totalPleasure.toString());
        return totalPleasure;
    }

    const calcTotalPain = () => {
        const totalPain = scores.reduce(
            (accumulator, currentValue) => {
                if(currentValue.name.name != 'extent')
                    accumulator += ((currentValue.metrics.pain === undefined) ? 0 : currentValue.metrics.pain);
                else
                    accumulator *= ((currentValue.metrics.pain === undefined) ? 1 : currentValue.metrics.pain);
                return accumulator;
            },0
        );
        localStorage.setItem(`${prefix}mill-total-pain`, totalPain.toString());
        return totalPain;
    }

    const calcRatio = () => {
        const totalPleasure = calcTotalPleasure();
        const totalPain = calcTotalPain();
        setRatio(Math.round(totalPleasure/(totalPleasure+totalPain)*100));
        localStorage.setItem(`${prefix}mill-pleasure-pain-ratio`, Math.round(totalPleasure/(totalPleasure+totalPain)*100).toString());

        return Math.round(totalPleasure/(totalPleasure+totalPain)*100);
    }

    const calculateCumulativeScore = () => {
        /**
         * If 50% or more, pleasure is higher than pain: Green = 10, Red 0
            If less than 50%, pain is higher than pleasure: Green = 0, Red = 10 
         */
        let ratio = calcRatio();
        if(ratio >= 50) return 10;
        return 0;
    }

    const clearLocalStorage = () => {
        for(let i = 0; i < scores.length; i++){
            localStorage.removeItem(`${prefix}mill-pain-${i}`);
            localStorage.removeItem(`${prefix}mill-pleasure-${i}`);
        }
        localStorage.removeItem(`${prefix}mill-pleasure-pain-ratio`);
        localStorage.removeItem(`${prefix}mill-total-pain`);
        localStorage.removeItem(`${prefix}mill-total-pleasure`);
        localStorage.removeItem(`${prefix}reflection`);
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
            const response = await api.get<HasBeenSubmittedResponse>(`${apiUrl}/api/flask/assignment/is-form-submitted?student_id=${userId}&assignment_id=${assignmentID}&form_name=${formName}`);
            data = response.data;
            //console.log("MILL HAS BEEN SUBMITTED? " + data.message);
            if(data.message == "true"){
            //disable all inputs
            
                //return true
                setLockForm(true);
                console.log("for mill form returning true from hasBeenSubmitted");
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
            const isSubmitted = await hasBeenSubmitted();
            console.log("MILL: hasBeenSubmitted is " + isSubmitted);
            if(isSubmitted){
                console.log("The Mill form has been submitted")
                setTimeout(() => {
                    const formElements = document.querySelectorAll('.util-mill .answer-input, .final-button');
                    formElements.forEach((element) => {
                        (element as HTMLInputElement).disabled = true;
                    });
                }, 100); // Small delay (100ms)
            }
            // Now check for any feedback - if there is any then overwrite the answer with the feedback
            const assignmentId = Cookie.get('assignment_id');
            if(isSubmitted){
                //fetchFeedback(formName, parseInt(assignmentId || ''), setTopics);
                useFetchFeedback({ formName, assignmentId: assignmentId || '', setFeedback });
            }
        })();
    }, [lockForm]);

    const [criticalQuestions, setCriticalQuestions] = useState([
        'Does evaluating the type of pleasure change the result? Why or why not?'
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
      
      
    const setTopic = (index: number, value: string) => {
        const newTopics = [...topics];
        newTopics[index] = value;
        setTopics(newTopics);
    };
    
    const fetchData = async () => {
        try {
            
            let data;
            try{
                const userID = localStorage.getItem('id');
                const response = await api.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=${formName}`);
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
            
            //console.log("content is:", content);
            
            let p = 0; // Initial index in the content array

            const updatedScores = scores.map((score, index) => {
                let pain, pleasure;

                // Handle each of the score indexes, dynamically mapping from content
                if (index === 4) {
                    // For 'fecundity' one of the metrics (pain or pleasure) is undefined
                    pleasure = localStorage.getItem(`${prefix}mill-pleasure-${index}`) ? parseInt(localStorage.getItem(`${prefix}mill-pleasure-${index}`)!) : (content[`mill-pleasure-${index}`] ? parseInt(content[`mill-pleasure-${index}`]) : undefined);
                    p += 1; // Move the index forward for these items
                } else if (index === 5) {
                    // For 'deterioration'
                    pain = localStorage.getItem(`${prefix}mill-pain-${index}`) ? parseInt(localStorage.getItem(`${prefix}mill-pain-${index}`)!) : (content[`mill-pain-${index}`] ? parseInt(content[`mill-pain-${index}`]) : undefined);
                    p += 1;
                } else {
                    // For all other items, treat them as pairs
                    pain = localStorage.getItem(`${prefix}mill-pain-${index}`) ? parseInt(localStorage.getItem(`${prefix}mill-pain-${index}`)!) : (content[`mill-pain-${index}`] ? parseInt(content[`mill-pain-${index}`]) : undefined);
                    pleasure = localStorage.getItem(`${prefix}mill-pleasure-${index}`) ? parseInt(localStorage.getItem(`${prefix}mill-pleasure-${index}`)!) : (content[`mill-pleasure-${index}`] ? parseInt(content[`mill-pleasure-${index}`]) : undefined);
                    p += 1; // Move the index forward for these pairs
                }

                // Return the updated score object
                return {
                    ...score,
                    metrics: {
                        pain: pain !== undefined ? pain : score.metrics.pain, // Fallback to existing value if undefined
                        pleasure: pleasure !== undefined ? pleasure : score.metrics.pleasure,
                    },
                };
            });

            // Update state with the new scores
            setScores(updatedScores);

            //setReflection(feedback['reflection'] || localStorage.getItem(`${prefix}reflection`) || content.reflection || '');

            criticalQuestions.forEach((_, index) => {
                const topic = feedback[`topic-uf-${index}`] || localStorage.getItem(`${prefix}topic-uf-${index}`) || content[`topic-uf-${index}`];
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

        const benthamFormSubmitted = async (): Promise<boolean> => {
        let data;
        try{
          //console.log("Mill form: gonna see if bentham form is submitted");
          const userID = localStorage.getItem('id');
          const thisFormData = await api.get(`${apiUrl}/api/flask/assignment/is-form-submitted?student_id=${userID}&assignment_id=${assignmentID}&form_name=cons-util-bentham`);
          //console.log("done fetching bentham form data");
          data = thisFormData.data.message;
    
          if(data){
            console.log("bentham form submitted? mill form says " + data);
            if(data === "true"){
                setBenthamSubmitted(true);
                //console.log("benthamSubmitted is now " + benthamSubmitted);
                
                //window.location.href = "/dashboard/consequences/utilitarianism#mill";
                
                
            }
            return data === "true";
          }else{
            return false;
          }
    
        }catch(isAxiosError){
          if (axios.isAxiosError(isAxiosError) && isAxiosError.response?.status === 404) {
            console.log("Mill - 404 for is-form-submitted bentham form");
            setBenthamSubmitted(false)
            const guest = localStorage.getItem('guest');
            if(guest == 'true'){
                console.log("User is guest, unlocking js mill");
                setBenthamSubmitted(true)
                return true;
            }else{
                console.log("User is not a guest not unlocking mill form");
            }
          }else{
            console.log("Error fetching form data: ", isAxiosError);
          }
          return false;
        }
      } //end of benthamFormSubmitted

     //load the form with previously submitted data if there is any and check if bentham form is submitted
   useEffect(() => {
        //console.log("use effect is running");
        benthamFormSubmitted();

        fetchData();

        console.log("mill: Feedback is: ", feedback);
        
    }, [criticalQuestions, feedback]);

    

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //console.log("Entered the submit form handler for cons utilitarianism form")
        const studentID = localStorage.getItem('id'); 
        const assignmentID = Cookie.get('assignment_id'); 
        const caseStudyID = Cookie.get('case_study_id');
        const formName = e.currentTarget.getAttribute('data-form-name') || "cons-util-mill"; // Dynamically get the form name or set a default
        //console.log("form name is " + formName);
        //let submitted = false;
       
        const answers: { [key: string]: string } = {}; //an object to hold the answers as key-value pairs

        document.querySelectorAll('.util-mill .answer-input').forEach(input => {
          const inputElement = input as HTMLInputElement;
          answers[inputElement.id] = inputElement.value;
        });

        answers['mill-total-pleasure'] = calcTotalPleasure().toString();
        answers['mill-total-pain'] = calcTotalPain().toString();
        answers['mill-pleasure-pain-ratio'] = calcRatio().toString();
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
                console.log("Mill form is using the save-form endpoint")
                response = await api.post(`${apiUrl}/api/flask/assignment/save-form`, data, {
                    headers: {
                    'Content-Type': 'application/json',
                    }
                });
            }else{
                console.log("Mill form is using the submit-form endpoint")
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
            localStorage.setItem(`${prefix}mill-submitted`, "true");
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
    
    return typeof benthamSubmitted !== 'undefined' ? (
    
        benthamSubmitted ? (
            <div className="flex flex-col items-center">
                <form id="mill-form" className="util-mill w-full max-w-5xl space-y-6 bg-white rounded-lg shadow-md p-6" ref={formRef} data-form-name={formName} onSubmit={submitForm}>
                    
                    <FormCompletedCard isVisible={lockForm} />
                    
                    {/* Fieldset for Bentham's Calculus */}
                    <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
                        {scores.map((score, index)=>(
                            <div key={index} className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-md space-y-4">
                                <div className="flex">
                                    <span className="font-semibold">{score.name.description}</span>
                                </div>
                                <SliderInput
                                slider={[{
                                    label: 'Pain',
                                    min: 0,
                                    max: 10,
                                    value: score.metrics['pain'],
                                    onChange: (e:any)=>handleScoreChange(index,'pain',parseInt(e.target.value)),
                                    scale: score.name.scale,
                                    id:`mill-pain-${index}`,
                                }, {
                                    label: 'Pleasure',
                                    min: 0,
                                    max: 10,
                                    value: score.metrics['pleasure'],
                                    onChange: (e:any)=>handleScoreChange(index,'pleasure',parseInt(e.target.value)),
                                    scale: score.name.scale,
                                    id: `mill-pleasure-${index}`,
                                }]}
                                />
                            </div>
                        ))}
                    </fieldset>

                    {/* Fieldset for results */}
                    <fieldset className="border border-gray-300 rounded-lg p-4 space-y-1 text-2xl">
                        <legend className="font-semibold">Results</legend>
                        <div>
                            <label className="block text-lg font-medium text-gray-900">Using Mill's refined calculus, the ratio of pleasure to pain is <strong>{pleasurePainRatio}%</strong>, 
                                meaning that net pleasure is <strong>{pleasurePainRatio > 50 ? 'higher' : 'lower'}</strong> than net pain.
                            </label>
                        </div>
                    </fieldset>

                    {/* Fieldset for reflection question */}
                    <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
                        
                    {criticalQuestions?.map((question,index)=>(
                        <div className="mt-4" key={index}>
                        {!lockForm && (
                            <TextInput 
                                key={index}
                                title={question}
                                setter={(value: string) => setTopic(index, value)}
                                value={topics[index]} 
                                id={`topic-uf-`+index} 
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
                        <Button type="submit" data-html2canvas-ignore className="final-button bg-blue-600 text-white px-6 py-4 rounded-lg text-xl hover:bg-blue-700 transition" data-form-name={formName}>
                            Save
                        </Button>
                        {localStorage.getItem("guest") == "false" && (
                            <SubmitButtonWithConfirmation formRef={formRef} buttonText="Submit" onClick={(e) => { 
                                e.preventDefault();
                                submitted = true; 
                                console.log("MILL: submitted is now " + submitted);
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
        ):(
            <div className="flex flex-col items-center">
                <LockedFormCard formName="Bentham Utilitarian Analysis" />
             </div>
        )
    ): <div>Something has gone wrong</div>
};