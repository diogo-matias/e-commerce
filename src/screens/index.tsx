import React, { useEffect } from "react";
import Router from "./routes";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { EcommerceActions } from "../store/modules/ecommerce";

function App() {
    const dispatch = useAppDispatch();
    const { products } = useAppSelector((state) => state.ecommerce);

    useEffect(() => {
        if (!products.length) {
            dispatch(EcommerceActions.getAllProducts());
        }
    }, []);

    return (
        <div>
            <Router />
        </div>
    );
}

export default App;
