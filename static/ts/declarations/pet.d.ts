declare interface IPet extends Phaser.Physics.Arcade.Sprite
{    
    owner: Phaser.Physics.Arcade.Sprite;
}

declare namespace Phaser.GameObjects
{
	interface GameObjectFactory
	{
		pet(x: number, y: number): IPet
	}
}