import {
    Easing,
    motion,
    useAnimation,
    useAnimationControls,
    useForceUpdate,
    useMotionValue,
    useScroll,
    useTransform,
} from "framer-motion";
import { off } from "process";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CarouselPropsType } from "./types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { ProductType } from "../../store/modules/ecommerce/types";
import { formatPrice } from "../../utils/price";

export function Carousel(props: CarouselPropsType) {
    const {
        products = [],
        itemsInARow = 8,
        animate = true,
        showControllers = true,
        animationSpeed = 1,
        invertAnimation = false,
    } = props;

    const images = [
        "https://img.lojasrenner.com.br/item/636628750/large/3.jpg",
        "https://img.lojasrenner.com.br/item/646851656/large/3.jpg",
        "https://img.lojasrenner.com.br/item/602439601/large/1.jpg",
        "https://img.lojasrenner.com.br/item/638457149/large/3.jpg",
        "https://img.lojasrenner.com.br/banner/01-home/230706_HOME_VITRINEPROMO_JEANS_RESP_GERAL_2.png",
        "https://img.lojasrenner.com.br/item/636628750/large/3.jpg",
        "https://img.lojasrenner.com.br/item/646851656/large/3.jpg",
        "https://img.lojasrenner.com.br/item/602439601/large/1.jpg",
        "https://img.lojasrenner.com.br/item/638457149/large/3.jpg",
        "https://img.lojasrenner.com.br/banner/01-home/230706_HOME_VITRINEPROMO_JEANS_RESP_GERAL_2.png",
        "https://img.lojasrenner.com.br/item/636628750/large/3.jpg",
        "https://img.lojasrenner.com.br/item/646851656/large/3.jpg",
        "https://img.lojasrenner.com.br/item/602439601/large/1.jpg",
        "https://img.lojasrenner.com.br/item/638457149/large/3.jpg",
        "https://img.lojasrenner.com.br/banner/01-home/230706_HOME_VITRINEPROMO_JEANS_RESP_GERAL_2.png",
    ];

    const navigate = useNavigate();

    let timer = useRef(0);

    const numberOfItemsInRow = itemsInARow;
    const timeAnimation = products.length * 10 * animationSpeed;

    const banner = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const [shouldAnimate, setShouldAnimate] = useState();
    const [animationXOffset, setAnimationXOffset] = useState(0);
    const [canClick, setCanClick] = useState(true);

    const animationFlux: number[] = useMemo(() => {
        return invertAnimation ? [-width, 0, -width] : [0, -width, 0];
    }, [invertAnimation, width]);

    const animateX = useMemo(() => {
        return animate ? animationFlux : 0;
    }, [animate, animationFlux]);

    const [animation, setAnimation] = useState<any>(animateX);
    const [shouldRepeat, setShouldRepeat] = useState(true);
    const [animationTime, setAnimationTime] = useState(timeAnimation);
    const [ease, setEase] = useState<Easing>("linear");

    const x = useMotionValue(0);
    const controls = useAnimationControls();

    const clickOffset = itemWidth * 2;

    useEffect(() => {
        setAnimation(animateX);
    }, [animateX]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setOffset();
        });

        setTimeout(() => {
            setOffset();
        }, 100);

        setInterval(() => {
            timer.current += 2;
        }, 50);
    }, []);

    useEffect(() => {
        setOffset();

        if (products.length) {
            setAnimationTime(products.length * 10 * animationSpeed);
        }
    }, [banner, products, animationSpeed]);

    useEffect(() => {
        controls.start({
            x: animation,
            transition: {
                duration: animationTime,
                ease,
                repeat: shouldRepeat ? Infinity : undefined,
            },
        });
    }, [animationTime, animation, controls, ease, shouldRepeat]);

    useEffect(() => {
        const widthItem = offsetWidth / numberOfItemsInRow;
        const scrollWidth = widthItem * products.length;

        setItemWidth(widthItem);
        setScrollWidth(scrollWidth);
        setWidth(Number(scrollWidth) - Number(offsetWidth));
    }, [offsetWidth, products.length, numberOfItemsInRow]);

    function setOffset() {
        const offsetWidth = banner.current?.offsetWidth;

        setOffsetWidth(Number(offsetWidth));
    }

    function handleProductDetailNavigation(productId: string) {
        navigate(ROUTES.PRODUCT_DETAIL.replace(":productId", productId));
    }

    function handleArrowClick(goNext: boolean) {
        const currentXPosition = x.get();
        const maxRight = -width;
        const maxLeft = 0;

        const xDiff = goNext ? -clickOffset : clickOffset;
        const calc = currentXPosition + xDiff;

        if (calc <= maxRight && goNext) {
            setAnimation(-width);
            return;
        }

        if (calc >= maxLeft && !goNext) {
            setAnimation(0);
            return;
        }

        setShouldRepeat(false);
        setAnimationTime(0.2);

        setEase("easeOut");
        setAnimation(currentXPosition + xDiff);
    }

    function handleProductClick(item: ProductType) {
        if (canClick) {
            handleProductDetailNavigation(item.id);
        }
        setCanClick(true);
    }

    function renderImages() {
        return (
            <>
                {products?.map((item, index) => {
                    const isLastItem = index === products.length - 1;
                    const padding = isLastItem ? "pr-0" : "pr-3";

                    return (
                        <motion.div
                            key={`${item}-${index}`}
                            style={{
                                width: itemWidth,
                            }}
                            className={`${padding} aspect-[9/16] h-full`}
                            onClick={() => handleProductClick(item)}
                        >
                            <img
                                style={{
                                    width: "100%",
                                    height: "90%",
                                    objectFit: "cover",
                                    pointerEvents: "none",
                                }}
                                src={item.image}
                                alt={item.image}
                            />
                            <div
                                style={{
                                    height: "10%",
                                }}
                                className="text-[0.8rem] md:text-[1rem]"
                            >
                                <p className="font-light mt-[2%] ">
                                    {item.title}
                                </p>
                                <p className="font-bold">
                                    {formatPrice(item.price)}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </>
        );
    }

    function renderArrow(icon: string) {
        return (
            <div className="w-[70%] pointer-events-auto cursor-pointer aspect-square flex items-center justify-center text-[4rem] text-white">
                {`${icon}`}
            </div>
        );
    }

    function renderControllers() {
        if (!showControllers) {
            return null;
        }

        const commonStyle =
            "absolute from-[rgba(0,0,0,0.3)] w-[12.5%] h-full flex items-center justify-center";

        return (
            <div
                className="relative w-full pointer-events-none"
                style={{
                    height: "calc(90% - 35px)",
                }}
            >
                <div
                    className={`${commonStyle} left-0 bg-gradient-to-r`}
                    onClick={() => handleArrowClick(false)}
                >
                    {renderArrow("<")}
                </div>
                <div
                    className={`${commonStyle} right-0 bg-gradient-to-l`}
                    onClick={() => handleArrowClick(true)}
                >
                    {renderArrow(">")}
                </div>
            </div>
        );
    }

    return (
        <motion.div
            ref={banner}
            style={{
                height: `${(itemWidth * 16) / 9 + 40}px`,
            }}
            className="relative w-full overflow-hidden"
        >
            <motion.div
                dragConstraints={{
                    right: 0,
                    left: -width,
                }}
                animate={controls}
                style={{
                    x,
                }}
                drag="x"
                onDragStart={() => {
                    setCanClick(false);
                }}
                className="absolute cursor-grab flex"
            >
                {renderImages()}
            </motion.div>
            {renderControllers()}
        </motion.div>
    );
}
