import { InputHTMLAttributes } from "react";
import { BaseInputType } from "./types";

export function BaseInput(props: BaseInputType) {
    const { className, ...otherProps } = props;

    return (
        <input
            type="text"
            className={`${className} h-10 w-full font-light text-black rounded-full py-3 px-6 text-sm outline-none focus:shadow-outline placeholder:text-gray-400 border`}
            {...otherProps}
        />
    );
}
