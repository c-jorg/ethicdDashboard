"use client";

import { useState, useEffect } from "react";
import Cookie from 'js-cookie';
import ActionAndDutyForm from '@/app/ui/dashboard/action-and-duty/action-and-duty-form';
import CategoricalImperativesForm from '@/app/ui/dashboard/action-and-duty/categorical-imperatives-form';
import CriticalQuestionsForm from '@/app/ui/dashboard/action-and-duty/critical-questions-form';
import LockedFormCard from '@/app/ui/components/locked-form-card';
import { dilemmaFormSubmitted } from '@/app/utils/is-dilemma-submitted';
import { lusitana } from '@/app/ui/fonts';
import { CaseStudyOptionBox } from "@/app/ui/components/case-study-option-box";

export default function ReasonPage() {

  const [actionAndDutySubmitted, setActionAndDutySubmitted] = useState(false); //checks if the action-and-duty form has been submitted
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const assignmentID = Cookie.get('assignment_id');
  const prefix = assignmentID + "-";

  /**
   * Checking to see if the Action and Duty form has been submitted via cookie, if so then show the Categorical Imperatives form
   */
  useEffect(() => {
    const actionAndDutySubmitted = Cookie.get(`${prefix}action-and-duty-submitted`);
    if (actionAndDutySubmitted) {
      setActionAndDutySubmitted(true);
    }
  }, []);

   /**
   * Enforcing form completion order:
   * 
   * Check if the dilemma form has been submitted
   * If it has, set the state to true
   * If it hasn't, set the state to false
   * This will determine whether the user can access the page or not
   */
   useEffect(() => {
    const checkDilemmaForm = async () => {
      const userID = localStorage.getItem('id');
      const isSubmitted = await dilemmaFormSubmitted(
        userID,
        Cookie.get('assignment_id') || '',
        apiUrl
      );
      setDilemmaSubmitted(isSubmitted);
    };
    checkDilemmaForm();
  }, []);

  return typeof actionAndDutySubmitted !== 'undefined' && typeof dilemmaSubmitted != 'undefined' ? (

   actionAndDutySubmitted && dilemmaSubmitted ? (
      <main className="flex items-center justify-center w-full bg-gray-100">
        <div className="w-full h-full space-y-2.5 p-4">
          <CaseStudyOptionBox assignmentID={Cookie.get('assignment_id') || ''} apiUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/>
          <div>
            <ActionAndDutyForm />
          </div>

           <div>
             <CategoricalImperativesForm />
           </div>

           <div>
              <CriticalQuestionsForm />
           </div>
          
        </div>
      </main>

  ) : dilemmaSubmitted ? (
    <main className="flex items-center justify-center w-full h-screen p-4 bg-gray-100">
      <div className="w-full h-full space-y-2.5">
        <div>
          <ActionAndDutyForm />
        </div>
        
      </div>
    </main>
   
  ) : (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="w-full h-full space-y-2.5">
        <div className="">
          <h1 className="text-5xl font-semibold text-grey-800 md:text-3xl text-center">
            Action and Duty
          </h1>
        </div>
        <h1 id='utilitarian' className={`${lusitana.className} mb-4 text-5xl p-6 text-center`}>
            Reason
        </h1>

        <div className="flex flex-col items-center">
          <LockedFormCard formName="The Seven Step Method / Describe Your Dilemma" /> 
        </div>
        
      </div>
    </main>
  )

): <div>Something has gone wrong</div>
}
