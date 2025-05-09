import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface FetchSliderQuestionsParams {
    formName: string;
    caseStudyId: string;
    sliderQuestions: string[];
    sliderLabels: string[][];
}

interface SliderQuestion {
    left_label: string;
    question_text: string;
    right_label: string;
}


// Function to fetch and append slider questions
export const fetchSliderQuestions = async ({ formName, caseStudyId, sliderQuestions, sliderLabels }: FetchSliderQuestionsParams) => {
    try {
        let data;
        try {
            const response = await axios.get(`${apiUrl}/api/flask/slider-questions?case_study_id=${caseStudyId}&form_name=${formName}`);
            data = response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.log("No custom slider questions found for this form.");
            } else {
                console.error("1. Error fetching form data for slider questions:", error);
            }
        }

        /*
            Expected API response format:
            {
                "questions": [
                    {
                        "left_label": "Good",
                        "question_text": "Is it more good or more bad?",
                        "right_label": "Bad"
                    }
                ]
            }
        */

        let newQuestions: string[] = [];
        let newLabels: string[][] = [];

        if (data && Array.isArray(data.questions)) {
            newQuestions = data.questions.map((q: SliderQuestion) => q.question_text);
            newLabels = data.questions.map((q: SliderQuestion) => [q.left_label, q.right_label]);
        }

        // Return the updated state values
        return {
            updatedQuestions: [...sliderQuestions, ...newQuestions],
            updatedLabels: [...sliderLabels, ...newLabels]
        };

    } catch (error) {
        console.error("2. Error fetching form data for slider questions:", error);
        return { updatedQuestions: sliderQuestions, updatedLabels: sliderLabels };
    }
};
