"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Chart } from 'chart.js/auto';
import { lusitana } from '@/app/ui/fonts';

import annotationPlugin from 'chartjs-plugin-annotation';
import { Doughnut } from 'react-chartjs-2';  // Import Doughnut chart

import DotsLoading from '@/app/ui/components/loading';
import LifePathChart from '@/app/ui/dashboard/charts/life-path-chart';

Chart.register(annotationPlugin);

// Dynamically import the Doughnut component from react-chartjs-2
const DoughnutChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Doughnut), {
    ssr: false, // Disable SSR for dynamic imports in Next.js
});

const UniversalPrinciplesChart = () => {
    // Data for the donut chart
    const [dataArr, setDataArr] = useState([]); // Default random data for 6 segments
    const [average, setAverage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // UseEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('id');
                const assignmentId = Cookie.get('assignment_id');
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

                if (userId && assignmentId) {
                    try {
                        let thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=universal-principles`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for universal principles chart is:", content);

                            let total = 0;
                            
                            let innerData = [];

                            let environ = parseInt(content['slider-environmental-stewardship']) || 0;
                            let global = parseInt(content['slider-global-justice']) || 0;
                            let inter = parseInt(content['slider-interdependence']) || 0;
                            let place = parseInt(content['slider-reverence-for-place']) || 0;
                            let society = parseInt(content['slider-society-responsibility']) || 0;
                            let reverence = parseInt(content['slider-reverence-for-life']) || 0;

                            //console.log("UNIVERSAL PRINCIPLES: data from form: ", environ, global, inter, place, society, reverence);

                            total += environ;
                            total += global;
                            total += inter;
                            total += place;
                            total += society;
                            total += reverence;

                            let average = total / 6;
                            setAverage(average);
                            //console.log("UNIVERSAL PRINCIPLES: average: ", average);

                            innerData.push(reverence);
                            innerData.push(inter);
                            innerData.push(society);
                            innerData.push(global);
                            innerData.push(environ);
                            innerData.push(place);

                            //console.log("UNIVERSAL PRINCIPLES: setting data arr");
                            setDataArr([...innerData]);
                            //console.log("UNIVERSAL PRINCIPLES: inner data in universal principles: ", innerData);
                            //console.log("UNIVERSAL PRINCIPLES: data arr in universal principles: ", dataArr);
                            
                            
                          

                        }
                    } catch (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                console.log("Character and Virtue Data not found (404):", error.response.data);
                            } else {
                                console.log("Error response:", error.response.status, error.response.data);
                            }
                        } else if (error.request) {
                            console.log("No response received:", error.request);
                        } else {
                            console.log("Error setting up the request:", error.message);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching form data: ", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means it runs once when the component mounts

    
    // Function to get colors for the donut chart based on the average value
    const getDonutColors = () => {
        if (average <= 3) {
            return [
                'rgb(170, 17, 17)', 
                'rgb(211, 21, 16)', 
                'rgb(234, 56, 41)', 
                'rgb(247, 92, 70)', 
                'rgb(255, 124, 101)', 
                'rgb(255, 160, 140)'
            ]; // Red spectrum
        } else if (average >= 4 && average <= 6) {
            return [
                'rgb(190,143,4)', 
                'rgb(222,167,5)', 
                'rgb(255,193,7)', 
                'rgb(255,200,67)', 
                'rgb(255,206,97)', 
                'rgb(255,213,121)'
            ]; // amber spectrum
        } else {
            return [
                'rgba(26, 116, 49, 1)', 
                'rgba(35, 150, 65, 1)', 
                'rgba(45, 198, 83, 1)', 
                'rgba(110, 222, 138, 1)', 
                'rgba(150, 235, 170, 1)', 
                'rgba(183, 239, 197, 1)'
            ]; // Green spectrum
        }
    };

    // Donut chart data structure
    const data = {
        labels: ['Reverence', 'Interdependence', 'Society First', 'Global Justice', 'Environment', 'Place'], // Labels for 6 segments
        datasets: [
            {
                label: 'Universal Principles',
                data: dataArr, // Dynamic data for 6 segments
                backgroundColor: getDonutColors(), // Use colors from getDonutColors
                hoverBackgroundColor: getDonutColors().map(color => color.replace('1)', '0.8)')), // Hover color (slightly transparent)
                borderColor: getDonutColors(), // Border color (same as background)
                borderWidth: 1,
            },
        ],
    };

   // Chart Options
    const options = {
        responsive: true, // Ensures the chart is responsive
        aspectRatio: 0.8,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: window.innerWidth < 768 ? 12 : 20, // Smaller font size on mobile
                    },
                    boxWidth: 20,
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
                maxHeight: 400, // Adjust the max height as needed
                maxWidth: 40, // Adjust the max width as needed
                align: 'start', // Align the legend to the start
                fullSize: true, // Make the legend take full width
                display: true,
                onClick: (e) => {}, //do nothing when clicked on, default behavior is to remove it from graph
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Adding percentage to the tooltip
                    },
                },
            },
            title: {
                display: true,
                text: 'Universal Principles',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25,
                },
            },
        },
    };

    return (
        <div className="w-full" style={{ height: '100%', position: 'relative' }}>
            {/* Render the Seven Generations Bar chart */}
            <div className="w-full" style={{ height: '100%' }}> {/* Set height to 100% */}
                <Doughnut data={data} options={options} />            
            </div>
        </div>
    );
};

export default UniversalPrinciplesChart;
