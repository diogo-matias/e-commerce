import { faker } from "@faker-js/faker";

function makeData() {
    return {
        name: faker.commerce.productName(),
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-red-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343703000",
    };
}

const numberOfProducts = 10;

function makeProductsData() {
    let data = [];

    for (let index = 0; index < numberOfProducts; index++) {
        data.push(makeData());
    }

    return data;
}

export const fakeData = makeProductsData();
