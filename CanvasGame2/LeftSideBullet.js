var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LeftSideBulletStatus;
(function (LeftSideBulletStatus) {
    LeftSideBulletStatus[LeftSideBulletStatus["None"] = 0] = "None";
    LeftSideBulletStatus[LeftSideBulletStatus["Miss"] = 1] = "Miss";
    LeftSideBulletStatus[LeftSideBulletStatus["Hit"] = 2] = "Hit";
})(LeftSideBulletStatus || (LeftSideBulletStatus = {}));
;
var LeftSideBullet = (function (_super) {
    __extends(LeftSideBullet, _super);
    function LeftSideBullet(ctx, x, y, radius, options) {
        _super.call(this, ctx, x, y);
        this.radius = radius;
        this.options = options;
        this.status = BulletStatus.None;
    }
    LeftSideBullet.prototype.draw = function () {
        var ctx = this.ctx, opts = this.options;
        ctx.fillStyle = opts.fill;
        ctx.beginPath();
        ctx.moveTo(this.x - 3, this.y + 7);
        ctx.lineTo(this.x - 3, this.y + 12);
        ctx.lineTo(this.x - 10, this.y + 17);
        ctx.lineTo(this.x - 3, this.y + 22);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    };
    return LeftSideBullet;
})(Component);
