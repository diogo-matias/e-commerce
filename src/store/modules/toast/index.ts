import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateType } from "./types";
import { UserApi } from "../../../api/user";
import { CreateUserPayloadType } from "../../../api/user/types";

const initialState: StateType = {
    message: "",
    open: false,
    type: "success",
};

const ToastSlice = createSlice({
    name: "@toast",
    initialState: initialState,
    reducers: {
        success(state, { payload }: PayloadAction<{ message: string }>) {
            state.open = true;
            state.message = payload.message;
            state.type = "success";
        },
        fail(state, { payload }: PayloadAction<{ message: string }>) {
            state.open = true;
            state.message = payload.message;
            state.type = "fail";
        },
        close() {
            return initialState;
        },
    },
    extraReducers: ({ addCase }) => {},
});

export const ToastActions = {
    ...ToastSlice.actions,
};

export default ToastSlice.reducer;
