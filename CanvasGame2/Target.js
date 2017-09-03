var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        switch (this.life) {
            case 4:
                ctx.fillStyle = opts.fillInvincible;
                break;
            case 3:
                ctx.fillStyle = opts.fillSuperShield;
                break;
            case 2:
                ctx.fillStyle = opts.fillShield;
                break;
            case 1:
                ctx.fillStyle = opts.fillRegular;
                break;
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
//# sourceMappingURL=Target.js.map