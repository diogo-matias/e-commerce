import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ToastActions } from "../../store/modules/toast";

const TOAST_TIMEOUT_MS = 3000;
const ANIMATION_TIMEOUT_MS = 2000;

export function Toast() {
    const dispatch = useAppDispatch();
    const { open, message, type } = useAppSelector((state) => state.toast);

    const [animationDirection, setAnimationDirection] = useState([100, 0]);
    const [opacity, setOpacity] = useState([0, 100]);

    useEffect(() => {
        let timer: any;
        let timer2: any;

        // if (open) {
        //     timer = setTimeout(() => {
        //         dispatch(ToastActions.close());
        //     }, TOAST_TIMEOUT_MS);

        //     setTimeout(() => {
        //         handleClose();
        //     }, ANIMATION_TIMEOUT_MS);
        // }

        return () => {
            clearTimeout(timer2);
            clearTimeout(timer);
        };
    }, [open, message, type, dispatch]);

    function handleClose() {
        handleAnimationDirection(true);
    }

    function handleAnimationDirection(isClosing: boolean) {
        if (isClosing) {
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
                style={{ bottom: 10, right: 10 }}
                className={`fixed z-[999] bg-green-500 text-white font-extralight tracking-tight px-28 py-10 rounded-lg`}
            >
                <div
                    onClick={() => handleClose()}
                    className="w-10 h-10 absolute flex items-center justify-center top-0 right-0 cursor-pointer"
                >
                    <FontAwesomeIcon icon={solid("xmark")} size="xl" />
                </div>
                <p>USER CREATED SUCCESSFULLY</p>
            </motion.div>
        );
    }

    return renderToast();
}
