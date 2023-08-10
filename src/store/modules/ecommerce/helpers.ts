import { PayloadAction, current } from "@reduxjs/toolkit";
import { FiltersType, ProductType, StateType } from "./types";

export function filterLogic(
    state: StateType,
    { payload }: PayloadAction<FiltersType>
) {
    const keyExceptions = ["max_price", "min_price"];

    const keys = Object.keys(payload).filter((key) => {
        const k = key as keyof FiltersType;
        const isException = keyExceptions.includes(key);
        const isEmpty = !payload[k];

        if (!isException && !isEmpty) {
            return key;
        }

        return false;
    }) as Array<keyof FiltersType>;

    const noValues = Object.values(keys).every((value) => !value);

    if (noValues) {
        return state.products;
    }

    const filtersMatch = keys.map((key) => {
        return state.products
            ?.map((item) => current(item))
            ?.filter((product: any) => {
                let filterValue = payload[key];

                const productValue = product[key]?.toLowerCase();

                if (typeof filterValue === "string") {
                    filterValue = filterValue.toLowerCase();
                }

                if (productValue.includes(filterValue)) {
                    return product;
                }

                return false;
            });
    });

    let filtersMatchResults: ProductType[] = [];

    filtersMatch.forEach((item) => {
        item.forEach((item) => {
            filtersMatchResults.push(item);
        });
    });

    const matchResume: any = {};

    filtersMatchResults.forEach((value: any) => {
        if (matchResume[value.id]) {
            matchResume[value.id] += 1;
        } else {
            matchResume[value.id] = 1;
        }
    });

    const productsId = Object.keys(matchResume).filter(
        (key) => matchResume[key] === keys.length
    );

    const result = state.products
        ?.map((item) => current(item))
        ?.filter((product) => {
            return productsId.includes(product.id);
        });

    return result;
}

export function priceFilterLogic(
    products: ProductType[],
    { payload }: PayloadAction<FiltersType>
) {
    const result = products?.filter((item) => {
        if (
            item.price >= payload.min_price &&
            item.price <= payload.max_price
        ) {
            return item;
        }
        return false;
    });

    return result;
}
