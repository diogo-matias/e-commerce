import {
    Easing,
    motion,
    useAnimation,
    useForceUpdate,
    useMotionValue,
    useScroll,
    useTransform,
} from "framer-motion";
import { off } from "process";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { CarouselPropsType } from "./types";

export function Carousel(props: CarouselPropsType) {
    const { itemsInARow = 8, animate = true, showControllers = true } = props;

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
    let timer = useRef(0);

    const numberOfItemsInRow = itemsInARow;
    const timeAnimation = images.length * 10;

    const banner = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);
    const [shouldAnimate, setShouldAnimate] = useState();
    const [animationXOffset, setAnimationXOffset] = useState(0);
    const [canClick, setCanClick] = useState(true);

    const animateX = useMemo(() => {
        return animate ? [0, -width, 0] : 0;
    }, [width, animate]);

    const [animation, setAnimation] = useState<any>(animateX);
    const [shouldRepeat, setShouldRepeat] = useState(true);
    const [animationTime, setAnimationTime] = useState(timeAnimation);
    const [ease, setEase] = useState<Easing>("linear");

    const controls = useAnimation();
    const x = useMotionValue(0);

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
    }, [banner]);

    useEffect(() => {
        const widthItem = offsetWidth / numberOfItemsInRow;
        const scrollWidth = widthItem * images.length;

        setItemWidth(widthItem);
        setScrollWidth(scrollWidth);
        setWidth(Number(scrollWidth) - Number(offsetWidth));
    }, [offsetWidth, images.length, numberOfItemsInRow]);

    function setOffset() {
        const offsetWidth = banner.current?.offsetWidth;

        setOffsetWidth(Number(offsetWidth));
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

    function handleProductClick() {
        if (canClick) {
            window.alert("clicou");
        }
        setCanClick(true);
    }

    function renderImages() {
        return (
            <>
                {images.map((image, index) => {
                    const isLastItem = index === images.length - 1;
                    const padding = isLastItem ? "pr-0" : "pr-3";

                    return (
                        <motion.div
                            key={`${image}-${index}`}
                            style={{
                                width: itemWidth,
                            }}
                            className={`${padding} aspect-[9/16] h-full `}
                            onClick={handleProductClick}
                        >
                            <img
                                style={{
                                    width: "100%",
                                    height: "90%",
                                    objectFit: "cover",
                                    pointerEvents: "none",
                                }}
                                src={image}
                                alt={image}
                            />
                            <div
                                style={{
                                    height: "10%",
                                }}
                            >
                                <p className="font-light mt-[2%] ">
                                    Sandalia cano curto
                                </p>
                                <p className="font-bold">R$ 90,00</p>
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
            <div className="relative w-full h-[90%] pointer-events-none">
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
                height: (itemWidth * 16) / 9,
            }}
            className="relative w-full overflow-hidden"
        >
            <motion.div
                dragConstraints={{
                    right: 0,
                    left: -width,
                }}
                animate={{
                    x: animation,
                }}
                style={{
                    x,
                }}
                transition={{
                    duration: animationTime,
                    ease,
                    repeat: shouldRepeat ? Infinity : undefined,
                }}
                drag="x"
                onDragStart={() => setCanClick(false)}
                onDragTransitionEnd={() => console.log("end")}
                onDurationChange={() => console.log("wtf")}
                className="absolute cursor-grab flex"
            >
                {renderImages()}
            </motion.div>
            {renderControllers()}
        </motion.div>
    );
}
