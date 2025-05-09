import { useEffect } from "react";
import axios from "axios";

interface FetchFeedbackProps {
  formName: string;
  assignmentId: string;
  setFeedback: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const useFetchFeedback = ({ formName, assignmentId, setFeedback }: FetchFeedbackProps) => {
    //console.log("IN")
    const fetchFeedback = async () => {
      interface Feedback {
        content: string;
        key: string;
      }

      let feedbackContent: Feedback[] = [];

      try {
        //console.log("Fetching feedback for assignment ID:", assignmentId, "and form name:", formName);
        const response = await axios.get(`${apiUrl}/api/flask/feedback?assignment_id=${assignmentId}&form_name=${formName}`);
        const feedbackData = response.data;
        //console.log("Raw API Response:", response.data);

        if (feedbackData?.feedback?.length > 0) {
          feedbackContent = feedbackData.feedback.map((feedback: Feedback) => ({
            content: feedback.content,
            key: feedback.key,
          }));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          console.log("No feedback found for this form.");
        } else {
          console.error("Error fetching feedback data:", error);
        }
      }

      //console.log("Feedback content is:", feedbackContent);

      const feedbackDict: { [key: string]: string } = {};
      feedbackContent.forEach((item) => {
        feedbackDict[item.key] = item.content;
      });

      //console.log("Feedback dictionary is  "    , feedbackDict);

      setFeedback(feedbackDict);
    };
    fetchFeedback();

   
};

export default useFetchFeedback;
