import {
    PayloadAction,
    createAsyncThunk,
    createSlice,
    current,
} from "@reduxjs/toolkit";
import { FakeStoreApi } from "../../../api/ecommerce";
import { FiltersType, ProductType, StateType } from "./types";
import { Product } from "../../../api/ecommerce/types";
import { filterLogic } from "./helpers";

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

const initialState: StateType = {
    products: [],
    selectedProduct: {},
    userInfo: {},
    cartInfo: {},
    filter: {
        filteredProductList: [],
        filters: {
            category: "",
            max_price: 0,
            min_price: 0,
            title: "",
        },
    },
};

const EcommerceSlice = createSlice({
    name: "@ecommerce",
    initialState: initialState,
    reducers: {
        filter(state, action: PayloadAction<FiltersType>) {
            const result = filterLogic(state, action);

            state.filter.filteredProductList = result;
        },

        filterByPrice(
            state,
            {
                payload,
            }: PayloadAction<{
                minPrice: number;
                maxPrice: number;
                productsList: ProductType[];
            }>
        ) {
            const { maxPrice, minPrice, productsList } = payload;

            const result = productsList.filter((item) => {
                return item.price <= maxPrice && item.price >= minPrice;
            });
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(getAllProducts.fulfilled, (state, { payload }) => {
            const { data } = payload;

            state.products = data;
            state.filter.filteredProductList = data;
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
