import { combineReducers } from "@reduxjs/toolkit";
import EcommerceSlice from "./ecommerce";
import UserSlice from "./user";
import ToastSlice from "./toast";
import NavigationSlice from "./navigation";

const combinedReducers = combineReducers({
    toast: ToastSlice,
    ecommerce: EcommerceSlice,
    user: UserSlice,
    navigation: NavigationSlice,
});

export default combinedReducers;
export type State = ReturnType<typeof combinedReducers>;
