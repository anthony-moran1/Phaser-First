import { GetPlayer } from "../config.js";
import { GetVecToPlayer, IsVecGreaterThan, IsVecLessOrEqualTo } from "../helper.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    speed = 800;

    canSeePlayer = false;
    maxSeeDist = 70;
    minSeeDist = 50;
    attackDist = 20;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "enemy");
    }

    update(delta: number): void {
        if (!this.canSeePlayer) {
            if (!this.lookForPlayer()) {
                return;
            }
        }

        if (this.canSeePlayer && IsVecGreaterThan(GetVecToPlayer(this), this.maxSeeDist)) {
            this.canSeePlayer = false;
            this.setVelocity(0);
            return;
        }

        if (this.tooFarToAttack()) {
            this.moveTowardsPlayer(delta);
            return;
        }

        this.setVelocity(0);
    }

    tooFarToAttack() {
        return IsVecGreaterThan(GetVecToPlayer(this), this.attackDist);
    }

    lookForPlayer() {
        if (IsVecLessOrEqualTo(GetVecToPlayer(this), this.minSeeDist)) {
            this.canSeePlayer = true;
            return true;
        }
        return false;
    }

    moveTowardsPlayer(delta: number) {
        let player = GetPlayer();
        let xDistToPlayer = player.x - this.x;
        let yDistToOwner = player.y - this.y;

        let moveDir = new Phaser.Math.Vector2(xDistToPlayer, yDistToOwner).normalize();
        this.setVelocity(moveDir.x * this.speed * delta, moveDir.y * this.speed * delta);
    }
}