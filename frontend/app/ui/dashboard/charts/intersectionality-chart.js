"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Chart } from 'chart.js/auto';
import { lusitana } from '@/app/ui/fonts';

import annotationPlugin from 'chartjs-plugin-annotation';
import SevenGenerationsChart from './seven-generations-chart';
import CareEthicsChart from '@/app/ui/dashboard/charts/care-ethics-chart';
import DotsLoading from '@/app/ui/components/loading'

Chart.register(annotationPlugin);

// Dynamically import the Bar component from react-chartjs-2
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false, // Disable SSR for dynamic imports in Next.js
});

const IntersectionalityChart = () => {
    const [oppressions, setOppressions] = useState([]);
    const [privileges, setPrivileges] = useState([]);
  
    let average = 0;

    // useEffect hook to fetch the data when the component mounts
    useEffect(() => {
        //console.log("use effect is running");
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('id');
                const assignmentId = Cookie.get('assignment_id');
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

                if (userId && assignmentId) {
                    try {
                        let thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=intersect-form`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0) {
                            let content;
                            if(data[0].answers && data[0].answers[0] && data[0].answers[0].content){
                                content = data[0].answers[0].content;
                                
                            }else{
                                content = [];
                            }
                            populateSavedData(content);
                        }
                
                    } catch (error) {
                        if (error.response) {
                            // The server responded with a status code that falls out of the range of 2xx
                            if (error.response.status === 404) {
                                console.log("Data not found (404):", error.response.data);
                                let content = [];
                                populateSavedData(content);
                            } else {
                                console.log("Error response:", error.response.status, error.response.data);
                            }
                        } else if (error.request) {
                            // The request was made but no response was received
                            console.log("No response received:", error.request);
                        } else {
                            // Something happened in setting up the request that triggered an error
                            console.log("Error setting up the request:", error.message);
                        }
                    }
                    



                }
            } catch (error) {
                console.error("Error fetching form data: ", error);
            }
        };

        fetchData();
    }, []);

    const populateSavedData = async (content) => {
        //const content = data[0].answers[0].content;
        //console.log("content for intersect form is:", content);

        let numStakeholders = content['num_stakeholders'];
        let oppressionRacismTotal = 0;
        let oppressionSexismTotal = 0;
        let oppressionAbleismTotal = 0;
        let oppressionAgeismTotal = 0;
        let privilegeRacismTotal = 0;
        let privilegeSexismTotal = 0;
        let privilegeAbleismTotal = 0;
        let privilegeAgeismTotal = 0;

        for (let i = 0; i < numStakeholders; i++) {
            let racismKey = `racism-${i}`;
            let sexismKey = `sexism-${i}`;
            let ableismKey = `ableism-${i}`;
            let ageismKey = `ageism-${i}`;

            let racismValue = content[racismKey];
            let sexismValue = content[sexismKey];
            let ableismValue = content[ableismKey];
            let ageismValue = content[ageismKey];

            if (racismValue > 10) {
                racismValue = (20 - racismValue);
                privilegeRacismTotal += parseInt(racismValue);
            } else {
                oppressionRacismTotal += parseInt(racismValue);
            }
            if (sexismValue > 10) {
                sexismValue = (20 - sexismValue);
                privilegeSexismTotal += parseInt(sexismValue);
            } else {
                oppressionSexismTotal += parseInt(sexismValue);
            }
            if (ableismValue > 10) {
                ableismValue = (20 - ableismValue);
                privilegeAbleismTotal += parseInt(ableismValue);
            } else {
                oppressionAbleismTotal += parseInt(ableismValue);
            }
            if (ageismValue > 10) {
                ageismValue = (20 - ageismValue);
                privilegeAgeismTotal += parseInt(ageismValue);
            } else {
                oppressionAgeismTotal += parseInt(ageismValue);
            }
        }

        //ableism and racism have weird values
        let oppressionRacismAverage = oppressionRacismTotal / numStakeholders;
        let oppressionSexismAverage = oppressionSexismTotal / numStakeholders;
        let oppressionAbleismAverage = oppressionAbleismTotal / numStakeholders;
        let oppressionAgeismAverage = oppressionAgeismTotal / numStakeholders;

        let privilegeRacismAverage = privilegeRacismTotal / numStakeholders;
        let privilegeSexismAverage = privilegeSexismTotal / numStakeholders;
        let privilegeAbleismAverage = privilegeAbleismTotal / numStakeholders;
        let privilegeAgeismAverage = privilegeAgeismTotal / numStakeholders;

        let oppressionData = [oppressionAbleismAverage, oppressionAgeismAverage, oppressionRacismAverage, oppressionSexismAverage];
        let privilegeData = [privilegeAbleismAverage, privilegeAgeismAverage, privilegeRacismAverage, privilegeSexismAverage];

        setOppressions(oppressionData);
        setPrivileges(privilegeData);

        const oppressionAverage = (oppressionRacismTotal + oppressionSexismTotal + oppressionAbleismTotal + oppressionAgeismTotal) / 4;
        const privilegeAverage = (privilegeRacismTotal + privilegeSexismTotal + privilegeAbleismTotal + privilegeAgeismTotal) / 4;
        average = (oppressionAverage + privilegeAverage) / 2;
    }

    // Function to determine bar color based on average value
    const getBarColor = () => {
        if (average >= 0 && average <= 3) return ['rgb(211, 21, 16)', 'rgb(234, 56, 41)', 'rgb(247, 92, 70)', 'rgb(255, 124, 101)']; // Red
        if (average >= 4 && average <= 6) return ['rgba(169, 169, 169, 0.6)', 'rgba(189, 189, 189, 0.6)', 'rgba(209, 209, 209, 0.6)', 'rgba(229, 229, 229, 0.6)'];
        if (average >= 7 && average <= 10) return ['rgba(26, 116, 49, 1)', 'rgba(45, 198, 83, 1)', 'rgba(110, 222, 138, 1)', 'rgba(183, 239, 197, 1)']; // Green
        return 'rgba(0, 0, 0, 0.6)'; // Default color
    };

    // Chart data and options
    const chartData = {
        labels: ['Privileges', 'Oppressions'],
        datasets: [
            {
                label: 'Ableism',
                data: [privileges[0], oppressions[0]],
                backgroundColor: [getBarColor()[0], getBarColor()[0]],
                borderColor: [getBarColor()[0], getBarColor()[0]],
                borderWidth: 1,
                borderRadius: 6,
            },
            {
                label: 'Ageism',
                data: [privileges[1], oppressions[1]],
                backgroundColor: [getBarColor()[1], getBarColor()[1]],
                borderColor: [getBarColor()[1], getBarColor()[1]],
                borderWidth: 1,
                borderRadius: 6,
            },
            {
                label: 'Racism',
                data: [privileges[2], oppressions[2]],
                backgroundColor: [getBarColor()[2], getBarColor()[2]],
                borderColor: [getBarColor()[2], getBarColor()[2]],
                borderWidth: 1,
                borderRadius: 6,
            },
            {
                label: 'Sexism',
                data: [privileges[3], oppressions[3]],
                backgroundColor: [getBarColor()[3], getBarColor()[3]],
                borderColor: [getBarColor()[3], getBarColor()[3]],
                borderWidth: 1,
                borderRadius: 6,
            },
        ],
    };

    const chartOptions = {
        indexAxis: 'y', // Horizontal bar chart
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: window.innerWidth < 768 ? 12 : 20, // Smaller font size on mobile
                    },
                },
                onClick: (e) => {}, //do nothing when clicked on, default behavior is to remove it from graph
            },
            title: {
                display: true,
                text: 'Intersectional Analysis',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25, // Smaller font size on mobile
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    display: false, // Hide x-axis ticks
                },
                grid: {
                    display: false, // Hide x-axis grid lines (optional)
                },
            },
            y: {
                ticks: {
                    font: {
                        size: window.innerWidth < 768 ? 10 : 20, // Smaller font size on mobile
                    },
                },
            },
        },
    };

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-4xl`}>Relations</h2>
    
            {/* Chart Container */}
            <div className="flex flex-col rounded-xl bg-gray-50 p-4 gap-4 md:flex-row md:gap-0" style={{ minHeight: '500px'}}>
                {/* Render the Intersectionality Bar chart */}
                <div className="w-full" style={{ minHeight: '300px', position: 'relative' }}>
                    <div>
                        {oppressions.length > 0 && privileges.length > 0 ? (
                            <Bar data={chartData} options={chartOptions} height={180} />
                        ) : (
                            
                            <div className="absolute inset-0 flex justify-center items-center"><DotsLoading /></div>
                           
                        )}
                    </div>
                    <div>
                        <SevenGenerationsChart />
                    </div>
                </div>
    
                {/* Render the Care Ethics Chart */}
                <div className="w-full">
                    <CareEthicsChart />
                </div>
            </div>
        </div>
    );
};

export default IntersectionalityChart;