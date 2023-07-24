import { useCallback } from "react";
import { formatPrice } from "../../utils/price";
import { ProductComponentType } from "./types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const TITLE_MAX_NUMBER_CHARACTERS = 50;

export function Product(props: ProductComponentType) {
    const { product } = props;

    const navigate = useNavigate();

    function formatTitle(title: string) {
        if (title.length > TITLE_MAX_NUMBER_CHARACTERS) {
            const sliceTitle = title.slice(0, TITLE_MAX_NUMBER_CHARACTERS);

            return `${sliceTitle}...`;
        }

        return title;
    }

    function handleClick() {
        navigate(ROUTES.PRODUCT_DETAIL.replace(":productId", product.id));
    }

    const renderContent = useCallback(() => {
        return (
            <div className="w-full cursor-pointer" onClick={handleClick}>
                <img
                    src={product.image}
                    alt={product.image}
                    className="aspect-[9/12] object-cover"
                />
                <div>
                    <div className="text-[0.8rem] md:text-[0.9rem]">
                        <p className="font-light mt-[2%] ">
                            {formatTitle(product.title)}
                        </p>
                        <p className="font-bold">
                            {formatPrice(product.price)}
                        </p>
                    </div>
                </div>
            </div>
        );
    }, [product]);

    return renderContent();
}
