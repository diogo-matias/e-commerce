import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Breakpoint } from "../../utils/breakpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { ROUTES } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

export function Banner() {
    const imagesArr = [
        {
            desktop:
                "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/h4d/h47/h00/h00/11281362780190/Metalizados-Desk-1-.jpg",
            mobile: "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/hfc/h2d/h00/h00/11281363042334/Metalizados-Mobile.jpg",
            navigation: ROUTES.PRODUCT_LIST,
        },
        {
            desktop:
                "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/haf/h9c/h00/h00/11258907000862/Home-Studs-Desk.jpg",

            mobile: "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/h7a/hcb/h00/h00/11258907263006/Home-Studs-Mobile.jpg",
            navigation: `${ROUTES.PRODUCT_LIST}?category=BEST_SELLERS`,
        },
        {
            desktop:
                "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/h12/hc3/h00/h00/11192777834526/-Home-Ativa-o-Pretty-Shoes-Desk.jpg",

            mobile: "https://secure-static.arezzo.com.br/medias/sys_master/arezzo/arezzo/h77/h1a/h00/h00/11206163628062/ID-Sele-o-at-R-199-Mobile.jpg",
            navigation: `${ROUTES.PRODUCT_LIST}?category=SHOES`,
            //?category=SHOES&max_price=500
        },
    ];

    const navigate = useNavigate();

    const isMobile = Breakpoint("md");
    const animationTimeInMs = isMobile ? 500 : 1000;
    const animationTimeInSec = animationTimeInMs / 1000;
    const autoSlideIntervalInMs = 6000;

    const banner = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [images, setImages] = useState(imagesArr);
    const [index, setIndex] = useState(1);
    const [animationOffset, setAnimationOffset] = useState(0);

    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [shouldChangeIndex, setShouldChangeIndex] = useState(true);

    const [slideInterval, setSlideInterval] = useState<any>();

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        setDimensions();
        formatImages();
        const interval = handleAutoSlide();

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        let timer: any;

        if (!shouldChangeIndex) {
            timer = setTimeout(() => {
                setShouldChangeIndex(true);
            }, animationTimeInMs);
        }
    }, [shouldChangeIndex]);

    useEffect(() => {
        const animationOffset = index * offset * -1;

        setAnimationOffset(animationOffset);

        if (index === images.length - 1) {
            setTimeout(() => {
                setIndex(1);
                setShouldAnimate(false);
            }, animationTimeInMs);
        }

        if (index === 0) {
            setTimeout(() => {
                setIndex(images.length - 2);
                setShouldAnimate(false);
            }, animationTimeInMs);
        }
    }, [index, images, offset]);

    function handleAutoSlide() {
        const interval = setInterval(() => {
            handleButtonClick("next");
        }, autoSlideIntervalInMs);

        setSlideInterval(interval);
        return interval;
    }

    function formatImages() {
        const fistImage = imagesArr[0];
        const lastImage = imagesArr[imagesArr.length - 1];
        const [...values] = imagesArr;

        const formatted = [lastImage, ...values, fistImage];

        setImages(formatted);
    }

    function handleResize() {
        setDimensions();
        setShouldAnimate(false);
    }

    function setDimensions() {
        const offsetWidth = banner.current?.offsetWidth;

        setOffset(Number(offsetWidth));
    }

    function handleIndexChange(isNext: boolean) {
        if (!shouldChangeIndex) {
            return;
        }

        setIndex((current) => {
            if (isNext) {
                return current + 1;
            } else {
                return current - 1;
            }
        });
    }

    function handleButtonClick(step: "next" | "previous") {
        const isNext = step === "next";

        setShouldAnimate(true);
        handleIndexChange(isNext);
        setShouldChangeIndex(false);
        clearInterval(slideInterval);
    }

    function renderBanner() {
        return (
            <motion.div
                animate={{ x: animationOffset }}
                transition={{
                    duration: shouldAnimate ? animationTimeInSec : 0,
                    ease: [0.18, 1.01, 0.7, 1],
                }}
                className="absolute flex items-center justify-center h-full"
            >
                {images.map((image, index) => {
                    const src = isMobile ? image.mobile : image.desktop;

                    return (
                        <motion.div
                            key={`image-${index}`}
                            className=" w-[100vw] h-full cursor-pointer"
                            onClick={() => navigate(image.navigation)}
                        >
                            <img
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                                src={src}
                                alt={src}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        );
    }

    function renderControllers() {
        const dotsStyle =
            "hover:bg-white transition ease-in-out bg-opacity-20 text-xl flex items-center justify-center p-7 h-[50%] aspect-square rounded-[50%]  z-2 cursor-pointer pointer-events-auto ";

        return (
            <motion.div className="absolute z-[1] flex justify-between items-center px-[5%] h-[50px] w-full bottom-[50%] translate-y-1/2 pointer-events-none">
                <div
                    onClick={() => handleButtonClick("previous")}
                    className={dotsStyle}
                >
                    <FontAwesomeIcon icon={solid("angle-left")} />
                </div>
                <div
                    onClick={() => handleButtonClick("next")}
                    className={dotsStyle}
                >
                    <FontAwesomeIcon icon={solid("angle-right")} />
                </div>
            </motion.div>
        );
    }

    function handleDotsClick(index: number) {
        setShouldAnimate(true);
        setIndex(index);
    }

    function renderDots() {
        return (
            <div className="absolute flex justify-center items-center  bottom-10 left-0 right-0">
                {images.map((item, i) => {
                    let customIndex: number = index;

                    if (index === 0) {
                        customIndex = images.length - 2;
                    }

                    if (index === images.length - 1) {
                        customIndex = 1;
                    }

                    const isSelected = i === customIndex;
                    const isLast = i === images.length - 1;
                    const isFirst = i === 0;

                    if (isLast || isFirst) {
                        return null;
                    }

                    const customStyle = isSelected
                        ? "bg-white"
                        : "bg-black bg-opacity-20 ";

                    return (
                        <div
                            key={`${item}-${i}`}
                            className={`${customStyle} mx-5 w-3 aspect-square rounded-full cursor-pointer `}
                            onClick={() => handleDotsClick(i)}
                        />
                    );
                })}
            </div>
        );
    }

    return (
        <div>
            <div
                className="relative w-[100vw] overflow-hidden h-[100vh]"
                ref={banner}
            >
                {renderControllers()}
                {renderBanner()}
                {renderDots()}
            </div>
        </div>
    );
}
