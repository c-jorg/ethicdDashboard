import DilemmaForm from '@/app/ui/dashboard/seven-step-method/dilemma-form';
import DescriptionCard from '@/app/ui/components/description-card';
import Cookies from 'js-cookie';

export default function DilemmaPage() {
  const formName = "dilemma";

  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="w-full h-full space-y-2.5">

        <div className="">
          <h1 className="font-semibold text-grey-800 md:text-3xl text-center">
            Describe Your Dilemma
          </h1>
        </div>

        <DescriptionCard
          defaultDescription=""
          assignmentID={Cookies.get('assignment_id') || ''}
          formName={formName}
        />

        <div>
          <DilemmaForm />
        </div>
        
      </div>
    </main>
  );
}
