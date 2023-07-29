import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export function PrivateRoutes() {
    const isAuthenticated = useAppSelector(
        (state) => state.user.isAuthenticated
    );

    function privateRoutes() {
        return isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />;
    }

    return <div>{privateRoutes()}</div>;
}
