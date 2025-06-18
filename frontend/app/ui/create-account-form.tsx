'use client'
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { register } from '@/app/lib/actions';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../utils/api-auth'; //applies the auth headers 

interface User {
id: number;
name: string;
email: string;
}

interface Student {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface UserInterfaceProps {
    backendName: string;
}
  

const CreateAccountForm: React.FC<UserInterfaceProps> = ({ backendName }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    const [students, setStudents] = useState<Student[]>([]);
    const [newStudent, setNewStudent] = useState({ name: '', email: '', password: '', consent: '' });
    const [updateStudent, setUpdateStudent] = useState({ id: '', name: '', email: '', password: '', consent: '' });
  
    const [error, setError] = useState<string>(''); // State for holding error message
    const [userType, setUserType] = useState<string>(''); // Store the selected user type

    const backgroundColors: { [key: string]: string } = {
      flask: 'bg-blue-500',
    };
  
    const buttonColors: { [key: string]: string } = {
      flask: 'bg-blue-700 hover:bg-blue-600',
    };
  
    const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
    const btnColor = buttonColors[backendName as keyof typeof buttonColors] || 'bg-gray-500 hover:bg-gray-600';
  
    // Create student
    const createStudent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Ensure passwords match before submitting
        const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement | null;
        if (confirmPasswordInput && newStudent.password !== confirmPasswordInput.value) {
            console.error('Passwords do not match');
            setError('Passwords do not match');
            return;
        }

        setError(''); // Clear error if passwords match

        console.log('Creating student:', newStudent);
        try {
          const response = await api.post(`${apiUrl}/api/${backendName}/auth/register-student`, newStudent);
          setStudents([response.data, ...students]);
          setNewStudent({ name: '', email: '', password: '', consent: '' });
          window.location.href = "http://localhost:3000/login";
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
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (userType === 'student') {
            createStudent(e); // Only call createStudent if user type is "student"
        } else {
            setError('Not yet handled functionality, only Student sign up works.');
        }
    };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Create a new account
        </h1>
        
        <div className="w-full">
          {/* Name Field */}
          <div>
            <label
              className="mb-3 mt-5 block text-sm md:text-md font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          
          {/* Email Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-sm md:text-md font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value})}
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-sm md:text-md font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={newStudent.password}
                onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value})}
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          
          {/* Confirm Password Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-sm md:text-md font-medium text-gray-900"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* User Type Selection */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-sm md:text-md font-medium text-gray-900"
              htmlFor="userType"
            >
              I am a
            </label>
            <select
              id="userType"
              name="userType"
              className="block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm md:text-md outline-2 placeholder:text-gray-500"
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="" disabled selected>Select your role</option>
              <option value="student">Student</option>
              <option value="professor">Professor</option>
              <option value="ta">Teaching Assistant</option>
            </select>
          </div>
        </div>

        {/* Consent to Use Data */}
        <div className="mt-4">
         
          <a href="/create-account/user-agreement" target="_blank" className="text-blue-500 mb-4 underline">
            Read the user agreement
          </a>
          <p className="mb-4 mt-4 md:text-sm text-sm">
              By clicking “I Agree” below, you confirm that you have read and understood the User Agreement, and you consent to the collection and use of your anonymized data for research purposes for a period of five years.
          </p>


          <select
            id="consent"
            name="consent"
            className="block mt-4 w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
            value={newStudent.consent}
            onChange={(e) => setNewStudent({ ...newStudent, consent: e.target.value})}
            required
          >
            <option value="" disabled>Select your option</option>
            <option value="yes">I Agree to the terms of this User Agreement.</option>
            <option value="no">I Do Not Agree and wish to keep my data private.</option>
          </select>
        </div>


        {/* Error Message */}
        {error && 
          <div
            className="flex h-8 items-end space-x-1 text-red-500 text-sm md:text-md mt-4"
            aria-live="polite"
            aria-atomic="true"
          >
            {error}
          </div>
        }
        
        {/* Submit Button */}
        <Button className="mt-4 w-full">
          Create Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {/* Back to Login Button */}
        <Button
          type="button"
          onClick={() => window.location.href = '/login'}
          className="mt-4 w-full rounded-lg"
        >
          Back to Login <ArrowLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        
        
      </div>
    </form>
  );
}

export default CreateAccountForm;