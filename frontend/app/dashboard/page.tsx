'use client';
import { useEffect, useState } from 'react';
import { PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import ConsequencesChart from '@/app/ui/dashboard/charts/consequences-chart';
import ActionAndDutyChart from '@/app/ui/dashboard/charts/action-and-duty-chart';
import IntersectionalityChart from '@/app/ui/dashboard/charts/intersectionality-chart';
import CharacterVirtueChart from '@/app/ui/dashboard/charts/character-virtue-chart';
import MoralMeter from '@/app/ui/components/moral-meter';
import {SubLink, LinkType} from '@/app/ui/components/nav-links';

import axios from 'axios';
import Cookie from 'js-cookie';
import Link from 'next/link';
import { link } from 'fs';
import api from '../utils/api-auth'; //applies the auth headers 

const HIDE_MESSAGE_KEY = 'hideMessageTimestamp';
const HIDE_MESSAGE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const assignmentID = Cookie.get('assignment_id'); 
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const prefix = assignmentID + "-";

const dilemmaLink: LinkType[] = [{
  name: 'Choose Your Case',
  href: '/dashboard/describe-dilemma',
  icon: PencilSquareIcon
}];

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [dilemmaSubmitted, setDilemmaSubmitted] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Check if the alert about needing to save forms to see chart changes has been hidden within the last 24 hours, if so keep it hidden, if not show it again
    const hideTimestamp = localStorage.getItem(HIDE_MESSAGE_KEY);
    if (hideTimestamp) {
      const currentTime = new Date().getTime();
      if (currentTime - parseInt(hideTimestamp) < HIDE_MESSAGE_DURATION) {
        setIsMessageVisible(false); // Hide the message if within 24 hours
      }
    }
  }, []);

  //When the user loads the dashboard page, check and see which forms have been submitted
  useEffect(() => {
    const fetchData = async () => {
      //need to check and see what forms have been submitted for this assignment and add the submitted ones to local storage so that nav links can work properly
      //let dilemmaSubmitted;
      try{
        const userId = localStorage.getItem('id');
        const response = await api.get(`${apiUrl}/api/flask/assignment/is-form-submitted?student_id=${userId}&assignment_id=${assignmentID}&form_name=dilemma`);
        const dilemmaSubmitted = response.data.message;
        if(dilemmaSubmitted == "true"){
          setDilemmaSubmitted(true);
          localStorage.setItem(`${prefix}dilemma-submitted`, "true");
          console.log("Dashboard says dilemma form has been submitted");
        }else{ //if the dilemma form has not beed submitted show a message telling user to start there
          localStorage.setItem(`${prefix}dilemma-submitted`, "false");
          console.log("Dashboard says dilemma form has not been submitted");
          //setDilemmaSubmitted(false);
        }
      }catch(error){
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("Dashboard page.tsx: Dilemma form has not been submitted");
          //dilemmaSubmitted = false;
        }else{
            console.log("Dashboard page.tsx: Error fetching form data: ", error);
            //dilemmaSubmitted = false;
        }
      }
      try{
        //checking to see if the logged in student is a guest or not
        console.log("checking if user is guest");
        const userId = localStorage.getItem('id');
        const response = await api.get(`${apiUrl}/api/flask/guest/is-guest?student_id=${userId}`);
        console.log("is guest api response " + response.data.guest);
        const guest = response.data.guest;
        if(guest){
          setIsGuest(true);
          localStorage.setItem('guest', 'true');
          console.log("student is guest");
          const response = await api.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentID}&form_name=dilemma`); 
          console.log(`Checked dilemma form save ${response}`);
          if(response.status == 200){
            console.log("Dilemma saved");
            setDilemmaSubmitted(true);
          }
        }else{
          localStorage.setItem('guest','false');
          console.log("student is not a guest");
        }
      }catch(error){
        console.log("Error checking if student is guest " + error);
      }
    };

    fetchData();
  }, []);


  const handleCloseMessage = () => {
    setIsMessageVisible(false);
    const currentTime = new Date().getTime();
    localStorage.setItem(HIDE_MESSAGE_KEY, currentTime.toString()); // Store the timestamp when the message is hidden
  };

  // const useEffect = async () => {
  //   const guest = await axios.get(`${apiUrl}/api/flask/guest/is-guest?student_id=${localStorage.getItem('id')}`);
  //   if(guest){
  //     setIsGuest(true);
  //   }
  // };

  if (!isClient) {
    return null;
  }

  console.log("dilemma submitted: " + dilemmaSubmitted);
  return (
    <main>
    

      {/* Conditional rendering for the message */}
      {isMessageVisible && (
        <div className="mb-4 p-4 bg-blue-100 text-black rounded-md flex items-center justify-between text-sm md:text-base lg:text-lg">
          <span>
            Charts are shown and updated only when a form has been saved. You will not see your changes reflected in these charts until you save your inputs.
          </span>
          <button 
            onClick={handleCloseMessage} 
            className="ml-2 text-xl font-bold text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-8 h-8 md:w-8 md:h-8s"/>
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className={`${lusitana.className} text-xl md:text-5xl`}>
              Welcome to the Dashboard
          </h1>
          <p className="text-gray-500 text-sm md:text-lg">
              Here you can see your progress and generate reports based on your inputs. Once you complete a form and save it you can see the results here.
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4 flex justify-center md:justify-start">
          <MoralMeter />
        </div>
      </div>

      {/* conditional rendering for the guest message*/}
      {isGuest && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className={`${lusitana.className} text-xl md:text-5xl`}>
              This is Guest Mode 
            </h2>
            <p className="text-gray-500 text-sm md:text-lg">
              (Guest Mode is a work in progress) You can test the website here without permanently saving your inputs. Once you logout you will not be able to see your answers.
            </p>
          </div>
        </div>
      )}

      {/* Conditional rendering for the dilemma form submission message */}
      {!dilemmaSubmitted && (
      <div className="mb-4 p-4 bg-blue-100 text-black rounded-md flex items-center justify-between text-sm md:text-base lg:text-lg">
        <span>
          <Link 
          key={dilemmaLink[0].name}
          href={dilemmaLink[0].href} 
          className="text-blue-500 hover:underline" 
          >  
            <PencilSquareIcon className="inline-block w-5 h-5 mr-2" /> {/* Render the icon as a JSX element */}
            {dilemmaLink[0].name} {/* Render the name */}</Link>
           to begin your assignment. You must submit this form to unlock the rest of the assignment.
        </span>
        {/* <button 
            onClick={handleCloseMessage} 
            className="ml-2 text-xl font-bold text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="w-8 h-8 md:w-8 md:h-8s"/>
          </button> */}
      </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {<ConsequencesChart />}
        {<ActionAndDutyChart />}
        {<IntersectionalityChart />}
        {<CharacterVirtueChart />}
      </div>
    </main>
  );
}
