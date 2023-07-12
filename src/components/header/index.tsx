import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Logo } from "../logo";

export function Header() {
    const styleOffset = 100;
    const [shouldUseMainStyle, setShouldUseMainStyle] = useState(false);

    function defineStyle() {
        const is = window.scrollY > styleOffset;

        setShouldUseMainStyle(is);
    }

    useEffect(() => {
        window.addEventListener("scroll", defineStyle);
    }, []);

    function renderLogo() {
        const logoColor = shouldUseMainStyle ? "black" : "white";

        return (
            <div className="col-start-1 col-end-3 sm:col-start-1 sm:col-end-2 flex items-center justify-center cursor-pointer h-full w-full overflow-hidden">
                <div className="h-1/2">
                    <Logo color={logoColor} />
                </div>
            </div>
        );
    }

    function renderInput() {
        const mainStyle = shouldUseMainStyle
            ? ""
            : "text-white focus:bg-white focus:text-black";

        return (
            <div className="col-start-4 col-end-10 sm:col-start-3 w-full h-full flex items-center justify-center">
                <input
                    className={`${mainStyle} h-10 transition-all duration-500 w-full text-black rounded-3xl bg-white py-3 px-6 text-sm focus:outline-none focus:shadow-outline placeholder:text-gray-400 placeholder:text-xs border`}
                    id="username"
                    type="text"
                    placeholder="Quick Search..."
                ></input>
            </div>
        );
    }

    function renderIcon(IconDefinition: IconDefinition, mobile?: any) {
        const textColor = shouldUseMainStyle ? "text-black" : "text-white";
        const hover = shouldUseMainStyle
            ? "hover:text-gray-500"
            : "hover:text-gray-900";

        let style = "";

        if (mobile) {
            style = "block sm:hidden";
        } else {
            style = "hidden sm:block";
        }

        return (
            <div className={`${style} h-[50%]  cursor-pointer`}>
                <FontAwesomeIcon
                    icon={IconDefinition}
                    className={`${textColor} ${hover} h-full transition-all`}
                />
            </div>
        );
    }

    function renderButtons() {
        return (
            <div className="col-start-10 col-end-13 w-full h-full flex items-center text-black ">
                <div className="h-1/2 flex items-center justify-center gap-0 sm:gap-10 w-full ">
                    {renderIcon(
                        icon({
                            name: "cart-shopping",
                        })
                    )}
                    {renderIcon(
                        icon({
                            name: "user",
                        })
                    )}
                    {renderIcon(
                        icon({
                            name: "bars",
                        }),
                        true
                    )}
                </div>
            </div>
        );
    }

    const containerStyle = shouldUseMainStyle
        ? "bg-white shadow-xl"
        : "bg-gradient-to-b from-[rgba(0,0,0,0.3)]";

    return (
        <header
            className={`${containerStyle} fixed transition-all duration-500 h-24 z-50 mx-auto left-0 right-0 text-black flex align-center justify-center`}
        >
            <div className="container grid grid-cols-12 h-full flex items-center">
                {renderLogo()}
                {renderInput()}
                {renderButtons()}
            </div>
        </header>
    );
}
