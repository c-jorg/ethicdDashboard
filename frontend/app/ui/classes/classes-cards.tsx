'use client';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PencilLoading from '@/app/ui/components/pencil-loading';
import DotsLoading from '@/app/ui/components/loading';
import api from '../../utils/api-auth'; //applies the auth headers 

// Define the assignment type
interface Class {
  
  id: number;
  name: string;
  prof: string;
}

function Card({
  id,
  name,
  prof,
}: {
  id: number;
  name: string;
  prof: string;
}) {
  const setClassCookies = (id: number): void => {
    Cookie.set('class_id', String(id), { expires: 7 });
  };

  const handleClick = () => {
    setClassCookies(id);
    window.location.href = `/assignments?class_id=${id}&class_name=${name}`;
  };

  const colors = [
    'bg-red-100 hover:bg-red-100',
    'bg-orange-100 hover:bg-orange-100',
    'bg-yellow-100 hover:bg-yellow-100',
    'bg-green-100 hover:bg-green-100',
    'bg-teal-100 hover:bg-teal-100',
    'bg-blue-100 hover:bg-blue-100',
    'bg-indigo-100 hover:bg-indigo-100',
    'bg-purple-100 hover:bg-purple-100',
    'bg-pink-100 hover:bg-pink-100',
    'bg-gray-100 hover:bg-gray-100',
  ];

  return (
    <div
      className={`rounded-2xl p-8 shadow-lg transition-transform transform hover:scale-105 cursor-pointer ${colors[id % colors.length]}`}
      onClick={handleClick}
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-base text-gray-600 mt-1">Professor: {prof}</p>
      </div>
    </div>
  );
}

export default function ClassCards() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchClasses() {
      const user_id = localStorage.getItem('id');
      //console.log("student id is: " + user_id);
      try {
        const response = await api.get(`${apiUrl}/api/flask/enrollments?student_id=${user_id}`);
        //console.log("response is ", JSON.stringify(response.data));

        interface ApiResponse {
            classes: {
                class_id: number;
                class_name: string;
                professor: string;
            }[];
        }

        const updatedClasses: Class[] = (response.data as ApiResponse).classes.map((classItem) => ({
            id: classItem.class_id,
            name: classItem.class_name,
            prof: classItem.professor,
        }));

        setClasses(updatedClasses);

        //console.log("response data is: " + response.data);
        // console.log("updated classes: ");
        // console.log(updatedClasses);
        // console.log("response data is: " + response.data);
        // console.log(response.data);

        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if(error.response.status === 404){
            setError('You have not joined any classes! You can go to your profile to join a class.');
          }else{
            setError(error.response.data.message || 'An error occurred while fetching enrollments.');
          }

        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    }

    fetchClasses();
  }, []);

  if (error) {
    return (
      <div className="flex justify-center">
        <div className="rounded-2xl bg-blue-50 p-8 shadow-lg">
          <p className="text-sm md:text-lg">{error}</p>
        </div>
      </div>
    );
  }


  if(isLoading){
    //return <div className="min-h-screen flex justify-center items-center"><PencilLoading /></div>;
    return <div className="min-h-screen flex justify-center items-center"><DotsLoading /></div>;
  }

  // if (!classes.length) {
  //   return <p className="text-gray-700">Your professors have not assigned you anything yet!</p>;
  // }

 

  return (
    <div className={`grid grid-cols-1 gap-6 ${classes.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : `md:grid-cols-${classes.length}`}`}> 
      {classes.map((course, index) => (
      <Card
        key={course.id}
        id={course.id}
        name={course.name}
        prof={course.prof}
      />
      ))}
    </div>
  );
}
