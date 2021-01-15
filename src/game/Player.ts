export default class Player {
    /** @type {Phaser.Scene} */
    scene: Phaser.Scene;
    private lastMoveTime: number;
    private moveInterval: number = 100;
    private tileSize: number = 16;
    /** @type {Phaser.Math.Vector2} */
    private direction: Phaser.Math.Vector2;
    private body: Array<Phaser.GameObjects.Rectangle>
    private stop: Boolean;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.lastMoveTime = 0;
        this.direction = Phaser.Math.Vector2.LEFT;
        this.body = [];
        this.stop = false;

        this.initialize();
    }

    initialize() {
        this.body.push(
            this.scene.add.rectangle(
                this.scene.game.config.width / 2,
                this.scene.game.config.height / 2,
                this.tileSize,
                this.tileSize,
                0xff0000,
            ).setOrigin(0)
        );
    }

    update(time: number) {
        if(this.stop) {
            return;
        }

        if(time >= (this.lastMoveTime + this.moveInterval)) {
            this.lastMoveTime = time;
            this.move();
        }
    }

    move() {
        let x = this.body[0].x + (this.direction * this.tileSize);
        let y = this.body[0].y + (this.direction * this.tileSize);

        for(let i = this.body.length - 1; i > 0; i --) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }

        this.body[0].x = x;
        this.body[0].y = y;
    }
}