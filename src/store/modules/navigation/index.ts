import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "./types";
import { ROUTES } from "../../../constants/routes";

const initialState: StateType = {
    route: ROUTES.HOME,
};

const NavigationSlice = createSlice({
    name: "@navigation",
    initialState: initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {},
});

export const UserActions = {
    ...NavigationSlice.actions,
};

export default NavigationSlice.reducer;
