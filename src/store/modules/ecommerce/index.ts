import {
    PayloadAction,
    createAsyncThunk,
    createSlice,
    current,
} from "@reduxjs/toolkit";
import { FakeStoreApi } from "../../../api/ecommerce";
import { FiltersType, ProductType, StateType } from "./types";
import { Product } from "../../../api/ecommerce/types";
import { filterLogic, priceFilterLogic } from "./helpers";

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
    selectedProduct: null,
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
            const filteredList = filterLogic(state, action);

            const result = priceFilterLogic(filteredList, action);

            state.filter.filteredProductList = result;
        },
        setSelectedProduct(
            state,
            { payload }: PayloadAction<{ productId: string }>
        ) {
            const { productId } = payload;

            const selectedProduct = state.products.find(
                (item) => item.id === productId
            );

            if (selectedProduct) {
                state.selectedProduct = selectedProduct;
            }
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
