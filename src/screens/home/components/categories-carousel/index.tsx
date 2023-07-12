import { Carousel } from "../../../../components/carousel";
import { useAppSelector } from "../../../../hooks/redux";

export function CategoriesCarousel(props: { itemsInARow: number }) {
    const { itemsInARow } = props;

    const productsState = useAppSelector((state) => state.ecommerce.products);

    const products = productsState.filter((item) => item.category === "BAGS");

    return (
        <div>
            <div className="mt-12">
                <p className="my-6 text-[1.75rem] font-thin text-center tracking-widest text-slate-900 md:text-4xl">
                    <span className="font-thin">BOLSAS</span>
                </p>
            </div>
            <div className="w-[70%] mx-auto">
                <Carousel
                    products={products}
                    invertAnimation={true}
                    itemsInARow={itemsInARow}
                    showControllers={false}
                    animationSpeed={8}
                />
                <div className="h-12 w-full md:w-[50%] lg:w-[25%] my-10  bg-black text-white cursor-pointer mx-auto flex items-center justify-center">
                    <p className="font-light tracking-widest">SEE MORE</p>
                </div>
            </div>
        </div>
    );
}
