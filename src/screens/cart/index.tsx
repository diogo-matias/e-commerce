import { RefObject, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserActions } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Header } from "../../components/header";
import { Text } from "./components/text";
import { ParsedProductType } from "../../store/modules/user/types";
import { formatPrice } from "../../utils/price";
import { BaseButton } from "../../components/base-button";

const WIDTH_PERCENTAGE = 0.35;

export function CartScreen() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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
        const width = container.current.offsetWidth * WIDTH_PERCENTAGE;
        setCheckoutWidth(width);
    }

    function calculateTotalPrice() {
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

        const result = description.slice(0, numberOfCharacters);

        return `${result}...`;
    }

    function handleRemoveOrAddItem() {}

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
                <div className="col-span-6  relative">
                    <p className="font-light text-[0.7rem] mb-2">{category}</p>
                    <p className="font-thin tracking-tight text-lg">{title}</p>
                    <p className="font-semibold tracking-wide">
                        {formatPrice(price)}
                    </p>
                    <p className="font-thin absolute bottom-0 ">
                        {formatDescription(description)}
                    </p>
                </div>
                <div className="col-span-1 gap-2 flex justify-center items-center">
                    <p
                        onClick={handleRemoveOrAddItem}
                        className="font-bold cursor-pointer"
                    >
                        -
                    </p>{" "}
                    {quantity}
                    <p className="font-bold cursor-pointer">+</p>
                </div>
                <div className="col-span-3 flex justify-center items-center">
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

    function renderHeader() {
        return (
            <div className="grid grid-cols-12">
                {/* <div className="col-span-2">
                    <Text>Product</Text>
                </div>
                <div className="col-span-6">
                    <Text>Product</Text>
                </div>
                <div className="col-span-1">
                    <Text>Product</Text>
                </div>
                <div className="col-span-3">
                    <Text>Product</Text>
                </div> */}
            </div>
        );
    }

    return (
        <div>
            <Header shouldUseCustomStyle={false} />
            <div>
                <div ref={container} className="pt-32 container mx-auto ">
                    <div>
                        <p className="text-xl mb-7 font-semibold tracking-widest">
                            CART
                        </p>
                    </div>
                    <div className="relative flex min-h-[50vh]">
                        <div className="w-[65%] pr-4">
                            {renderHeader()}
                            {renderCartItems()}
                        </div>
                        <div className="relative w-[35%]">
                            <div
                                style={{
                                    width: checkoutWidth,
                                }}
                                className="fixed bg-gray-50 shadow-md p-4"
                            >
                                <div className="flex justify-between items-center border-b pb-4">
                                    <p className="text-sm ">TOTAL PRICE</p>
                                    <p className="font-semibold">
                                        {formatPrice(totalPrice)}
                                    </p>
                                </div>

                                <div className="">
                                    <BaseButton className="bg-green-600 mt-5">
                                        Buy now
                                    </BaseButton>
                                    <BaseButton
                                        style={{ color: "black" }}
                                        className="bg-transparent border border-black mt-5"
                                    >
                                        Add more products
                                    </BaseButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
