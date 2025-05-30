"use client"

import axios from 'axios';
import Cookie from 'js-cookie';
import React, { useState, useEffect} from 'react';
import { getCaseStudyOptionData } from '@/app/utils/get-case-study-option';

interface CaseStudyOptionBoxProps {
    assignmentID: string;
    apiUrl: string;
}



export function CaseStudyOptionBox({ assignmentID, apiUrl }: CaseStudyOptionBoxProps) {
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState('Loading...');
    const [description, setDescription] = useState('Loading...')

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCaseStudyOptionData(assignmentID, apiUrl);
            setTitle(data.title);
            setDescription(data.description);
            console.log(data.description)
        };
        fetchData();
    }, [assignmentID, apiUrl]);

    return (
        <div className="border rounded shadow p-4 my-4 bg-white">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
                <h2 className="text-x1 font-semibold">{title}</h2>
                <span className="text-lg">{expanded ? 'Show less ▲' : 'Show More ▼'}</span>
            </div>
            {expanded && (
                <div className="mt-2 text-gray-700" style={{whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>
                   {description}
                </div>
            )}
        </div>
    );
}