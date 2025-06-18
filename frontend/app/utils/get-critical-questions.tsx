import axios from 'axios';
import Cookie from 'js-cookie'; // Assuming you're using js-cookie to handle cookies
import api from './api-auth'; //applies the auth headers 

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// The reusable fetchQuestions utility function
interface FetchQuestionsParams {
    formName: string;
    caseStudyId: string;
    criticalQuestions: string[];
}

export const fetchQuestions = async ({ formName, caseStudyId, criticalQuestions }: FetchQuestionsParams): Promise<string[]> => {
    try {
        let data;
        try {
            const response = await api.get(`${apiUrl}/api/flask/questions?case_study_id=${caseStudyId}&form_name=${formName}`);
            data = response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.log("No custom critical questions found for this form.");
            } else {
                console.log("Error fetching form data: ", error);
            }
        }

        let questions: string[] = [];
        if (data && Array.isArray(data.questions)) {
            questions = data.questions;
        }

        // Combine the current criticalQuestions with the fetched questions and return the new array
        return [...criticalQuestions, ...questions];

    } catch (error) {
        console.error("Error fetching form data: ", error);
        return criticalQuestions;
    }
};
