import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ToastActions } from "../../store/modules/toast";
import { ToastStyleTypes } from "./types";

const TOAST_TIMEOUT_MS = 3000;
const ANIMATION_TIMEOUT_MS = 100;

const COLORS = {
    GREEN: "#00a305",
    RED: "#a30b00",
    YELLOW: "#c2a800",
};

export function Toast() {
    const dispatch = useAppDispatch();

    const { open, message, type } = useAppSelector((state) => state.toast);

    const [animationDirection, setAnimationDirection] = useState([100, 0]);
    const [opacity, setOpacity] = useState([0, 100]);

    const [customStyle, setCustomStyle] = useState(
        handleToastStyleBasedOnType()
    );

    const { backgroundColor, icon, title } = customStyle;

    useEffect(() => {
        if (open) {
            handleOpen();

            setTimeout(() => {
                handleClose();
            }, TOAST_TIMEOUT_MS);
        }

        setCustomStyle(handleToastStyleBasedOnType());
    }, [open, message, type, dispatch]);

    function handleToastStyleBasedOnType(): ToastStyleTypes {
        switch (type) {
            case "success":
                return {
                    backgroundColor: COLORS.GREEN,
                    icon: solid("check"),
                    title: "SUCCESS",
                };
            case "fail":
                return {
                    backgroundColor: COLORS.RED,
                    icon: solid("xmark"),
                    title: "FAIL",
                };

            default:
                return {
                    backgroundColor: COLORS.YELLOW,
                    icon: solid("triangle-exclamation"),
                    title: "WARNING",
                };
        }
    }

    function handleOpen() {
        handleAnimationDirection(true);
    }

    function handleClose() {
        handleAnimationDirection(false);

        setTimeout(() => {
            dispatch(ToastActions.close());
        }, ANIMATION_TIMEOUT_MS);
    }

    function handleAnimationDirection(isOpening: boolean) {
        if (isOpening) {
            setAnimationDirection([100, 0]);
            setOpacity([0, 100]);
        } else {
            setAnimationDirection([0, 100]);
            setOpacity([100, 0]);
        }
    }

    function renderToast() {
        if (!open) {
            return null;
        }

        return (
            <motion.div
                animate={{ y: animationDirection, opacity }}
                style={{ bottom: 10, right: 10, backgroundColor }}
                className={`fixed z-[999] text-white font-extralight tracking-tight pl-4 pr-24 py-5 rounded-lg`}
            >
                <div
                    onClick={() => handleClose()}
                    className="w-10 h-10 absolute flex items-center justify-center top-0 right-0 cursor-pointer"
                >
                    <FontAwesomeIcon icon={solid("xmark")} size="xl" />
                </div>
                <div className="flex w-full  items-center justify-center gap-5">
                    <div className="bg-white h-10 p-2 aspect-square flex items-center justify-center rounded-full">
                        <FontAwesomeIcon
                            style={{ color: backgroundColor }}
                            className={`text-${backgroundColor}`}
                            icon={icon}
                        />
                    </div>
                    <div>
                        <p className="font-bold">{title}</p>
                        <p className="font-normal">{message}</p>
                    </div>
                </div>
            </motion.div>
        );
    }

    return renderToast();
}
