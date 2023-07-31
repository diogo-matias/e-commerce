import { InputHTMLAttributes } from "react";

type CustomProps = {
    hasError?: boolean;
    errorMessage?: string;
    containerStyle?: string;
    label?: string;
};

export type BaseInputType = InputHTMLAttributes<HTMLElement> & CustomProps;
