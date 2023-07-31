import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserActions } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Header } from "../../components/header";
import { ParsedProductType } from "../../store/modules/user/types";
import { formatPrice } from "../../utils/price";
import { BaseButton } from "../../components/base-button";
import { Text } from "./components/text";
import { Breakpoint } from "../../utils/breakpoints";
import { BREAKPOINTS } from "../../constants/breakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { NavigationActions } from "../../store/modules/navigation";

const WIDTH_PERCENTAGE = 0.35;

export function CartScreen() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const route = useAppSelector((state) => state.navigation.route);

    const breakpointLg = Breakpoint("lg");

    const userInfo = useAppSelector((state) => state.user.userInfo);
    const products = userInfo?.products;

    const [checkoutWidth, setCheckoutWidth] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const container = useRef<any>(null);

    useEffect(() => {
        if (!userInfo) {
            navigate(ROUTES.LOGIN);
            return;
        }

        dispatch(
            UserActions.getUserInfo({
                userId: userInfo.id,
            })
        );

        handleFixedDivDimensions();
        window.addEventListener("resize", handleFixedDivDimensions);

        calculateTotalPrice();

        return () =>
            window.removeEventListener("resize", handleFixedDivDimensions);
    }, []);

    useEffect(() => {
        calculateTotalPrice();
    }, [products]);

    function handleFixedDivDimensions() {
        let widthPercentage = 0.35;

        if (container.current.offsetWidth < BREAKPOINTS.lg.split("px")[0]) {
            widthPercentage = 1;
        }

        const width = container.current.offsetWidth * widthPercentage;
        setCheckoutWidth(width);
    }

    function calculateTotalPrice() {
        if (!products?.length) {
            return;
        }

        const totalPrice = products
            ?.map((item) => {
                return item.price * item.quantity;
            })
            .reduce((a, b) => {
                return a + b;
            });

        setTotalPrice(Number(totalPrice));
    }

    function formatDescription(description: string) {
        const numberOfCharacters = 40;

        if (description.length > numberOfCharacters) {
            const result = description.slice(0, numberOfCharacters);

            return `${result}...`;
        }

        return description;
    }

    function handleRemoveOrAddItem(productId: string, add: boolean) {
        const payload = {
            userId: userInfo?.id ?? "",
            productId,
        };

        if (add) {
            dispatch(UserActions.createOrAddCartProduct(payload));
        } else {
            dispatch(UserActions.removeCartProduct(payload));
        }
    }

    function renderCartItem(item: ParsedProductType) {
        const { category, description, id, image, price, quantity, title } =
            item;

        const totalPrice = quantity * price;

        return (
            <div
                key={id}
                className="grid grid-cols-12 gap-2 mb-4 bg-gray-50 p-4 shadow-md"
            >
                <div className="col-span-2 ">
                    <div
                        onClick={() => {
                            navigate(
                                ROUTES.PRODUCT_DETAIL.replace(":productId", id)
                            );
                        }}
                        className="w-full aspect-square overflow-hidden flex items-center justify-center cursor-pointer"
                    >
                        <img src={image} alt={title} className="object-cover" />
                    </div>
                </div>
                <div className="col-span-6 flex-1 flex`">
                    <div className="flex flex-col h-full justify-between py-4">
                        <div>
                            <p className="font-light text-[0.7rem] mb-2">
                                {category}
                            </p>
                            <p className="font-thin tracking-tight md:text-lg text-normal">
                                {title}
                            </p>
                            <p className="font-semibold tracking-wide">
                                {formatPrice(price)}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <p className="font-thin">
                                {formatDescription(description)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 md:col-span-1 gap-2 flex justify-center items-center">
                    <p
                        onClick={() => {
                            handleRemoveOrAddItem(id, false);
                        }}
                        className="font-bold cursor-pointer"
                    >
                        -
                    </p>
                    {quantity}
                    <p
                        onClick={() => {
                            handleRemoveOrAddItem(id, true);
                        }}
                        className="font-bold cursor-pointer"
                    >
                        +
                    </p>
                </div>
                <div className="md:col-span-3 hidden md:flex justify-center items-center">
                    <p className="text-xl font-semibold">
                        {formatPrice(totalPrice)}
                    </p>
                </div>
            </div>
        );
    }

    function renderCartItems() {
        return (
            <div>
                {products?.map((item) => {
                    return renderCartItem(item);
                })}
            </div>
        );
    }

    function handleBuy() {
        navigate(ROUTES.CHECKOUT);
    }

    function renderResumeCard() {
        return (
            <div
                style={{
                    width: checkoutWidth,
                }}
                className="fixed bottom-0 lg:bottom-auto bg-gray-50 shadow-md p-4"
            >
                <div className="flex justify-between items-center border-b pb-4">
                    <p className="text-sm ">TOTAL PRICE</p>
                    <p className="font-semibold">{formatPrice(totalPrice)}</p>
                </div>

                <div className="">
                    <BaseButton
                        onClick={handleBuy}
                        className="bg-green-600 mt-5"
                    >
                        Buy now
                    </BaseButton>
                    <BaseButton
                        style={{ color: "black" }}
                        className="bg-transparent border border-black mt-5"
                        onClick={() => {
                            navigate(ROUTES.PRODUCT_LIST);
                        }}
                    >
                        Add more products
                    </BaseButton>
                </div>
            </div>
        );
    }

    function renderNoData() {
        return (
            <div className="absolute  bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]">
                <div className="flex items-end justify-center gap-4">
                    <FontAwesomeIcon
                        icon={solid("cart-shopping")}
                        style={{
                            fontSize: "80px",
                            textAlign: "center",
                        }}
                    />
                    <div>
                        <p className="font-semibold text-2xl uppercase mt-10">
                            Empty <br /> Cart
                        </p>
                    </div>
                </div>
                <BaseButton
                    onClick={() => navigate(ROUTES.PRODUCT_LIST)}
                    style={{ color: "black", backgroundColor: "transparent" }}
                    label="Find products"
                    className="mt-5 border border-black"
                />
            </div>
        );
    }

    function renderCart() {
        return (
            <div>
                <div className="lg:hidden">{renderResumeCard()}</div>
                <div>
                    <p className="text-2xl mb-7 ml-3 font-thin tracking-widest">
                        MY CART
                    </p>
                </div>
                <div className="flex flex-wrap min-h-[50vh]">
                    <div className="lg:w-[65%] w-full lg:pr-4 mb-52 lg:mb-0">
                        {renderCartItems()}
                    </div>
                    <div className="lg:relative hidden lg:block lg:w-[35%] ">
                        {renderResumeCard()}
                    </div>
                </div>
            </div>
        );
    }

    function renderContent() {
        if (!products?.length) {
            return renderNoData();
        }

        return renderCart();
    }

    return (
        <div>
            <Header shouldUseCustomStyle={false} />
            <div
                ref={container}
                className="md:pt-36 pt-32 container mx-auto relative min-h-screen"
            >
                {renderContent()}
            </div>
        </div>
    );
}
