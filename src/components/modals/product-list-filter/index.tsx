import { BaseButton } from "../../base-button";
import { BaseInput } from "../../base-input";

export type ProductListFilterModalPropsType = {
    open: boolean;
    onClose: () => void;
};

export function ProductListFilterModal(props: ProductListFilterModalPropsType) {
    const { open = false, onClose } = props;

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

    function renderButtons() {
        return (
            <div className="flex gap-2">
                <BaseButton label="apply" uppercase />
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
                <div>
                    <p className="px-4 font-semibold tracking-widest text-sm text-center">
                        PRODUCT NAME
                    </p>
                    <BaseInput placeholder="Name..." className="mt-2" />
                </div>
                <div className="mt-10">
                    <p className="px-4 font-semibold tracking-widest text-sm text-center">
                        CATEGORY
                    </p>
                    <BaseInput placeholder="Category..." className="mt-2" />
                </div>
                <div className="mt-10">
                    <p className="px-4 font-semibold tracking-widest text-sm text-center">
                        PRICE
                    </p>
                    <div className="flex justify-between  h-7">
                        <div className="flex items-center">
                            <BaseInput className="w-12 px-0 h-full rounded-sm" />
                            <p className="font-light pl-2 text-gray-400 text-sm">
                                min
                            </p>
                        </div>
                        <div className="flex items-center">
                            <p className="font-light pr-2 text-gray-400 text-sm">
                                max
                            </p>
                            <BaseInput className="w-12 px-0 h-full rounded-sm" />
                        </div>
                    </div>
                    <input
                        type="range"
                        className={`${sliderThumbStyle} mt-4 appearance-none bg-gray-400 h-[4px] rounded-full w-full cursor-pointer`}
                    />
                </div>
            </div>
        );
    }

    function renderContent() {
        const style = open ? "opacity-100" : "opacity-0 pointer-events-none";

        return (
            <div
                className={`${style} transition-all duration-300 fixed z-50 w-[100vw] h-[100vh] backdrop-blur-sm flex items-center justify-center`}
            >
                <div className="flex flex-col justify-between shadow-lg h-1/2 min-h-[450px] w-[80%] sm:w-[500px] bg-white backdrop-blur-lg rounded-lg p-10">
                    {renderInputs()}
                    {renderButtons()}
                </div>
            </div>
        );
    }

    return renderContent();
}
