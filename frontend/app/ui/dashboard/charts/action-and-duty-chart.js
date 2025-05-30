"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Cookie from 'js-cookie';
import { Chart } from 'chart.js/auto'; 
//import 'chart.js/auto'; // Import Chart.js
import { lusitana } from '@/app/ui/fonts';
import DotsLoading from '@/app/ui/components/loading';
import ThumbsUpComponent from '@/app/ui/components/thumbs-up-down'

import annotationPlugin from 'chartjs-plugin-annotation';

//Chart.register(annotationPlugin);

// Dynamically import the Line component from react-chartjs-2
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
    ssr: false, // Disable SSR for dynamic imports in Next.js
});

const ActionAndDutyChart = () => {
    // State to store the fetched data and chart data
    const [personalSacrifices, setPersonalSacrifices] = useState([]);
    const [average, setAverage] = useState(0);
    const [dutiesAverage, setDutiesAverage] = useState(0);
    const [fidelity, setFidelity] = useState([]);
    const [reparation, setReparation] = useState([]);
    const [gratitude, setGratitude] = useState([]);
    const [fillColor, SetFillColor] = useState('rgba(26, 116, 49, 0.2)');
    const [percentageActionTaken, setPercentageActionTaken] = useState(0);
    const [lineColours, setLineColours] = useState(['rgba(45, 198, 83, 1)', 'rgba(183, 239, 197, 1)']);
    const [kant, setKant] = useState(0);
    const [kantText, setKantText] = useState("Does not pass");
    let isLoading = true;

    // Create a gradient for the fill color
    const createGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, fillColor.replace(/0.2\)/, '0.7)')); // Darker version for below 5
        gradient.addColorStop(0.5, fillColor.replace(/0.2\)/, '0.1)')); // Lighter version for above 5
        return gradient;
    };

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
                       
                        let thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=personal-sacrifices`);
                    
                        let data = thisFormData.data.data;
                       
                   
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for personal-sacrifices is:", content);

                            const numSacrifices = content['num-sacrifices'];

                            const sacrificesData = [];
                            let sum = 0;
                            for (let i = 1; i <= numSacrifices; i++) {
                                sacrificesData.push({
                                    name: content[`moral-duty-${i}`],
                                    value: parseInt(content[`slider-${i}`])
                                });
                                sum += parseInt(content[`slider-${i}`]);
                            }
                            setPersonalSacrifices(sacrificesData);

                            const average = sum / numSacrifices;
                            setAverage(average);
                            console.log('average is: ', average);
                            if (average >= 0 && average <= 3) {
                                SetFillColor('rgba(211, 21, 16, 0.2)'); // Red
                            } else if (average >= 4 && average <= 6) {
                                SetFillColor('rgba(222, 167, 5, 0.2)'); // amber
                            } else if (average >= 7 && average <= 10) {
                                SetFillColor('rgba(45, 198, 83, 0.2)'); // Green
                            }
                        }

                    } catch (error) {
                        if (error.response) {
                            // The server responded with a status code that falls out of the range of 2xx
                            if (error.response.status === 404) {
                                console.log("Data not found (404):", error.response.data);
                                const numSacrifices = 1;
                                const sacrificesData = [];
                                for (let i = 1; i <= numSacrifices; i++) {
                                    sacrificesData.push({
                                        name: "N/A",
                                        value: 0,
                                    });
                                }
                                setPersonalSacrifices(sacrificesData);
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

                    // categorical imperitaves universal law test
                    try{
                        const thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=categorical-imperatives`);
                        let data = thisFormData.data.data[0].answers[0].content;
                        console.log("kant data ", data);
                        if(data){
                            const consistencyPass = data['consistency-pass'];
                            const universalityPass = data['universalizability-pass'];
                            console.log(`kant checks consistency: ${consistencyPass}, universality: ${universalityPass}`);
                            if(consistencyPass === 'pass' && universalityPass === 'pass'){
                                setKant(100);
                                setKantText("Passes");
                                console.log("kant passes");
                            }else{
                                setKant(0);
                                setKantText("Does not pass");
                                console.log("kant does not pass");
                            }
                        }
                    }catch(error){
                        console.log("categorical imperatives failed ", error);
                    }
                    
                   
                    try {
                        // console.log("duties versus actions request");
                        // console.log("userId is:", userId);
                        // console.log("assignmentId is:", assignmentId);
                        
                        const thisFormData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userId}&assignment_id=${assignmentId}&form_name=duties-versus-actions`);
                        //console.log("done duties versus actions request");
                        let data = thisFormData.data.data;
                        if (data && data.length > 0 && data[0].answers && data[0].answers[0] && data[0].answers[0].content) {
                            const content = data[0].answers[0].content;
                            //console.log("content for duties-versus-actions is:", content);

                            // Debugging: Log the data before setting state
                            const fidelityData = [{
                                fidelityDuty: content["fidelity-slider-1"],
                                fidelityAction: content["fidelity-slider-2"]
                            }];
                            const gratitudeData = [{
                                gratitudeDuty: content["gratitude-slider-1"],
                                gratitudeAction: content["gratitude-slider-2"]
                            }];
                            const reparationData = [{
                                reparationDuty: content["reparation-slider-1"],
                                reparationAction: content["reparation-slider-2"]
                            }];

                            // console.log("fidelityData:", fidelityData);
                            // console.log("gratitudeData:", gratitudeData);
                            // console.log("reparationData:", reparationData);

                            // Ensure new objects are created
                            setFidelity([{ ...fidelityData[0] }]);
                            setGratitude([{ ...gratitudeData[0] }]);
                            setReparation([{ ...reparationData[0] }]);
                            setPercentageActionTaken(content["percentage-action-taken"]);

                            if(parseInt(content["percentage-action-taken"]) < 40){
                                //console.log("Deciding colour, percentage action taken is " + percentageActionTaken);
                                setLineColours(['rgb(211, 21, 16)', 'rgb(255, 124, 101)']);
                            }else if(parseInt(content["percentage-action-taken"]) >= 40 && parseInt(content["percentage-action-taken"]) < 70){
                                setLineColours(['rgb(255,193,7)', 'rgb(255,206,97)']);
                            }else{
                                setLineColours(['rgba(45, 198, 83, 1)', 'rgba(183, 239, 197, 1)']);
                            }

                            // console.log("fidelity is:", fidelity);
                            // console.log("gratitude is:", gratitude);
                            // console.log("reparation is:", reparation);
                        }else{
                            console.log("duties versus actions no content?");
                        }
                        isLoading = false;
                       
                    } catch (error) {
                        if (error.response) {
                            // The server responded with a status code that falls out of the range of 2xx
                            if (error.response.status === 404) {
                                console.log("Duties Versus Actions Chart: Data not found (404):", error.response.data);
                                
                                setFidelity([{fidelityDuty: 0, fidelityAction: 0}]);
                                setGratitude([{gratitudeDuty: 0, gratitudeAction: 0}]);
                                setReparation([{reparationDuty: 0, reparationAction: 0}]);
                                setPercentageActionTaken(0);
                            } else {
                                console.log("Duties Versus Actions Chart: Error response:", error.response.status, error.response.data);
                            }
                        } else if (error.request) {
                            // The request was made but no response was received
                            console.log("Duties Versus Actions Chart: No response received:", error.request);
                        } else {
                            // Something happened in setting up the request that triggered an error
                            console.log("Duties Versus Actions Chart: Error setting up the request:", error.message);
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
        //console.log("Updated fidelity:", fidelity);
        //console.log("Updated gratitude:", gratitude);
        //console.log("Updated reparation:", reparation);
        // setFidelity(fidelity);
        // setGratitude(gratitude);
        // setReparation(reparation);
        //isLoading = false;
        //console.log("isLoading is:", isLoading);
    }, [fidelity, gratitude, reparation]); // This useEffect runs whenever fidelity, gratitude, or reparation changes

    // Line chart data structure for Personal Sacrifices
    const MAX_LABEL_LENGTH=10;
    const personalSacrificesData = {
        labels: personalSacrifices.map(sacrifice => 
            sacrifice.name.length > MAX_LABEL_LENGTH
            ? sacrifice.name.slice(0, MAX_LABEL_LENGTH) + "..."
            : sacrifice.name
        ), // Use the names from personalSacrifices as labels
        datasets: [
            {
                label: 'Personal Sacrifice',
                data: personalSacrifices.map(sacrifice => sacrifice.value), // Use the values from personalSacrifices as data points
                borderColor: fillColor, // Line color
                borderWidth: 2,
                fill: true, 
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null; // Ensure the chart area is available
                    return createGradient(ctx, chartArea);
                },
            },
        ],
    };

    // Line chart data structure for Action and Duty
    // Line chart data structure for Action and Duty
    const actionAndDutyData = {
        labels: ['Fidelity', 'Reparation', 'Gratitude'], // Labels for the x-axis
        datasets: [
            {
                label: 'Duty',
                data: [
                    fidelity[0]?.fidelityDuty || 0,
                    reparation[0]?.reparationDuty || 0,
                    gratitude[0]?.gratitudeDuty || 0
                ], // First values from each array
                borderColor: lineColours[0], // Line color from lineColours array
                borderWidth: 2,
                fill: false,
            },
            {
                label: 'Action',
                data: [
                    fidelity[0]?.fidelityAction || 0,
                    reparation[0]?.reparationAction || 0,
                    gratitude[0]?.gratitudeAction || 0
                ], // Second values from each array
                borderColor: lineColours[1], // Line color from lineColours array
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    // Options for Personal Sacrifices chart (unchanged from your original code)
    const personalSacrificesOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to adjust its aspect ratio
        layout: {
            padding: 20, // Optional, adds padding around the chart
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: window.innerWidth < 768 ? 12 : 25, // Responsive font size
                    },
                },
                onClick: (e) => {}, //do nothing when clicked on, default behavior is to remove it from graph
            },
            title: {
                display: true,
                text: 'Role Determined Duties',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25, // Responsive font size
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: window.innerWidth < 1000 ? 10 : 25, // Responsive font size for x-axis
                    },
                },
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    font: {
                        size: window.innerWidth < 768 ? 10 : 25, // Responsive font size for y-axis
                    },
                    // Only show 0, 10, and 20 on the y-axis
                    callback: function (value) {
                        if (value === 0 || value === 10 || value === 20) {
                            return value;
                        }
                        return null; // Hide all other ticks
                    },
                },
                min: 0,
                max: 20,
            },
        },
        backgroundColor: 'white', // Set the background color to white
    };

    // Options for Action and Duty chart (custom styling)
    const actionAndDutyOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                right: 60,
                top: 20,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Duties Based On Past Actions',
                font: {
                    size: window.innerWidth < 768 ? 15 : 25, // Responsive font size
                },
            },
            legend: {
                position: 'top', // Legend at the top for this chart
                labels: {
                    generateLabels: (chart) => {
                        const labels = ['Action', 'Duty'];
                        chart.legend.options.labels.font = {
                            family: lusitana.className,
                            size: window.innerWidth < 768 ? 12 : 25, // Responsive font size
                        };
              
                  
                        const colors = [
                            lineColours[1],
                            lineColours[0],
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
                    size: window.innerWidth < 768 ? 20 : 25, // Responsive font size
                },
                onClick: (e) => {}, //do nothing when clicked on, default behavior is to remove it from graph  
            },
            },
            // annotation: {
            //     clip: false, // Allow annotations to overflow the chart area
            //     annotations: {
            //         myText: {
            //             type: 'label', // Type of annotation
            //             content: [percentageActionTaken] + '%', // Text to display
            //             position: {
            //                 x: 'end', // Position the label at the end of the x-axis
            //                 y: 'start', // Position the label at the start of the y-axis
            //                 xAdjust: 0, // Adjust the x position to move the label outside the chart area
            //                 yAdjust: 0 // Adjust the y position if needed
                          
            //             },
            //             color: lineColours[0], // Text color
            //             font: {
            //                 size: window.innerWidth < 768 ? 30 : 50, // Responsive font size // Font size
            //                 //weight: 'bold' // Font weight
            //             }
            //         }
            //     }
            // },
            annotation: {
                clip: false, // Allow annotations to overflow the chart area
                annotations: {
                    myText: {
                        type: 'label', // Type of annotation
                        content: [percentageActionTaken] + '%', // Text to display
                        xValue: 2.2, // start just off the end of x axix
                        yValue: 11, // slightly above top of graph
                        color: lineColours[0], // Text color
                        font: {
                            size: window.innerWidth < 768 ? 12 : 25, // Responsive font size // Font size
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: window.innerWidth < 1000 ? 12 : 25, // Larger font size for x-axis
                    },
                },
                grid: {
                    display: true, // Show grid lines for x-axis
                },
            },
            y: {
                ticks: {
                    font: {
                        size: window.innerWidth < 768 ? 12 : 25, // Larger font size for y-axis
                    },
                    // Show all ticks on the y-axis
                    callback: function (value) {
                        return value;
                    },
                },
                min: 0,
                max: 10,
            },
        },
        backgroundColor: 'white',
    };

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-4xl`}>Action and Duty</h2>
            {/* Scrollable Chart Area */}
            <div
                className="overflow-auto"
                style={{
                    maxHeight: '550px', // adjust as needed
                    maxWidth: '100%',
                }}
            >
                {/* Chart Container */}
                <div className="flex flex-col md:flex-row rounded-xl bg-gray-50 p-4" style={{ minHeight: '500px' }}>
                    {/* kant thumbs up down */}
                    <div className="w-full md:w-1/4 flex flex-row md:flex-col gap-10 md:gap-2 justify-center items-center">
                        <div className="text-xl md:text-2xl">Kant Universal Law</div>
                        <ThumbsUpComponent ratio={kant} style={{ fontSize: window.innerWidth < 768 ? '18px' : '36px' }} />
                        <span className="text-xl md:text-2xl">{kantText}</span>
                    </div>

                    {/* Render the Personal Sacrifices Line chart */}
                    <div className="w-full" style={{ minHeight: '300px', position: 'relative' }}>
                        {personalSacrifices.length > 0 ? (
                            <Line data={personalSacrificesData} options={personalSacrificesOptions} id="personalSacrifices" />
                        ) : (
                            <div className="absolute inset-0 flex justify-center items-center">
                                <DotsLoading />
                            </div>
                        )}
                    </div>
        
                    {/* Render the Action and Duty Line chart */}
                    <div className="w-full" style={{ minHeight: '300px', position: 'relative' }}>
                        {fidelity.length > 0 && reparation.length > 0 && gratitude.length > 0 ? (
                            <Line data={actionAndDutyData} options={actionAndDutyOptions}  plugins={[annotationPlugin]} id="dutiesVersusActions" />// Register the plugin locally />
                        ) : (
                            <div className="absolute inset-0 flex justify-center items-center">
                                <DotsLoading />
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ActionAndDutyChart;