import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

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
        return (
            <div className="col-start-1 col-end-2 hover:cursor-pointer">
                <img
                    src="./img/moment-logo.png"
                    className="w-full"
                    alt="logo"
                />
            </div>
        );
    }

    function renderInput() {
        const mainStyle = shouldUseMainStyle
            ? ""
            : "bg-opacity-0 placeholder:text-white text-white focus:bg-white focus:text-black";

        return (
            <div className="col-start-3 col-end-10">
                <input
                    className={`${mainStyle} h-10 transition-all duration-500 w-full text-black rounded-3xl bg-white py-3 px-6 text-sm focus:outline-none focus:shadow-outline placeholder:text-gray-400 placeholder:text-xs border`}
                    id="username"
                    type="text"
                    placeholder="Quick Search..."
                ></input>
            </div>
        );
    }

    function renderIcon(Icon: React.ForwardRefExoticComponent<any>) {
        return (
            <div className="flex flex-col items-center h-full hover:text-gray-600 cursor-pointer">
                <Icon className="h-full" />
            </div>
        );
    }

    function renderButtons() {
        return (
            <div className="col-start-11 col-end-13  flex items-center gap-6 text-gray-300 h-1/2">
                {renderIcon(UserCircleIcon)}
                {renderIcon(ShoppingCartIcon)}
            </div>
        );
    }

    const containerStyle = shouldUseMainStyle ? "bg-white shadow-xl" : "";

    return (
        <header
            className={`${containerStyle} transition-all duration-500 fixed z-10 mx-auto left-0 right-0  text-black flex align-center justify-center p-3 h-24`}
        >
            <div className=" container grid grid-cols-12 gap-10 flex items-center">
                {renderLogo()}
                {renderInput()}
                {renderButtons()}
            </div>
        </header>
    );
}
