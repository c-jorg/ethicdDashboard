"use client";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Import thumbs-up and thumbs-down icons from react-icons

interface ThumbsUpComponentProps {
    ratio: number;
}

const ThumbsUpComponent = ({ ratio: value }: ThumbsUpComponentProps) => {
    // Function to determine the color based on value
    interface GetColorFunction {
        (val: number): string;
    }

    const getColor: GetColorFunction = (val) => {
        // If 50% or more, pleasure is higher than pain, it is morally correct and displays in green on the dashboard.
        // If less than 50%, pain is higher than pleasure, it is morally incorrect and displays in red on the dashboard
        if (val >= 50) return 'green'; // High value, thumbs up becomes green
        return 'rgb(211, 21, 16)'; // Low value, thumbs down becomes red
    };

    return (
        <div className="flex flex-row md:flex-col  items-center space-y-2">
            {/* Conditionally render thumbs-up or thumbs-down icon */}
            {value >= 50 ? (
                <FaThumbsUp className={`text-5xl md:text-5xl lg:text-7xl`} style={{ color: getColor(value) }} />
            ) : (
                <FaThumbsDown className={`text-5xl md:text-5xl lg:text-7xl`} style={{ color: getColor(value) }} />
            )}
        </div>
    );
};

export default ThumbsUpComponent;