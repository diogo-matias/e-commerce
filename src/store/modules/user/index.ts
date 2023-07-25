import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateType } from "./types";
import { UserApi } from "../../../api/user";
import { CreateUserPayloadType } from "../../../api/user/types";
import { ToastActions } from "../toast";

const initialState: StateType = {
    userInfo: null,
    isAuthenticated: false,
};

export const createUser = createAsyncThunk(
    "@user/createUser",
    async (payload: CreateUserPayloadType, { dispatch }) => {
        try {
            const response = await UserApi.createUser(payload);

            const hasError = response.hasError;

            if (!hasError) {
                dispatch(
                    ToastActions.success({
                        message: "User created Successfully",
                    })
                );

                return response as any;
            }

            throw new Error();
        } catch (error) {
            window.alert("Error to create user");
        }
    }
);

const UserSlice = createSlice({
    name: "@user",
    initialState: initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(createUser.fulfilled, (state, { payload }) => {
            state.userInfo = payload.data;
            state.isAuthenticated = true;
        });
        addCase(createUser.pending, (state, { payload }) => {
            state.isAuthenticated = false;
        });
        addCase(createUser.rejected, (state, { payload }) => {
            state.isAuthenticated = false;
        });
    },
});

export const UserActions = {
    ...UserSlice.actions,
    createUser,
};

export default UserSlice.reducer;
