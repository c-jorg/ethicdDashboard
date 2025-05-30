"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Chart } from 'chart.js/auto'; 
import { lusitana } from '@/app/ui/fonts';

import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Chart as ChartJS } from 'react-chartjs-2';  // Import Bar chart and ChartJS

// Dynamically import the Bar component from react-chartjs-2
const BarChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false, // Disable SSR for dynamic imports in Next.js
});

Chart.register(annotationPlugin); // Register only the annotation plugin globally

const LifePathChart = () => {
    // Data for the bar chart
    const [bottomData, setBottomData] = useState([]); // Default random data for 3 segments
    const [topData, setTopData] = useState([]); // Default random data for 3 segments
    const [bottomLabels, setBottomLabels] = useState([]); // Default labels for each segment
    const [topLabels, setTopLabels] = useState([]); // Default labels for each segment
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
                        let thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=life-path`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for life path chart is:", content);
                            //The inputs appear on the dashboard graph which displays 
                            // the average of responses:  0–3 = Red, 4-6 = Grey, 7-10 = Green
                            let average = 0;
                            let total = 0;
                            let numSliders = content['num-sliders-lp'] || 3;
                            let bottomLabelsHere = [];
                            let topLabelsHere = [];
                            let bottomDataHere = [];
                            let topDataHere = [];
                            for(let i = 0; i < numSliders; i++){
                                let slider = parseInt(content[`slider-value-${i}`]);
                                total += slider;

                                let scale = content[`slider-scale-${i}`];
                                let bottomLabel = scale.split(',')[0];
                                
                                let topLabel = scale.split(',')[1];
                                bottomLabelsHere.push(bottomLabel);
                                topLabelsHere.push(topLabel);

                                let bottomValue = slider;
                                let topValue = 10 - slider;
                                bottomDataHere.push(bottomValue);
                                topDataHere.push(topValue);
                            }
                            average = total / numSliders;
                            
                            setAverage(average);
                            setTopLabels(topLabelsHere);
                            setBottomLabels(bottomLabelsHere);

                            // console.log("bottom labels are ", bottomLabelsHere);
                            // console.log("top labels are ", topLabelsHere);
                            // console.log("set top labels are ", topLabels);
                            // console.log("set bottom labels are ", bottomLabels);
                            setTopData(topDataHere);
                            setBottomData(bottomDataHere);
                            
                            
                        }
                    } catch (error) {
                        if (error.response) {
                            if (error.response.status === 404) {
                                console.log("Life Path Chart Data not found (404):", error.response.data);
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

    useEffect(() => {
        //sync
        //console.log("use effect top labels are ", topLabels);
        //console.log("use effect bottom labels are ", bottomLabels);
    }, [topLabels, bottomLabels]);

    const getBarColor = () => {
        //The average of responses:  0–3 = Red, 4-6 = Grey, 7-10 = Green
        let colors = [];
        if (average >= 7 && average <= 10) {
            colors = [
                'rgba(45, 198, 83, 1)', 
                'rgba(150, 235, 170, 1)', 
            ]; // Green spectrum
        }else if(average >= 4 && average <= 6){
            colors = ['rgb(190,143,4)', 
                      'rgb(255,193,7)', 
            ]; // amber spectrum
         }else {
            colors = [
                'rgb(211, 21, 16)', 
                'rgb(247, 92, 70)', 
            ]; // Red spectrum
        }

        return colors;
    };

    // Bar chart data structure for stacked bar chart
    const data = {
        labels: bottomLabels.map((label, index) => ``), // Combine bottomLabels and topLabels for each category
        datasets: [
            {
                label: 'Negative',
                data: bottomData, // Use bottomData for the bottom segment
                backgroundColor: getBarColor()[0], // Get color based on average
                stack: 'Stack 0', // Stack group
            },
            {
                label: 'Positive',
                data: topData, // Use topData for the top segment
                backgroundColor: getBarColor()[1], // Color for top segment
                stack: 'Stack 0', // Stack group
            },
        ],
    };

    // Chart Options with stacking enabled
    const options = {
        // Ensures the chart is responsive
        aspectRatio: window.innerWidth < 768 ? 1.4 : 2.4, // Different aspect ratio for mobile
        plugins: {
            datalabels: {
            display: true, // Enable data labels
                color: 'black', // Color of the data labels
                anchor: 'end', // Position the label at the end of the segment
                align: 'start', // Align the label to the top of the segment
                font: {
                    weight: 'bold', // Make the font bold
                    size: window.innerWidth < 768 ? 10 : 15, // Smaller font on mobile, larger on desktop
                },
                formatter: (value, context) => {
                    const index = context.dataIndex;
                    const label = context.dataset.label === 'Negative' ? bottomLabels[index] : topLabels[index];
                    return `${label}: ${value}`; // Format the label to show the corresponding label and value
                },
                },
                legend: {
                display: false, // Show legend
                onClick: (e) => {}, //do nothing when clicked on, default behavior is to remove it from graph
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        // Custom tooltip callback
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`; // Adding percentage to the tooltip
                    },
                },
            },
            title: {
                display: true,
                text: 'Life Path',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                stacked: true, // Enable stacking on the y-axis
                max: 10, // Set the y-axis maximum value to 100 for percentage
            },
        },
    };

    return (
        <div className="w-full" style={{ minHeight: '100px' }}>
            {/* Render the Seven Generations Bar chart */}
            <div className="w-full" style={{ height: '200px', position: 'relative' }}> {/* Reduce chart container height */}
                <Bar 
                    data={data} 
                    options={options} 
                    plugins={[ChartDataLabels]} // Register the plugin locally
                />
            </div>
        </div>
    );
};

export default LifePathChart;