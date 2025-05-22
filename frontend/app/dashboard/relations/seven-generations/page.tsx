'use client';
import { useState, useEffect } from 'react';
import GenerationsForm from '@/app/ui/dashboard/relations/generations-form';
import { lusitana } from '@/app/ui/fonts';
import LockedFormCard from '@/app/ui/components/locked-form-card';
import { dilemmaFormSubmitted } from '@/app/utils/is-dilemma-submitted';
import Cookie from 'js-cookie';
import DescriptionCard from '@/app/ui/components/description-card';
import { CaseStudyOptionBox } from '@/app/ui/components/case-study-option-box';

export default function Relations() {
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const formName = "generations-form";

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
        <div className="relative flex flex-col w-full h-full space-y-2.5">
          
          <CaseStudyOptionBox assignmentID={Cookie.get('assignment_id') || ''} apiUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/>
          <div className="flex h-20 w-full items-center justify-center p-1 md:h-36">
            <h1 className="text-3xl font-semibold text-grey-800 md:text-5xl text-center">
              Relations
            </h1>
          </div>

          {/* Seven Generations Card Component with instructions */}
          <h1 id='seven-generations' className={`${lusitana.className} mb-4 text-3xl p-1 md:text-5xl text-center`}>
              Seven Generations
          </h1>
          <DescriptionCard 
            defaultDescription="Various forms of seven generations teaching is found in many Indigenous cultures.  
                                  Through this lens we consider the actions and traditions of the previous seven generations and the effect of our actions on the seven generations after us.  
                                  The ripple effects our actions and choices have impact not only our immediate communities and larger society, but also the natural world over time.  
                                  We have a responsibility to be the bridge between the past and the future.  
                                  Consider your choice in terms of impacts on the earth as a whole, and on a continuum between the past and future.  
                                "
            formName={formName}
            assignmentID={Cookie.get('assignment_id') || ''}
          />

          {/* Seven Generations Form */}
          <div>
            <GenerationsForm />
          </div>
        </div>
      </main>
  ) : (
      
        <main className="flex items-center justify-center w-full h-screen">
        <div className="w-full h-full space-y-2.5">
          <div className="">
            <h1 className="text-5xl font-semibold text-grey-800 md:text-3xl text-center">
              Relations
            </h1>
          </div>
          <h1 id='utilitarian' className={`${lusitana.className} mb-4 text-5xl p-6 text-center`}>
            Seven Generations
          </h1>

          <div className="flex flex-col items-center">
          <LockedFormCard formName="The Seven Step Method / Describe Your Dilemma" /> 
        </div>
          
        </div>
      </main>
    )

  ): <div>Something has gone wrong</div>
}
