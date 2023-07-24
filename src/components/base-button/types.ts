type CustomProps = {
    label?: string;
    uppercase?: boolean;
    color?: string;
    labelColor?: string;
};

export type BaseButtonProps = React.HTMLAttributes<HTMLDivElement> &
    CustomProps;
