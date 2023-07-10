import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FakeStoreApi } from "../../../api/ecommerce";

export const getAllProducts = createAsyncThunk(
    "@ecommerce/getAllProducts",
    async () => {
        const response = await FakeStoreApi.getAllProducts();

        return response as any;
    }
);

export const getOneProducts = createAsyncThunk(
    "@ecommerce/getOneProducts",
    async (payload: { id: string }) => {
        const { id } = payload;

        const response = await FakeStoreApi.getOneProduct(id);

        return response as any;
    }
);

export const createUser = createAsyncThunk(
    "@ecommerce/getOneProducts",
    async (payload: { email: string; password: string }) => {
        const response = await FakeStoreApi.createUser(payload);

        return response as any;
    }
);

const initialState = {
    products: [],
    selectedProduct: {},
    userInfo: {},
    cartInfo: {},
};

const EcommerceSlice = createSlice({
    name: "@ecommerce",
    initialState: initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(getAllProducts.fulfilled, (state, { payload }) => {
            const { data } = payload;

            state.products = data;
        });
        addCase(getOneProducts.fulfilled, (state, { payload }) => {
            state.selectedProduct = payload;
        });
    },
});

export const EcommerceActions = {
    ...EcommerceSlice.actions,
    getAllProducts,
    getOneProducts,
    createUser,
};

export default EcommerceSlice.reducer;
