import { motion } from "framer-motion";

export function Categories() {
    const data = [
        {
            image: "https://img.lojasrenner.com.br/item/636628750/large/3.jpg",
            title: "Camisas",
            redirect: "",
        },
        {
            image: "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/h12/hc3/h00/h00/11192777834526/-Home-Ativa-o-Pretty-Shoes-Desk.jpg",
            title: "Sapatilhas",
            redirect: "",
        },
        {
            image: "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/h2d/h36/h00/h00/11194751713310/-Home-Classy-Cruise-Materiais-Desk-Banner-Principal-4.jpg",
            title: "Sandálias",
            redirect: "",
        },
        {
            image: "https://img.lojasrenner.com.br/item/638457149/large/3.jpg",
            title: "Casaco",
            redirect: "",
        },
    ];
    const numberOfItemsInRow = 4;

    function renderCard(item: any, index: number) {
        const pattern = (index + 1) % numberOfItemsInRow;

        const commonStyle = "h-[70vh] flex items-center justify-center";
        const padding = "20px";

        let style: string = "";

        if (pattern === 1 || pattern === 0) {
            style = "w-[50%] lg:w-[35%]";
        }

        if (pattern === 2 || pattern === 3) {
            style = "w-[50%] lg:w-[65%]";
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
                    className="relative rounded-lg bg-gray-100 overflow-hidden cursor-pointer"
                >
                    <div className="w-full h-full absolute flex items-center justify-center bg-white bg-opacity-20 break-words pointer-events-none">
                        <p
                            className="text-[2.5rem] font-bold tracking-[1rem] text-white"
                            style={{
                                textShadow: "0px 0px 20px rgba(0,0,0,0.3)",
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

    return (
        <div className="min-h-screen w-full mt-10 flex flex-wrap">
            {renderCards()}
        </div>
    );
}
