'use client'
import { useState, useEffect } from 'react';
import Card from '@/app/ui/components/card';  // Import the reusable Card component
import axios from 'axios';
import Cookie from 'js-cookie';
import api from '../../../utils/api-auth'; //applies the auth headers 

// Separate arrays for titles and grades
const formTitles = [
  { title: 'Seven Step Method', subItems: [] },
  { title: 'Consequences', subItems: [] },
  { title: 'Action and Duty', subItems: ['Role', 'Past Actions', 'Reason'] },
  { title: 'Relations', subItems: ['Care Ethics', 'Intersectionality', 'Seven Generations'] },
  { title: 'Character and Virtue', subItems: ['Virtue Ethics', 'Life Path', 'Universal Principles'] }
];



export default function ViewMyProgressCards() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const [loading, setLoading] = useState(true);
    const assignmentID = Cookie.get('assignment_id');

    const [total, setTotal] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const highestScore = 65;

    const [grades, setGrades] = useState([
        { overall: '0/10' },
        { overall: '0/10' },
        { overall: '0/15', subformGrades: ['0/5', '0/5', '0/5'] },
        { overall: '0/15', subformGrades: ['0/5', '0/5', '0/5'] },
        { overall: '0/15', subformGrades: ['0/5', '0/5', '0/5'] }
      ]);

    /**
     * Fetches the grades for the current assignment from the Flask API
     * Sets the total grade based on the fetched data
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const assignmentId = Cookie.get('assignment_id');

                let data;
                try {
                    const response = await api.get(`${apiUrl}/api/flask/grades?assignment_id=${assignmentId}`);
                    data = response.data;
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        console.log("No saved data found for this form");
                    } else {
                        console.log("Error fetching form data: ", error);
                    }
                }

                let fetchedGrades = data && data.grades ? data.grades : [];

                //get grades
                const consequencesGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Consequences")?.grade || 0;
                const sevenStepMethodGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Seven Step Method")?.grade || 0;
                const roleGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Role")?.grade || 0;
                const pastActionsGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Past Actions")?.grade || 0;
                const reasonGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Reason")?.grade || 0;
                const careEthicsGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Care Ethics")?.grade || 0;
                const intersectionalityGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Intersectionality")?.grade || 0;
                const sevenGenerationsGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Seven Generations")?.grade || 0;
                const virtueEthicsGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Virtue Ethics")?.grade || 0;
                const lifePathGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Life Path")?.grade || 0;
                const universalPrinciplesGrade: number = fetchedGrades.find((g: { form_group: string; grade: number }) => g.form_group === "Universal Principles")?.grade || 0;

                const actionAndDutyTotalGrade = roleGrade + pastActionsGrade + reasonGrade;
                const relationsTotalGrade = careEthicsGrade + intersectionalityGrade + sevenGenerationsGrade;
                const characterTotalGrade = virtueEthicsGrade + lifePathGrade + universalPrinciplesGrade;

                // console.log("Consequences Grade: ", consequencesGrade);
                // console.log("Seven Step Method Grade: ", sevenStepMethodGrade);
                // console.log("Role Grade: ", roleGrade);
                // console.log("Past Actions Grade: ", pastActionsGrade);
                // console.log("Reason Grade: ", reasonGrade);
                // console.log("Care Ethics Grade: ", careEthicsGrade);
                // console.log("Intersectionality Grade: ", intersectionalityGrade);
                // console.log("Seven Generations Grade: ", sevenGenerationsGrade);
                // console.log("Virtue Ethics Grade: ", virtueEthicsGrade);
                // console.log("Life Path Grade: ", lifePathGrade);
                // console.log("Universal Principles Grade: ", universalPrinciplesGrade);
                // console.log("Action and Duty Total Grade: ", actionAndDutyTotalGrade);
                // console.log("Relations Total Grade: ", relationsTotalGrade);
                // console.log("Character Total Grade: ", characterTotalGrade);

                //update grades
                const updatedGrades = [
                    { overall: `${sevenStepMethodGrade}/10` },
                    { overall: `${consequencesGrade}/10` },
                    { overall: `${actionAndDutyTotalGrade}/15`, subformGrades: [`${roleGrade}/5`, `${pastActionsGrade}/5`, `${reasonGrade}/5`] },
                    { overall: `${relationsTotalGrade}/15`, subformGrades: [`${careEthicsGrade}/5`, `${intersectionalityGrade}/5`, `${sevenGenerationsGrade}/5`] },
                    { overall: `${characterTotalGrade}/15`, subformGrades: [`${virtueEthicsGrade}/5`, `${lifePathGrade}/5`, `${universalPrinciplesGrade}/5`] }
                ];

                setGrades(updatedGrades);

                //set total
                setTotal(sevenStepMethodGrade + consequencesGrade + actionAndDutyTotalGrade + relationsTotalGrade + characterTotalGrade);

                
            
                setLoading(false);
            } catch (error) {
                console.error("Error fetching form data: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    /**
     * Sets the percentage once the total is updated
     */
    useEffect(() => {
        //set percentage
        setPercentage(Math.round((total / highestScore) * 100));
    }, [total])

  return (
    <main className="flex flex-col items-center min-h-screen bg-white p-4">
      {/* Header */}
      <div className="w-full max-w-screen-2xl bg-blue-700 text-white text-center py-4 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">View My Progress</h1>
      </div>

      {/* Progress Container */}
      <div className="w-full max-w-screen-2xl bg-gray-100 p-8 rounded-lg shadow-md mt-6">
    

       

          {/* Desktop */}
            <div className="hidden md:block col-span-4">
                {formTitles.map((item, index) => {
                    const grade = grades[index];
                    return (
                        <div key={index} className="grid grid-cols-5 gap-4">
                            {/* Column 1 (Desktop) */}
                            <div className="col-span-4 lg:col-span-4 rounded-lg flex flex-col justify-start space-y-4 h-full">
                                <Card title={item.title} content={[...item.subItems]} />
                            </div>

                            {/* Column 2 (Desktop) */}
                            <div className="hidden sm:flex col-span-1 lg:col-span-1 rounded-lg flex-col justify-start space-y-4 h-full">
                                <Card content={[grade.overall, ...grade.subformGrades || []]} />
                            </div>
                        </div>
                    );
                })}

                {/* Total Progress Card */}
                <div className="grid grid-cols-5 gap-4">
                    {/* Empty space to align Total Progress card to the right */}
                    <div className="col-span-4"></div>
                    
                    {/* Total Progress Card aligned to the right */}
                    <div className="hidden sm:flex col-span-1 lg:col-span-1 rounded-lg flex-col justify-start space-y-4 h-full">
                        <Card title={`Total: ${total}`} content={[`${percentage}%`]} />
                    </div>
                </div>
            </div>
          

          {/* Mobile - Merge Grades with Form Titles */}
            <div className="md:hidden">
            {formTitles.map((item, index) => {
                const grade = grades[index];
                return (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                    {/* Form Title and Grade on separate lines */}
                    <div className="flex justify-between items-center space-x-2">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <span className="font-bold text-gray-800">{grade.overall}</span>
                    </div>

                    {/* Subform Grades */}
                    {item.subItems && item.subItems.length > 0 && (
                    <div className="flex flex-col space-y-1 mt-2">
                        {item.subItems.map((subItem, subIndex) => (
                        <p key={subIndex} className="text-sm text-gray-600">
                            {subItem} - {grade.subformGrades ? grade.subformGrades[subIndex] : 'N/A'}
                        </p>
                        ))}
                    </div>
                    )}
                </div>
                );
            })}

            <Card title={`Total: ${total}`} content={[`${percentage}%`]} />
          </div>
        </div>
    
    </main>
  );
}
