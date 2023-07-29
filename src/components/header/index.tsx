import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Logo } from "../logo";
import { HeaderPropsType } from "./types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import ClickAwayListener from "react-click-away-listener";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { EcommerceActions } from "../../store/modules/ecommerce";
import { useDebounce } from "usehooks-ts";
import { ProductType } from "../../store/modules/ecommerce/types";

export function Header(props: HeaderPropsType) {
    const { shouldUseCustomStyle = true } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const styleOffset = 100;
    const [shouldUseMainStyle, setShouldUseMainStyle] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [animationDirection, setAnimationDirection] = useState(true);
    const [autocompleteOpacity, setAutocompleteOpacity] = useState(100);

    const [inputValue, setInputValue] = useState("");
    const debounceValue = useDebounce(inputValue, 500);

    const filteredProductList = useAppSelector(
        (state) => state.ecommerce.filter.filteredProductList
    );

    function defineStyle() {
        const is = window.scrollY > styleOffset;

        if (shouldUseCustomStyle) {
            setShouldUseMainStyle(is);
        } else {
            setShouldUseMainStyle(true);
        }
    }

    function handleUserIconClick() {
        navigate(ROUTES.LOGIN);
    }

    function handleCartIconClick() {
        navigate(ROUTES.CART);
    }

    useEffect(() => {
        window.addEventListener("scroll", defineStyle);

        defineStyle();
    }, []);

    function handleClose() {
        setAnimationDirection(false);

        setTimeout(() => {
            setOpenModal(false);
        }, 200);
    }

    function handleModalOpen() {
        setAnimationDirection(true);

        setOpenModal(true);
    }

    function renderLogo() {
        const logoColor = shouldUseMainStyle ? "black" : "white";

        return (
            <div className="col-start-1 col-end-3 sm:col-start-1 sm:col-end-2 flex items-center justify-center cursor-pointer h-full w-full overflow-hidden">
                <div onClick={() => navigate("/")} className="h-1/2">
                    <Logo color={logoColor} />
                </div>
            </div>
        );
    }

    function handlePressEnter(e: any) {
        if (e.key === "Enter") {
            navigate(`${ROUTES.PRODUCT_LIST}?title=${inputValue}`);
            setInputValue("");
        }
    }

    useEffect(() => {
        dispatch(
            EcommerceActions.filter({
                title: debounceValue,
                category: "",
                max_price: 999999,
                min_price: 0,
            })
        );
    }, [debounceValue]);

    function onSuggestionItemClick(product: ProductType) {
        navigate(ROUTES.PRODUCT_DETAIL.replace(":productId", product.id));
    }

    function renderInput() {
        const mainStyle = shouldUseMainStyle
            ? ""
            : "text-white focus:bg-white focus:text-black";

        return (
            <div className="col-start-4 relative col-end-10 sm:col-start-3 w-full h-full flex flex-col items-center justify-center">
                <input
                    className={`${mainStyle} h-10 transition-all duration-500 w-full text-black rounded-3xl bg-white py-3 px-6 text-sm focus:outline-none focus:shadow-outline placeholder:text-gray-400 placeholder:text-xs border`}
                    id="username"
                    type="text"
                    placeholder="Quick Search..."
                    onFocus={() => {
                        setAutocompleteOpacity(100);
                    }}
                    onBlur={() => {
                        setAutocompleteOpacity(0);
                    }}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyDown={handlePressEnter}
                />
                <div className="relative bg-red-600 w-full">
                    <motion.div
                        animate={{ opacity: autocompleteOpacity }}
                        className="absolute text-sm overflow-hidden transition-all pt-10 -z-10 bg-gray-100 right-0 left-0 -translate-y-10 rounded-3xl"
                    >
                        {filteredProductList.map((item, index) => {
                            if (index > 3 || !inputValue) {
                                return null;
                            }

                            return (
                                <div
                                    className="h-10 hover:bg-gray-200 transition-all flex items-center cursor-pointer pl-5 text-sm font-light"
                                    onClick={() => onSuggestionItemClick(item)}
                                >
                                    {item.title}
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        );
    }

    function renderIcon(
        IconDefinition: IconDefinition,
        onClick?: () => void,
        mobile?: any
    ) {
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
            <div
                className={`${style} h-[50%]  cursor-pointer`}
                onClick={onClick}
            >
                <FontAwesomeIcon
                    icon={IconDefinition}
                    className={`${textColor} ${hover} h-full transition-all`}
                />
            </div>
        );
    }

    function renderIcons() {
        return (
            <div className="col-start-10 col-end-13 w-full h-full flex items-center text-black ">
                <div className="h-1/2 flex items-center justify-center gap-0 sm:gap-10 w-full ">
                    {renderIcon(
                        icon({
                            name: "cart-shopping",
                        }),
                        handleCartIconClick
                    )}
                    {renderIcon(
                        icon({
                            name: "user",
                        }),
                        handleUserIconClick
                    )}
                    {renderIcon(
                        icon({
                            name: "bars",
                        }),
                        () => {
                            handleModalOpen();
                        },
                        true
                    )}
                </div>
            </div>
        );
    }

    function mobileMenuItem(icon: any, label: string, onClick: () => void) {
        return (
            <div
                onClick={onClick}
                className="flex items-center px-3 h-10 border-y py-6 cursor-pointer"
            >
                <div className="pr-3">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <p className="font-light">{label}</p>
            </div>
        );
    }

    function renderMobileModal() {
        if (!openModal) {
            return;
        }

        return (
            <div className="fixed h-screen w-screen z-[50]">
                <ClickAwayListener
                    onClickAway={() => {
                        handleClose();
                    }}
                >
                    <motion.div
                        animate={{
                            x: animationDirection ? [300, 0] : [0, 300],
                        }}
                        transition={{
                            ease: "easeOut",
                            duration: 0.2,
                        }}
                        className="sm:hidden absolute h-full w-[40vw] bg-gray-100 right-0"
                        style={{
                            boxShadow: "-10px 0px 15px rgba(0,0,0,0.2)",
                        }}
                    >
                        <p className="uppercase font-thin text-center my-5 tracking-widest">
                            Menu
                        </p>
                        {mobileMenuItem(
                            solid("user"),
                            "Account",
                            handleUserIconClick
                        )}
                        {mobileMenuItem(
                            solid("cart-shopping"),
                            "Cart",
                            handleCartIconClick
                        )}
                    </motion.div>
                </ClickAwayListener>
            </div>
        );
    }

    const containerStyle = shouldUseMainStyle
        ? `bg-white shadow-lg`
        : "bg-gradient-to-b from-[rgba(0,0,0,0.3)]";

    return (
        <div>
            <header
                className={`${containerStyle} fixed transition-all duration-500 h-20 z-50 mx-auto left-0 right-0 text-black flex align-center justify-center`}
            >
                <div className="container grid grid-cols-12 h-full items-center">
                    {renderLogo()}
                    {renderInput()}
                    {renderIcons()}
                </div>
            </header>
            {renderMobileModal()}
        </div>
    );
}
