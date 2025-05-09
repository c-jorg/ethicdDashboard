import React, { ChangeEvent, ChangeEventHandler, ReactElement } from "react";

type props = {
    slider: {
        label: string;
        min: number;
        max: number;
        scale: string[];
        value: any;
        onChange: any;
        className?: string;
        id?: string;
        readOnly?: boolean;
        style?: 1 | 2;
        disabled?: boolean;
    }[]
}

const defaultStyle = 1;

const SliderInput = (props: props): ReactElement => {
    props = {
        ...props,
        slider: props.slider.map(slider => ({
            ...slider,
            style: slider.style !== undefined ? slider.style : defaultStyle
        })).filter((e) => e.value != undefined)
    };
    
    return props.slider.some(slider => slider.style === 1) ? (
        <div className="flex justify-between space-x-4">
            {props.slider.map((indivSlider, index)=>(
                <div key={index} className={`flex flex-col items-center ${ props.slider.length === 1  ? 'w-full' : 'w-1/'+props.slider.length}`}>
                    <label className="text-sm font-semibold mb-1">{indivSlider.label}:</label>
                    <input
                        type="range"
                        disabled={indivSlider.disabled}
                        min={indivSlider.min}
                        max={indivSlider.max}
                        value={indivSlider.value}
                        onChange={indivSlider.onChange}
                        className={`w-full answer-input ${indivSlider.className}`}
                        id={indivSlider.id}
                        readOnly = {indivSlider.readOnly}
                    />
                    <div className="flex justify-between text-xs w-full">
                        {indivSlider.scale.map((scaleItem, index2)=>(
                            <span key={index2}>{scaleItem}</span>
                        ))}
                    </div>
                </div>
            ))}
            
        </div>
    ) : (
        <>
            <div className="flex justify-between space-x-4 w-full">
                {props.slider.map((indivSlider, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center w-full relative`}
                    >
                    {/* Label and Slider */}
                    <div className="grid grid-cols-5 gap-2 w-full items-center">
                        <label className="text-sm font-semibold col-span-1 whitespace-nowrap">
                            {indivSlider.label}:
                        </label>

                        <div className="col-span-4">
                            <input
                                type="range"
                                min={indivSlider.min}
                                max={indivSlider.max}
                                value={indivSlider.value}
                                onChange={indivSlider.onChange}
                                className={`w-full answer-input ${indivSlider.className}`}
                                id={indivSlider.id}
                                readOnly={indivSlider.readOnly}
                            />

                            {/* Scale Labels */}
                            <div className="relative w-full mt-1 text-xs">
                                <span className="absolute left-0">{indivSlider.scale[0]}</span>
                                <span className="absolute right-0">{indivSlider.scale[1]}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>

        </>
    );

};

export default SliderInput;