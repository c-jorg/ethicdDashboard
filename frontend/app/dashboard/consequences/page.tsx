import { CaseStudyOptionBox } from '@/app/ui/components/case-study-option-box';
import ConsStakeholdersForm from '@/app/ui/dashboard/consequences/cons-stakehold-form';
import UtilitarianFormBentham from '@/app/ui/dashboard/consequences/utilitarian-form-bentham';
import UtilitarianFormMill from '@/app/ui/dashboard/consequences/utilitarian-form-mill';
import { lusitana } from '@/app/ui/fonts';
import Cookie from 'js-cookie'

export default function ConsequencesPage() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="w-full h-full space-y-2.5">
        <div className="">
          <h1 className="text-5xl font-semibold text-grey-800 md:text-3xl text-center">
            Consequences
          </h1>
        </div>
        <CaseStudyOptionBox assignmentID={Cookie.get('assignment_id') || ''} apiUrl={process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/>
        {/* Card Component with instructions */}
        <h1 id='stakeholders' className={`${lusitana.className} mb-4 text-5xl p-4 md:text:2xl text-center`}>
            Stakeholder Analysis
        </h1>
       
        <div className="w-full max-w-5xl mx-auto p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
          <p className={`text-sm md:text-lg`} >
            Consequentialist ethical lenses focus only on the consequences to determine the right thing to do.
          </p>
          <p className={`text-sm md:text-lg`} >
            <strong>First:</strong> For each stakeholder you identified earlier, consider the relative benefits and harms of your choice for both short-term and long-term consequences.
          </p>
          <p className={`text-sm md:text-lg`} >
            <strong>Second:</strong> Rank the stakeholders by reordering them using the arrows according to who you think should impact your decision the most.
          </p>
        </div>

        {/* Consequences Stakeholder Form */}
        <div>
          <ConsStakeholdersForm />
        </div>

        {/* Card Component with instructions */}        
        <h1 id='utilitarian' className={`${lusitana.className} mb-4 text-5xl p-6 text-center`}>
            Utilitarian Analysis
        </h1>
        <div className="w-full max-w-5xl mx-auto p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
          <p className={`text-sm md:text-lg`}>
            Utilitarianism is a consequentialist lens in which the decision that produces the greatest happiness is the morally correct thing to do.  
            Jeremy Bentham was the first to articulate the hedonic calculus—a means to measure and weigh pleasure which he defined as happiness, against pain, which he defined as unhappiness.
            Crucial to this type of analysis is that no one person’s or group’s happiness should be given more weight than any other.  
            It is an equal consideration of everyone’s <em>unranked</em> interests.
          </p>
        </div>

        {/* Utilitarianism Stakeholder Form Bentham*/}
        <h2 id='bentham' className={`${lusitana.className} mb-4 pt-6 text-center`} style={{ fontSize: '2rem' }}>
            Bentham Utilitarian Analysis
        </h2>
        <div>
          <UtilitarianFormBentham />
        </div>

       <div className="w-full max-w-5xl mx-auto p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
          <p className={`text-sm md:text-lg`} >
              John Stuart Mill refined Bentham’s theory by adding an evaluation of higher and lower pleasures.
              Outcomes that are earned honestly and deserved result in higher pleasures than the opposite.  
              For example, you can get money by stealing it or working for it.  
              The pleasure you get from earning it is higher than the pleasure you might get if you steal it. 
              Run the calculus again, but this time, give higher pleasures more weight.
          </p>
        </div>

        {/* Utilitarianism Stakeholder Form J.S. Mill*/}
        <h2 id='mill' className={`${lusitana.className} mb-4 pt-6 text-center`} style={{ fontSize: '2rem' }}>
            J.S. Mill Utilitarian Analysis
        </h2>
        <div>
          <UtilitarianFormMill />
        </div>

      </div>
    </main>
  );
}
