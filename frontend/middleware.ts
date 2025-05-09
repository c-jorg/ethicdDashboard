import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import Cookies from 'js-cookie';


export async function middleware(request: NextRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  //const token = request.cookies.get('access_token')?.value;
  console.log("Middleware.ts api url: " + apiUrl);
  console.log("checking in middleware");
  try{
    console.log("request.headers.get('cookie'): " + request.headers.get('cookie'));
    console.log("all request headers: " + JSON.stringify(request.headers));
    console.log("entire request" + request);
  } catch (e){
    console.log("error getting headers " + (e));
  } 
 
  const cookie = request.headers.get('cookie');
  console.log("cookies: " + cookie);
  const token = cookie?.split(';').find(c => c.trim().startsWith('access_token='))?.split('=')[1];
  console.log("token is: " + token);

  // Function to clear the token
  const clearAuthData = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id');
    localStorage.removeItem('student_name');
    
    Cookies.remove('access_token'); // Remove the token from cookies
  };
  

  // If no token, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Validate the token using Axios
    const response = await axios.post(
      `${apiUrl}/api/flask/auth/validate-token`,
      { token },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      // Token is valid, allow access
      console.log("Token valid - Redirecting to dashboard")
      return NextResponse.next(); //continue processing the request and serve the requested page without any redirection or interruption
    } else if (response.status === 401 && response.data.message === 'Token has expired'){
     //when the token has expired, remove it from local storage and cookies
      clearAuthData();
   
      return NextResponse.redirect(new URL('/login?token-expired=true', request.url));

    }else {
      console.log("1: Invalid token - Redirect to login");
      // Invalid token; redirect to login
      return NextResponse.redirect(new URL('/login?invalid-token=true', request.url));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Check if the error is an AxiosError
      if (error.response?.status === 401 && error.response?.data.message === 'Token has expired') {
        console.log("Token expired - Redirecting to login");
        return NextResponse.redirect(new URL('/login?axios-error=true', request.url));
      }
    }

    console.error('2: Error validating token:', error);
    // Redirect to login on error
    return NextResponse.redirect(new URL('/login?token-validation-error=true', request.url));
  }
}

// Apply middleware only to protected routes
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/assignments/:path*', '/classes/:path*'], // Apply middleware only to protected routes
};