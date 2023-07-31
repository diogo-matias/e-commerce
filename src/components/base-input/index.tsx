import { BaseInputType } from "./types";

export function BaseInput(props: BaseInputType) {
    const {
        className,
        containerStyle,
        hasError,
        errorMessage,
        label,
        id,
        name,
        ...otherProps
    } = props;

    function renderErrorText() {
        if (!hasError) {
            return;
        }

        return (
            <div className="">
                <label htmlFor={id} className="text-sm px-6 text-red-500">
                    {errorMessage}
                </label>
            </div>
        );
    }

    function renderLabel() {
        return (
            <label className="font-thin pl-6" htmlFor={name}>
                {label}
            </label>
        );
    }

    return (
        <div className={`${containerStyle} h-20`}>
            {renderLabel()}
            <input
                id={id}
                type="text"
                name={name}
                className={`${className} h-10 w-full font-light text-black rounded-full py-3 px-6 text-sm outline-none focus:shadow-outline placeholder:text-gray-400 border`}
                {...otherProps}
            />
            {renderErrorText()}
        </div>
    );
}
