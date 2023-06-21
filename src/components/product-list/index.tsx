import { fakeData } from "./data";

export function ProductList() {
    function renderHeader() {
        return (
            <div className="md:mx-0 mx-5">
                <p className="mt-6 text-[1.75rem] font-thin tracking-tight text-slate-900 md:text-4xl">
                    <span className="font-semibold">New</span> Products
                </p>
                <p>summer collection</p>
            </div>
        );
    }

    function renderProductCard(item: { name: string; image: string }) {
        return (
            <div className="col-span-6 md:col-span-3 w-full aspect-[3/4] mb-10">
                <div className="h-[90%] overflow-hidden bg-gray-100 cursor-pointer transition ease-in shadow-md hover:shadow-xl">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="min-w-[100%] h-full"
                    />
                </div>
                <div className="px-[5%] pt-2 text-xs">{item.name}</div>
            </div>
        );
    }

    function renderCards() {
        return (
            <div className="grid grid-cols-12 gap-10 mt-10 md:mx-0 mx-5">
                {fakeData.map((item) => {
                    return renderProductCard(item);
                })}
            </div>
        );
    }

    return (
        <div className="container mx-auto min-h-screen pt-32">
            {renderHeader()}
            {renderCards()}
        </div>
    );
}
