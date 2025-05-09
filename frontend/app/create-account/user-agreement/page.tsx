

'use client'
import ConsentForm from '@/app/ui/user-agreement/consent-form';


export default function UserAgreement() {

  return (
    <main>
        <div className="flex h-12 w-full items-center justify-center md:h-15">
          <h1 className="text-4xl font-semibold text-gray-800 md:text-4xl text-center">
            Create Account
          </h1>
        </div>

        <ConsentForm />
    </main>
  );
}
