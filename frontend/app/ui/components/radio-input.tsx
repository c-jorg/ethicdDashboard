import React from "react";

type props = {
    title: string;
    group: string;
    setter: any;
    options: {
        label: string;
        value: string;
        checked?: boolean
    }[]
}

const RadioInput = (props: props) => {
    return (
        <div className="flex justify-between items-center mt-2">
            <span className="text-sm">{props.title}</span>
            <div className="flex space-x-2">
                {props.options.map((option, index)=>(
                    <label className="flex items-center">
                        <input
                        type="radio"
                        name={props.group}
                        checked={props.options[index].checked === undefined ? false : props.options[index].checked}
                        value={props.options[index].value}
                        className="answer-input mr-1"
                        />
                        {props.options[index].label}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default RadioInput;