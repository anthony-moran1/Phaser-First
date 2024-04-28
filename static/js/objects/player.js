class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player");
        this.xSpd = 2000;
        this.yspd = 1800;
    }
    update(delta) {
        if (this.leftMoveKey.isDown) {
            this.setVelocityX(-this.xSpd * delta);
        }
        else if (this.rightMoveKey.isDown) {
            this.setVelocityX(this.xSpd * delta);
        }
        else {
            this.setVelocityX(0);
        }
        if (this.upMoveKey.isDown) {
            this.setVelocityY(-this.yspd * delta);
        }
        else if (this.downMoveKey.isDown) {
            this.setVelocityY(this.yspd * delta);
        }
        else {
            this.setVelocityY(0);
        }
    }
}
Phaser.GameObjects.GameObjectFactory.register("player", function (x, y) {
    const player = new Player(this.scene, x, y);
    player.leftMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    player.rightMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    player.upMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    player.downMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.displayList.add(player);
    this.updateList.add(player);
    this.scene.physics.add.existing(player);
    return player;
});
