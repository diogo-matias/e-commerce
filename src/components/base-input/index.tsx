import { BaseInputType } from "./types";

export function BaseInput(props: BaseInputType) {
    const {
        className,
        containerStyle,
        hasError,
        errorMessage,
        id,
        ...otherProps
    } = props;

    function renderErrorText() {
        if (!hasError) {
            return;
        }

        return (
            <div className="mt-2">
                <label htmlFor={id} className="text-sm px-6 text-red-500">
                    {errorMessage}
                </label>
            </div>
        );
    }

    return (
        <div className={containerStyle}>
            <input
                id={id}
                type="text"
                className={`${className} h-10 w-full font-light text-black rounded-full py-3 px-6 text-sm outline-none focus:shadow-outline placeholder:text-gray-400 border`}
                {...otherProps}
            />
            {renderErrorText()}
        </div>
    );
}
