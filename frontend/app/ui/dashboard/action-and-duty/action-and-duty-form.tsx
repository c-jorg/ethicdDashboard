"use client";

import { useState, useEffect } from "react";
import axios from 'axios';
import Cookie from 'js-cookie';
import DescriptionCard from '@/app/ui/components/description-card';

export default function ActionAndDutyForm() {
  const [selectedMotivations, setSelectedMotivations] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [tentativeChoice, setTentativeChoice] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const assignmentID = Cookie.get('assignment_id');
  const prefix = assignmentID + "-";
  const [loading, setLoading] = useState(true);
  const formName = 'action-and-duty';

  const motivations: string[] = [
    "Serves your interests",
    "Serves the interests of someone else you want to impress",
    "It will look good",
    "It will pay off in the long run",
    "Everybody wins",
    "It costs very little",
    "Revenge",
    "Other",
    "It’s the right thing to do",
  ];

  const handleCheckboxChange = (motivation: string) => {
    setSelectedMotivations((prev) =>
      prev.includes(motivation)
        ? prev.filter((item) => item !== motivation)
        : [...prev, motivation]
    );
  };

  const handleNextClick = () => {
    const hasOtherSelections = selectedMotivations.some(
      (motivation) => motivation !== "It’s the right thing to do"
    );

    if (hasOtherSelections) {
      setModalMessage(
        `HYPOTHETICAL IMPERATIVES\n\nA hypothetical imperative is a command in a conditional form.
E.g., If you want to do well on the midterm you must study!\n\nYou study because you have a goal or a desire – to do well on the midterm.
Hypothetical imperatives tell us what we should do, but they do not express moral laws.
Moral laws express things we do simply because they are the right thing to do.`
      );
      setShowContinueButton(false);
      setShowModal(true);
    } else if (selectedMotivations.includes("It’s the right thing to do")) {
      setModalMessage(
        `CATEGORICAL IMPERATIVES\n\nThe fundamental principle of our moral duties is a categorical imperative.\n\n- It is an imperative because it is a command.\n- It is categorical because it is always right – in all times and all places.\n\nUnlike hypothetical imperatives, categorical imperatives are not relative to a desire or goal.\n\n"It’s the right thing to do" is a motivation consistent with categorical reasoning and therefore may support a universal law of moral action; however, the law must be defined, universal, and consistent.`
      );
      setShowContinueButton(true);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMotivations([]); // Deselect all checkboxes
  };

  const continueToNextPage = () => {
    Cookie.set(`${prefix}action-and-duty-submitted`, 'true');
    window.location.reload();
    //router.push("/dashboard/action-and-duty/categorical-imperatives"); // Navigate to the second page
  };

  const fetchDilemmaData = async () => {
    try {
      const userId = localStorage.getItem('id');
      const assignmentId = Cookie.get('assignment_id');
      const response = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=dilemma`);
      const data = response.data.data;

      if (data && data.length > 0) {
        const content = data[0].answers[0].content;
        //console.log("content is", content);
        
        let tentativeChoice;
        for(let i = 0; i < 5; i++){
          let choiceKey = `tentative-choice-${i}`;
          if(content[choiceKey] != 'false'){
            tentativeChoice = content[choiceKey];
            break;
          }
        }
        //console.log("tentativeChoice is", tentativeChoice);
        setTentativeChoice(tentativeChoice);

        
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching form data: ", error);
      setLoading(false);
    }
  };

  
  useEffect(() => {
    console.log("use effect is running");
    const selection = Cookie.get(`${prefix}action-and-duty-submitted`);
    if(selection){
      setSelectedMotivations(["It’s the right thing to do"]);
    }
    
  
    fetchDilemmaData();
  }, []);

  return (
    <main className="flex flex-col items-center bg-gray-100">
      
      {/* Header */}
      <div className="w-full max-w-screen-2xl bg-blue-700 text-white text-center py-6 rounded-lg shadow-md">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">ACTION AND DUTY</h1>
      </div>

      {/* Form Container */}
      <div className="mt-6 max-w-screen-2xl bg-white p-8 rounded-lg shadow-md">
        
       
        <DescriptionCard 
          defaultDescription="According to Kant, we reason our way to understanding what moral law should govern our decisions.  
          Kant called these moral laws categorical (universal, timeless) imperatives (must do’s that are not optional).  "
          formName={formName}
          assignmentID={assignmentID || ''}
          style={2} //this makes it so the style is not blue like on the other forms
        />

        {/* Section 1: Universal Law */}
        <div className="mt-4">
          <label className="block text-gray-700 text-sm md:text-lg font-medium">
            Does your tentative choice follow a universal law of morality?
          </label>
          <input
            type="text"
            placeholder="Auto fill chosen option from Seven Step Method"
            readOnly={false}
            value={tentativeChoice}
            className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Section 2: Motivation Checkboxes */}
        <div className="mt-6">
          <p className="text-gray-700 text-sm md:text-lg font-medium">
            What is your motivation? Tick all that apply:
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {motivations.map((motivation, index) => (
              <label key={index} className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  value={motivation}
                  checked={selectedMotivations.includes(motivation)}
                  onChange={() => handleCheckboxChange(motivation)}
                  className="h-5 w-5 text-blue-600 focus:ring focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-gray-700 text-sm md:text-lg">{motivation}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8 text-right">
          <button
            onClick={handleNextClick}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white w-full max-w-md lg:max-w-lg p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 text-sm sm:text-base whitespace-pre-line">{modalMessage}</p>
            <div className="mt-6 flex justify-end space-x-4">
              {!showContinueButton && (
                <button
                  onClick={closeModal}
                  className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                >
                  Try Again
                </button>
              )}
              {showContinueButton && (
                <>
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={continueToNextPage}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Continue
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
