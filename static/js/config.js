import Player from "./objects/player.js";
import { Test } from "./scenes/test.js";
export const CANVAS = document.querySelector("canvas");
const CANVAS_CONTAINER = document.querySelector("#canvas-container");
if (CANVAS == null) {
    throw new Error("Could not find the canvas element");
}
const ASPECT_RATIO = 16 / 9;
export const LOGICAL_WIDTH = 260;
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
let player;
export function AddPlayer(scene, x, y) {
    return player = new Player(scene, x, y);
}
export function GetPlayer() {
    return player;
}
