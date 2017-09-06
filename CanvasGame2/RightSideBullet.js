var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RightSideBulletStatus;
(function (RightSideBulletStatus) {
    RightSideBulletStatus[RightSideBulletStatus["None"] = 0] = "None";
    RightSideBulletStatus[RightSideBulletStatus["Miss"] = 1] = "Miss";
    RightSideBulletStatus[RightSideBulletStatus["Hit"] = 2] = "Hit";
})(RightSideBulletStatus || (RightSideBulletStatus = {}));
;
var RightSideBullet = (function (_super) {
    __extends(RightSideBullet, _super);
    function RightSideBullet(ctx, x, y, radius, options) {
        _super.call(this, ctx, x, y);
        this.radius = radius;
        this.options = options;
        this.status = BulletStatus.None;
    }
    RightSideBullet.prototype.draw = function () {
        var ctx = this.ctx, opts = this.options;
        ctx.fillStyle = opts.fill;
        ctx.beginPath();
        ctx.moveTo(this.x + 7, this.y + 7);
        ctx.lineTo(this.x + 7, this.y + 12);
        ctx.lineTo(this.x + 17, this.y + 17);
        ctx.lineTo(this.x + 7, this.y + 22);
        ctx.closePath();
        ctx.closePath();
        ctx.fill();
    };
    return RightSideBullet;
})(Component);
