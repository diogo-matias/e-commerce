import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../components/base-button";
import { ROUTES } from "../../constants/routes";

export function NotFoundPage() {
    const navigate = useNavigate();

    function renderContent() {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <p className="text-7xl font-bold">404</p>
                <p className="text-2xl font-light">Page not found</p>
                <div>
                    <BaseButton
                        label="Home"
                        onClick={() => navigate(ROUTES.HOME)}
                        className="px-14 mt-5"
                    />
                </div>
            </div>
        );
    }

    return renderContent();
}
