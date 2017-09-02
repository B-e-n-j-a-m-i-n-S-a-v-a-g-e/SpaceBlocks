var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BulletStatus;
(function (BulletStatus) {
    BulletStatus[BulletStatus["None"] = 0] = "None";
    BulletStatus[BulletStatus["Miss"] = 1] = "Miss";
    BulletStatus[BulletStatus["Hit"] = 2] = "Hit";
})(BulletStatus || (BulletStatus = {}));
;
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(ctx, x, y, radius, options) {
        _super.call(this, ctx, x, y);
        this.radius = radius;
        this.options = options;
        this.status = BulletStatus.None;
    }
    Bullet.prototype.draw = function () {
        var ctx = this.ctx, opts = this.options;
        ctx.fillStyle = opts.fill;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 5, this.y);
        ctx.lineTo(this.x, this.y - 10);
        ctx.lineTo(this.x + 5, this.y);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    };
    return Bullet;
})(Component);
var Component = (function () {
    function Component(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
    }
    return Component;
})();
var RectComponent = (function (_super) {
    __extends(RectComponent, _super);
    function RectComponent(ctx, x, y, width, height) {
        _super.call(this, ctx, x, y);
        this.width = width;
        this.height = height;
    }
    return RectComponent;
})(Component);
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
var Gun = (function (_super) {
    __extends(Gun, _super);
    function Gun(ctx, x, y, width, height, options) {
        _super.call(this, ctx, x, y, width, height);
        this.options = options;
    }
    Gun.prototype.draw = function () {
        var opts = this.options, ctx = this.ctx;
        ctx.fillStyle = opts.fill;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (opts.aim) {
            this.drawAim();
        }
    };
    Gun.prototype.drawAim = function () {
        var ctx = this.ctx, opts = this.options, x = Math.round(this.x + this.width / 2);
        ctx.save();
        ctx.strokeStyle = opts.fill;
        ctx.setLineDash([12, 12]);
        ctx.beginPath();
        ctx.moveTo(x, this.y);
        ctx.lineTo(x, 0);
        ctx.stroke();
        ctx.restore();
    };
    return Gun;
})(RectComponent);
var Playground = (function () {
    function Playground(options, parent) {
        this.options = options;
        this.parent = parent;
        this.createStats = function () {
            var x = perOfNum(2, this.width), y = perOfNum(95, this.height), fontSize = perOfNum(2.5, this.height);
            this.stats = new Stats(this.ctx, x, y, fontSize, this.options.stats);
        };
        this.width = options.screen.width;
        this.height = options.screen.height;
        this.gunStep = perOfNum(1.7, this.width);
        this.bulletStep = perOfNum(2, this.height);
        this.bulletAccel = 1.1;
        this.starStep = perOfNum(4, this.height);
        this.createCanvas();
        this.createStats();
        this.createGun();
        this.createStars();
    }
    Playground.prototype.newGame = function () {
        this.gameOver = false;
        this.bullets = [];
        this.bulletsLen = 0;
        this.targets = [];
        this.targetsLen = 0;
        this.closestTarget = null;
        this.stars = [];
        this.starsLen = 0;
        this.stats.update(0, 0, 0);
        this.createTargets();
    };
    Playground.prototype.createCanvas = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.parent.appendChild(canvas);
        this.canvasRect = canvas.getBoundingClientRect();
    };
    Playground.prototype.createGun = function () {
        var stats = this.stats;
        var width = perOfNum(6, this.width), height = perOfNum(6, this.width), x = Math.round((this.width / 2) - (width / 2)), y = Math.round(stats.y - stats.fontSize - height);
        this.gun = new Gun(this.ctx, x, y, width, height, this.options.gun);
    };
    Playground.prototype.createBullet = function () {
        var gun = this.gun, bullets = this.bullets;
        var x = gun.x + gun.width / 2, y = gun.y, radius = perOfNum(1, this.width);
        bullets.push(new Bullet(this.ctx, x, y, radius, this.options.bullet));
        this.bulletsLen = bullets.length;
    };
    Playground.prototype.createStars = function () {
        /*     let stars = this.stars,
                 starsLen = this.starsLen;
     
             let x = Math.random() * this.width,
                 y = Math.random() * this.height,
                 radius = perOfNum(1, this.width);
     
             console.log(this.stars);
     
             for (let i = 0; i < 100; ++i) {
                 stars.push(
                     new Star(this.ctx, x, y, radius, this.options.star)
                 );
             } */
    };
    Playground.prototype.createTargets = function () {
        var targets = this.targets, targetsLen = this.targetsLen, targetsInRow = 12;
        var gap = perOfNum(1.8, this.width), size = Math.round((this.width - gap) / targetsInRow), x = gap, y = gap, width = size - gap, height = size - gap;
        // Shift down old targets
        for (var i = 0, target = void 0; i < targetsLen; ++i) {
            target = targets[i];
            if (target.active()) {
                target.y = (target.y + target.height + gap);
                target.draw();
            }
        }
        // Add new targets
        for (var i = 0; i < targetsInRow; ++i) {
            targets.push(new Target(this.ctx, x, y, width, height, this.options.target));
            x += (width + gap);
        }
        this.targetsLen = targets.length;
    };
    Playground.prototype.clear = function () {
        this.ctx.fillStyle = this.options.bg.fill;
        this.ctx.fillRect(0, 0, this.width, this.height);
    };
    Playground.prototype.draw = function () {
        this.clear();
        this.drawGun();
        this.drawBullets();
        this.drawTargets();
        this.drawStats();
        this.drawStars();
        this.checkGameOver();
        if (this.gameOver) {
            this.drawGameOver();
        }
    };
    Playground.prototype.drawGun = function () {
        this.gun.draw();
    };
    Playground.prototype.drawBullets = function () {
        var bullets = this.bullets, bulletsLen = this.bulletsLen;
        var bullet, bulletStep = this.bulletStep, bulletAccel = this.bulletAccel;
        for (var i = 0; i < bulletsLen; ++i) {
            bullet = bullets[i];
            // Skip bullets with status Hit or Miss
            if (bullet.status === BulletStatus.Hit ||
                bullet.status === BulletStatus.Miss) {
                continue;
            }
            // Set bullet status to Miss if bullet out of canvas
            if (bullet.y + bullet.radius <= 0) {
                bullet.status = BulletStatus.Miss;
                continue;
            }
            // Move and draw bullet
            bullet.y -= bulletStep;
            bulletStep *= 1.1;
            bullet.draw();
        }
    };
    Playground.prototype.drawTargets = function () {
        var targets = this.targets, targetsLen = this.targetsLen, target;
        var bullets = this.bullets, bulletsLen = this.bulletsLen, bullet;
        var closestTarget = targets[0];
        for (var i = 0; i < targetsLen; ++i) {
            target = targets[i];
            // Skip inactive targets
            if (!target.active()) {
                continue;
            }
            // Check if bullet hit target
            for (var j = 0; j < bulletsLen; ++j) {
                bullet = bullets[j];
                if (target.hitByBullet(bullet)) {
                    --target.life;
                    bullet.status = BulletStatus.Hit;
                    break;
                }
            }
            // Draw active targets and save closest target
            if (target.active()) {
                target.draw();
                if (target.y + target.height > closestTarget.y + closestTarget.height) {
                    closestTarget = target;
                }
            }
        }
        this.closestTarget = closestTarget;
    };
    Playground.prototype.drawStars = function () {
        var stars = this.stars, starsLen = this.starsLen, star;
        for (var i = 0; i < starsLen; ++i) {
            // Move and draw bullet
            star.y -= this.starStep;
            star.draw();
        }
    };
    Playground.prototype.drawStats = function () {
        var bullets = this.bullets, bulletsLen = this.bulletsLen, bulletStatus;
        var stats = this.stats, hits = 0, miss = 0;
        for (var i = 0; i < bulletsLen; ++i) {
            bulletStatus = bullets[i].status;
            if (bulletStatus === BulletStatus.Hit) {
                ++hits;
            }
            else if (bulletStatus === BulletStatus.Miss) {
                ++miss;
            }
        }
        stats.update(bulletsLen, hits, miss);
        stats.draw();
    };
    Playground.prototype.drawGameOver = function () {
        var ctx = this.ctx;
        ctx.save();
        // Transparent cover
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);
        // Game over text
        var fontSize = this.width * 0.1;
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.font = fontSize + 'px sans-serif';
        ctx.fillText('Game Over', this.width / 2, this.height / 2);
        // Stats text
        fontSize /= 3;
        ctx.textBaseline = 'top';
        ctx.font = fontSize + 'px sans-serif';
        ctx.fillText(this.stats.text, this.width / 2, this.height / 2);
        ctx.restore();
    };
    Playground.prototype.checkGameOver = function () {
        var closest = this.closestTarget;
        this.gameOver = (closest && closest.y + closest.height >= this.gun.y);
    };
    Playground.prototype.moveGun = function (x) {
        var gun = this.gun, xMin = 0, xMax = this.width - gun.width;
        if (x < xMin) {
            x = xMin;
        }
        else if (x > xMax) {
            x = xMax;
        }
        gun.x = x;
    };
    Playground.prototype.moveGunByMouse = function (event) {
        this.moveGun(event.clientX - this.canvasRect.left - this.gun.width / 2);
    };
    Playground.prototype.moveGunRight = function () {
        this.moveGun(this.gun.x + this.gunStep);
    };
    Playground.prototype.moveGunLeft = function () {
        this.moveGun(this.gun.x - this.gunStep);
    };
    Playground.prototype.destroy = function () {
        this.parent.removeChild(this.canvas);
    };
    return Playground;
})();
var Star = (function (_super) {
    __extends(Star, _super);
    function Star(ctx, x, y, radius, options) {
        _super.call(this, ctx, x, y);
        this.radius = radius;
        this.options = options;
    }
    Star.prototype.draw = function () {
        var ctx = this.ctx, opts = this.options;
        ctx.fillStyle = opts.fill;
        ctx.fillStyle = opts.fill;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    };
    return Star;
})(Component);
var Stats = (function (_super) {
    __extends(Stats, _super);
    function Stats(ctx, x, y, fontSize, options) {
        _super.call(this, ctx, x, y);
        this.fontSize = fontSize;
        this.options = options;
        this.update(0, 0, 0);
    }
    Stats.prototype.update = function (shoots, hits, miss) {
        this.text = "Shoots: " + shoots + " / Hits: " + hits + " / Miss: " + miss;
    };
    Stats.prototype.draw = function () {
        var ctx = this.ctx, opts = this.options;
        ctx.font = this.fontSize + "px sans-serif";
        ctx.fillStyle = opts.fill;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'start';
        ctx.fillText(this.text, this.x, this.y);
    };
    return Stats;
})(Component);
var TargetOptions = (function () {
    function TargetOptions() {
    }
    return TargetOptions;
})();
var Target = (function (_super) {
    __extends(Target, _super);
    function Target(ctx, x, y, width, height, options) {
        _super.call(this, ctx, x, y, width, height);
        this.options = options;
        this.life = randomNum(1, options.life.max);
    }
    Target.prototype.draw = function () {
        var ctx = this.ctx, opts = this.options;
        if (this.life > 1) {
            ctx.fillStyle = opts.fillShield;
        }
        else if (this.life == 1) {
            ctx.fillStyle = opts.fillRegular;
        }
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    Target.prototype.active = function () {
        return this.life > 0;
    };
    Target.prototype.hitByBullet = function (bullet) {
        if (bullet.status !== BulletStatus.None) {
            return false;
        }
        var tLeft = this.x, tRight = this.x + this.width, tBottom = this.y + this.height;
        var bLeft = bullet.x - bullet.radius, bRight = bullet.x + bullet.radius, bTop = bullet.y - bullet.radius;
        return (bTop <= tBottom &&
            ((bLeft >= tLeft && bLeft <= tRight) ||
                (bRight >= tLeft && bRight <= tRight)));
    };
    return Target;
})(RectComponent);
function perOfNum(per, num) {
    return Math.round(per * num / 100);
}
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function merge(target) {
    var objs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objs[_i - 1] = arguments[_i];
    }
    var obj, prop, val;
    for (var i = 0; i < objs.length; ++i) {
        obj = objs[i];
        for (prop in obj) {
            val = obj[prop];
            if (typeof val === 'object') {
                if (typeof target[prop] !== 'object') {
                    target[prop] = {};
                }
                merge(target[prop], val);
            }
            else {
                target[prop] = val;
            }
        }
    }
    return target;
}
//# sourceMappingURL=app.js.map