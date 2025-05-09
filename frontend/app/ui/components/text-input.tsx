import React, { Dispatch, SetStateAction } from "react";

type props = {
    title: string,
    setter: Function;
    value: string;
    id: string;
    assignmentId: string;
    maxWords?: number;
    rows?: number;
    placeholder?: string;
    className?: string;
    required?: boolean;
}

const TextInput = (props: props) => {
    const maxWords = props.maxWords?props.maxWords:200;

    const countWords = (text: string): number => {
        return text && typeof text === 'string' ? text.trim().split(/\s+/).length : 0;
    };

    const handleInputChange = (setter: Function, text: string) => {
        if (countWords(text) <= maxWords) {
            if(setter){
                setter(text);
            }
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-900">{props.title}</label>
            <textarea
                value={props.value}
                onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                    handleInputChange(props.setter, e.currentTarget.value);
                    localStorage.setItem(`${props.assignmentId}-${props.id}`, e.currentTarget.value);
                    const target = e.currentTarget;
                    target.style.height = 'auto';   
                    target.style.height = `${target.scrollHeight}px`;
                }}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2 resize-none answer-input"
                rows={props.rows ? props.rows : 2}
                placeholder={props.placeholder}
                id={props.id}
                required={props.required}
            />
            <p className={`text-sm text-gray-700 ${countWords(props.value) > maxWords ? 'text-red-500' : ''}`}>
                {countWords(props.value)}/{maxWords} words
            </p>
        </div>
    )
}

export default TextInput;