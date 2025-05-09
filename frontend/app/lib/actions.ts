'use server';
 

 
// ...



export async function submitDilemma(
  //this will handle the logic of submitting the dilemma form
){

}

// New register function
export async function register(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const name = formData.get('name')?.toString();
  const userType = formData.get('userType')?.toString(); // Get userType from form data

  // Validate inputs
  if (!email || !password || !name || !userType) {
    return 'All fields are required.'; // Include userType in validation
  }

  try {
    // Call your API or service to handle registration
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, userType }), // Include userType in the request body
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData.message || 'Registration failed. Please try again.';
    }

    
  } catch (error) {
    console.error(error);
    return 'An error occurred while trying to register. Please try again.';
  }
}
