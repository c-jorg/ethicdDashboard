'use client'
import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const id = localStorage.getItem('id');
    console.log("id is " + id);

    // Validate password inputs
    if (newPassword !== confirmPassword) {
      setSuccess('');
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setSuccess('');
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Proceed with password change logic (e.g., API call)
    try {
        const response = await axios.post(`${apiUrl}/api/flask/auth/change-student-password`, {oldPassword, newPassword, id});
        
        // Handle the response from the server (e.g., success message)
        if (response.status === 200) {
           // alert("Password changed successfully!");
            setError('');
            setSuccess('Password changed successfully!');
            // Optionally, clear the form fields or redirect
            setNewPassword('');
            setConfirmPassword('');
            setOldPassword('');
        } else {
            setError('An error occurred while changing the password. Please try again.');
        }
        
    } catch (error) {
          // Check if the error is an AxiosError and the response exists
          if (axios.isAxiosError(error) && error.response) {
              const { data } = error.response;
              setError(data.msg || '1. An unknown error occurred. Please try again.');
              
          } else {
              setError('2. An unexpected error occurred. Please try again.');
          }
    }

    //setSuccess('Password changed successfully!');

  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Change Your Password</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => { setOldPassword(e.target.value); setSuccess(''); setError('') }}
            required
            minLength={6}
            
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setSuccess(''); setError('') }}
            required
            minLength={6}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setSuccess(''); setError('') }}
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
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}
