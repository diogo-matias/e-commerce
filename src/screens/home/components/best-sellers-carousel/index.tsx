import { useNavigate } from "react-router-dom";
import { Carousel } from "../../../../components/carousel";
import { useAppSelector } from "../../../../hooks/redux";
import { BestSellersCarouselPropsType } from "./types";
import { ROUTES } from "../../../../constants/routes";

export function BestSellersCarousel(props: BestSellersCarouselPropsType) {
    const { itemsInARow } = props;

    const navigate = useNavigate();

    const productsState = useAppSelector((state) => state.ecommerce.products);

    const products = filterProducts();

    function filterProducts() {
        const result = productsState?.filter(
            (item) => item.category === "BEST_SELLER"
        );

        return result;
    }

    function handleNavigation() {
        navigate(ROUTES.PRODUCT_LIST);
    }

    return (
        <div>
            <div className="mt-12">
                <p className="my-6 text-[1.75rem] font-thin text-center tracking-widest text-slate-900 md:text-4xl">
                    <span className="font-semibold">BEST</span> SELLERS
                </p>
            </div>
            <Carousel itemsInARow={itemsInARow} products={products} />
            <div
                className="h-12 w-full md:w-[50%] lg:w-[25%] mb-10 mt-5  bg-black text-white cursor-pointer mx-auto flex items-center justify-center"
                onClick={handleNavigation}
            >
                <p className="font-light tracking-widest">SEE MORE</p>
            </div>
        </div>
    );
}
