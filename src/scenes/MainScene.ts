import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {

    body: Array<Phaser.GameObjects.Rectangle>;

    constructor() {
        super('main-scene');
        this.body = [];
    }

    create() {
        this.body.push(this.add.rectangle(16, 0, 16, 16, 0xff0000).setOrigin(0));
        this.body.push(this.add.rectangle(0, 0, 16, 16, 0x0000ff).setOrigin(0));
    }

    update() {
        this.body[0].x += 1;
        this.body[1].x += 1;
    }


}