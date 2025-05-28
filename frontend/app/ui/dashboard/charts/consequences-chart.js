"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookie from 'js-cookie';
import 'chart.js/auto'; // Import Chart.js
import ThumbsUpComponent from '@/app/ui/components/thumbs-up-down'
import { lusitana } from '@/app/ui/fonts';
import DotsLoading from '@/app/ui/components/loading';


// Dynamically import the Bar component from react-chartjs-2
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
    ssr: false, // Disable SSR for dynamic imports in Next.js
});

const ConsequencesChart = () => {
    // State to store the fetched data and chart data
    const [stUnranked, setStUnranked] = useState(-1);
    const [stRanked, setStRanked] = useState(-1);
    const [ltUnranked, setLtUnranked] = useState(-1);
    const [ltRanked, setLtRanked] = useState(-1);
    const [dataArr, setDataArr] = useState([]);

    const [totalPleasureB, setTotalPleasureB] = useState(0);
    const [totalPainB, setTotalPainB] = useState(0);
    const [ratioB, setRatioB] = useState(0);

    const [totalPleasureM, setTotalPleasureM] = useState(0);
    const [totalPainM, setTotalPainM] = useState(0);
    const [ratioM, setRatioM] = useState(0);

    // useEffect hook to fetch the data when the component mounts
    useEffect(() => {
        //console.log("use effect is running");
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem('id');
                const assignmentId = Cookie.get('assignment_id');
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

                if (userId && assignmentId) {
                    // Fetch data for Consequences chart
                    try {
                        let thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=cons-stakeholders`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for consequences chart dis:", content);
    
                            const newStUnranked = parseFloat(content['unranked-short-term']);
                            const newStRanked = parseFloat(content['ranked-short-term']);
                            const newLtUnranked = parseFloat(content['unranked-long-term']);
                            const newLtRanked = parseFloat(content['ranked-long-term']);
                            const newDataArr = [];
    
                            if (newStUnranked !== -1) newDataArr.push(newStUnranked);
                            if (newLtUnranked !== -1) newDataArr.push(newLtUnranked);
                            if (newStUnranked !== -1) newDataArr.push(100 - newStUnranked);
                            if (newLtUnranked !== -1) newDataArr.push(100 - newLtUnranked);
                            if (newStRanked !== -1) newDataArr.push(newStRanked);
                            if (newLtRanked !== -1) newDataArr.push(newLtRanked);
                            if (newStRanked !== -1) newDataArr.push(100 - newStRanked);
                            if (newLtRanked !== -1) newDataArr.push(100 - newLtRanked);
    
                            // Update state with the new values
                            setStUnranked(newStUnranked);
                            setStRanked(newStRanked);
                            setLtUnranked(newLtUnranked);
                            setLtRanked(newLtRanked);
                            setDataArr(newDataArr);
    
                           // console.log("data is " + newDataArr);
                        }
                    } catch (error) {
                        if (error.response) {
                            // The server responded with a status code that falls out of the range of 2xx
                            if (error.response.status === 404) {
                                console.log("Data not found (404):", error.response.data);
                                //no data found
                                setStUnranked(0);
                                setStRanked(0);
                                setLtUnranked(0);
                                setLtRanked(0);
                                setDataArr([0, 0, 0, 0, 0, 0, 0, 0]);
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
                    
                   
                   
                    // Fetch data for Bentham's Utilitarianism
                    try {
                        let thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=cons-util-bentham`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for utlitarianism Bentham is:", content);

                            const newTotalPleasure = parseFloat(content['total-pleasure']);
                            const newTotalPain = parseFloat(content['total-pain']);
                            const newRatio = parseFloat(content['pleasure-pain-ratio']);

                            // Update state with the new values
                            setTotalPleasureB(newTotalPleasure);
                            setTotalPainB(newTotalPain);
                            setRatioB(newRatio);
                        }
                    } catch (error) {
                        if (error.response) {
                            // The server responded with a status code that falls out of the range of 2xx
                            if (error.response.status === 404) {
                                console.log("Data not found (404):", error.response.data);
                                 //no data found
                                setTotalPleasureB(0);
                                setTotalPainB(0);
                                setRatioB(0);
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
                    
                    
                    //LOAD DATA FOR UTILITARIANISM MILL
                    try {
                        let thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=cons-util-mill`);
                        let data = thisFormData.data.data;
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for utilitarism Mill is:", content);

                            const newTotalPleasure = parseFloat(content['mill-total-pleasure']);
                            const newTotalPain = parseFloat(content['mill-total-pain']);
                            const newRatio = parseFloat(content['mill-pleasure-pain-ratio']);

                            // Update state with the new values
                            setTotalPleasureM(newTotalPleasure);
                            setTotalPainM(newTotalPain);
                            setRatioM(newRatio);
                        }
                    } catch (error) {
                        if (error.response) {
                            // The server responded with a status code that falls out of the range of 2xx
                            if (error.response.status === 404) {
                                console.log("Data not found (404):", error.response.data);
                                //no data found
                                setTotalPleasureM(0);
                                setTotalPainM(0);
                                setRatioM(0);
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
    }, []); // Empty dependency array means it runs once when the component mounts

  

    // Bar chart data structure, use dynamic dataArr
    const data = {
        labels: ['', '', '', '', '', '', '', ''], // Make labels empty strings
        datasets: [
            {
                label: 'Consequences',
                data: dataArr, // Use the dynamically fetched data
                
                // Use only four colors for the new legend labels
                backgroundColor: [
                    'rgba(26, 116, 49, 1)', // ST Benefit color
                    'rgba(45, 198, 83, 1)', // LT Benefit color
                    'rgba(110, 222, 138, 1)', // ST Harm color
                    'rgba(183, 239, 197, 1)', // LT Harm color
                    'rgba(26, 116, 49, 1)', // ST Benefit color
                    'rgba(45, 198, 83, 1)', // LT Benefit color
                    'rgba(110, 222, 138, 1)', // ST Harm color
                    'rgba(183, 239, 197, 1)', // LT Harm color
                ],
                borderColor: [
                    'rgba(26, 116, 49, 1)', // ST Benefit border color
                    'rgba(45, 198, 83, 1)', // LT Benefit border color
                    'rgba(110, 222, 138, 1)', // ST Harm border color
                    'rgba(183, 239, 197, 1)', // LT Harm border color
                    'rgba(26, 116, 49, 1)', // ST Benefit border color
                    'rgba(45, 198, 83, 1)', // LT Benefit border color
                    'rgba(110, 222, 138, 1)', // ST Harm border color
                    'rgba(183, 239, 197, 1)', // LT Harm border color
                ],
                borderWidth: 1,
                borderRadius: 10,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to adjust its aspect ratio
        layout: {
            padding: 20, // Optional, adds padding around the chart
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                        generateLabels: (chart) => {
                            const labels = ['ST Benefit', 'LT Benefit', 'ST Harm', 'LT Harm'];
                            chart.legend.options.labels.font = {
                                family: lusitana.className,
                                size: window.innerWidth < 768 ? 12 : 25, // Responsive font size
                            };
                  
                      
                            const colors = [
                                'rgba(26, 116, 49, 1)', // ST Benefit color
                                'rgba(45, 198, 83, 1)', // LT Benefit color
                                'rgba(110, 222, 138, 1)', // ST Harm color
                                'rgba(183, 239, 197, 1)', // LT Harm color
                            ];
                            return labels.map((label, index) => ({
                                text: label,
                                fillStyle: colors[index],
                                strokeStyle: colors[index],
                                lineWidth: 1,
                                hidden: false,
                                index,
                        }));
                    },
                    font: {
                        size: window.innerWidth < 768 ? 12 : 25, // Responsive font size
                    },
                    
                },
                onClick: (e) => {}, //do nothing when clicked on, default behavior is to remove it from graph
            },
            title: {
                display: window.innerWidth < 768 ? true : false,
                text: window.innerWidth < 768 ? '    Unranked           Ranked' : 'Unranked                                                  Ranked',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25,
                },
            },
            
        },
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: window.innerWidth < 1000 ? 10 : 14, // Responsive font size for x-axis
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    font: {
                        size: window.innerWidth < 768 ? 10 : 14, // Responsive font size for y-axis
                    },
                },
                // grid: {
                //     display: false,
                // },
            },
        },
        // Set the background color of the entire chart container (canvas)
        backgroundColor: 'white', // Set the background color to white
    };

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-4xl`}>Consequences</h2>
    
            {/* Titles for Desktop */}
            {/* <div className="hidden md:flex md:justify-between mb-2">
                <span className={`${lusitana.className} text-3xl text-center w-1/2`}>
                     
                </span>
                <span className={`${lusitana.className} text-3xl text-center w-1/2`}>
                       
                </span>
            </div> */}
    
    
            {/* Chart Container */}
            <div className="flex flex-col md:flex-row rounded-xl bg-gray-50 p-4 relative" style={{ minHeight: '500px' }}>
              
                 {/* Titles for Desktop */}
                <div className="hidden md:flex md:absolute top-0 left-0 right-0 flex justify-between mb-2 p-4 z-10">
                    <span className={`${lusitana.className} text-sm md:text-3xl text-center w-1/2`}>
                        Unranked
                    </span>
                    <span className={`${lusitana.className} text-sm md:text-3xl text-left w-1/2`}>
                        Ranked
                    </span>
                </div>

                {/* Render the Bar chart with dynamic data */}
                <div className="w-full" style={{ minHeight: '300px', position: 'relative' }}>
                    {dataArr.length > 0 ? (
                        <Bar data={data} options={options} />
                    ) : (
                        
                        <div className="absolute inset-0 flex justify-center items-center"><DotsLoading /></div>
                       
                    )}
                </div>
    
                {/* Thumbs Component */}
                <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-10 md:gap-2 justify-center items-center">
                    <div className="text-center md:mb-4 mt-6 md:mt-0">
                        <div className="text-xl md:text-3xl">Bentham</div>
                        <ThumbsUpComponent ratio={ratioB} style={{ fontSize: window.innerWidth < 768 ? '24px' : '60px' }} />
                        <span className="text-xl md:text-3xl">{ratioB}%</span>
                    </div>
                    <div className="text-center mt-6 md:mt-0">
                        <div className="text-xl md:text-3xl">J.S Mill</div>
                        <ThumbsUpComponent ratio={ratioM} style={{ fontSize: window.innerWidth < 768 ? '24px' : '60px' }} />
                        <span className="text-xl md:text-3xl">{ratioM}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsequencesChart;
