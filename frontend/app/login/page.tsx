'use client'
import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { useEffect } from 'react';
 
export default function LoginPage() {
  //this does not work. i am trying to inform the user when their session has expired but UGH it doesnt work 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check if x-token-expired is present in the query params (as part of the redirect)
    if (urlParams.get('token-expired') === 'true') {
      alert("Your session has expired, please log in again.");
    }

    if(urlParams.get('account_deleted') === 'true'){
      if(urlParams.get('consented') === 'true'){
        alert("Your account has been successfully deleted. However, your data will be retained in our database for research purposes as per your consent. If you wish to revoke this consent, please contact us at edinfo@lowe-walker.org.");
      }else{
        alert("Your account and all associated data has been deleted.");
      }
    }
  }, []);

  return ( 
    <>
   {/* <head>
        <title>Login</title>
        <meta name="description" content="Login page for the Ethics Dashboard" />
    </head>
    <body>*/}
      <main className="flex items-center justify-center md:h-screen bg-[url('/dashboard-background.png')] bg-cover bg-center">
        <div className="relative mx-auto flex w-full max-w-[400px] md:max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
          
          <div className="flex h-30 w-full items-end rounded-lg bg-blue-500 p-3 md:h-40">
            <div className="w-32 text-white md:w-50">
              <AcmeLogo />
            </div>
          </div>

          <LoginForm />

        </div>
      </main>
    {/*</body>*/}
    </>
  );

}