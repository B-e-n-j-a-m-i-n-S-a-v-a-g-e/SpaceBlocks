var Key;
(function (Key) {
    Key[Key["Space"] = 32] = "Space";
    Key[Key["Left"] = 37] = "Left";
    Key[Key["Up"] = 38] = "Up";
    Key[Key["Right"] = 39] = "Right";
})(Key || (Key = {}));
var Game = (function () {
    function Game(options, parent) {
        if (parent === void 0) { parent = document.body; }
        this.keys = [];
        this.options = merge({}, Game.defaultOptions, options);
        this.parent = parent;
        var pg = new Playground(this.options, this.parent);
        this.playground = pg;
        this.canvas = pg.canvas;
        this.shoot = new Sound("audio/shoot.wav");
        this.bindMethods();
        this.newGame();
    }
    Game.prototype.bindMethods = function () {
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onNewFrame = this.onNewFrame.bind(this);
        this.onNewTargets = this.onNewTargets.bind(this);
    };
    Game.prototype.newGame = function () {
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
    };
    Game.prototype.stopGame = function () {
        var canvas = this.canvas;
        canvas.removeEventListener('mousemove', this.onMouseMove);
        canvas.removeEventListener('mousedown', this.onMouseDown);
        canvas.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
        clearInterval(this.frameId);
        clearInterval(this.targetsId);
        clearInterval(this.fireId);
    };
    Game.prototype.startFire = function () {
        if (this.fireId) {
            return;
        }
        var pg = this.playground;
        // Create first bullet
        pg.createBullet();
        this.shoot.play();
        // Create next bullets with interval
        clearInterval(this.fireId);
        this.fireId = setInterval(function () { return pg.createBullet(); }, this.options.delays.fire);
    };
    Game.prototype.stopFire = function () {
        clearInterval(this.fireId);
        this.fireId = null;
    };
    Game.prototype.onNewFrame = function () {
        var pg = this.playground, keys = this.keys;
        if (keys[Key.Left]) {
            pg.moveGunLeft();
        }
        else if (keys[Key.Right]) {
            pg.moveGunRight();
        }
        pg.draw();
        if (pg.gameOver) {
            this.stopGame();
        }
    };
    Game.prototype.onNewTargets = function () {
        this.playground.createTargets();
    };
    Game.prototype.onMouseMove = function (event) {
        this.playground.moveGunByMouse(event);
    };
    Game.prototype.onMouseDown = function (event) {
        this.startFire();
    };
    Game.prototype.onMouseUp = function (event) {
        this.stopFire();
    };
    Game.prototype.onKeyDown = function (event) {
        var key = event.keyCode || event.which;
        this.keys[key] = true;
        if (key === Key.Space || key === Key.Up) {
            this.startFire();
        }
    };
    Game.prototype.onKeyUp = function (event) {
        var key = event.keyCode || event.which;
        this.keys[key] = false;
        if (key === Key.Space || key === Key.Up) {
            this.stopFire();
        }
    };
    Game.prototype.destroy = function () {
        this.stopGame();
        this.playground.destroy();
    };
    Game.defaultOptions = {
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
            fillShield: 'red',
            fillRegular: 'green',
            life: { fill: 'white', max: 2 }
        },
        stats: { fill: 'black' },
        star: { fill: 'white' }
    };
    return Game;
})();
// Save constructor in global scope
window['ShootingRange'] = Game;
//# sourceMappingURL=Game.js.map