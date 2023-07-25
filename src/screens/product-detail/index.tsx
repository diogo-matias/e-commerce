import { useParams } from "react-router-dom";
import { Header } from "../../components/header";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { EcommerceActions } from "../../store/modules/ecommerce";
import { formatPrice } from "../../utils/price";
import { BaseButton } from "../../components/base-button";
import { Carousel } from "../../components/carousel";
import { Breakpoint } from "../../utils/breakpoints";

export function ProductDetailScreen() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const breakpointMd = Breakpoint("md");

    const { selectedProduct, products } = useAppSelector(
        (state) => state.ecommerce
    );

    const suggestedProducts = selectSuggestedProducts();

    useEffect(() => {
        // if (!products) {
        //     dispatch(EcommerceActions.getAllProducts());
        // }

        dispatch(
            EcommerceActions.setSelectedProduct({
                productId: params.productId ?? "",
            })
        );
    }, [products, selectedProduct, params.productId, dispatch]);

    function selectSuggestedProducts() {
        const result = products.filter(
            (item) => item.category === selectedProduct?.category
        );

        return result;
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
            <div className="flex w-full flex-wrap min-h-[40vh] lg:h-[50vh] ">
                <div className="w-full md:w-1/2 flex h-full justify-center md:justify-end ">
                    <div className="md:w-[90%] lg:w-[60%] w-full">
                        <div className="h-[100%] max-w-full overflow-hidden">
                            <img
                                src={selectedProduct?.image}
                                alt={selectedProduct?.title}
                                className="w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/4 md:pl-16 md:px-0 px-10 mt-10 md:mt-0">
                    <div className="border-b pb-4">
                        <p className="text-3xl tracking-tight mb-2">
                            {selectedProduct?.title}
                        </p>
                        <p className="text-2xl font-light">
                            {formatPrice(selectedProduct?.price)}
                        </p>
                    </div>
                    <div className="border-b pb-4">
                        <div className="w-full mt-5">
                            <p className="font-bold">Description</p>
                            <p className="">{selectedProduct?.description}</p>
                        </div>
                        <div className="w-full mt-5">
                            <p className="font-bold">Category</p>
                            <p className="">{selectedProduct?.category}</p>
                        </div>
                    </div>
                    <div className="mt-10 flex-col">
                        <BaseButton
                            label="Buy Now"
                            className="mb-4 hover:bg-gray-900 transition-all"
                        />
                        <BaseButton
                            label="Add to cart"
                            className="bg-green-500 hover:bg-green-400 transition-all"
                        />
                    </div>
                </div>
            </div>
        );
    }

    function renderProductSuggestions() {
        const itemsInARow = breakpointMd ? 2 : 4;

        return (
            <div className="w-full self-center flex justify-center mt-10">
                <div className="w-full px-10 md:px-0 lg:w-[60%] border-t pt-5">
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
            <div>
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
