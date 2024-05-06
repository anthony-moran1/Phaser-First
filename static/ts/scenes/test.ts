import { LOGICAL_HEIGHT, LOGICAL_WIDTH, AddPlayer } from "../config.js";
import Pet from "../objects/pet.js";
import Enemy from "../objects/enemy.js";
import { GameObjects } from "phaser";

export class Test extends Phaser.Scene {
    preload() {
        this.load.baseURL = "./static/assets/"
        this.load.image("player", "player.png");
        this.load.spritesheet("pet", "pet.png", {frameWidth: 11, frameHeight: 9});
        this.load.image("enemy", "enemy.png");
    }

    create() {
        const player = AddPlayer(this, LOGICAL_WIDTH / 2, LOGICAL_HEIGHT / 2);
        this.cameras.main.startFollow(player);
        const pet = new Pet(this, LOGICAL_WIDTH / 4, LOGICAL_HEIGHT / 2);
        const enemy = new Enemy(this, LOGICAL_WIDTH * 3 / 4, LOGICAL_HEIGHT / 2);

        this.physics.add.collider(player, pet);
        this.physics.add.collider(player, enemy);

        player.addToDisplayList();

        this.aAdd(player);
        this.aAdd(pet);
        this.aAdd(enemy);
    }

    update(time: number, delta: number): void {
        this.children.each(child => child.update(delta / 1000));
    }

    aAdd(object: GameObjects.GameObject) {
        this.physics.add.existing(object);
        object.addToUpdateList();
        object.addToDisplayList();
    }
}