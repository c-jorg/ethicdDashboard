'use client';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PencilLoading from '@/app/ui/components/pencil-loading';
import DotsLoading from '@/app/ui/components/loading';
import api from '../../utils/api-auth'; //applies the auth headers 

// Define the assignment type
interface Assignment {
  id: number;
  case_study_title: string;
  student_id: number;
  case_study_id: number;
  submitted: boolean;
  graded: boolean;
  last_modified: string;
}

function Card({
  title,
  lastModified,
  submitted,
  graded,
  assignmentId,
  caseStudyId,
}: {
  title: string;
  lastModified: string;
  submitted: boolean;
  graded: boolean;
  assignmentId: number;
  caseStudyId: number;
}) {
  const setAssignmentCookies = (id: number, caseStudyId: number): void => {
    Cookie.set('assignment_id', String(id), { expires: 7 });
    Cookie.set('case_study_id', String(caseStudyId), { expires: 7 });
  };

  const handleClick = () => {
    setAssignmentCookies(assignmentId, caseStudyId);
    window.location.href = `/dashboard?assignment=${assignmentId}`;
  };

  return (
    <div className="flex flex-col">
        <div
        className="rounded-2xl bg-gray-50 p-8 shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 cursor-pointer"
        onClick={handleClick}
        >
        <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 text-center">{title}</h3>
            <p className="text-base text-gray-600 mt-2 text-center">
                Saved: {new Date(lastModified).toLocaleString('en-CA', {
                month: '2-digit', // e.g., "01" for January
                day: '2-digit', // e.g., "30"
                year: 'numeric', // e.g., "2025"
                hour: '2-digit', // e.g., "10"
                minute: '2-digit', // e.g., "30"
                //second: '2-digit', // e.g., "15"
                hour12: true, // Use 12 hour format
                timeZone: 'America/Vancouver', // Pacific Time Zone (BC)
                })}
            </p>
        </div>
        </div>
    </div>
  );
}

export default function DashboardCards() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      const user_id = localStorage.getItem('id');
      try {
        const response = await api.get<Assignment[]>(`${apiUrl}/api/flask/assignments`, {
          params: { user_id: user_id },
        });

        console.log(response.data);

        const updatedAssignments = response.data.map(assignment => {
          if (assignment.last_modified === null) {
            console.log("last_modified is null");
            return { ...assignment, last_modified: "N/A" };
          }
          return assignment;
        });

        setAssignments(updatedAssignments);

        console.log("response data is: " + response.data);
        console.log("updated assignments: ");
        console.log(updatedAssignments);



        //setAssignments(response.data);

        console.log("response data is: " + response.data);
        console.log(response.data);

        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(error.response.data.message || 'An error occurred while fetching assignments.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    }

    fetchAssignments();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center">
        <div className="rounded-2xl bg-blue-50 p-8 shadow-lg">
          <p className="text-sm md:text-lg">You will be able to see your dashboards here once you have been assigned work!</p>
        </div>
      </div>
    );
  }


  if(isLoading){
    //return <div className="min-h-screen flex justify-center items-center"><PencilLoading /></div>;
    return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
  }

  if (!assignments.length) {
    return <p className="text-gray-700">Your professors have not assigned you anything yet!</p>;
  }

  

  return (
    <div className={`grid grid-rows-1 gap-6 ${assignments.length >= 3 ? 'md:grid-rows-2 lg:grid-rows-3' : `md:grid-rows-${assignments.length}`}`}> 
      {assignments.map((assignment, index) => (
        <Card
          key={assignment.id}
          title={`View Dashboard ${index+1}: ${assignment.case_study_title}`}
          lastModified={assignment.last_modified || 'N/A'}
          submitted={assignment.submitted}
          graded={assignment.graded}
          assignmentId={assignment.id}
          caseStudyId={assignment.case_study_id}
        />
      ))}
    </div>
  );
}
