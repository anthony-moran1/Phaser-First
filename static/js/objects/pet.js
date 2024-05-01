class Pet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "pet");
        this.speed = 1500;
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
        console.log(anim);
    }
    update(delta) {
        if (this.owner == null) {
            return;
        }
        const xDistToOwner = this.owner.x - this.x;
        const yDistToOwner = this.owner.y - this.y;
        const distToOwner = Math.pow(xDistToOwner, 2) + Math.pow(yDistToOwner, 2);
        if (distToOwner <= Math.pow(this.minDistFromOwner, 2)) {
            this.setVelocity(0);
            this.setFrame(0);
            this.stop();
            this.isLost = false;
            return;
        }
        if (distToOwner <= Math.pow(this.minDistLost, 2)) {
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
        const moveDir = new Phaser.Math.Vector2(xDistToOwner, yDistToOwner).normalize();
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
Phaser.GameObjects.GameObjectFactory.register("pet", function (x, y) {
    const pet = new Pet(this.scene, x, y);
    this.displayList.add(pet);
    this.updateList.add(pet);
    this.scene.physics.add.existing(pet);
    return pet;
});
