class Pet extends Phaser.Physics.Arcade.Sprite implements IPet {
    owner: Phaser.Physics.Arcade.Sprite;
    speed = 1500;
    minDistFromOwner = 20;

    runFrameStart = 0;
    runFrameEnd = 3;
    runFrameCurrent = this.runFrameStart;

    isLost = false;
    knowWhereToRun = true;

    minDistLost = 30;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "pet");

        let anim = this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("pet", {start: 0, end: 3}),
            frameRate: 7,
            repeat: -1
        });
        console.log(anim);
    }

    update(delta: number) {
        if (this.owner == null) {
            return;
        }

        const xDistToOwner = this.owner.x - this.x;
        const yDistToOwner = this.owner.y - this.y;
        const distToOwner = xDistToOwner ** 2 + yDistToOwner ** 2;

        if (distToOwner <= this.minDistFromOwner ** 2) {
            this.setVelocity(0);
            this.setFrame(0);
            this.stop();
            this.isLost = false;
            return;
        }

        if (distToOwner <= this.minDistLost ** 2) {
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
            })
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
        } else {
            this.flipX = false;
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register("pet",
    function(this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
	const pet = new Pet(this.scene, x, y);

    this.displayList.add(pet);
    this.updateList.add(pet);
    this.scene.physics.add.existing(pet);

    return pet;
})