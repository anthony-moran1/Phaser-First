import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from "../config.js";

export class Test extends Phaser.Scene {
    preload() {
        this.load.image("ball", "./static/assets/ball.png");
    }

    create() {
        this.add.sprite(LOGICAL_WIDTH / 2, LOGICAL_HEIGHT / 2, "ball");
    }
}