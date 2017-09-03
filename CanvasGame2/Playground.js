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
        this.bing = new Sound("audio/bing.wav");
        this.explode = new Sound("audio/explode.wav");
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
                    //If target is invincible
                    if (target.life <= 1) {
                        this.explode.play();
                        --target.life;
                    }
                    else {
                        this.bing.play();
                        if (target.life !== 4) {
                            --target.life;
                        }
                    }
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
        for (var i = 0; i < this.targets.length; i++) {
            if (checkCollision(this.targets[i], this.gun)) {
                this.gameOver = true;
            }
        }
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
//# sourceMappingURL=Playground.js.map