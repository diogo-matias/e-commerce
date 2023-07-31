import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserActions } from "../../store/modules/user";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { Header } from "../../components/header";
import { ParsedProductType } from "../../store/modules/user/types";
import { formatPrice } from "../../utils/price";
import { BaseButton } from "../../components/base-button";
import { BREAKPOINTS } from "../../constants/breakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useFormik } from "formik";
import { BaseInput } from "../../components/base-input";
import * as yup from "yup";
import { Breakpoint } from "../../utils/breakpoints";

export function CheckoutScreen() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const breakpoint = Breakpoint("md");

    const userInfo = useAppSelector((state) => state.user.userInfo);
    const products = userInfo?.products;

    const [checkoutWidth, setCheckoutWidth] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const container = useRef<any>(null);

    const validationSchema = yup.object({
        number: yup.string().required(),
        owner: yup.string().required(),
        validity: yup.string().required(),
        cvv: yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            number: "",
            owner: "",
            validity: "",
            cvv: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // window.alert("opa");

            // console.log(values);
            dispatch(
                UserActions.removeAllCartProducts({
                    userId: userInfo?.id ?? "",
                })
            );
        },
    });

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

        if (container.current.offsetWidth < BREAKPOINTS.md.split("px")[0]) {
            widthPercentage = 0.2;
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

    function formatTitle(title: string) {
        const numberOfCharacters = 20;

        if (title.length > numberOfCharacters) {
            const result = title.slice(0, numberOfCharacters);

            return `${result}...`;
        }

        return title;
    }

    function renderPaymentInfo() {
        return (
            <div className="lg:px-10 px-4">
                <form onSubmit={formik.handleSubmit}>
                    <BaseInput
                        id="number"
                        label="Number"
                        name="number"
                        onChange={formik.handleChange}
                        value={formik.values.number}
                        onBlur={formik.handleBlur}
                        hasError={formik.touched.number}
                        errorMessage={formik.errors.number}
                    />
                    <BaseInput
                        id="owner"
                        label="Owner's name"
                        name="owner"
                        onChange={formik.handleChange}
                        value={formik.values.owner}
                        onBlur={formik.handleBlur}
                        hasError={formik.touched.owner}
                        errorMessage={formik.errors.owner}
                    />
                    <div className="grid grid-cols-2 gap-10">
                        <BaseInput
                            id="validity"
                            label="Validity"
                            name="validity"
                            onChange={formik.handleChange}
                            value={formik.values.validity}
                            onBlur={formik.handleBlur}
                            hasError={formik.touched.validity}
                            errorMessage={formik.errors.validity}
                        />
                        <BaseInput
                            id="cvv"
                            label="cvv"
                            name="cvv"
                            onChange={formik.handleChange}
                            value={formik.values.cvv}
                            onBlur={formik.handleBlur}
                            hasError={formik.touched.cvv}
                            errorMessage={formik.errors.cvv}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <BaseButton
                            onClick={handleBuy}
                            className="bg-green-600 mt-5"
                        >
                            Buy now
                        </BaseButton>
                    </div>
                </form>
            </div>
        );
    }

    function handleBuy() {
        formik.handleSubmit();
    }

    function renderResumeCard() {
        return (
            <div
                style={{
                    width: checkoutWidth,
                }}
                className="fixed bg-gray-50 shadow-md p-4"
            >
                <div className="flex justify-between items-center border-b pb-4">
                    <p className="text-sm ">TOTAL PRICE</p>
                    <p className="font-semibold">{formatPrice(totalPrice)}</p>
                </div>
                <div className="flex justify-between items-center border-b pb-4">
                    <p className="text-sm mt-4">PRODUCTS</p>
                </div>
                <div className="max-h-[40vh] overflow-auto">
                    {products?.map((item, index) => {
                        return (
                            <div
                                className="flex items-center justify-between mt-4"
                                key={index}
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-20 aspect-square object-contain bg-gray-100"
                                    />
                                    <div>
                                        <p className="text-sm lg:text-base">
                                            {formatTitle(item.title)}
                                        </p>
                                        <p className="text-sm font-semibold">
                                            x {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-end text-sm lg:text-base">
                                    {formatPrice(item.price)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
    function renderBuyCard() {
        return (
            <div
                style={{
                    width: "50%",
                }}
                className="fixed bottom-0 left-0 right-0 bg-gray-50 shadow-md p-4"
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
                <div>
                    <p className="text-2xl mb-7 ml-10 font-thin tracking-widest">
                        CHECKOUT
                    </p>
                </div>
                <div className="flex flex-wrap min-h-[50vh]">
                    <div className="md:w-[65%] w-full md:pr-4 mb-52 lg:mb-0">
                        {renderPaymentInfo()}
                    </div>
                    <div className="hidden md:block md:w-[35%] ">
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
