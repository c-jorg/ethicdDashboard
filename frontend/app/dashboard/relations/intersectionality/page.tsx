
'use client';
import { useState, useEffect } from 'react';
import IntersectForm from '@/app/ui/dashboard/relations/intersect-form';
import { lusitana } from '@/app/ui/fonts';
import LockedFormCard from '@/app/ui/components/locked-form-card';
import { dilemmaFormSubmitted } from '@/app/utils/is-dilemma-submitted';
import Cookie from 'js-cookie';
import DescriptionCard from '@/app/ui/components/description-card';
import { CaseStudyOptionBox } from '@/app/ui/components/case-study-option-box';

export default function IntersectionalityPage() {
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const formName = "intersect-form";

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

  return typeof dilemmaSubmitted !== 'undefined' ? (

    dilemmaSubmitted ? (
      <main className="flex items-center justify-center w-full h-screen">
        <div className="relative flex flex-col w-full h-full space-y-2.5">
          
          <CaseStudyOptionBox assignmentID={Cookie.get('assignment_id') || ''} apiUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/>
          <div className="flex  w-full items-center justify-center  p-1 md:h-36">
            <h1 className="text-3xl font-semibold text-grey-800 md:text-5xl text-center">
              Relations
            </h1>
          </div>

          

          {/* Intersectionality Card Component with instructions */}
          <h1 id='intersectionality' className={`${lusitana.className} mb-4 text-3xl p-1 md:text-5xl text-center`}>
              Intersectionality
          </h1>
          <DescriptionCard 
            defaultDescription="<p class='text-sm md:text-lg'>
                                  Intersectionality is a way to look at the social location of individuals in order to understand their relative privileges and/oppressions.  
                                  Many of us belong to groups that statistically are much more likely to experience discrimination.  
                                  Even though not all members of the group will have the same experience, an intersectional analysis is a helpful way to assess how others will see your choice.  
                                  For each stakeholder, select from list of privileges/oppressions according to which they are most likely to experience as a result of your choice.  
                                </p>
                                <p class='text-sm md:text-lg mt-2'>
                                  <strong>Note:</strong> Some stakeholder groups may be too socially and politically diverse for this type of analysis.
                                </p>"
            assignmentID={Cookie.get('assignment_id') || ''}
            formName={formName}
          />

          {/* Intersectionality Form */}
          <div>
            <IntersectForm />
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
        Intersectionality
      </h1>

      <div className="flex flex-col items-center">
      <LockedFormCard formName="The Seven Step Method / Describe Your Dilemma" /> 
    </div>
      
    </div>
  </main>
)

): <div>Something has gone wrong</div>
}
