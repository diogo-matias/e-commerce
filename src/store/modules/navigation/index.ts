import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StateType } from "./types";
import { ROUTES } from "../../../constants/routes";

const initialState: StateType = {
    route: ROUTES.HOME,
};

const NavigationSlice = createSlice({
    name: "@navigation",
    initialState: initialState,
    reducers: {
        navigate(state, { payload }: PayloadAction<string>) {
            state.route = payload;
        },
        updateRoute(state) {
            state.route = `${window.location.pathname}${window.location.search}`;
        },
    },
    extraReducers: ({ addCase }) => {},
});

export const NavigationActions = {
    ...NavigationSlice.actions,
};

export default NavigationSlice.reducer;
