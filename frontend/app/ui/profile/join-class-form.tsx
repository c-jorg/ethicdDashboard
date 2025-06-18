'use client'
import { useState, FormEvent } from 'react';
import axios from 'axios';
import api from '../../utils/api-auth'; //applies the auth headers 

export default function JoinClassForm() {
  const [enrollCode, setEnrollCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const id = localStorage.getItem('id');
    console.log("id is " + id);

    // Proceed with password change logic (e.g., API call)
    try {
        const response = await api.post(`${apiUrl}/api/flask/enrollment`, {'student_id':id, 'class_id':enrollCode});
        
        // Handle the response from the server (e.g., success message)
        if (response.status === 201) {
           // alert("Password changed successfully!");
            setError('');
            setSuccess(`You have enrolled in ${response.data.class_name}!`);
            // Optionally, clear the form fields or redirect
        } else {
            setError('An error occurred while changing the password. Please try again.');
        }
        
    } catch (error) {
          // Check if the error is an AxiosError and the response exists
          if (axios.isAxiosError(error) && error.response) {
              const { data } = error.response;
              setError(data.message || '1. An unknown error occurred. Please try again.');
              
          } else {
              setError('2. An unexpected error occurred. Please try again.');
          }
    }

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Enter Class Code</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="enrollCode" className="block text-sm font-medium text-gray-700">Class Code:</label>
          <input
            id="enrollCode"
            type="text"
            value={enrollCode}
            onChange={(e) => setEnrollCode(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Join Class
          </button>
        </div>
      </form>
    </div>
  );
}
