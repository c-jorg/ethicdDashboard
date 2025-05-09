'use client';

import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import PencilLoading from '@/app/ui/components/pencil-loading';
import DotsLoading from '@/app/ui/components/loading';

interface Assignment {
  id: number;
  student_id: number;
  case_study_id: number;
  case_study_title: string;
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
    <div
      className="rounded-2xl bg-gray-50 p-8 shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-base text-gray-600 mt-2">
          Saved:{' '}
          {lastModified !== 'N/A'
            ? new Date(lastModified).toLocaleString('en-CA', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'America/Vancouver',
              })
            : 'N/A'}
        </p>
        <p className="text-base text-gray-600 mt-1">Submitted: {submitted ? 'Yes' : 'No'}</p>
        <p className="text-base text-gray-600 mt-1">Graded: {graded ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

export default function AssignmentCards() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const searchParams = useSearchParams();
  const class_id = searchParams.get('class_id');

  useEffect(() => {
    async function fetchAssignments() {
      setError('');
      setIsLoading(true);
      const user_id = localStorage.getItem('id');

      try {
        const response = await axios.get<Assignment[]>(`${apiUrl}/api/flask/assignments`, {
          params: { user_id, class_id },
        });

        const updatedAssignments = response.data.map((assignment) => ({
          ...assignment,
          last_modified: assignment.last_modified || 'N/A',
        }));

        setAssignments(updatedAssignments);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setError('You have not been assigned anything yet.');
        }else{
          setError(
            axios.isAxiosError(error) && error.response
              ? error.response.data.message || 'An error occurred while fetching assignments.'
              : 'An unexpected error occurred. Please try again.'
          );
        }
        setIsLoading(false);
      }
    }

    fetchAssignments();
  }, [searchParams]); // Re-run when URL search parameters change

  if (error) {
    return (
      <div className="flex justify-center">
        <div className="rounded-2xl bg-blue-50 p-8 shadow-lg">
          <p className="text-sm md:text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <DotsLoading />
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-6 ${
        assignments.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : `md:grid-cols-${assignments.length}`
      }`}
    >
      {assignments.map((assignment, index) => (
        <Card
          key={assignment.id}
          title={`Case Study: ${assignment.case_study_title}`}
          lastModified={assignment.last_modified}
          submitted={assignment.submitted}
          graded={assignment.graded}
          assignmentId={assignment.id}
          caseStudyId={assignment.case_study_id}
        />
      ))}
    </div>
  );
}
