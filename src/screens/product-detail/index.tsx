import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { EcommerceActions } from "../../store/modules/ecommerce";
import { formatPrice } from "../../utils/price";
import { BaseButton } from "../../components/base-button";
import { Carousel } from "../../components/carousel";
import { Breakpoint } from "../../utils/breakpoints";
import { UserActions } from "../../store/modules/user";
import { ROUTES } from "../../constants/routes";
import { ToastActions } from "../../store/modules/toast";

export function ProductDetailScreen() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const breakpointMd = Breakpoint("md");

    const { selectedProduct, products } = useAppSelector(
        (state) => state.ecommerce
    );

    const { isAuthenticated } = useAppSelector((state) => state.user);
    const userId = useAppSelector((state) => state.user.userInfo?.id);

    const suggestedProducts = selectSuggestedProducts();

    useEffect(() => {
        dispatch(
            EcommerceActions.setSelectedProduct({
                productId: params.productId ?? "",
            })
        );
    }, [products, selectedProduct, params.productId, dispatch]);

    function selectSuggestedProducts() {
        const result = products?.filter(
            (item) => item.category === selectedProduct?.category
        );

        return result;
    }

    function handleNoAuthentication() {
        navigate(ROUTES.LOGIN);

        dispatch(
            ToastActions.fail({
                message: "You need an account to complete the action",
            })
        );
    }

    function handleAddToCart() {
        if (!isAuthenticated) {
            handleNoAuthentication();
        }

        dispatch(
            UserActions.createOrAddCartProduct({
                productId: params.productId ?? "",
                userId: userId ?? "",
                showSuccessMessage: true,
            })
        );
    }

    function handleBuy() {
        if (!isAuthenticated) {
            handleNoAuthentication();
        }

        dispatch(
            UserActions.createOrAddCartProduct({
                productId: params.productId ?? "",
                userId: userId ?? "",
                showSuccessMessage: true,
                navigateToCart: true,
            })
        );
    }

    function renderNoData() {
        return (
            <div className="h-[80vh] w-full flex items-center justify-center">
                <div className="">
                    <p className="text-6xl text-center font-bold">Product</p>
                    <p className="text-5xl font-thin">Not Found</p>
                </div>
            </div>
        );
    }

    function renderProductDetail() {
        return (
            <div className="flex w-full flex-wrap min-h-[40vh] justify-center">
                <div className="flex justify-center lg:justify-end mb-10 lg:w-[50%] w-full">
                    <div className="h-[100%] max-w-full overflow-hidden">
                        <img
                            src={selectedProduct?.image}
                            alt={selectedProduct?.title}
                            className="w-full object-cover"
                        />
                    </div>
                </div>

                <div className="w-full lg:w-[40%] lg:pl-14 ">
                    <div className="border-b pb-4">
                        <p className="text-3xl tracking-tight mb-2 font-bold">
                            {selectedProduct?.title}
                        </p>
                        <p className="text-2xl font-light">
                            {formatPrice(selectedProduct?.price)}
                        </p>
                    </div>
                    <div className="border-b pb-4">
                        <div className="w-full mt-5">
                            <p className="font-bold">Description</p>
                            <p className="font-light">
                                {selectedProduct?.description}
                            </p>
                        </div>
                        <div className="w-full mt-5">
                            <p className="font-bold">Category</p>
                            <p className="font-light">
                                {selectedProduct?.category}
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 flex-col">
                        <BaseButton
                            label="Buy Now"
                            className="mb-4 hover:bg-gray-900 transition-all"
                            onClick={handleBuy}
                        />
                        <BaseButton
                            label="Add to cart"
                            className="bg-green-500 hover:bg-green-400 transition-all"
                            onClick={handleAddToCart}
                        />
                    </div>
                </div>
            </div>
        );
    }

    function renderProductSuggestions() {
        const itemsInARow = breakpointMd ? 2 : 4;

        return (
            <div className="w-full self-center flex justify-center border-t mt-10">
                <div className="w-full pt-5">
                    <p className="mb-5 text-xl font-thin">Related Products</p>
                    <Carousel
                        products={suggestedProducts}
                        itemsInARow={itemsInARow}
                        animate={false}
                    />
                </div>
            </div>
        );
    }

    function renderContent() {
        return (
            <div className="w-[90%] md:w-[70vw] lg:w-[80vw] mx-auto max-w-[1280px]">
                {renderProductDetail()}
                {renderProductSuggestions()}
            </div>
        );
    }

    function renderPage() {
        if (!selectedProduct) {
            return renderNoData();
        }

        return renderContent();
    }

    return (
        <div>
            <Header shouldUseCustomStyle={false} />
            <div className="container pt-36 mx-auto flex-col items-center justify-center">
                {renderPage()}
            </div>
        </div>
    );
}
