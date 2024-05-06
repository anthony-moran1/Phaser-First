import { GetVecToPlayer, IsVecLessOrEqualTo } from "../helper.js";
export default class Pet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "pet");
        this.speed = 2000;
        this.minDistFromOwner = 20;
        this.runFrameStart = 0;
        this.runFrameEnd = 3;
        this.runFrameCurrent = this.runFrameStart;
        this.isLost = false;
        this.knowWhereToRun = true;
        this.minDistLost = 30;
        let anim = this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("pet", { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });
    }
    update(delta) {
        const vecToOwner = GetVecToPlayer(this);
        if (IsVecLessOrEqualTo(vecToOwner, this.minDistFromOwner)) {
            this.setVelocity(0);
            this.setFrame(0);
            this.stop();
            this.isLost = false;
            return;
        }
        if (IsVecLessOrEqualTo(vecToOwner, this.minDistLost)) {
            return;
        }
        if (!this.isLost) {
            this.isLost = true;
            this.knowWhereToRun = false;
            this.scene.time.addEvent({
                delay: 500,
                callback: () => {
                    this.knowWhereToRun = true;
                }
            });
        }
        if (!this.knowWhereToRun) {
            return;
        }
        const moveDir = vecToOwner.normalize();
        const moveVelocity = moveDir.scale(this.speed * delta);
        this.setVelocity(moveVelocity.x, moveVelocity.y);
        this.play("run", true);
        if (moveVelocity.x < 0) {
            this.flipX = true;
        }
        else {
            this.flipX = false;
        }
    }
}
