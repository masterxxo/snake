export default class Apple {

    /** @type {Phaser.Scene} */
    scene: Phaser.Scene;

    apple: Phaser.GameObjects.Rectangle | null;

    constructor(scene: Phaser.Scene, tileSize: number) {
        this.scene = scene;
        this.apple = this.scene.add.rectangle(0, 0, tileSize, tileSize, 0x00ff00);
    }
}