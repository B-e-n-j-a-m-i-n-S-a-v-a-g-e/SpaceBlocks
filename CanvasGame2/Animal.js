var Animal = (function () {
    function Animal(name, color, x, y, w, h) {
        this.name = name;
        this.color = color;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vx = 1;
        this.vy = 1;
    }
    Animal.prototype.getX = function () {
        return this.x;
    };
    Animal.prototype.setX = function (x) {
        this.x = x;
    };
    Animal.prototype.getY = function () {
        return this.y;
    };
    Animal.prototype.setY = function (y) {
        this.y = y;
    };
    Animal.prototype.getVX = function () {
        return this.vx;
    };
    Animal.prototype.setVX = function (newVx) {
        this.vx = newVx;
    };
    Animal.prototype.getVY = function () {
        return this.vy;
    };
    Animal.prototype.setVY = function (newVy) {
        this.vy = newVy;
    };
    Animal.prototype.getWidth = function () {
        return this.w;
    };
    Animal.prototype.getHeight = function () {
        return this.h;
    };
    Animal.prototype.getColor = function () {
        return this.color;
    };
    Animal.prototype.setColor = function (newColor) {
        this.color = newColor;
    };
    Animal.prototype.gainWeight = function (scale, maxWidth, maxHeight) {
        if (this.w < maxWidth && this.h < maxHeight) {
            this.w = this.h *= scale;
        }
    };
    Animal.prototype.loseWeight = function (scale, minWidth, minHeight) {
        if (this.w >= minWidth && this.h >= minHeight) {
            this.w = this.h *= -scale;
        }
    };
    Animal.prototype.plop = function (scale, maxPoint) {
        this.w = this.h *= scale;
        if (this.w >= maxPoint) {
            scale = 0.9;
        }
    };
    Animal.prototype.getName = function () {
        return this.name;
    };
    Animal.prototype.move = function (direction, amount) {
        switch (direction) {
            case Direction.UP:
                this.vy *= amount;
                break;
            case Direction.DOWN:
                this.vy *= amount;
                break;
            case Direction.LEFT:
                this.vx *= amount;
                break;
            case Direction.RIGHT:
                this.vx *= amount;
                break;
            default:
                throw new Error();
        }
    };
    Animal.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
    };
    return Animal;
})();
//# sourceMappingURL=Animal.js.map