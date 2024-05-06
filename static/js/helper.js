import { GetPlayer } from "./config.js";
export function GetVecToPlayer(object) {
    return new Phaser.Math.Vector2(GetPlayer().body.position).subtract(object.body.position);
}
export function IsVecLessOrEqualTo(vec, bound) {
    return vec.lengthSq() < Math.pow(bound, 2);
}
export function IsVecGreaterThan(vec, bound) {
    return !IsVecLessOrEqualTo(vec, bound);
}
