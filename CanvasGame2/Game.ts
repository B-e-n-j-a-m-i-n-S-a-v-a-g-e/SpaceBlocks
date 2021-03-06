﻿

enum Key {
    Space = 32,
    Left = 37,
    Up = 38,
    Right = 39,
    A = 65,
    D = 68
}

interface GameOptions {
    screen: {
        width: number,
        height: number
    },
    delays: {
        targets: number,
        fire: number,
    },
    bg: {
        fill: string
    },
    gun: GunOptions,
    bullet: BulletOptions,
    target: TargetOptions,
    stats: StatsOptions,
    star: StarOptions
}

class Game {

    static defaultOptions: GameOptions = {
        screen: {
            width: 500,
            height: 500
        },
        delays: {
            targets: 3000,
            fire: 150
        },
        bg: { fill: 'black' },
        gun: { fill: 'green', aim: false },
        bullet: { fill: 'white' },
        target: {
            fillInvincible: 'brown',
            fillSuperShield: 'purple',
            fillShield: 'red',
            fillRegular: 'green',
            life: { fill: 'white', max: 4 }
        },
        stats: { fill: 'black' },
        star: { fill: 'white' }
    };

    private options: GameOptions;

    private parent: HTMLElement;
    private canvas: HTMLCanvasElement;

    private playground: Playground;
    private shoot: Sound;

    private frameId: number;
    private targetsId: number;
    private fireId: number;

    private keys = [];

    constructor(options: GameOptions, parent: HTMLElement = document.body) {

        this.options = merge({}, Game.defaultOptions, options) as GameOptions;

        this.parent = parent;

        let pg = new Playground(this.options, this.parent);

        this.playground = pg;
        this.canvas = pg.canvas;
        this.shoot = new Sound("audio/shoot.wav");
        this.bindMethods();
        this.newGame();

    }

    bindMethods(): void {

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

        this.onNewFrame = this.onNewFrame.bind(this);
        this.onNewTargets = this.onNewTargets.bind(this);
    }

    newGame(): void {

        this.playground.newGame();

        // Mouse events
        this.canvas.addEventListener('mousemove', this.onMouseMove);
        this.canvas.addEventListener('mousedown', this.onMouseDown);
        this.canvas.addEventListener('mouseup', this.onMouseUp);

        // Keyboard events
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
        
        // Frame interval
        this.frameId = setInterval(this.onNewFrame, 1000 / 50);

        // New targets interval
        this.targetsId = setInterval(this.onNewTargets, this.options.delays.targets);
    }

    stopGame(): void {

        let canvas = this.canvas;

        canvas.removeEventListener('mousemove', this.onMouseMove);
        canvas.removeEventListener('mousedown', this.onMouseDown);
        canvas.removeEventListener('mouseup', this.onMouseUp);

        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);

        clearInterval(this.frameId);
        clearInterval(this.targetsId);
        clearInterval(this.fireId);
    }

    startFire(type: string): void {

        if (this.fireId) {
            return;
        }

        let pg = this.playground;

        if (type === "regular") {

            // Create first bullet
            pg.createBullet("regular");

            // Create next bullets with interval
            clearInterval(this.fireId);
            this.fireId = setInterval(() => pg.createBullet("regular"), this.options.delays.fire);
        } else {

            if (type === "leftSide") {

                pg.createBullet("leftSide");

            } else if (type === "rightSide") {

                pg.createBullet("rightSide");
            }

            clearInterval(this.fireId);
            this.fireId = setInterval(() => pg.createBullet("side"), this.options.delays.fire);
        }

        this.shoot.play();
    }

    stopFire(): void {
        clearInterval(this.fireId);
        this.fireId = null;
    }

    onNewFrame(): void {

        let pg = this.playground,
            keys = this.keys;

        if (keys[Key.Left]) {
            pg.moveGunLeft();
        } else if (keys[Key.Right]) {
            pg.moveGunRight();
        }

        pg.draw();

        if (pg.gameOver) {
            this.stopGame();
        }
    }

    onNewTargets(): void {
        this.playground.createTargets();
    }

    onMouseMove(event: MouseEvent): void {
        this.playground.moveGunByMouse(event);
    }

    onMouseDown(event: MouseEvent): void {
        this.startFire("regular");
    }

    onMouseUp(event: MouseEvent): void {
        this.stopFire();
    }

    onKeyDown(event: KeyboardEvent): void {

        let key = event.keyCode || event.which;
        this.keys[key] = true;

        if (key === Key.Space || key === Key.Up) {
            this.startFire("regular");
        } else if (key === Key.A) {
            this.startFire("leftSide");
        } else if (key === Key.D) {
            this.startFire("rightSide");
        }
    }

    onKeyUp(event: KeyboardEvent): void {

        let key = event.keyCode || event.which;
        this.keys[key] = false;

        if (key === Key.Space || key === Key.Up || key === Key.A || key === Key.D) {
            this.stopFire();
        } 
    }

    destroy(): void {
        this.stopGame();
        this.playground.destroy();
    }
}

// Save constructor in global scope
window['ShootingRange'] = Game;