import { ProductType } from "../ecommerce/types";
import { GetUserInfoParserPropsType, GetUserInfoParserType } from "./types";

export {};

export function getUserInfoParser(
    object: GetUserInfoParserPropsType
): GetUserInfoParserType {
    const { email, id, name, password, Products } = object;

    const products = Products.map((item) => {
        const result: any = {
            ...item,
            quantity: item.UserProducts.quantity,
        };

        delete result.UserProducts;

        return result;
    });

    return {
        id,
        email,
        name,
        password,
        products,
    };
}
