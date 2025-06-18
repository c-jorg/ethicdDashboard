"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Chart } from 'chart.js/auto';
import { lusitana } from '@/app/ui/fonts';
import DotsLoading from '@/app/ui/components/loading';

import annotationPlugin from 'chartjs-plugin-annotation';
import api from '../../../utils/api-auth'; //applies the auth headers 

Chart.register(annotationPlugin);

// Dynamically import the Bar component from react-chartjs-2
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false, // Disable SSR for dynamic imports in Next.js
});

const SevenGenerationsChart = () => {

    const [sliders, setSliders] = useState([-1, -1, -1]);
    const [loading, setLoading] = useState(true);
    const [average, setAverage] = useState(null);

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
                        let thisFormData = await api.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=generations-form`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for seven generations form is:", content);

                            // console.log("slider-1 value:", content['slider-0']);
                            // console.log("slider-2 value:", content['slider-1']);
                            // console.log("slider-3 value:", content['slider-2']);

                            const numSliders = parseInt(content['num-sliders']);    

                            const newSliders = [];
                            let sum = 0;
                            for(let i = 0; i < numSliders; i++) {
                                const sliderValue = parseInt(content[`slider-${i}`]);
                                newSliders.push(sliderValue);
                                sum += parseInt(sliderValue);
                            }
                            setSliders(newSliders);

                            const averageValue = Math.floor(sum / numSliders);
                            console.log("average value is: ", averageValue);

                            setAverage(averageValue);
                            
                        } 
                    } catch (error) {
                        if (error.response) {
                            // The server responded with a status code that falls out of the range of 2xx
                            if (error.response.status === 404) {
                                console.log("Data not found (404):", error.response.data);
                                setSliders([0, 0, 0]);
                                setAverage(0);
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

    useEffect(() => {
        console.log("sliders in use effect: ", sliders);
        if(sliders[0] !== -1) {
            console.log("setting loading to false");
            setLoading(false);
        }
    }, [sliders]);

   // Function to generate gradient colors for the bars based on the average value
    const getBarColor = (value) => {
        if (value === null || value === undefined || isNaN(value)) {
            value = 0; // Fallback to 0 if the value is invalid
        }
        if(value < 0) {
            value = 0;
        }

        const ctx = document.createElement('canvas').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 300, 0); // Horizontal gradient

        let lightColor, darkColor;

        // Determine colors based on the average value
        if (average >= 0 && average <= 3) {
            lightColor = 'rgba(255, 99, 132, 0.6)'; // Light red
            darkColor = 'rgba(255, 0, 0, 0.6)'; // Dark red
        } else if (average >= 4 && average <= 6) {
            lightColor = 'rgb(255,193,7)'; // Light amber
            darkColor = 'rgb(190,143,4)'; // Dark amber
        } else if (average >= 7 && average <= 10) {
            lightColor = 'rgba(45, 198, 83, 1)'; // Light green
            darkColor = 'rgba(150, 235, 170, 1)'; // Dark green
        } else {
            lightColor = 'rgba(0, 0, 0, 0.6)'; // Default color
            darkColor = 'rgb(198, 198, 198)'; // Default color
        }

        // Create the gradient
        gradient.addColorStop(0, lightColor); // Light color up to the value
        gradient.addColorStop(value / 10, lightColor); // Light color up to the value
        gradient.addColorStop(value / 10, darkColor); // Dark color after the value
        gradient.addColorStop(1, darkColor); // Dark color

        console.log("For value: ", value, " gradient is: ", gradient);

        return gradient;
    };

    // Chart data
    const [chartData, setChartData] = useState({
        datasets: [
            {
                data: sliders.map(() => 10),
                backgroundColor: sliders.map((value) => getBarColor(value)),
                borderWidth: 0,
            },
        ],
    });

    useEffect(() => {
        setChartData({
            labels: sliders.map((_, index) => `Slider ${index + 1}`),
            datasets: [
            {
                data: sliders.map(() => 10),
                backgroundColor: sliders.map((value) => getBarColor(value)),
                borderWidth: 0,
            },
            ],
        });
    }, [sliders]);

    // Chart options
    const chartOptions = {
        indexAxis: 'y', // Horizontal bar chart
        responsive: true,
        maintainAspectRatio: false, // Allow chart to adjust height
        plugins: {
            legend: {
                display: false, // Hide legend
                onClick: (e) => {}, //do nothing when clicked on, default behavior is to remove it from graph
            },
            tooltip: {
                enabled: false, // Disable tooltips
            },
            title: {
                display: true,
                text: 'Seven Generations',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 10,
                display: false, // Hide x-axis
            },
            y: {
                ticks: {
                    display: false, // Hide y-axis ticks
                },
                grid: {
                    display: false, // Hide y-axis grid lines
                },
            },
        },
        // Adjust bar thickness and spacing
        barThickness: 10, // Make bars skinnier
        categoryPercentage: 0.8, // Reduce space between categories
        barPercentage: 0.6, // Reduce space between bars
    };

    // Log the chart data before rendering
    console.log("Chart data before rendering:", chartData);

    return (
        <div className="w-full" style={{ minHeight: '100px' }}>
            {/* Render the Seven Generations Bar chart */}
            <div className="w-full" style={{ height: '150px', position: 'relative' }}> {/* Reduce chart container height */}
                {!loading ? (
                    <Bar data={chartData} options={chartOptions} />
                ) : (
                    <div className="absolute inset-0 flex justify-center items-center"><DotsLoading /></div>
                )}
            </div>
        </div>
    );
};

export default SevenGenerationsChart;