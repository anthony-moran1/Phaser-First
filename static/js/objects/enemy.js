import { GetPlayer } from "../config.js";
import { GetVecToPlayer, IsVecGreaterThan, IsVecLessOrEqualTo } from "../helper.js";
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "enemy");
        this.speed = 800;
        this.canSeePlayer = false;
        this.maxSeeDist = 70;
        this.minSeeDist = 50;
        this.attackDist = 20;
    }
    update(delta) {
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
    moveTowardsPlayer(delta) {
        let player = GetPlayer();
        let xDistToPlayer = player.x - this.x;
        let yDistToOwner = player.y - this.y;
        let moveDir = new Phaser.Math.Vector2(xDistToPlayer, yDistToOwner).normalize();
        this.setVelocity(moveDir.x * this.speed * delta, moveDir.y * this.speed * delta);
    }
}
