'use client';
import { useState, useEffect } from 'react';
import CareForm from '@/app/ui/dashboard/relations/care-form';
import { lusitana } from '@/app/ui/fonts';
import LockedFormCard from '@/app/ui/components/locked-form-card';
import { dilemmaFormSubmitted } from '@/app/utils/is-dilemma-submitted';
import Cookie from 'js-cookie';
import DescriptionCard from '@/app/ui/components/description-card';

export default function CareEthicsPage() {
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const formName = "care-ethics";

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
          <div className="flex h-20 w-full items-center justify-center  p-4 md:h-36">
            <h1 className="text-3xl font-semibold text-grey-800 md:text-5xl text-center">
              Relations
            </h1>
          </div>

          {/* Care Ethics Card Component with instructions */}
          <DescriptionCard 
            defaultDescription="<p class='text-sm md:text-lg'>
                                  Care ethics reminds us that we come to understand the right thing to do by considering how we can care for others. This goes beyond just thinking about the impact of your choice on other people or groups.  There are three main features of care. 
                                </p>
                                <p class='text-sm md:text-lg mt-2'>
                                  <strong>Attentiveness:</strong> Being aware of needs in others— listening/researching rather than presuming what others need.
                                </p>
                                <p class='text-sm md:text-lg mt-2'>
                                  <strong>Competence:</strong> The ability to deliver what is needed— are you in a position to help?
                                </p>
                                <p class='text-sm md:text-lg mt-2'>
                                  <strong>Responsiveness:</strong> Empathy for others— putting yourself in their position.
                                </p>"
            assignmentID={Cookie.get('assignment_id') || ''}
            formName={formName}
          />

          {/* Care Form */}
          <div>
            <CareForm />
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
            Care Ethics
          </h1>

          <div className="flex flex-col items-center">
          <LockedFormCard formName="The Seven Step Method / Describe Your Dilemma" /> 
        </div>
          
        </div>
      </main>
    )

  ): <div>Something has gone wrong</div>
}
