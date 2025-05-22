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
  const benthamFormName = 'cons-util-bentham';
  const millFormName  = 'cons-util-mill'; 
  

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
          <h1 id='utilitarian' className={`${lusitana.className} mb-4 text-5xl p-6 text-center`}>
              Utilitarian Analysis
          </h1>
        
          <DescriptionCard 
              defaultDescription="Utilitarianism is a consequentialist lens in which the decision that produces the greatest happiness is the morally correct thing to do.  
                            Jeremy Bentham was the first to articulate the hedonic calculus—a means to measure and weigh pleasure which he defined as happiness, against pain, which he defined as unhappiness.
                            Crucial to this type of analysis is that no one person’s or group’s happiness should be given more weight than any other.  
                            It is an equal consideration of everyone’s <em>unranked</em> interests."
              formName={benthamFormName}
              assignmentID={Cookie.get('assignment_id') || ''}
          />

          {/* Utilitarianism Stakeholder Form Bentham*/}
          <h2 id='bentham' className={`${lusitana.className} mb-4 pt-6 text-center`} style={{ fontSize: '2rem' }}>
              Bentham Utilitarian Analysis
          </h2>
          <div>
            <UtilitarianFormBentham />
          </div>

       

          <DescriptionCard
              defaultDescription="John Stuart Mill refined Bentham’s theory by adding an evaluation of higher and lower pleasures. Outcomes that are earned honestly and deserved result in higher pleasures than the opposite.  
                            For example, you can get money by stealing it or working for it.  
                            The pleasure you get from earning it is higher than the pleasure you might get if you steal it. 
                            Run the calculus again, but this time, give higher pleasures more weight."
              formName={millFormName}
              assignmentID={Cookie.get('assignment_id') || ''}
          />

          {/* Utilitarianism Stakeholder Form J.S. Mill*/}
          <h2 id='mill' className={`${lusitana.className} mb-4 pt-6 text-center`} style={{ fontSize: '2rem' }}>
              J.S. Mill Utilitarian Analysis
          </h2>
          <div>
            <UtilitarianFormMill />
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
         <h1 id='utilitarian' className={`${lusitana.className} mb-4 text-5xl p-6 text-center`}>
              Utilitarian Analysis
          </h1>

         <div className="flex flex-col items-center">
          <LockedFormCard formName="The Seven Step Method / Describe Your Dilemma" /> 
        </div>
         
       </div>
     </main>
    )
  
  ): <div>Something has gone wrong</div>
  
}
