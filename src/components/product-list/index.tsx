import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { EcommerceActions } from "../../store/modules/ecommerce";
import { formatPrice } from "../../utils/price";
import { Carousel } from "../carousel";
import { ProductType } from "../../store/modules/ecommerce/types";

export function ProductList() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.ecommerce.products);

    const [categoryIndex, setCategoryIndex] = useState<number | null>(null);

    const categories = ["Bolsas", "Sapatos", "Jaqueta"];

    useEffect(() => {
        dispatch(EcommerceActions.getAllProducts());
    });

    function handleSelectCategory(index: number) {
        setCategoryIndex(index);
    }

    function renderHeader() {
        return (
            <div className="md:mx-0 mx-5">
                <p className="m-6 text-[1.75rem] font-thin tracking-tight text-slate-900 md:text-4xl">
                    <span className="font-semibold">Mais</span> Vendidos
                </p>
                {/* <div className="w-full flex gap-10 mt-10 cursor-pointer">
                    {categories.map((item, index) => {
                        const selectedStyle = "border-black border-b-4";
                        const unselectedStyle = "border-transparent border-b-4";
                        const isSelected = categoryIndex === index;

                        return (
                            <div
                                className={`mb-2 ${
                                    isSelected ? selectedStyle : unselectedStyle
                                }`}
                                onClick={() => handleSelectCategory(index)}
                            >
                                <p>{item}</p>
                            </div>
                        );
                    })}
                </div> */}
            </div>
        );
    }

    function renderProductCard(item: ProductType, index: number) {
        return (
            <div
                className="col-span-6 md:col-span-3 w-full aspect-[2/3] mb-10 "
                key={`item.title-${index}`}
            >
                <div className="h-[90%] overflow-hidden bg-gray-100 cursor-pointer transition ease-in shadow-md hover:shadow-xl">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="min-h-[100%] w-full"
                    />
                </div>
                <div className="px-[5%] pt-2 ">{item.title}</div>
                <div className="px-[5%] font-bold">
                    {formatPrice(Number(item.price))}
                </div>
            </div>
        );
    }

    function renderCards() {
        return (
            <div className="grid grid-cols-12 gap-5 mt-4 md:mx-0 mx-5">
                {products.map((item, index) => {
                    return renderProductCard(item, index);
                })}
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24">
            {renderHeader()}
            {/* {renderCards()} */}
            <Carousel />
        </div>
    );
}
