import { ComponentProps } from "react";

export function Text(props: ComponentProps<"p">) {
    const { children, ...otherProps } = props;

    return (
        <p {...otherProps} className="font-light">
            {children}
        </p>
    );
}
