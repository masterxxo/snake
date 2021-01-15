export default class Apple {

    /** @type {Phaser.Scene} */
    scene: Phaser.Scene;

    tileSize: number;
    object: Phaser.GameObjects.Rectangle;


    constructor(scene: Phaser.Scene, tileSize: number) {
        this.scene = scene;
        this.tileSize = tileSize;
        this.object = this.scene.add.rectangle(0, 0, tileSize, tileSize, 0x00ff00);

        this.scene.physics.add.existing(this.object);
        this.setApplePosition();
    }

    public setApplePosition() {
        this.object.x = Phaser.Math.RND.between(this.tileSize, <number>this.scene.game.config.width - this.tileSize);
        this.object.y = Phaser.Math.RND.between(this.tileSize, <number>this.scene.game.config.height - this.tileSize);
    }
}