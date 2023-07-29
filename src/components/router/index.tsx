import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { NavigationActions } from "../../store/modules/navigation";

export function RouterService() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const route = useAppSelector((state) => state.navigation.route);

    useEffect(() => {
        dispatch(NavigationActions.navigate(window.location.pathname));
    }, [window.location.pathname, dispatch]);

    useEffect(() => {
        navigate(route);
    }, [route]);

    return <Outlet />;
}
