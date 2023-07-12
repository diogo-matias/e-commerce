import { Carousel } from "../../../../components/carousel";
import { useAppSelector } from "../../../../hooks/redux";
import { BestSellersCarouselPropsType } from "./types";

export function BestSellersCarousel(props: BestSellersCarouselPropsType) {
    const { itemsInARow } = props;

    const productsState = useAppSelector((state) => state.ecommerce.products);

    const products = filterProducts();

    function filterProducts() {
        const result = productsState.filter(
            (item) => item.category === "BEST_SELLER"
        );

        return result;
    }

    return (
        <div>
            <div className="mt-12">
                <p className="my-6 text-[1.75rem] font-thin text-center tracking-widest text-slate-900 md:text-4xl">
                    <span className="font-semibold">BEST</span> SELLERS
                </p>
            </div>
            <Carousel itemsInARow={itemsInARow} products={products} />
        </div>
    );
}
