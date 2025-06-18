"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Chart } from 'chart.js/auto';
import { lusitana } from '@/app/ui/fonts';
import DotsLoading from '@/app/ui/components/loading';
import api from '../../../utils/api-auth'; //applies the auth headers 

import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

// Dynamically import the Bar component from react-chartjs-2
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false, // Disable SSR for dynamic imports in Next.js
});

const CareEthicsChart = () => {
    const [attentiveness, setAttentiveness] = useState([]);
    const [competence, setCompetence] = useState([]);
    const [responsiveness, setResponsiveness] = useState([]);

    const minStakeholders = 7; // Define the minStakeholders variable
    const [stakeholders, setStakeholders] = useState(Array(minStakeholders).fill({ attentiveness: 0, competence: 0, responsiveness: 0 })); // Default values
    

    const [attentiveBarLength, setAttentiveBarLength] = useState(0);
    const [competenceBarLength, setCompetenceBarLength] = useState(0);
    const [responsivenessBarLength, setResponsivenessBarLength] = useState(0);
    const [average, setAverage] = useState(0);

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
                        let thisFormData = await api.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=care-form`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0) {
                            let content;
                            if(data[0].answers && data[0].answers[0] && data[0].answers[0].content){
                                content = data[0].answers[0].content;
                                
                            }else{
                                content = [];
                            }
                        // console.log("content for care ethics form is:", content);
                            populateSavedData(content);
                            
                        }
                    } catch (error) {
                        if (error.response) {
                            // The server responded with a status code that falls out of the range of 2xx
                            if (error.response.status === 404) {
                                console.log("Data not found (404):", error.response.data);
                                let content = []
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
        let numStakeholders = content['num_stakeholders'];
        if(numStakeholders == null) numStakeholders = 1; //if no data is found, default to 1 to display empty chart
        let total = 0;
        const attentivenessArray = [];
        const competenceArray = [];
        const responsivenessArray = [];

        const stakeholdersData = [];
        for (let i = 0; i < numStakeholders; i++) {
            const attentiveKey = 'attentiveness-' + i;
            const competenceKey = 'competence-' + i;
            const responsivenessKey = 'responsiveness-' + i;

            let attentiveValue = parseInt(content[attentiveKey]);
            let competenceValue = parseInt(content[competenceKey]);
            let responsivenessValue = parseInt(content[responsivenessKey]);

            //doing this so that if there is no data it displays an empty chart
            if(attentiveValue == null) attentiveValue = 0;
            if(competenceValue == null) competenceValue = 0;
            if(responsivenessValue == null) responsivenessValue = 0;

            attentivenessArray.push(attentiveValue);
            competenceArray.push(competenceValue);
            responsivenessArray.push(responsivenessValue);

            stakeholdersData.push({ attentiveness: attentiveValue, competence: competenceValue, responsiveness: responsivenessValue });

            total += attentiveValue + competenceValue + responsivenessValue;
        }

        setAttentiveness(attentivenessArray);
        setCompetence(competenceArray);
        setResponsiveness(responsivenessArray);
        setStakeholders(stakeholdersData);

        const attentiveBarLength = attentivenessArray.reduce((sum, value) => sum + value, 0);
        const competenceBarLength = competenceArray.reduce((sum, value) => sum + value, 0);
        const responsivenessBarLength = responsivenessArray.reduce((sum, value) => sum + value, 0);

        setAttentiveBarLength(attentiveBarLength);
        setCompetenceBarLength(competenceBarLength);
        setResponsivenessBarLength(responsivenessBarLength);

        const averageValue = Math.floor(total / (numStakeholders * 3));
        setAverage(averageValue);
    };

    const getBarColor = (index) => {
        let colors = [];
         if(average <= 3){
            colors = ['rgb(128, 0, 0)', 
                      'rgb(170, 17, 17)', 
                      'rgb(211, 21, 16)', 
                      'rgb(234, 56, 41)', 
                      'rgb(247, 92, 70)', 
                      'rgb(255, 124, 101)', 
                      'rgb(255, 160, 140)']; // Red spectrum

         }else if (average >= 4 && average <= 6){
            colors = ['rgb(190,143,4)', 
                      'rgb(222,167,5)', 
                      'rgb(255,193,7)', 
                      'rgb(255,200,67)', 
                      'rgb(255,206,97)', 
                      'rgb(255,213,121)', 
                      'rgb(255,219,143)', ]; // amber spectrum
            
         }else if (average >= 7 && average <= 10) {
            colors = ['rgba(15, 82, 30, 1)', 
                      'rgba(26, 116, 49, 1)', 
                      'rgba(35, 150, 65, 1)', 
                      'rgba(45, 198, 83, 1)', 
                      'rgba(110, 222, 138, 1)', 
                      'rgba(150, 235, 170, 1)', 
                      'rgba(183, 239, 197, 1)']; // Green spectrum
         }

         return colors[index % colors.length];
    };


    // Chart data
    const chartData = {
        labels: ['Attentiveness', 'Competence', 'Responsiveness'],
        datasets: stakeholders.map((stakeholder, index) => ({
            label: `Stakeholder ${index + 1}`,
            data: [stakeholder.attentiveness, stakeholder.competence, stakeholder.responsiveness],
            backgroundColor: getBarColor(index),
            borderRadius: 10,
        })),
    };

    // Calculate the maximum value in the data
    const maxDataValue = Math.max(attentiveBarLength, competenceBarLength, responsivenessBarLength);

    // Chart options
    const chartOptions = {
        indexAxis: 'x', // Vertical bar chart
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false, // Show legend
                font: {
                    size: window.innerWidth < 768 ? 12 : 30, // Responsive font size
                },
                onClick: (e) => {}, //do nothing when clicked on, default behavior is to remove it from graph
            },
            tooltip: {
                enabled: true, // Enable tooltips
            },
            title: {
                display: true,
                text: 'Care Ethics Analysis',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25,
                },
            },
        },
        scales: {
            x: {
                stacked: true, // Stack bars
                beginAtZero: true,
                ticks: {
                    display: true, // Show x-axis ticks
                    font: {
                        size: window.innerWidth < 768 ? 10 : 20,
                    },
                },
                title: {
                    display: true,
                    text: 'Categories', // X-axis label
                    font: {
                        size: window.innerWidth < 768 ? 10 : 30,
                    },
                },
                barThickness: 15,
            },
            y: {
                stacked: true, // Stack bars
                beginAtZero: true,
                max: maxDataValue,
                ticks: {
                    display: true, // Show y-axis ticks
                    font: {
                        size: window.innerWidth < 768 ? 10 : 20,
                    },
                },
                // title: {
                //     display: true,
                //     text: 'Values', // Y-axis label
                //     font: {
                //         size: window.innerWidth < 768 ? 10 : 20,
                //     },
                // },
                grid: {
                    display: false, // Hide y-axis grid lines
                },
            },
        },
    };


    return (
        <div className="w-full" style={{ minHeight: '50px' }}>
            {/* Render the Care Ethics Bar chart */}
            <div className="w-full" style={{ height: '400px', position: 'relative'}}> {/* Adjust chart container height */}
                {attentiveness.length > 0 && competence.length > 0 && responsiveness.length > 0 ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    
                    <div className="absolute inset-0 flex justify-center items-center"><DotsLoading /></div>
                  
                )}
            </div>
        </div>
    );
};

export default CareEthicsChart;