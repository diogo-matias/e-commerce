import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export function Categories() {
    const navigate = useNavigate();

    const data = [
        {
            image: "https://img.lojasrenner.com.br/item/631805067/large/3.jpg",
            title: "bags",
            redirect: "BAGS",
        },
        {
            image: "https://docs.google.com/uc?id=1VZIQmEEH0jNY5vXHed4GDbhHM4eVnQXt",
            title: "bests sellers",
            redirect: "BEST_SELLER",
        },
        {
            image: "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/h4d/h47/h00/h00/11281362780190/Metalizados-Desk-1-.jpg",
            title: "",
            redirect: "BEST_SELLER",
        },
        {
            image: "https://img.lojasrenner.com.br/item/794449474/large/3.jpg",
            title: "shoes",
            redirect: "SHOES",
        },
    ];

    const numberOfItemsInRow = 4;
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    function handleClick(item: any) {
        navigate(`${ROUTES.PRODUCT_LIST}?category=${item.redirect}`);
    }

    function renderCard(item: any, index: number) {
        const pattern = (index + 1) % numberOfItemsInRow;
        const isSelected = selectedCard === index;

        const commonStyle =
            "h-[50vh] md:aspect-square lg:h-[70vh] flex items-center justify-center";
        const padding = "20px";
        const textColor = isSelected
            ? "tracking-[10rem] text-white opacity-0"
            : "text-white tracking-[1rem] ";

        let style: string = "";

        if (pattern === 1 || pattern === 0) {
            style = "w-[100%] md:w-[50%] lg:w-[35%]";
        }

        if (pattern === 2 || pattern === 3) {
            style = "w-[100%] md:w-[50%] lg:w-[65%]";
        }

        return (
            <div
                className={`${commonStyle} ${style}`}
                key={`${item.title}-${index}`}
            >
                <div
                    style={{
                        height: `calc(100% - ${padding})`,
                        width: `calc(100% - ${padding})`,
                    }}
                    className="relative bg-gray-100 overflow-hidden cursor-pointer"
                >
                    <div
                        className={`${textColor} w-full transition-all duration-500 h-full absolute z-10  flex items-center justify-center bg-white bg-opacity-20 break-words pointer-events-none`}
                    >
                        <p
                            className="text-[1.5rem] lg:text-[2.5rem] md:text-[1.5rem] font-bold"
                            style={{
                                textShadow: isSelected
                                    ? ""
                                    : "0px 0px 1em rgba(0,0,0,0.3)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {item.title.toUpperCase()}
                        </p>
                    </div>
                    <motion.img
                        whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.3, ease: "easeOut" },
                        }}
                        onHoverStart={() => {
                            setSelectedCard(index);
                        }}
                        onHoverEnd={() => {
                            setSelectedCard(null);
                        }}
                        animate={{
                            scale: 1,
                        }}
                        src={item.image}
                        alt={item.title}
                        style={{
                            minWidth: "100%",
                            minHeight: "100%",
                            objectFit: "cover",
                        }}
                        onClick={() => handleClick(item)}
                    />
                </div>
            </div>
        );
    }

    function renderCards() {
        return data.map((item: any, index) => {
            return renderCard(item, index);
        });
    }

    return <div className="w-full mt-10 flex flex-wrap">{renderCards()}</div>;
}
