'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface DescriptionCardProps {
  defaultDescription: string;
  formName?: string;
  assignmentID?: string;
  style?: 1 | 2;
}

export default function DescriptionCard({ defaultDescription, formName, assignmentID, style = 1 }: DescriptionCardProps) {
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    if (formName && assignmentID) {
      const fetchDescription = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/flask/form-description?assignment_id=${assignmentID}&form_name=${formName}`);
          console.log("Getting form description for ", formName);

          if (response.data.description) {
            console.log("Description is ", response.data.description);
            setDescription(response.data.description + " ");
          } else {
            console.log("Description Cards: No form description found");
            setDescription(defaultDescription);
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log("Description Cards: No form description found");
            setDescription(defaultDescription);
          } else {
            console.log("Error fetching form description: ", error);
            setDescription(defaultDescription);
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchDescription();
    } else {
      setIsLoading(false);
    }
  }, []);

  /**
   * Makes it so all links in the description open in a new tab
   * @param html 
   * @returns the sanitized html
   */
  const sanitizeLinks = (html: string) => {
    return html.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
  };

    return defaultDescription ? (
        <div
            className={
                style === 1
                    ? "w-full max-w-5xl mx-auto p-6 bg-blue-50 border border-blue-200 rounded-lg shadow-md"
                    : " mt-6 w-full max-w-screen-2xl bg-white p-6 rounded-lg shadow-md border border-gray-300"
            }
        >
            {isLoading && <p className="text-sm md:text-lg">Loading...</p>}
            {!isLoading && (
                <p
                    key={description}
                    className={
                        style === 1
                            ? "text-sm md:text-lg [&_a]:text-blue-600 [&_a]:underline"
                            : "text-gray-700 md:text-lg text-sm [&_a]:text-blue-600 [&_a]:underline"
                    }
                    dangerouslySetInnerHTML={{ __html: sanitizeLinks(description) }}
                />
            )}
        </div>
    ) : null;
}
