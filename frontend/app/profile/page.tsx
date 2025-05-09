

'use client'
import { useEffect, useState } from 'react';

import EmailDisplay from '@/app/ui/profile/email-display';
import PasswordDisplay from '@/app/ui/profile/password-display';
import { Button } from '@/app/ui/button';
import { lusitana } from '@/app/ui/fonts';
import ClearLocalStorageButton from '../ui/components/clear-storage-button';
import DashboardCards from '../ui/profile/dashboard-cards';
import DeleteAccountButton from '../ui/profile/delete-account-button';

export default function Page() {
  const [name, setName] = useState('');
  const guestMessage = "Guests cannot edit their profile information. Please sign in to access these features.";

  useEffect(() => {
    // Access localStorage only after component mounts (client-side)
    const storedName = localStorage.getItem('student_name');
    if (storedName) {
        setName(capitalizeFirstLetter(storedName));
      } else {
        setName('Guest'); // Default to 'Guest' if not found
      }
  }, []); // Empty dependency array means this runs only once after mount

  useEffect(() => {
    if(name == 'Guest'){
      //disable buttons
      const changePasswordButton = document.getElementById("change-password");
      if (changePasswordButton) (changePasswordButton as HTMLButtonElement).disabled = true;

      const changeEmailButton = document.getElementById("change-email");
      if (changeEmailButton) (changeEmailButton as HTMLButtonElement).disabled = true;

      const changeConsentButton = document.getElementById("change-consent");
      if (changeConsentButton) (changeConsentButton as HTMLButtonElement).disabled = true;

      const deleteAccountButton = document.getElementById("delete-account");
      if (deleteAccountButton) (deleteAccountButton as HTMLButtonElement).disabled = true;

      const joinClassButton = document.getElementById("enroll");
      if (joinClassButton) (joinClassButton as HTMLButtonElement).disabled = true;
    }
  }, [name]);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str: string) => {
    
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    
 
    <main className="max-w-2xl mx-auto">
      <div className="w-full max-w-screen-2xl text-white text-center py-5 rounded-lg">
        <h1 className="text-5xl font-semibold text-gray-800 md:text-5xl text-center">
          My Account
        </h1>
      </div>

    

      <div className="mt-4 text-center ">
        <h2 className="text-4xl font-medium text-gray-800">
          Hello, <span className="text-blue-600 font-semibold">{name ? name : 'Guest'}</span>!
        </h2>
        <p className="text-lg text-gray-800 mt-2">
          {name == 'Guest' ? guestMessage : 'Edit your profile information below.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 gap-y-0">
        <div>
          <EmailDisplay />
        </div>
        <div>
          <PasswordDisplay />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 justify-center items-center max-w-md mx-auto">
        
        <Button
          id="change-email"
          className="min-w-[200px] flex justify-center"
          onClick={() => window.location.href = '/profile/change-email'}
        >
          Change Email
        </Button>  
        
        <Button
          id="change-password"
          className="min-w-[200px] flex justify-center"
          onClick={() => window.location.href = '/profile/change-password'}
        >
          Change Password
        </Button>


        <Button
          id="change-consent"
          className="min-w-[200px] flex justify-center"
          onClick={() => window.location.href = '/profile/change-consent'}
        >
          Change Data Consent
        </Button>    

        <div className="flex justify-center">
          <DeleteAccountButton />
        </div>

        
      </div>

      <div className="mt-4 grid grid-cols-1 gap-y-4 justify-center items-center max-w-md mx-auto">
        <Button
          id="enroll"
          className="min-w-[200px] flex justify-center"
          onClick={() => window.location.href = '/profile/join-class'}
        >
          Join a Class
        </Button>
      </div>  

      <div className="max-w-xl mx-auto mt-4">
        <DashboardCards />
      </div>

      
    </main>

  );
}
