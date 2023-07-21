import { useCallback, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Product } from "../../components/product";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { EcommerceActions } from "../../store/modules/ecommerce";
import { FiltersType, ProductType } from "../../store/modules/ecommerce/types";
import { ProductListFilterModal } from "../../components/modals/product-list-filter";
import { BaseButton } from "../../components/base-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useSearchParams } from "react-router-dom";

export function ProductListScreen() {
    const filteredProductList = useAppSelector(
        (state) => state.ecommerce.filter.filteredProductList
    );
    const products = useAppSelector((state) => state.ecommerce.products);

    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [formattedProducts, setFormattedProducts] = useState<ProductType[]>();

    const [params] = useSearchParams();

    const PARAMS: FiltersType = {
        category: params.get("category") ?? "",
        title: params.get("title") ?? "",
        max_price: Number(params.get("max_price")) ?? 0,
        min_price: Number(params.get("min_price")) ?? 0,
    };

    const paramsValues = Object.values(PARAMS) ?? [];

    const [shouldOpenFilterModal, setShouldOpenFilterModal] = useState(false);

    const formatProductList = useCallback(() => {
        const mmc = 12;
        const numberOfItems = page * mmc;
        const result = filteredProductList.slice(0, numberOfItems);
        const numberOfPages = Math.ceil(filteredProductList.length / mmc);

        setNumberOfPages(numberOfPages);
        setFormattedProducts(result);
    }, [page, filteredProductList]);

    useEffect(() => {
        dispatch(EcommerceActions.filter(PARAMS));
    }, [...paramsValues, products]);

    useEffect(() => {
        formatProductList();
    }, [formatProductList]);

    useEffect(() => {
        if (!filteredProductList.length) {
            dispatch(EcommerceActions.getAllProducts());
        }
    }, []);

    function renderMore() {
        if (page >= numberOfPages) {
            return null;
        }

        return (
            <div
                className="h-12 w-full md:w-[50%] lg:w-[25%] my-10  bg-black text-white cursor-pointer mx-auto flex items-center justify-center"
                onClick={() => setPage(page + 1)}
            >
                <p className="font-light tracking-widest">SEE MORE</p>
            </div>
        );
    }

    function renderProductList() {
        return (
            <div className="transition-all grid grid-cols-12 gap-4">
                {formattedProducts?.map((item, index) => {
                    const key = `${item.title}-${index}`;

                    return (
                        <div
                            key={key}
                            className="transition-all col-span-6 md:col-span-3 lg:col-span-2"
                        >
                            <Product product={item} />
                        </div>
                    );
                })}
            </div>
        );
    }

    function renderHeader() {
        return (
            <div className="py-1 mb-24">
                <div className="absolute left-0 w-screen pb-4 py-2 border-b-[0.5px] border-gray-300">
                    <div className="container flex gap-10 items-center justify-between mx-auto px-4 sm:px-6 md:px-2 ">
                        <p className="text-3xl font-thin tracking-widest ">
                            ALL PRODUCTS
                        </p>
                        <BaseButton
                            className="px-10 py-4 bg-transparent sm:bg-black "
                            style={{ width: "150px" }}
                            onClick={() => setShouldOpenFilterModal(true)}
                        >
                            <div className="flex gap-4 items-center h-full ">
                                <FontAwesomeIcon
                                    icon={solid("sliders")}
                                    className="text-black sm:text-white text-2xl sm:text-base"
                                />
                                <div className="hidden sm:block">FILTER</div>
                            </div>
                        </BaseButton>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <Header />
                <ProductListFilterModal
                    params={PARAMS}
                    open={shouldOpenFilterModal}
                    onClose={() => setShouldOpenFilterModal(false)}
                />
                <div className="container pt-24 px-4 md:px-0 mx-auto ">
                    {renderHeader()}
                    {renderProductList()}
                    {renderMore()}
                </div>
            </div>
        </div>
    );
}
