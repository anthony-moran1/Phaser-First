import { Test } from "./scenes/test.js";
export const CANVAS = document.querySelector("canvas");
const CANVAS_CONTAINER = document.querySelector("#canvas-container");
if (CANVAS == null) {
    throw new Error();
}
const ASPECT_RATIO = 4 / 3;
export const LOGICAL_WIDTH = 300;
export const LOGICAL_HEIGHT = LOGICAL_WIDTH / ASPECT_RATIO;
export const CONFIG = {
    type: Phaser.CANVAS,
    width: LOGICAL_WIDTH,
    height: LOGICAL_HEIGHT,
    physics: {
        default: 'arcade'
    },
    backgroundColor: "#888",
    canvas: CANVAS,
    scene: Test,
    pixelArt: true
};
export function UpdateCanvasSize() {
    if (CANVAS == null || CANVAS_CONTAINER == null) {
        throw new Error();
    }
    const CANVAS_CONTAINER_WIDTH = CANVAS_CONTAINER.clientWidth;
    const CANVAS_CONTAINER_HEIGHT = CANVAS_CONTAINER.clientHeight;
    if (CANVAS_CONTAINER_WIDTH > CANVAS_CONTAINER_HEIGHT * ASPECT_RATIO) {
        CANVAS.style.width = `${CANVAS_CONTAINER_HEIGHT * ASPECT_RATIO}px`;
        CANVAS.style.height = `${CANVAS_CONTAINER_HEIGHT}px`;
    }
    else {
        CANVAS.style.width = `${CANVAS_CONTAINER_WIDTH}px`;
        CANVAS.style.height = `${CANVAS_CONTAINER_WIDTH / ASPECT_RATIO}px`;
    }
}
