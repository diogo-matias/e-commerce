import { BaseButtonProps } from "./types";

export function BaseButton(props: BaseButtonProps) {
    const {
        label,
        uppercase = false,
        className,
        children,
        ...otherProps
    } = props;

    return (
        <div
            className={`${className} h-12 w-full bg-black text-white cursor-pointer flex items-center justify-center`}
            {...otherProps}
        >
            <p className="font-light tracking-widest">
                {uppercase ? label?.toUpperCase() : label}
                {children}
            </p>
        </div>
    );
}
