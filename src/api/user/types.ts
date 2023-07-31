export type CreateUserPayloadType = {
    name: string;
    email: string;
    password: string;
};

export type LoginPayloadType = {
    email: string;
    password: string;
};

export type CreateOrAddCartProductPayloadType = {
    productId: string;
    userId: string;
    showSuccessMessage?: boolean;
    navigateToCart?: boolean;
};

export type RemoveCartProductPayloadType = {
    productId: string;
    userId: string;
    quantity?: "single" | "all";
};

export type RemoveAllProductsPayloadType = {
    userId: string;
};

export type GetUserInfoPayloadType = {
    userId: string;
};
