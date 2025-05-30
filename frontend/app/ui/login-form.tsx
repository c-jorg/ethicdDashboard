'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon, UserCircleIcon, EyeIcon, AcademicCapIcon, BuildingLibraryIcon } from '@heroicons/react/20/solid';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { Button } from './button';
import { useActionState } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginForm() {
  // Form state to hold the values of email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // State to hold the selected role

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const profUrl = process.env.NEXT_PUBLIC_PROF_URL || 'http://localhost:5173';
  const profApiUrl = process.env.NEXT_PUBLIC_PROF_API_URL || 'http://localhost:5000';
  
  //const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://4.206.215.51:4000';

 // const router = useRouter();


  console.log("apiUrl is " + apiUrl);
  console.log("profUrl is " + profUrl);
  try{
    console.log("env url is " + process.env.NEXT_PUBLIC_API_URL);
  }catch(error){
    console.log("error in env url " + error);
  }




  const guest_login = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("guest_login called");
    e.preventDefault();
  
    setLoading(true);
    setErrorMessage('');
  
    try {
      const response = await axios.post(`${apiUrl}/api/flask/auth/register-guest`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("respone: " + response);
  
      // Assuming the response contains the access token and a message
      const { message, token, id, name } = response.data;
  
      if (token && id) {
        // Handle the successful login
        console.log("token and id exist");
        try {
          localStorage.setItem('access_token', token); // Save token in localStorage
          localStorage.setItem('id', id);
          localStorage.setItem('student_name', name);
          console.log("student id is " + id);
          //Cookies.set('access_token', token, { expires: 1, path: '/' }); // Expires in 1 day //create cookie for middleware

          //Cookies.set('access_token', token, { expires: 1, path: '/', secure: true, sameSite: 'None' });
          Cookies.set('access_token', token, { expires: 1, path: '/', secure: false });

          window.location.href = '/classes'; // Redirect to classes page
          console.log("saved stuff in local storage");
        } catch (error) {
          setErrorMessage('Failed to store token');
          console.log("Failed to store the token");
        }
      } else {
        // If the token is missing, show an appropriate error
        setErrorMessage('Unexpected response format.');
      }
    } catch (error) {
      setErrorMessage("Guest mode login failed");
    } finally {
      setLoading(false);
    }
  };
  

  // Form submission handler
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage('');  // Clear previous errors

    const data = {
      email: email,
      password: password,
      role: role,
    };



   
    try {
      if (role == 'Student'){
        const response = await axios.post(`${apiUrl}/api/flask/auth/login-student`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // Assuming the response contains the access token and a message
        const { message, token, id, name } = response.data;

        if (token && id) {
          // Handle the successful login
          try{
            
            localStorage.setItem('access_token', token); // Save token in localStorage
            localStorage.setItem('id', id);
            localStorage.setItem('student_name', name);
            console.log("student id is " + id);
            console.log("access token is " + token);
            //Cookies.set('access_token', token, { expires: 1, path: '/' }); // Expires in 1 day //create cookie for middleware
            //Cookies.set('access_token', token, { expires: 1, path: '/', secure: true, sameSite: 'None' });
            Cookies.set('access_token', token, { expires: 1, path: '/', secure: false});

            //the below commented out code is for testing session expiration behaviour
            // Create a new date object for the current time
            // const expirationTime = new Date();
            // // Set the expiration time to 1 minute from now
            // expirationTime.setMinutes(expirationTime.getMinutes() + 1);

            // Set the cookie with the expiration time in 1 minute
            // Cookies.set('access_token', token, {
            //   expires: expirationTime,  // Set expiry to 1 minute from now
            //   path: '/', 
            //   secure: true, 
            //   sameSite: 'None'
            // });

            //Cookies.remove('authjs.session-token');

            window.location.href = '/classes'; // Redirect to dashboard
          }catch(error){
            setErrorMessage('Failed to store token');
            console.log("error storing token " + error);
          }
          
        } else {
          // If the token is missing, show an appropriate error
          setErrorMessage('Unexpected response format.');
        }



      }
      // else if( role == 'Professor'){
      //   const response = await axios.post(`${apiUrl}/api/flask/auth/login-professor`, data, {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   });
      //   // Assuming the response contains the access token and a message
      //   const { message, token, id, name } = response.data;

      //   if (token && id) {
      //     // Handle the successful login
      //     try{
      //       localStorage.setItem('access_token', token); // Save token in localStorage
      //       localStorage.setItem('id', id);
      //       localStorage.setItem('professor_name', name);
      //       console.log("professor id is " + id);
      //       //Cookies.set('access_token', token, { expires: 1, path: '/' }); // Expires in 1 day //create cookie for middleware
      //       //Cookies.set('access_token', token, { expires: 1, path: '/', secure: true, sameSite: 'None' });
      //       Cookies.set('access_token', token, { expires: 1, path: '/', secure: false});

      //      // window.location.href = '/placeholder'; // Redirect to professor dashboard done by the other team
      //       window.location.href = 'http://localhost:5173/prof-dashboard'; // Redirect to professor dashboard done by the other team
      //     }catch(error){
      //       setErrorMessage('Failed to store token');
      //     }
          
      //   } else {
      //     // If the token is missing, show an appropriate error
      //     setErrorMessage('Unexpected response format.');
      //   }


      // }else if( role == 'TA'){
      //   const response = await axios.post(`${apiUrl}/api/flask/auth/login-ta`, data, {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   });
      //   // Assuming the response contains the access token and a message
      //   const { message, token, id, name } = response.data;

      //   if (token && id) {
      //     // Handle the successful login
      //     try{
      //       localStorage.setItem('access_token', token); // Save token in localStorage
      //       localStorage.setItem('id', id);
      //       localStorage.setItem('ta_name', name);
      //       console.log("ta id is " + id);
      //       //Cookies.set('access_token', token, { expires: 1, path: '/' }); // Expires in 1 day //create cookie for middleware
      //       //Cookies.set('access_token', token, { expires: 1, path: '/', secure: true, sameSite: 'None' });
      //       Cookies.set('access_token', token, { expires: 1, path: '/', secure: false});

      //       window.location.href = '/placeholder'; // Redirect to professor dashboard done by the other team
      //     }catch(error){
      //       setErrorMessage('Failed to store token');
      //     }
          
      //   } else {
      //     // If the token is missing, show an appropriate error
      //     setErrorMessage('Unexpected response format.');
      //   }
      // }

    } catch (error) {
      // Handle Axios errors
      if (axios.isAxiosError(error) && error.response) {
        //const { data } = error.response;
        if (error.response) {
          // If there is a response (e.g., 4xx or 5xx error from server)
          const { data } = error.response;
          setErrorMessage(data?.msg || 'An error occurred during login. Please try again.');
        } else if (error.request) {
          // If no response was received (e.g., network issue)
          setErrorMessage('No response received. Please check your network connection.');
        } else {
          // If something went wrong setting up the request
          setErrorMessage('An error occurred while setting up the request.');
        }
        //setErrorMessage(data?.msg || 'An error occurred during login. Please try again.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };


  // Handle role selection
  const handleRoleSelection = (selectedRole: string) => {
    if (selectedRole === "Professor" || selectedRole === "TA") {
      window.location.href = profUrl;
    } else {
      setRole(selectedRole);
    }
  };

  if (!role) {
    return (
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-8 pt-8">
        
        <h1 className="text-2xl font-semibold mb-6 text-center">What is your role?</h1>
        
        <div className="flex flex-col gap-4 text-lg md:text-3xl">
          <Button className="w-full py-3 text-lg md:text-xl" onClick={() => handleRoleSelection("Student")}>
            I'm a Student <AcademicCapIcon className="ml-auto h-7 w-7 text-gray-50" />
          </Button>
          <Button className="w-full py-3 text-lg md:text-xl" onClick={() => handleRoleSelection("Professor")}>
            I'm a Professor <BuildingLibraryIcon className="ml-auto h-7 w-7 text-gray-50" />
          </Button>
          <Button className="w-full py-3 text-lg md:text-xl" onClick={() => handleRoleSelection("TA")}>
            I'm a TA <ClipboardIcon className="ml-auto h-7 w-7 text-gray-50" />
          </Button>
          <Button className="w-full py-3 text=lg md:text-xl" onClick={guest_login} disabled={loading}>
            I'm a Guest <EyeIcon className="ml-auto h-7 w-7 text-gray-50" />
          </Button>
          <label
            className="mb-3 mt-1 block text-sm md:text-md font-medium text-gray-900"
            htmlFor="email"
          >
            Guests once logged out cannot access the same account again
          </label>
        </div>

      </div>
    );
  }

  return (
    <form className="space-y-3" onSubmit={login}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        
        <h1 className={`${lusitana.className} mb-3 text-2xl md:text-3xl`}>
          Please log in to continue as Student
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-sm md:text-lg font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm md:text-md outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                onChange={(e) => setEmail(e.target.value)} // Capture input
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-sm md:text-lg font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm md:text-md outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)} // Capture input
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* Role Selection */}
          {/* <fieldset className="mt-5">
            <legend className="mb-3 block text-sm md:text-md font-medium text-gray-900">
              Select Your Role
            </legend>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  className="form-radio"
                  checked={role === 'Student'}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <span className="ml-2 text-sm md:text-md">Student</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="Professor"
                  className="form-radio"
                  checked={role === 'Professor'}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <span className="ml-2 text-sm md:text-md">Professor</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="TA"
                  className="form-radio"
                  checked={role === 'TA'}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                <span className="ml-2 text-sm md:text-md">TA</span>
              </label>
            </div>
          </fieldset> */}

          
        </div>
        
         
       

        <Button className="mt-4 w-full md:text-md" type="submit" disabled={loading}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        <Link
          href="/create-account"
          className="mt-2 flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm md:text-md font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          <span>Create Account</span> <UserCircleIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Link>
{/* 
        <Link
          href="/dashboard"
          className="mt-2 flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
        >
          <span>Guest Mode</span> <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Link> */}

        {/* <Button className="mt-2 w-full md:text-md" onClick={guest_login} disabled={loading}>
          Guest Mode <EyeIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button> */}



        {/* <label
          className="mb-3 mt-5 block text-sm md:text-md font-medium text-gray-900"
          htmlFor="email"
        >
          Guests once logged out cannot access the same account again
        </label> */}

       {/* Display the error message below the last label */}
       {errorMessage && (
          <div className="mt-3 flex items-center text-sm text-red-500">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500 mr-2" />
            <p>{errorMessage}</p>
          </div>
        )}

      </div>
    </form>
    
  );
}
