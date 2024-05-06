import { Physics } from "phaser";
import { GetPlayer } from "./config.js";

export function GetVecToPlayer(object : Physics.Arcade.Sprite) {
    return new Phaser.Math.Vector2(GetPlayer().body.position).subtract(object.body.position);
}

export function IsVecLessOrEqualTo(vec : Phaser.Math.Vector2, bound: number) {
    return vec.lengthSq() < bound ** 2;
}

export function IsVecGreaterThan(vec: Phaser.Math.Vector2, bound: number) {
    return !IsVecLessOrEqualTo(vec, bound);
}