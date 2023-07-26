export type CreateUserPayloadType = {
    name: string;
    email: string;
    password: string;
};

export type LoginPayloadType = {
    email: string;
    password: string;
};

export type GetUserInfoPayloadType = {
    userId: string;
};
