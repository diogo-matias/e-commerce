export type ProductType = {
    id: string;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
};

export type FiltersType = {
    category: string;
    title: string;
    max_price: number;
    min_price: number;
};

export type StateType = {
    products: ProductType[];
    selectedProduct: any;
    userInfo: any;
    cartInfo: any;
    filter: {
        filters: FiltersType;
        filteredProductList: ProductType[];
    };
};
