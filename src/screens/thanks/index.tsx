import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "../../components/header";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { BaseButton } from "../../components/base-button";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export function ThanksScreen() {
    const navigate = useNavigate();

    function handleNavigation() {
        navigate(ROUTES.HOME);
    }

    function renderContent() {
        return (
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <div className=" flex flex-col items-center">
                    <FontAwesomeIcon
                        icon={solid("check")}
                        size="10x"
                        className="text-green-500"
                    />
                    <p className="text-3xl font-bold text-green-500">
                        Thanks for buying!
                    </p>
                    <p className="mb-5 ">your order has been confirmed</p>
                    <BaseButton
                        style={{ backgroundColor: "#34c55e" }}
                        label="Continue"
                        onClick={handleNavigation}
                    />
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* <Header /> */}
            {renderContent()}
        </div>
    );
}
