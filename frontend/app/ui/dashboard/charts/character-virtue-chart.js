"use client";
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Chart } from 'chart.js/auto'; 
import { lusitana } from '@/app/ui/fonts';

import annotationPlugin from 'chartjs-plugin-annotation';
import { Pie } from 'react-chartjs-2';  // Import Pie chart

import DotsLoading from '@/app/ui/components/loading';
import LifePathChart from '@/app/ui/dashboard/charts/life-path-chart';
import UniversalPrincplesChart from '@/app/ui/dashboard/charts/universal-principles-chart';
import { set } from 'zod';

Chart.register(annotationPlugin);

// Dynamically import the Line component from react-chartjs-2
// const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
//     ssr: false, // Disable SSR for dynamic imports in Next.js
// });

const CharacterVirtueChart = () => {
    // Data for the pie chart
    const [dataArr, setDataArr] = useState([0, 0, 0]); // Default random data for 3 segments
    const [average, setAverage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [colors, setColors] = useState([]); // Default colors for the 3 segments
    const chartRef = useRef(null);  // Ref to store the chart instance

    // UseEffect hook to fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('id');
                const assignmentId = Cookie.get('assignment_id');
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

                if (userId && assignmentId) {
                    try {
                        let thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=virtue-ethics`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for virtue ethics chart is:", content);

                            // Get the data from the content object
                            const numDomains = content['num-domains'];
                            const pieData = [];
                            let meanTotal = 0;
                            let excessTotal = 0;
                            let deficiencyTotal = 0;
                            let total = 0;
                            for(let i =0; i < numDomains; i++){
                                let vice = parseInt(content[`vice-${i+1}`]);
                                if(vice > 13){
                                    //vice excess
                                    vice = 21 - vice;
                                    excessTotal += 1;
                                }else if(vice >= 7 && vice <= 13){
                                    //vice mean
                                    if(vice > 10){
                                        vice = 21-vice;
                                    }
                                    meanTotal += 1;

                                }else{
                                    //vice deficiency
                                    deficiencyTotal += 1;
                                }
                                total += 1;
                            }
                            // console.log("mean total is:", meanTotal);
                            // console.log("excess total is:", excessTotal);
                            // console.log("deficiency total is:", deficiencyTotal);
                            const meanPercentage = Math.round(meanTotal/total * 100);
                            const excessPercentage = Math.round(excessTotal/total * 100);
                            const deficiencyPercentage = Math.round(deficiencyTotal/total * 100);
                            pieData.push(meanPercentage);
                            pieData.push(excessPercentage);
                            pieData.push(deficiencyPercentage);
                            setDataArr(pieData);
                            //console.log("pie data is:", pieData);

                            //get the average
                            const average = content['vv-average'] || 0;
                            setAverage(average);

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

    const getBarColor = () => {
        let colors = [];
        if (average >= 7 && average <= 10) {
            // Green spectrum (light to dark) with full opacity
            colors = [
                'rgba(45, 198, 83, 1)',   // Light Green
                'rgba(110, 222, 138, 1)', // Medium Green
                'rgba(150, 235, 170, 1)', // Dark Green
            ];
        } else {
            // Red spectrum (light to dark) with full opacity
            colors = [
                'rgba(211, 21, 16, 1)',  // Light Red
                'rgba(234, 56, 41, 1)',  // Medium Red
                'rgba(247, 92, 70, 1)',  // Dark Red
            ];
        }
    
        return colors;
    };

    useEffect(() => {
        const colors = getBarColor();
        //console.log("colors are:", colors);
        setColors(colors);
       
    }, [average]);

    // Force Chart.js to update when colors change
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.update();  // Trigger chart update
        }
    }, [colors]);  // Run whenever colors change
    
    // Pie chart data structure
    const data = {
        labels: ['Virtue Mean', 'Vice Excess', 'Vice Deficiency'], // Labels for the 3 segments
        datasets: [
            {
                label: 'Virtue Ethics',
                data: dataArr, // Dynamic data
                backgroundColor: colors, // Use stored colors
                hoverBackgroundColor: colors.map(color => color.replace('1)', '0.8)')), // Hover color (slightly transparent)
                borderColor: colors, // Border color (same as background)
                borderWidth: 1,
            },
        ],
    };
    

    // Chart Options
    const options = {
        responsive: true, // Ensures the chart is responsive
        aspectRatio: 2,  // Controls the aspect ratio (1:1 means square, adjust for your needs)
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    font: {
                        size: window.innerWidth < 768 ? 12 : 20, // Smaller font size on mobile
                    },
                },
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
                text: 'Virtue Ethics',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25,
                },
            },
        },
    };
    return (
        <div className="w-full md:col-span-4">
    <h2 className={`${lusitana.className} mb-4 text-xl md:text-4xl`}>Character and Virtue</h2>

    {/* Chart Container */}
    <div className="flex flex-col md:flex-row rounded-xl bg-gray-50 p-4 gap-4 md:gap-0" style={{ minHeight: '400px' }}>
        
        {/* Left Side: CharacterVirtueChart and LifePathChart */}
        <div className="flex flex-col w-full md:w-[60%]" style={{ position: 'relative', height: '100%' }}>
            
            {/* CharacterVirtueChart */}
            <div className="w-full" style={{ height: '40%' }}>
                <div>
                    {dataArr.length > 0 ? (
                        <Pie ref={chartRef} data={data} options={options} />
                    ) : (
                        <div className="absolute inset-0 flex justify-center items-center">
                            <DotsLoading />
                        </div>
                    )}
                </div>
            </div>

            {/* LifePathChart */}
            <div className="w-full" style={{ height: '60%' }}>
                <LifePathChart />
            </div>
        </div>

        {/* Right Side: UniversalPrinciplesChart */}
        <div className="w-full md:w-[40%]" style={{ height: '100%', position: 'relative' }}>
            <UniversalPrincplesChart />
        </div>
    </div>
</div>

    

    );
};

export default CharacterVirtueChart;
