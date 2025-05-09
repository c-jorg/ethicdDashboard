import CareForm from '@/app/ui/dashboard/relations/care-form';
import IntersectForm from '@/app/ui/dashboard/relations/intersect-form';
import GenerationsForm from '@/app/ui/dashboard/relations/generations-form';
import { lusitana } from '@/app/ui/fonts';

//WE DON'T ACTUALLY USE THIS PAGE, THIS HAS ALL FORMS ON ONE PAGE, IT IS NOT ACTIVE ON THE SITE

export default function Relations() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="relative flex flex-col w-full h-full space-y-2.5">
        <div className="flex h-20 w-full items-center justify-center  p-4 md:h-36">
          <h1 className="text-5xl font-semibold text-grey-800 md:text-3xl text-center">
            Relations
          </h1>
        </div>

        {/* Care Ethics Card Component with instructions */}
        <h1 id='care-ethics' className={`${lusitana.className} mb-4 text-2xl text-center`}>
            Care Ethics
        </h1>
        <div className="w-full max-w-5xl mx-auto p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
          <p className={`${lusitana.className} text-lg`}>
            Care ethics reminds us that we come to understand the right thing to do by considering how we can care for others. This goes beyond just thinking about the impact of your choice on other people or groups.  There are three main features of care. 
          </p>
          <p className={`${lusitana.className} mt-2`}>
            <strong>Attentiveness:</strong> Being aware of needs in others— listening/researching rather than presuming what others need.
          </p>
          <p className={`${lusitana.className} mt-2`}>
            <strong>Competence:</strong> The ability to deliver what is needed— are you in a position to help?
          </p>
          <p className={`${lusitana.className} mt-2`}>
            <strong>Responsiveness:</strong> Empathy for others— putting yourself in their position.
          </p>
        </div>

        {/* Care Form */}
        <div>
          <CareForm />
        </div>


        {/* Intersectionality Card Component with instructions */}
        <h1 id='intersectionality' className={`${lusitana.className} mb-4 text-2xl text-center`}>
            Intersectionality
        </h1>
        <div className="w-full max-w-5xl mx-auto p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
          <p className={`${lusitana.className} text-lg`}>
            Intersectionality is a way to look at the social location of individuals in order to understand their relative privileges and/oppressions.  
            Many of us belong to groups that statistically are much more likely to experience discrimination.  
            Even though not all members of the group will have the same experience, an intersectional analysis is a helpful way to assess how others will see your choice.  
            For each stakeholder, select from list of privileges/oppressions according to which they are most likely to experience as a result of your choice.  
            (If you see neither or a balance, set slider to the middle point).
          </p>
          <p className={`${lusitana.className} mt-2`}>
            <strong>Note:</strong> Some stakeholder groups may be too socially and politically diverse for this type of analysis.
          </p>
        </div>

        {/* Intersectionality Form */}
        <div>
          <IntersectForm />
        </div>

        {/* Seven Generations Card Component with instructions */}
        <h1 id='seven-generations' className={`${lusitana.className} mb-4 text-2xl text-center`}>
            Seven Generations
        </h1>
        <div className="w-full max-w-5xl mx-auto p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md">
          <p className={`${lusitana.className} text-lg`}>
            Various forms of seven generations teaching is found in many Indigenous cultures.  
            Through this lens we consider the actions and traditions of the previous seven generations and the effect of our actions on the seven generations after us.  
            The ripple effects our actions and choices have impact not only our immediate communities and larger society, but also the natural world over time.  
            We have a responsibility to be the bridge between the past and the future.  
            Consider your choice in terms of impacts on the earth as a whole, and on a continuum between the past and future.  
          </p>
        </div>

        {/* Seven Generations Form */}
        <div>
          <GenerationsForm />
        </div>
      </div>
    </main>
  );
}
