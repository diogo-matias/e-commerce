import { getUserInfoParser } from "../../store/modules/user/parser";
import Api from "../api";
import {
    CreateOrAddCartProductPayloadType,
    CreateUserPayloadType,
    GetUserInfoPayloadType,
    LoginPayloadType,
    RemoveAllProductsPayloadType,
    RemoveCartProductPayloadType,
} from "./types";

export class _UserApi {
    api: Api;

    constructor() {
        this.api = new Api(process.env.REACT_APP_API_BASE_URL);
    }

    async getUserInfo(payload: GetUserInfoPayloadType) {
        try {
            const { userId } = payload;

            const response = (await this.api.get(`users/${userId}`)) as any;

            if (response.data.hasError) {
                throw new Error();
            }

            return response.data;
        } catch (err) {
            const error = err as Error;

            throw new Error(error.message);
        }
    }

    async createUser(payload: CreateUserPayloadType) {
        try {
            const response = (await this.api.post("/users", payload)) as any;

            if (response.data.hasError) {
                throw new Error();
            }

            return response?.data;
        } catch (err) {
            const error = err as Error;

            throw new Error(error.message);
        }
    }

    async login(payload: LoginPayloadType) {
        try {
            const response = (await this.api.post(
                "/user/login",
                payload
            )) as any;

            if (response.data.hasError) {
                throw new Error();
            }

            return response?.data;
        } catch (err) {
            const error = err as Error;

            throw new Error(error.message);
        }
    }

    async createOrAddCartProduct(payload: CreateOrAddCartProductPayloadType) {
        try {
            const response = (await this.api.post("/cart", payload)) as any;

            if (response.data.hasError) {
                throw new Error();
            }

            return response?.data;
        } catch (err) {
            const error = err as Error;

            throw new Error(error.message);
        }
    }

    async deleteCartProduct(payload: RemoveCartProductPayloadType) {
        try {
            const { userId, productId, quantity = "single" } = payload;

            const response = (await this.api.post(
                `/cart/${userId}/${productId}?quantity=${quantity}`
            )) as any;

            if (response.data.hasError) {
                throw new Error();
            }

            return response?.data;
        } catch (err) {
            const error = err as Error;

            throw new Error(error.message);
        }
    }
    async deleteAllCartProducts(payload: RemoveAllProductsPayloadType) {
        try {
            const { userId } = payload;

            const response = (await this.api.delete(`/cart/${userId}`)) as any;

            if (response.data.hasError) {
                throw new Error();
            }

            return response?.data;
        } catch (err) {
            const error = err as Error;

            throw new Error(error.message);
        }
    }
}

export const UserApi = new _UserApi();
