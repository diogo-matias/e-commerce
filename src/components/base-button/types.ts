type CustomProps = {
    label?: string;
    uppercase?: boolean;
};

export type BaseButtonProps = React.HTMLAttributes<HTMLDivElement> &
    CustomProps;
