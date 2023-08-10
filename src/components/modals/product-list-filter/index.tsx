import { useState } from "react";
import { BaseButton } from "../../base-button";
import { BaseInput } from "../../base-input";
import { useLocation, useNavigate } from "react-router-dom";
import { FiltersType } from "../../../store/modules/ecommerce/types";

export type ProductListFilterModalPropsType = {
    open: boolean;
    onClose: () => void;
    params: FiltersType;
};

export function ProductListFilterModal(props: ProductListFilterModalPropsType) {
    const { open = false, onClose, params } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const [productTitle, setProductTitle] = useState(params.title);
    const [category, setCategory] = useState(params.category);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minPrice, setMinPrice] = useState(0);
    const [sliderValue, setSliderValue] = useState(maxPrice / 2);

    function tailwindHelper(className: string, styles: string) {
        const splittedStyles = styles.split(" ");

        const result = splittedStyles
            .map((item) => {
                return `${className}:${item} `;
            })
            .reduce((a, b) => {
                return `${a + b}`;
            });

        return result;
    }

    const sliderThumbStyle = tailwindHelper(
        "[&::-webkit-slider-thumb]",
        "appearance-none bg-black h-4 w-4 rounded-full"
    );

    function handleFilter() {
        const path = location.pathname;

        const paramsArray = [
            { title: productTitle },
            { category: category },
            { max_price: sliderValue },
            { min_price: minPrice },
        ];

        const params = paramsArray
            ?.filter((item) => {
                const value = Object.values(item)[0];
                return Boolean(value);
            })
            .map((item, index) => {
                const symbol = index === 0 ? "?" : "&";
                const value = Object.values(item);
                const key = Object.keys(item);

                return `${symbol}${key}=${value}`;
            })
            .reduce((a, b) => {
                return a + b;
            });

        navigate(`${path}${params}`);
    }

    function renderButtons() {
        return (
            <div className="flex gap-2">
                <BaseButton label="apply" uppercase onClick={handleFilter} />
                <BaseButton
                    label="close"
                    uppercase
                    className="bg-red-400"
                    onClick={onClose}
                />
            </div>
        );
    }

    function renderInputs() {
        return (
            <div>
                <form onSubmit={handleFilter} onClick={handleFilter}>
                    <div>
                        <p className="px-4 font-semibold tracking-widest text-sm text-center">
                            PRODUCT NAME
                        </p>

                        <BaseInput
                            placeholder="Name..."
                            className="mt-2"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setProductTitle(e.target.value);
                            }}
                            value={productTitle}
                        />
                    </div>
                    <div className="mt-10">
                        <p className="px-4 font-semibold tracking-widest text-sm text-center">
                            CATEGORY
                        </p>
                        <BaseInput
                            placeholder="Category..."
                            className="mt-2"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setCategory(e.target.value);
                            }}
                            value={category}
                        />
                    </div>
                    <div className="mt-10">
                        <p className="px-4 font-semibold tracking-widest text-sm text-center">
                            PRICE
                        </p>
                        <div className="flex justify-between  h-7">
                            <div className="flex items-center">
                                <div className="w-20">
                                    <BaseInput
                                        type="number"
                                        className="px-[8px] h-8 rounded-sm"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setMinPrice(Number(e.target.value));
                                        }}
                                        value={minPrice}
                                    />
                                </div>
                                <p className="font-light pl-2 text-gray-400 text-sm">
                                    min
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-light pr-2 text-gray-400 text-sm">
                                    max
                                </p>
                                <div className="w-20">
                                    <BaseInput
                                        type="number"
                                        className="px-[8px] h-8 rounded-sm"
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setMaxPrice(Number(e.target.value));
                                        }}
                                        value={maxPrice}
                                    />
                                </div>
                            </div>
                        </div>
                        <input
                            type="range"
                            className={`${sliderThumbStyle} mt-6 appearance-none bg-gray-400 h-[4px] rounded-full w-full cursor-pointer`}
                            onChange={(e) =>
                                setSliderValue(Number(e.target.value))
                            }
                            value={sliderValue}
                            max={maxPrice}
                            min={minPrice}
                        />
                        <div className="my-4 text-green-700 font-thin">
                            ${sliderValue.toFixed(2)}
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    function renderContent() {
        const style = open ? "opacity-100" : "opacity-0 pointer-events-none";

        return (
            <div
                className={`${style} transition-all duration-300 fixed z-50 w-[100vw] h-[100vh] backdrop-blur-sm flex items-center justify-center`}
            >
                <div className="flex flex-col justify-between shadow-lg h-1/2 min-h-[600px] w-[80%] sm:w-[500px] bg-white backdrop-blur-lg rounded-lg p-10">
                    {renderInputs()}
                    {renderButtons()}
                </div>
            </div>
        );
    }

    return renderContent();
}
