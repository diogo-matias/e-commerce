export type ProductType = {
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
};

export type StateType = {
    products: ProductType[] | [];
    selectedProduct: any;
    userInfo: any;
    cartInfo: any;
};
