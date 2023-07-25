import { combineReducers } from "@reduxjs/toolkit";
import EcommerceSlice from "./ecommerce";
import UserSlice from "./user";
import ToastSlice from "./toast";

const combinedReducers = combineReducers({
    toast: ToastSlice,
    ecommerce: EcommerceSlice,
    user: UserSlice,
});

export default combinedReducers;
export type State = ReturnType<typeof combinedReducers>;
