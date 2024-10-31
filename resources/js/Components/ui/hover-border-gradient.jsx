"use client";
import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { cn } from "@/Libs";

export function HoverBorderGradient({
    children,
    containerClassName,
    className,
    as: Tag = "button",
    duration = 1,
    clockwise = true,
    colorMoving = "hsl(0, 0%, 100%)",
    ...props
}) {
    const [hovered, setHovered] = useState(false);
    const [direction, setDirection] = useState("TOP");

    const rotateDirection = (currentDirection) => {
        const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length;
        return directions[nextIndex];
    };

    const movingMap = {
        TOP: `radial-gradient(20.7% 50% at 50% 0%, ${colorMoving} 0%, rgba(255, 255, 255, 0) 100%)`,
        LEFT: `radial-gradient(16.6% 43.1% at 0% 50%, ${colorMoving} 0%, rgba(255, 255, 255, 0) 100%)`,
        BOTTOM: `radial-gradient(20.7% 50% at 50% 100%, ${colorMoving} 0%, rgba(255, 255, 255, 0) 100%)`,
        RIGHT: `radial-gradient(16.2% 41.199999999999996% at 100% 50%, ${colorMoving} 0%, rgba(255, 255, 255, 0) 100%)`,
    };

    const highlight =
        "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

    useEffect(() => {
        if (!hovered) {
            const interval = setInterval(() => {
                setDirection((prevState) => rotateDirection(prevState));
            }, duration * 1000);
            return () => clearInterval(interval);
        }
    }, [hovered]);
    return (
        <Tag
            onMouseEnter={(event) => {
                setHovered(true);
            }}
            onMouseLeave={() => setHovered(false)}
            className={cn(
                "relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border bg-black/20 decoration-clone p-px transition duration-500 hover:bg-black/10 dark:bg-white/20",
                containerClassName,
            )}
            {...props}
        >
            <div
                className={cn(
                    "z-10 w-auto rounded-[inherit] bg-black px-4 py-2 text-white",
                    className,
                )}
            >
                {children}
            </div>
            <motion.div
                className={cn(
                    "absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]",
                )}
                style={{
                    filter: "blur(2px)",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
                initial={{ background: movingMap[direction] }}
                animate={{
                    background: hovered
                        ? [movingMap[direction], highlight]
                        : movingMap[direction],
                }}
                transition={{ ease: "linear", duration: duration ?? 1 }}
            />
            <div className="z-1 absolute inset-[2px] flex-none rounded-[100px] bg-black" />
        </Tag>
    );
}