export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player");
        this.speed = new Phaser.Math.Vector2(2000, 1800);
        this.leftMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.upMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.touchPointer = this.scene.input.pointer1;
    }
    update(delta) {
        const moveVec = new Phaser.Math.Vector2();
        if (this.touchPointer.wasTouch) {
            this.touchVec = new Phaser.Math.Vector2(this.touchPointer.worldX, this.touchPointer.worldY);
        }
        if (this.touchVec == null) {
            if (this.leftMoveKey.isDown) {
                moveVec.x = -1;
            }
            else if (this.rightMoveKey.isDown) {
                moveVec.x = 1;
            }
            if (this.upMoveKey.isDown) {
                moveVec.y = -1;
            }
            else if (this.downMoveKey.isDown) {
                moveVec.y = 1;
            }
            moveVec.normalize().multiply(this.speed).scale(delta);
            this.setVelocity(moveVec.x, moveVec.y);
        }
        else {
            this.moveToTouch(delta);
        }
    }
    moveToTouch(delta) {
        const moveVec = new Phaser.Math.Vector2(this.touchVec).subtract(this.body.position);
        moveVec.normalize().multiply(this.speed).scale(delta);
        this.setVelocity(moveVec.x, moveVec.y);
    }
}
