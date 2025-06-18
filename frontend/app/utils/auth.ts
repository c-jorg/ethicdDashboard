import axios from 'axios';
import Cookies from 'js-cookie';
import api from './api-auth'; //applies the auth headers 

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
//const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://4.206.215.51:4000';


export const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    return false; // No token present
  }

  try {
    const response = await api.post(`${apiUrl}/api/flask/validate-token`, { token }, 
    );

    return response.status === 200; // Token is valid
  } catch (error) {
    console.error('Authentication check failed:', error);
    return false;
  }
};

export const signOut = (): void => {
  // Remove the access token from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('id');
  
  // Remove the access token from cookies
  Cookies.remove('access_token');
  Cookies.remove('assignment_id');
  
  // Optionally redirect the user to the login page
  window.location.href = '/login';
};
