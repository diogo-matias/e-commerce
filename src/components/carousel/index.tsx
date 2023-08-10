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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IconDefinition, IconFamily } from "@fortawesome/fontawesome-svg-core";

export function Carousel(props: CarouselPropsType) {
    const {
        products = [],
        itemsInARow = 8,
        animate = true,
        showControllers = true,
        animationSpeed = 1,
        invertAnimation = false,
    } = props;

    const navigate = useNavigate();

    let timer = useRef(0);

    const numberOfItemsInRow = itemsInARow;
    const timeAnimation = products.length * 10 * animationSpeed;

    const banner = useRef<HTMLDivElement>(null);

    const [width, setWidth] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [itemWidth, setItemWidth] = useState(0);

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
        setWidth(Number(scrollWidth) - Number(offsetWidth));
    }, [offsetWidth, products.length, numberOfItemsInRow]);

    function setOffset() {
        const offsetWidth = banner.current?.offsetWidth;

        setOffsetWidth(Number(offsetWidth));
    }

    function handleProductDetailNavigation(productId: string) {
        navigate(ROUTES.PRODUCT_DETAIL.replace(":productId", productId));
    }

    function setArrowClickAnimationConfig(animation: number) {
        setShouldRepeat(false);
        setAnimationTime(0.2);
        setEase("easeOut");

        setAnimation(animation);
    }

    function handleArrowClick(goNext: boolean) {
        const currentXPosition = x.get();
        const maxRight = -width;
        const maxLeft = 0;

        const xDiff = goNext ? -clickOffset : clickOffset;
        const calc = currentXPosition + xDiff;

        if (calc <= maxRight && goNext) {
            setArrowClickAnimationConfig(-width);

            return;
        }

        if (calc >= maxLeft && !goNext) {
            setArrowClickAnimationConfig(0);

            return;
        }

        setArrowClickAnimationConfig(currentXPosition + xDiff);
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

    function renderArrow(icon: IconDefinition) {
        return (
            <div className="w-[70%] pointer-events-auto cursor-pointer aspect-square flex items-center justify-center text-[4rem] text-white">
                <FontAwesomeIcon icon={icon} size="sm" />
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
                    {renderArrow(solid("angle-left"))}
                </div>
                <div
                    className={`${commonStyle} right-0 bg-gradient-to-l`}
                    onClick={() => handleArrowClick(true)}
                >
                    {renderArrow(solid("angle-right"))}
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
