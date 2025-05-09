import AcmeLogo from '@/app/ui/acme-logo';
//import CreateAccountForm from '@/app/ui/create-account-form-2';
import CreateAccountForm from '@/app/ui/create-account-form';
 
export default function CreateAccountPage() {
  return (
    <>
    <head>
        <title>Create Account</title>
    </head>
    <body>
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto flex w-full max-w-[400px] md:max-w-[500px] flex-col space-y-2.5 p-4 mt-4 md:-mt-32">
        
          
          <div className="flex h-30 w-full items-end rounded-lg bg-blue-500 p-3 md:h-40">
            <div className="w-32 text-white md:w-40">
              <AcmeLogo />
            </div>
          </div>

          <CreateAccountForm backendName="flask"/>

        </div>
      </main>
    </body>
    </>
  );

}