'use client'
import { useState, FormEvent } from 'react';
import axios from 'axios';
import api from '../../utils/api-auth'; //applies the auth headers 

export default function ChangeEmailForm() {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const studentID = localStorage.getItem('id');
    console.log("id is " + studentID);


    // Proceed with email change logic (e.g., API call)
    try {
        const response = await api.post(`${apiUrl}/api/flask/auth/change-student-email`, {"password": password, "new_email": newEmail, "student_id": studentID});
        
        // Handle the response from the server (e.g., success message)
        if (response.status === 200) {
           // alert("Email changed successfully!");
            setError('');
            setSuccess('Email changed successfully!');
            // Optionally, clear the form fields or redirect
            setNewEmail('');
            setPassword('');
        } else {
            setSuccess('');
            setError(response.data.message); //expects response is JSON array with a message key
        }
        
    } catch (error) {
          // Check if the error is an AxiosError and the response exists
          if (axios.isAxiosError(error) && error.response) {
              const { data } = error.response;
              setSuccess('');
              setError(data.message || '1. An unknown error occurred. Please try again.');
              
          } else {
              setSuccess('');
              setError('2. An unexpected error occurred. Please try again.');
          }
    }

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Change Your Email</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">New Email</label>
          <input
            id="newEmail"
            type="email"
            value={newEmail}
            onChange={(e) => { setNewEmail(e.target.value); setSuccess(''); setError('') }}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setSuccess(''); setError('') }}
            required
            minLength={6}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Change Email
          </button>
        </div>
      </form>
    </div>
  );
}
