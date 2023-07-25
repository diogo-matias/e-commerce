export type UserInfoType = {
    name: string;
    email: string;
    password: string;
};
export type StateType = {
    userInfo: UserInfoType | null;
    isAuthenticated: boolean;
};
