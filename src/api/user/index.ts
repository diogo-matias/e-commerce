import Api from "../api";
import { CreateUserPayloadType } from "./types";
// require("dotenv").config();

export class _UserApi {
    api: Api;

    constructor() {
        this.api = new Api(process.env.REACT_APP_API_BASE_URL);
    }

    async createUser(payload: CreateUserPayloadType) {
        try {
            const response = (await this.api.post("/users", payload)) as any;

            if (response.data.hasError) {
                throw new Error();
            }

            return response.data;
        } catch (err) {
            const error = err as Error;

            throw new Error(error.message);
        }
    }
}

export const UserApi = new _UserApi();
