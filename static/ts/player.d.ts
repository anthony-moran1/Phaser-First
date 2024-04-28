declare interface IPlayer extends Phaser.Physics.Arcade.Sprite
{
    
}

declare namespace Phaser.GameObjects
{
	interface GameObjectFactory
	{
		player(x: number, y: number): IPlayer
	}
}