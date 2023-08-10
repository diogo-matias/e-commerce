import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { NavigationActions } from "../../store/modules/navigation";

export function RouterService() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const route = useAppSelector((state) => state.navigation.route);

    useEffect(() => {
        dispatch(NavigationActions.updateRoute());
    }, [location, dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(route);
        }, 1);

        return () => clearTimeout(timer);
    }, [route, navigate]);

    return <Outlet />;
}
