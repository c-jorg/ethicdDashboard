'use client';
import { useState, useEffect } from 'react';
import ConsStakeholdersForm from '@/app/ui/dashboard/consequences/cons-stakehold-form';
import UtilitarianFormBentham from '@/app/ui/dashboard/consequences/utilitarian-form-bentham';
import UtilitarianFormMill from '@/app/ui/dashboard/consequences/utilitarian-form-mill';
import { lusitana } from '@/app/ui/fonts';
import LockedFormCard from '@/app/ui/components/locked-form-card';
import { dilemmaFormSubmitted } from '@/app/utils/is-dilemma-submitted';
import Cookie from 'js-cookie';
import DescriptionCard from '@/app/ui/components/description-card';
import { CaseStudyOptionBox } from '@/app/ui/components/case-study-option-box';

export default function ConsequencesPage() {
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const formName = "cons-stakeholders";

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
          <div className="">
            <h1 className="text-5xl font-semibold text-grey-800 md:text-3xl text-center">
              Consequences
            </h1>
          </div>

          {/* Card Component with instructions */}
          <h1 id='stakeholders' className={`${lusitana.className} mb-4 text-5xl p-4 md:text:2xl text-center`}>
              Stakeholder Analysis
          </h1>

          <DescriptionCard 
            formName={formName} 
            defaultDescription="<p class='text-sm md:text-lg'>
                                  Consequentialist ethical lenses focus only on the consequences to determine the right thing to do.
                                </p>
                                <p class='text-sm md:text-lg mt-2'>
                                  <strong>First:</strong> For each stakeholder you identified earlier, consider the relative benefits and harms of your choice for both short-term and long-term consequences.
                                </p>
                                <p class='text-sm md:text-lg mt-2'>
                                  <strong>Second:</strong> Rank the stakeholders by reordering them using the arrows according to who you think should impact your decision the most.
                                </p>"
            assignmentID={Cookie.get('assignment_id') || ''}
          />

          {/* Consequences Stakeholder Form */}
          <div>
            <ConsStakeholdersForm />
          </div>

          

        </div>
      </main>
    ) : (
        
      <main className="flex items-center justify-center w-full h-screen">
      <div className="w-full h-full space-y-2.5">
        <div className="">
          <h1 className="text-5xl font-semibold text-grey-800 md:text-3xl text-center">
            Consequences
          </h1>
        </div>
        <h1 id='stakeholders' className={`${lusitana.className} mb-4 text-5xl p-4 md:text:2xl text-center`}>
            Stakeholder Analysis
        </h1>

        <div className="flex flex-col items-center">
        <LockedFormCard formName="The Seven Step Method / Describe Your Dilemma" /> 
      </div>
        
      </div>
    </main>
  )

  ): <div>Something has gone wrong</div>
}
