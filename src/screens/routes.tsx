import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { ProductListScreen } from "./product-list";
import { ROUTES } from "../constants/routes";
import { ProductDetailScreen } from "./product-detail";
import { PrivateRoutes } from "../auth/routes.auth";
import { LoginScreen } from "./login";
import { CartScreen } from "./cart";
import { RouterService } from "../components/router";
import { AccountScreen } from "./account";
import { CheckoutScreen } from "./checkout";
import { ThanksScreen } from "./thanks";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component={RouterService}>
                    <Route path={ROUTES.HOME} Component={Home} />
                    <Route
                        path={ROUTES.PRODUCT_LIST}
                        Component={ProductListScreen}
                    />
                    <Route
                        path={ROUTES.PRODUCT_DETAIL}
                        Component={ProductDetailScreen}
                    />
                    <Route path={ROUTES.LOGIN} Component={LoginScreen} />

                    <Route element={<PrivateRoutes />}>
                        <Route path={ROUTES.CART} Component={CartScreen} />
                        <Route path={ROUTES.THANKS} Component={ThanksScreen} />
                        <Route
                            path={ROUTES.CHECKOUT}
                            Component={CheckoutScreen}
                        />
                        <Route
                            path={ROUTES.ACCOUNT}
                            Component={AccountScreen}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
