import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export function PrivateRoutes() {
    const isAuthenticated = useAppSelector(
        (state) => state.user.isAuthenticated
    );

    return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
}
