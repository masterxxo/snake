import Phaser from 'phaser';
import Player from '../game/Player';

export default class MainScene extends Phaser.Scene {

    player: Player | Object;
    constructor() {
        super('main-scene');
        this.player = {};
    }

    create() {
        this.player = new Player(this);
    }

    update(time) {
        this.player.update(time)
    }
}