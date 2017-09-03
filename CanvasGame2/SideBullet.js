var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SideBulletStatus;
(function (SideBulletStatus) {
    SideBulletStatus[SideBulletStatus["None"] = 0] = "None";
    SideBulletStatus[SideBulletStatus["Miss"] = 1] = "Miss";
    SideBulletStatus[SideBulletStatus["Hit"] = 2] = "Hit";
})(SideBulletStatus || (SideBulletStatus = {}));
;
var SideBullet = (function (_super) {
    __extends(SideBullet, _super);
    function SideBullet(ctx, x, y, radius, options) {
        _super.call(this, ctx, x, y);
        this.radius = radius;
        this.options = options;
        this.status = BulletStatus.None;
    }
    SideBullet.prototype.draw = function () {
        var ctx = this.ctx, opts = this.options;
        ctx.fillStyle = opts.fill;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - 5);
        ctx.lineTo(this.x - 10, this.y);
        ctx.lineTo(this.x, this.y + 5);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    };
    return SideBullet;
})(Component);
//# sourceMappingURL=SideBullet.js.map