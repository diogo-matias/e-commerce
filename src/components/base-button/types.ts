type CustomProps = {
    label?: string;
    uppercase?: boolean;
    color?: string;
    labelColor?: string;
};

export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    CustomProps;
