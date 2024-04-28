import { CONFIG, UpdateCanvasSize } from "./config.js";
window.addEventListener("resize", UpdateCanvasSize);
UpdateCanvasSize();
const game = new Phaser.Game(CONFIG);
