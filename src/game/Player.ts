export default class Player {
    /** @type {Phaser.Scene} */
    scene: Phaser.Scene;
    private lastMoveTime: Number;
    private moveInterval: Number = 100;
    private tileSize: Number = 16;
    /** @type {Phaser.Math.Vector2} */
    private direction: Phaser.Math.Vector2;
    private body: Array<Phaser.GameObjects.Rectangle>

    constructor(scene) {
        this.scene = scene;
        this.lastMoveTime = 0;
        this.direction = Phaser.Math.Vector2.LEFT;
        this.body = [];
    }

}