import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../../constants/breakpoints";

type Breakpoints = keyof typeof BREAKPOINTS;

function getBreakpointsPixels() {
    const values = Object.values(BREAKPOINTS);

    return values.map((item) => {
        return Number(item.split("px")[0]);
    });
}

export function GetBreakpointName() {
    const [size, setSize] = useState(0);
    const width = window.innerWidth;

    const breakpoints = getBreakpointsPixels();

    useEffect(() => {
        window.addEventListener("resize", () => {
            setSize(window.innerWidth);
        });

        // return () => window.removeEventListener("resize", setWidthSize);
    }, []);

    const breakpointReturn = Object.keys(BREAKPOINTS).find((key) => {
        const k = key as Breakpoints;
        const valueStr = BREAKPOINTS[k];
        const valueNumber = Number(valueStr.split("px")[0]);

        if (size <= valueNumber) {
            return key;
        }
    });

    return breakpointReturn;
}

export function Breakpoint(key: Breakpoints) {
    const [size, setSize] = useState(0);
    const breakpointValue = Number(BREAKPOINTS[key].split("px")[0]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setSize(window.innerWidth);
        });

        setSize(window.innerWidth);

        return () =>
            window.removeEventListener("resize", () => {
                setSize(window.innerWidth);
            });
    }, []);

    if (size < breakpointValue) {
        return true;
    }

    return false;
}
