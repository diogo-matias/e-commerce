import Api from "../api";
import { Product } from "./types";
// require("dotenv").config();

export class _FakeStoreApi {
    api: Api;

    constructor() {
        this.api = new Api(process.env.REACT_APP_API_BASE_URL);
    }

    async getAllProducts(): Promise<Product[]> {
        const response = (await this.api.get("/products")) as any;

        return response.data as Product[];
    }

    async getOneProduct(id: string): Promise<any> {
        const response = await this.api.get(`/products/${id}`);

        return response.data as any;
    }

    async createUser(payload: {
        email: string;
        password: string;
    }): Promise<any> {
        const response = await this.api.post(`/users/signin`, payload);

        return response.data as any;
    }
}

export const FakeStoreApi = new _FakeStoreApi();
