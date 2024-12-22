"use client";
import confetti, { Options as ConfettiOptions } from "canvas-confetti";

type Origin = {
    x: number;
    y: number;
};

type CustomConfettiOptions = Omit<ConfettiOptions, "origin"> & {
    origin?: Origin;
    disableForReducedMotion?: boolean;
    canvas?: HTMLCanvasElement | null;
    resize?: boolean;   
    useWorker?: boolean;
};

const Confetti = (options: CustomConfettiOptions) => {
    if (
        options.disableForReducedMotion &&
        window.matchMedia("(prefers-reduced-motion)").matches
    ) {
        return;
    }

    const confettiInstance = options.canvas
        ? confetti.create(options.canvas, {
            resize: options.resize ?? true,
            useWorker: options.useWorker ?? true
        })
        : confetti;

    // Remove custom properties before passing to confetti
    const { disableForReducedMotion, canvas, ...confettiOptions } = options;

    confettiInstance(confettiOptions);
};

Confetti.shapeFromPath = confetti.shapeFromPath;
Confetti.shapeFromText = confetti.shapeFromText;

export { Confetti };

// 4. Side Cannons
export const confettiSideCannons = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
        if (Date.now() > end) return;

        Confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors
        });
        Confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors
        });

        requestAnimationFrame(frame);
    };

    frame();
};
