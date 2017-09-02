var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
//# sourceMappingURL=Gun.js.map