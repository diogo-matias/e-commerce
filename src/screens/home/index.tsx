import { Banner } from "../../components/banner";
import { Carousel } from "../../components/carousel";
import { Categories } from "../../components/categories";
import { Header } from "../../components/header";
import { ProductList } from "../../components/product-list";

export function Home() {
    function renderBestSellersCarousel() {
        return (
            <div>
                <div className="mt-12">
                    <p className="my-6 text-[1.75rem] font-thin tracking-tight text-slate-900 md:text-4xl">
                        <span className="font-semibold">Best</span> Sellers
                    </p>
                </div>
                <Carousel itemsInARow={4.5} />
            </div>
        );
    }

    function renderCategoriesCarousel() {
        return (
            <div>
                <div className="mt-12">
                    <p className="my-6 text-[1.75rem] font-thin tracking-tight text-slate-900 md:text-4xl">
                        <span className="font-semibold">Camisetas</span> top
                    </p>
                </div>
                {/* <div className="w-1/2 mx-auto"> */}
                <Carousel
                    animate={false}
                    itemsInARow={8.5}
                    showControllers={false}
                />
                {/* </div> */}
            </div>
        );
    }

    return (
        <div>
            <Header />
            <Banner />
            <div className="container mx-auto">
                {renderBestSellersCarousel()}
                <Categories />
                {renderCategoriesCarousel()}
            </div>
        </div>
    );
}
