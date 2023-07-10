import { combineReducers } from "@reduxjs/toolkit";
import EcommerceSlice from "./ecommerce";

const combinedReducers = combineReducers({
    ecommerce: EcommerceSlice,
});

export default combinedReducers;
export type State = ReturnType<typeof combinedReducers>;
