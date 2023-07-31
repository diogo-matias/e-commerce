import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateType } from "./types";
import { UserApi } from "../../../api/user";
import {
    CreateOrAddCartProductPayloadType,
    CreateUserPayloadType,
    GetUserInfoPayloadType,
    LoginPayloadType,
    RemoveAllProductsPayloadType,
    RemoveCartProductPayloadType,
} from "../../../api/user/types";
import { ToastActions } from "../toast";
import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { getUserInfoParser } from "./parser";
import { NavigationActions } from "../navigation";

const initialState: StateType = {
    userInfo: null,
    isAuthenticated: false,
    isGettingUserInfo: false,
};

const createUser = createAsyncThunk(
    "@user/createUser",
    async (payload: CreateUserPayloadType, { dispatch }) => {
        try {
            const response = await UserApi.createUser(payload);

            const hasError = response.hasError;

            if (!hasError) {
                dispatch(
                    ToastActions.success({
                        message: "User created",
                    })
                );

                return response as any;
            }

            dispatch(
                ToastActions.fail({
                    message: "Fail to create user",
                })
            );

            throw new Error();
        } catch (error) {
            dispatch(
                ToastActions.fail({
                    message: "Fail to create user",
                })
            );

            throw new Error();
        }
    }
);

const getUserInfo = createAsyncThunk(
    "@user/getUserInfo",
    async (payload: GetUserInfoPayloadType, { dispatch }) => {
        try {
            const response = await UserApi.getUserInfo(payload);

            const hasError = response.hasError;

            if (!hasError) {
                return response as any;
            }

            dispatch(
                ToastActions.fail({
                    message: "Fail to get user info",
                })
            );

            throw new Error();
        } catch (error) {
            dispatch(
                ToastActions.fail({
                    message: "Fail to get user info",
                })
            );

            throw new Error();
        }
    }
);

const login = createAsyncThunk(
    "@user/login",
    async (payload: LoginPayloadType, { dispatch }) => {
        try {
            const response = await UserApi.login(payload);

            const hasError = response.hasError;

            if (!hasError) {
                dispatch(
                    ToastActions.success({
                        message: "Logged!",
                    })
                );

                dispatch(NavigationActions.navigate(ROUTES.HOME));

                return response as any;
            }

            dispatch(
                ToastActions.fail({
                    message: "Fail to login",
                })
            );

            throw new Error();
        } catch (error) {
            dispatch(
                ToastActions.fail({
                    message: "Fail to login",
                })
            );

            throw new Error();
        }
    }
);

const createOrAddCartProduct = createAsyncThunk(
    "@user/createOrAddCartProduct",
    async (payload: CreateOrAddCartProductPayloadType, { dispatch }) => {
        try {
            const { showSuccessMessage, navigateToCart } = payload;

            const response = await UserApi.createOrAddCartProduct(payload);

            const hasError = response.hasError;

            if (!hasError) {
                dispatch(UserActions.addCardProduct(payload));

                if (showSuccessMessage) {
                    dispatch(
                        ToastActions.success({
                            message: "Added to cart",
                        })
                    );
                }

                if (navigateToCart) {
                    dispatch(NavigationActions.navigate(ROUTES.CART));
                }

                return response as any;
            }

            dispatch(
                ToastActions.fail({
                    message: "Fail to get cart",
                })
            );

            throw new Error();
        } catch (error) {
            dispatch(
                ToastActions.fail({
                    message: "Fail to get cart",
                })
            );

            throw new Error();
        }
    }
);

const removeCartProduct = createAsyncThunk(
    "@user/removeCartProduct",
    async (payload: RemoveCartProductPayloadType, { dispatch }) => {
        try {
            const response = await UserApi.deleteCartProduct(payload);

            const hasError = response.hasError;

            if (!hasError) {
                dispatch(UserActions.removeCartProductAction(payload));

                return response as any;
            }

            dispatch(
                ToastActions.fail({
                    message: "Fail to remove cart product",
                })
            );

            throw new Error();
        } catch (error) {
            dispatch(
                ToastActions.fail({
                    message: "Fail to remove cart product",
                })
            );

            throw new Error();
        }
    }
);
const removeAllCartProducts = createAsyncThunk(
    "@user/removeAllCartProducts",
    async (payload: RemoveAllProductsPayloadType, { dispatch }) => {
        try {
            const response = await UserApi.deleteAllCartProducts(payload);

            const hasError = response.hasError;

            if (!hasError) {
                dispatch(UserActions.removeAllUserCartProducts());

                dispatch(NavigationActions.navigate(ROUTES.THANKS));

                return response as any;
            }

            dispatch(
                ToastActions.fail({
                    message: "Fail to remove cart product",
                })
            );

            throw new Error();
        } catch (error) {
            dispatch(
                ToastActions.fail({
                    message: "Fail to remove cart product",
                })
            );

            throw new Error();
        }
    }
);

const UserSlice = createSlice({
    name: "@user",
    initialState: initialState,
    reducers: {
        addCardProduct(
            state,
            { payload }: PayloadAction<CreateOrAddCartProductPayloadType>
        ) {
            const { productId } = payload;

            if (!state.userInfo) {
                return;
            }

            const result = state.userInfo?.products?.map((item) => {
                if (item.id === productId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }

                return item;
            });

            state.userInfo.products = result;
        },
        removeCartProductAction(
            state,
            { payload }: PayloadAction<RemoveCartProductPayloadType>
        ) {
            const { productId } = payload;

            if (!state.userInfo) {
                return;
            }

            const result = state.userInfo?.products
                ?.map((item) => {
                    if (item.id === productId) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0);

            state.userInfo.products = result;
        },
        removeAllUserCartProducts(state) {
            if (!state.userInfo) {
                return;
            }

            state.userInfo.products = initialState.userInfo?.products;
        },
        logout(state) {
            return initialState;
        },
    },
    extraReducers: ({ addCase }) => {
        addCase(createUser.fulfilled, (state, { payload }) => {
            state.userInfo = payload?.data;
            state.isAuthenticated = false;
        });
        addCase(createUser.pending, (state, { payload }) => {
            state.isAuthenticated = false;
        });
        addCase(createUser.rejected, (state, { payload }) => {
            state.isAuthenticated = false;
        });
        addCase(login.fulfilled, (state, { payload }) => {
            state.userInfo = payload?.data;
            state.isAuthenticated = true;
        });
        addCase(login.pending, (state, { payload }) => {
            state.userInfo = initialState.userInfo;
            state.isAuthenticated = false;
        });
        addCase(login.rejected, (state, { payload }) => {
            state.userInfo = initialState.userInfo;
            state.isAuthenticated = false;
        });
        addCase(getUserInfo.fulfilled, (state, { payload }) => {
            state.userInfo = getUserInfoParser(payload.data);
            state.isGettingUserInfo = false;
        });
        addCase(getUserInfo.pending, (state, { payload }) => {
            state.isGettingUserInfo = true;
        });
        addCase(getUserInfo.rejected, (state, { payload }) => {
            state.isGettingUserInfo = false;
        });
        addCase(removeCartProduct.fulfilled, (state, { payload }) => {
            return state;
        });
    },
});

export const UserActions = {
    ...UserSlice.actions,
    createUser,
    getUserInfo,
    login,
    createOrAddCartProduct,
    removeCartProduct,
    removeAllCartProducts,
};

export default UserSlice.reducer;
