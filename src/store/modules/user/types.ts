import { ProductType } from "../ecommerce/types";

export type UserInfoType = {
    id: string;
    name: string;
    email: string;
    password: string;
    products?: ParsedProductType[];
};
export type StateType = {
    userInfo: UserInfoType | null;
    isAuthenticated: boolean;
    isGettingUserInfo: boolean;
};

export type ParsedProductType = ProductType & {
    quantity: number;
};

export type CartProduct = ProductType & {
    UserProducts: {
        quantity: number;
    };
};

export type GetUserInfoParserPropsType = UserInfoType & {
    Products: CartProduct[];
};

export type GetUserInfoParserType = UserInfoType & {
    products: ParsedProductType[];
};
