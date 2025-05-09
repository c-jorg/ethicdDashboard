import React from 'react';

interface CardProps {
    title?: string;
    content: string[];
    hoverColor?: string;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, content, hoverColor, className = 'bg-gray-200' }) => {
    return (
        <div className={`bg-white shadow-md rounded-lg p-4 mb-4 h-full ${className}`}>
            <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
            <div className="mt-2">
                {content.map((line, index) => (
                    <p 
                        key={index} 
                        className={`text-gray-600 ${line.includes('0/10') || line.includes('0/15') ? 'font-bold' : ''}`}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Card;
