import { BaseButtonProps } from "./types";

export function BaseButton(props: BaseButtonProps) {
    const {
        label,
        uppercase = false,
        className,
        children,
        type,
        ...otherProps
    } = props;

    return (
        <button
            type={type ?? "button"}
            className={`${className} h-12 w-full bg-black text-white cursor-pointer flex items-center justify-center`}
            {...otherProps}
        >
            <div>
                {children}
                <p className="font-light tracking-widest">
                    {uppercase ? label?.toUpperCase() : label}
                </p>
            </div>
        </button>
    );
}
