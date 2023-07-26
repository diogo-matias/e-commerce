import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateType } from "./types";
import { UserApi } from "../../../api/user";
import {
    CreateUserPayloadType,
    GetUserInfoPayloadType,
    LoginPayloadType,
} from "../../../api/user/types";
import { ToastActions } from "../toast";
import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import { getUserInfoParser } from "./parser";

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
                    message: "Fail to ESTRANHO",
                })
            );

            throw new Error();
        }
    }
);

const UserSlice = createSlice({
    name: "@user",
    initialState: initialState,
    reducers: {},
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
    },
});

export const UserActions = {
    ...UserSlice.actions,
    createUser,
    getUserInfo,
    login,
};

export default UserSlice.reducer;
