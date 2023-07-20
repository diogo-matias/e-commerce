export type ProductType = {
    title: string;
    price: number;
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
