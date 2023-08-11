import { useCallback, useEffect } from "react";
import { Banner } from "../../components/banner";
import { Carousel } from "../../components/carousel";
import { Categories } from "../../components/categories";
import { Header } from "../../components/header";
import { ProductList } from "../../components/product-list";
import { Breakpoint, GetBreakpointName } from "../../utils/breakpoints";
import { useDispatch } from "react-redux";
import { EcommerceActions } from "../../store/modules/ecommerce";
import { useAppDispatch } from "../../hooks/redux";
import { BestSellersCarousel } from "./components/best-sellers-carousel";
import { CategoriesCarousel } from "./components/categories-carousel";

export function Home() {
    const breakpointMd = Breakpoint("lg");
    const dispatch = useAppDispatch();

    const renderBestSellersCarousel = useCallback(() => {
        let itemsInRow = 5;

        if (breakpointMd) {
            itemsInRow = 2;
        }

        return <BestSellersCarousel itemsInARow={itemsInRow} />;
    }, [breakpointMd]);

    const renderCategoriesCarousel = useCallback(() => {
        let itemsInRow = 4.5;

        if (breakpointMd) {
            itemsInRow = 2;
        }

        return <CategoriesCarousel itemsInARow={itemsInRow} />;
    }, [breakpointMd]);

    return (
        <div className="pb-10">
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
