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
            (item) => item.category === "BEST_SELLERS"
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
            <Carousel
                itemsInARow={itemsInARow}
                products={products}
                numberOfCharactersOnTitle={50}
            />
            <div
                className="h-12 mx-auto w-[90%] md:w-[50%] lg:w-[25%] mb-10 mt-10 bg-black text-white cursor-pointer flex items-center justify-center"
                onClick={handleNavigation}
            >
                <p className="font-light tracking-widest">SEE MORE</p>
            </div>
        </div>
    );
}
