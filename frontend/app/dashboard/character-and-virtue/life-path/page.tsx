'use client';
import { useState, useEffect } from 'react';
import LifePathForm from '@/app/ui/dashboard/character-and-virtue/life-path';
import { lusitana } from '@/app/ui/fonts';
import LockedFormCard from '@/app/ui/components/locked-form-card';
import { dilemmaFormSubmitted } from '@/app/utils/is-dilemma-submitted';
import Cookie from 'js-cookie';
import { CaseStudyOptionBox } from '@/app/ui/components/case-study-option-box';

export default function LifePathPage() {
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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
      const isSubmitted = await dilemmaFormSubmitted(
        localStorage.getItem('id'),
        Cookie.get('assignment_id') || '',
        apiUrl
      );
      setDilemmaSubmitted(isSubmitted);
    };
    checkDilemmaForm();
  }, []);

  return typeof dilemmaSubmitted !== 'undefined' ? (

    dilemmaSubmitted ? (
      <main className="flex items-center justify-center w-full h-screen">
        <div className="w-full h-full space-y-2.5">
          <CaseStudyOptionBox assignmentID={Cookie.get('assignment_id') || ''} apiUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/>
          <div>
            <LifePathForm />
          </div>
          
        </div>
      </main>
  ) : (
      
        <main className="flex items-center justify-center w-full h-screen">
        <div className="w-full h-full space-y-2.5">
          <div className="">
            <h1 className="text-5xl font-semibold text-grey-800 md:text-3xl text-center">
              Character and Virtue
            </h1>
          </div>
          <h1 id='utilitarian' className={`${lusitana.className} mb-4 text-5xl p-6 text-center`}>
            Life Path
          </h1>

          <div className="flex flex-col items-center">
          <LockedFormCard formName="The Seven Step Method / Describe Your Dilemma" /> 
        </div>
          
        </div>
      </main>
    )

  ): <div>Something has gone wrong</div>
}
