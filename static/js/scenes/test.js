import { LOGICAL_HEIGHT, LOGICAL_WIDTH } from "../config.js";
import "../objects/player.js";
import "../objects/pet.js";
export class Test extends Phaser.Scene {
    preload() {
        this.load.baseURL = "./static/assets/";
        this.load.image("player", "player.png");
        this.load.spritesheet("pet", "pet.png", { frameWidth: 11, frameHeight: 9 });
    }
    create() {
        this.player = this.add.player(LOGICAL_WIDTH / 2, LOGICAL_HEIGHT / 2);
        this.pet = this.add.pet(LOGICAL_WIDTH / 4, LOGICAL_HEIGHT / 2);
        this.pet.owner = this.player;
    }
    update(time, delta) {
        this.player.update(delta / 1000);
        this.pet.update(delta / 1000);
    }
}
