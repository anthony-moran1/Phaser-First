class Player extends Phaser.Physics.Arcade.Sprite implements IPlayer {
    leftMoveKey: Phaser.Input.Keyboard.Key;
    rightMoveKey: Phaser.Input.Keyboard.Key;
    upMoveKey: Phaser.Input.Keyboard.Key;
    downMoveKey: Phaser.Input.Keyboard.Key;

    xSpd = 2000;
    yspd = 1800;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "player");
    }

    update(delta: number) {
        if (this.leftMoveKey.isDown) {
            this.setVelocityX(-this.xSpd * delta);
        } else if (this.rightMoveKey.isDown) {
            this.setVelocityX(this.xSpd * delta);
        } else {
            this.setVelocityX(0);
        }

        if (this.upMoveKey.isDown) {
            this.setVelocityY(-this.yspd * delta);
        } else if (this.downMoveKey.isDown) {
            this.setVelocityY(this.yspd * delta);
        } else {
            this.setVelocityY(0);
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register("player",
    function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
	const player = new Player(this.scene, x, y);
    player.leftMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    player.rightMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    player.upMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    player.downMoveKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    this.displayList.add(player);
    this.updateList.add(player);
    this.scene.physics.add.existing(player);

    return player;
})