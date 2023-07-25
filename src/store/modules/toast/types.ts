export type UserInfoType = {
    name: string;
    email: string;
    password: string;
};
export type StateType = {
    open: boolean;
    message: string;
    type: "success" | "fail" | "warning";
};
