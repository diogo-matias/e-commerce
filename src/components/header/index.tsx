import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export function Header() {
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
        return (
            <div className="col-start-2 col-end-11">
                <input
                    className="w-full rounded-3xl py-3 px-6 text-black text-sm focus:outline-none focus:shadow-outline placeholder:text-gray-400 placeholder:text-xs border"
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

    return (
        <header className="shadow-xl fixed z-2 mx-auto left-0 right-0 bg-white text-black flex align-center justify-center p-3 h-24">
            <div className=" container grid grid-cols-12 gap-10 flex items-center">
                {renderLogo()}
                {renderInput()}
                {renderButtons()}
            </div>
        </header>
    );
}
