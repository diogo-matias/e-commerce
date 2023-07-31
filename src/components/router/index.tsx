import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { NavigationActions } from "../../store/modules/navigation";

export function RouterService() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const route = useAppSelector((state) => state.navigation.route);

    useEffect(() => {
        const navigateRoute = `${window.location.pathname}${window.location.search}`;

        dispatch(NavigationActions.navigate(navigateRoute));
    }, [window.location.pathname]);

    useEffect(() => {
        navigate(route);
    }, [route]);

    return <Outlet />;
}
