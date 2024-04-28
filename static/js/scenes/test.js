import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from "../config.js";
import "../objects/player.js";
export class Test extends Phaser.Scene {
    preload() {
        this.load.image("player", "./static/assets/player.png");
    }
    create() {
        this.player = this.add.player(LOGICAL_WIDTH / 2, LOGICAL_HEIGHT / 2);
    }
    update(time, delta) {
        this.player.update(delta / 1000);
    }
}
