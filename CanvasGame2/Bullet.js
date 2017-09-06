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
        ctx.moveTo(this.x, this.y - 10);
        ctx.lineTo(this.x - 5, this.y - 10);
        ctx.lineTo(this.x, this.y - 20);
        ctx.lineTo(this.x + 5, this.y - 10);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    };
    return Bullet;
})(Component);
