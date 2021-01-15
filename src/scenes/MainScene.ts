import Phaser from 'phaser';
import Player from '../game/Player';

export default class MainScene extends Phaser.Scene {

    player: Player | null;
    constructor() {
        super('main-scene');
        this.player = null;
    }

    create() {
        this.player = new Player(this);
    }

    update() {}
}