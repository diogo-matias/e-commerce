import { ProductType } from "../../store/modules/ecommerce/types";

export type CarouselPropsType = {
    products?: ProductType[];
    itemsInARow?: number;
    animate?: boolean;
    showControllers?: boolean;
    animationSpeed?: number;
    invertAnimation?: boolean;
    onClick?: () => void;
    numberOfCharactersOnTitle?: number;
};
