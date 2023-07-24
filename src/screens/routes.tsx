import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { ProductListScreen } from "./product-list";
import { ROUTES } from "../constants/routes";
import { ProductDetailScreen } from "./product-detail";
import { PrivateRoutes } from "../auth/routes.auth";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} Component={Home} />
                <Route
                    path={ROUTES.PRODUCT_LIST}
                    Component={ProductListScreen}
                />
                <Route
                    path={ROUTES.PRODUCT_DETAIL}
                    Component={ProductDetailScreen}
                />

                <Route element={<PrivateRoutes />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
