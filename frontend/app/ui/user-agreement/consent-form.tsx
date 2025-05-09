'use client';

import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';

const UserAgreementForm = () => {
    const [consent, setConsent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [fromProfile, setFromProfile] = useState(false);

    useEffect(() => {
        setError('');
        setSuccess('');

        
        const fetchData = async () => {
            let data;
            console.log("fetching data for consent form");
            try {
                const id = localStorage.getItem('id');
                if (!id) {
                    setError('No user ID found.');
                    return;
                }

                const response = await axios.get(`${apiUrl}/api/flask/student/consent?user_id=${id}`);
                data = response.data;
                console.log("Consented? " + data.consent);

                // Set the consent state based on the response data
                const consent = data.consent;

                setConsent(consent === true ? 'yes' : 'no');
                
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 404) {
                    setError("Student not found");
                } else {
                    if (error instanceof Error) {
                        setError("Error fetching consent data: " + error.message);
                    } else {
                        setError("Error fetching consent data.");
                    }
                }
            }
        };

        if(window.location.href.includes("profile")){
            setFromProfile(true);
            fetchData();
        }
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const id = localStorage.getItem('id');
        if (!id) {
            setError('No user ID found.');
            return;
        }
        console.log("id is " + id);

        try {
            // PATCH request to update student consent
            console.log("making patch request with consent " + consent);

            const response = await axios.patch(`${apiUrl}/api/flask/student/consent`, { id, consent });
            
            // Handle the response from the server (e.g., success message)
            if (response.status === 200) {
                setError('');
                setSuccess('Consent data updated successfully!');
            } else {
                setError('An error occurred while changing consent. Please try again.');
            }
            
        } catch (error) {
            // Check if the error is an AxiosError and the response exists
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                const { data } = error.response;
                setError(data.msg || 'Student not found');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <>
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">User Agreement & Informed Consent</h2>

            <p className="mb-4 text-gray-700">
                This User Agreement outlines your rights and responsibilities when using The Ethics Dashboard and seeks your informed consent regarding the collection and use of your anonymized data for research purposes. Please read the agreement carefully.
            </p>

            <h3 className="text-lg font-semibold mb-2">1. Purpose of the Application</h3>
            <p className="mb-4 text-gray-700">
                The Ethics Dashboard has been designed to assist users in learning different ways to approach ethical challenges. It collects user input to provide personalized results or recommendations. You have been invited to use this application in this course because we aim to collect data that can help us advance research in applied ethics.
            </p>

            <h3 className="text-lg font-semibold mb-2">2. Voluntary Participation</h3>
            <p className="mb-4 text-gray-700">
                Your participation in this research is entirely voluntary. You are free to decide whether or not to allow the use of your anonymized data for research purposes. Your choice will not affect your ability to use the application to complete the assignment or your grade in this course.
            </p>

            <h3 className="text-lg font-semibold mb-2">3. Data Collection & Use</h3>
            <p className="mb-4 text-gray-700">
                We collect anonymized data, including:
                <strong>Input Data:</strong> Any responses or interactions you submit through the application.
                <strong>Technical Data:</strong> Information such as your browser type, device type, and usage patterns.

                Your data will be used for research purposes to improve the application and to support academic studies in applied ethics. Your identity will remain confidential, and no personally identifiable information will be stored with your data.
            </p>

            <h3 className="text-lg font-semibold mb-2">4. Duration of Data Retention</h3>
            <p className="mb-4 text-gray-700">
                We will retain your anonymized data for a period of <strong>five (5)</strong> years from the date of collection. After this time, your data will be permanently and securely deleted.
            </p>

            <h3 className="text-lg font-semibold mb-2">5. Confidentiality</h3>
            <p className="mb-4 text-gray-700">
                Your identity and any personal details will be kept confidential. The anonymized data we collect will not be linked back to you in any way. Access to the data will be limited, and all data will be stored securely in accordance with applicable privacy regulations.
            </p>

            <h3 className="text-lg font-semibold mb-2">6. Withdrawal of Consent</h3>
            <p className="mb-4 text-gray-700">
                You may withdraw your consent at any time, without penalty, by contacting the research assistant at edinfo@lowe-walker.org.  If you withdraw your consent, we will stop collecting your data, and any previously collected data will be deleted. Withdrawal will not affect your ability to continue to use the application nor will it affect your mark for the assignment or the course.
            </p>

            <h3 className="text-lg font-semibold mb-2">7. Research Results & Updates</h3>
            <p className="mb-4 text-gray-700">
                Your data will contribute to research that may be presented in publications, conferences, or reports. If you would like to receive a summary of the research findings, please contact us at edinfo@lowe-walker.org.
            </p>

            <h3 className="text-lg font-semibold mb-2">8. Potential Benefits</h3>
            <p className="mb-4 text-gray-700">
                By participating, you will contribute to the advancement of research in applied ethics and may help improve the ethical and practical design of The Ethics Dashboard.
            </p>

            <h3 className="text-lg font-semibold mb-2">9. Potential Risks</h3>
            <p className="mb-4 text-gray-700">
                This is a minimal risk research study because the probability of possible harms implied by participation is no greater than those encountered in everyday aspects of your academic life.  For example, there are no further physical risks, psychological or emotional risks, and social risks associated with this study that do not already exist in your life or classes.
            </p>

            <h3 className="text-lg font-semibold mb-2">10. Questions & Inquiries</h3>
            <p className="mb-4 text-gray-700">
                If you have any questions or concerns about this agreement or the use of your data, we encourage you to contact the Principal Investigator at edinfo@lowe-walker.org.  Additionally, if you have concerns about your treatment or rights as a research participant, you may contact the Chair of the Okanagan College Research Ethics Board at 250-762-5445 (local 4736) or reb@okanagan.bc.ca.
            </p>

            

            {/* Only allow users to change see this form if they are coming from the profile */}
            {fromProfile && 
                <>
                    <h3 className="text-lg font-semibold mb-2">11. Agreement</h3>
                    <p className="mb-4 text-gray-700">
                        By clicking “I Agree” below, you confirm that you have read and understood this User Agreement, and you consent to the collection and use of your anonymized data for research purposes for a period of five years.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                <input 
                                    type="radio" 
                                    name="consent" 
                                    value="yes" 
                                    onChange={() => {
                                        setConsent("yes");
                                        setError('');
                                        setSuccess('');
                                    }} 
                                    checked={consent === 'yes'}
                                    className="mr-2"
                                />
                                I Agree to the terms of this User Agreement.
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                <input 
                                    type="radio" 
                                    name="consent" 
                                    value="no" 
                                    onChange={() => {
                                        setConsent("no");
                                        setError('');
                                        setSuccess('');
                                    }} 
                                    checked={consent === 'no'}
                                    className="mr-2"
                                />
                                I Do Not Agree and wish to keep my data private.
                            </label>
                        </div>

                        {error && <p className="text-red-500 text-center mt-4 mb-4">{error}</p>}
                        {success && <p className="text-green-500 text-center mt-4 mb-4">{success}</p>}
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           
                        >
                            Submit
                        </button>                
                    </form>
                    <div className="mt-4 text-gray-700">
                        This agreement meets the necessary conditions for informed consent as outlined by Okanagan College’s Research Ethics Board. Thank you for your participation!
                    </div>
                </>
            }
            {!fromProfile && 
                <>
                    <div className="mt-4 text-center text-gray-700">
                        <p className="text-lg font-semibold">Return to the Create Account form by closing this tab</p>
                        <p 
                            className="text-md mt-3 text-blue-600 underline cursor-pointer hover:text-blue-800"
                            onClick={() => window.close()}
                        >
                            Close this tab
                        </p>
                    </div>
                </>
            }
        </div>
        <div>
            <p className="text-md font-semibold text-center mb-4 p-5">Version 4, Feb 2025 </p>
        </div>
        </>
    );
};

export default UserAgreementForm;
