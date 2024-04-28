import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from "../config.js";
import "../objects/player.js";

export class Test extends Phaser.Scene {
    player: IPlayer;

    preload() {
        this.load.image("player", "./static/assets/player.png");
    }

    create() {
        this.player = this.add.player(LOGICAL_WIDTH / 2, LOGICAL_HEIGHT / 2);
    }

    update(time: number, delta: number): void {
        this.player.update(delta / 1000);
    }
}