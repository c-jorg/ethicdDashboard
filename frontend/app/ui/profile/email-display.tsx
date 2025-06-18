'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../utils/api-auth'; //applies the auth headers 

export default function EmailDisplay() {
  const [email, setEmail] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  
    
  useEffect(() => {
    async function fetchEmail(){
        const studentID = localStorage.getItem('id');
        try {
            const response = await api.get(`${apiUrl}/api/flask/student/email?student_id=${studentID}`);
            
            // Handle the response from the server (e.g., success message)
            if (response.status === 200) {
                if (response.data.email.includes('guestuser')) {
                  setEmail('None');
                } else {
                  setEmail(response.data.email);
                }
                
                
            } else {
                setEmail(response.data.message);
            }
            
        } catch (error) {
            // Check if the error is an AxiosError and the response exists
            if (axios.isAxiosError(error) && error.response) {
                const { data } = error.response;
                setEmail(data.message || '1. An unknown error occurred. Please try again.');
                
            } else {
                setEmail('2. An unexpected error occurred. Please try again.');
            }
        }
    }
    fetchEmail();
  }, [])


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md flex items-center">
      <h2 className="text-2xl font-semibold">Email:</h2>
      <div className="ml-4 text-lg">{email}</div>
    </div>
  );
}
