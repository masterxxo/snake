import Apple from "./Apple";

type Position = {
    x: number,
    y: number
}

export default class Player {
    /** @type {Phaser.Scene} */
    scene: Phaser.Scene;

    private readonly PLAYER_SPEED: number = 100;

    private lastMoveTime: number;
    private moveInterval: number = 100;
    private tileSize: number = 16;
    /** @type {Phaser.Math.Vector2} */
    private direction: Phaser.Math.Vector2;
    private body: Phaser.Physics.Arcade.Group;
    private snakeHead!: Phaser.GameObjects.Rectangle;
    private stop: Boolean;

    private apple: Apple | null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.lastMoveTime = 0;
        this.direction = Phaser.Math.Vector2.LEFT;
        this.body = this.scene.physics.add.group();
        this.apple = null;
        this.stop = false;

        this.initialize();
    }

    initialize() {
        this.snakeHead = this.scene.add.rectangle(
            <number>this.scene.game.config.width / 2,
            <number>this.scene.game.config.height / 2,
            this.tileSize,
            this.tileSize,
            0xff0000
        ).setOrigin(0);

        this.body.add(this.scene.add.rectangle(-this.tileSize, -this.tileSize, this.tileSize, this.tileSize, 0xff0000).setOrigin(0));
        this.scene.input.keyboard.on('keydown', (event) => {
            this.keyboardController(event);
        });

        this.apple = new Apple(this.scene, this.tileSize);

        this.scene.physics.add.existing(this.snakeHead);
        this.scene.physics.add.collider(this.snakeHead, this.body);
        this.scene.physics.add.overlap(this.snakeHead, this.body, this.gameOver, undefined, this);

        this.scene.physics.add.collider(this.snakeHead, this.apple.object);
        this.scene.physics.add.overlap(this.snakeHead, this.apple.object, this.collectApple, undefined, this);
    }

    update(time) {
        if(this.stop) {
            return;
        }

        if(time >= (this.lastMoveTime + this.PLAYER_SPEED)) {
            this.lastMoveTime = time;
            this.move();
        }
    }

    private move() {
        let x = this.snakeHead.x + (this.direction.x * this.tileSize);
        let y = this.snakeHead.y + (this.direction.y * this.tileSize);
        
        const bodyChildren = this.body.getChildren() as Array<Phaser.GameObjects.Rectangle>;

        for(let i = this.body.getLength() - 1; i > 0; i --) {

            if(i > 1) {
                const prevBodyElementPosition = {
                    x: bodyChildren[i-1].x,
                    y: bodyChildren[i-1].y,
                }
                this.setBodyPosition(bodyChildren[i], prevBodyElementPosition);
            } else {
                this.setBodyPosition(bodyChildren[i], {x: this.snakeHead.x, y: this.snakeHead.y})
            }
        }

        let headPosition = this.setSnakeBoundaries({x, y});

        this.snakeHead.x = headPosition.x;
        this.snakeHead.y = headPosition.y;
    }

    private setBodyPosition(child: Phaser.GameObjects.Rectangle, position: Position) {
        child.x = position.x;
        child.y = position.y;
    }

    private keyboardController(event: KeyboardEvent) {

        switch (event.key) {
            case 'ArrowLeft': //left
                if(this.direction !== Phaser.Math.Vector2.RIGHT) {
                    this.direction = Phaser.Math.Vector2.LEFT;
                }
                break;
            case 'ArrowUp': //up
                if(this.direction !== Phaser.Math.Vector2.DOWN) {
                    this.direction = Phaser.Math.Vector2.UP;
                }
                break;
            case 'ArrowRight': //right
                if(this.direction !== Phaser.Math.Vector2.LEFT) {
                    this.direction = Phaser.Math.Vector2.RIGHT;
                }
                break;
            case 'ArrowDown': //down
                if(this.direction !== Phaser.Math.Vector2.UP) {
                    this.direction = Phaser.Math.Vector2.DOWN;
                }
                break;
        }
    }

    private collectApple() {
        this.addPartOfSnake();
        this.apple?.setApplePosition();
    }

    private addPartOfSnake() {
        this.body.add(
            this.scene.add.rectangle(-this.tileSize, -this.tileSize, this.tileSize, this.tileSize, 0xff0000).setOrigin(0)
        )
    }

    private setSnakeBoundaries(pos: Position): Position {
        let countedX: number = pos.x;
        let countedY: number = pos.y;

        if(pos.x < 0) {
            countedX = <number>this.scene.game.config.width;
        } else if (pos.x > this.scene.game.config.width) {
            countedX = 0;
        }

        if(pos.y < 0) {
            countedY = <number>this.scene.game.config.height;
        } else if (pos.y > this.scene.game.config.height) {
            countedY = 0;
        }

        return {
            x: countedX,
            y: countedY
        }
    }

    private gameOver() {
        console.log('is there anything');
        this.scene.scene.restart();
    }
}