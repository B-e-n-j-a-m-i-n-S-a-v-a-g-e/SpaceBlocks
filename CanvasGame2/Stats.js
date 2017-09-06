var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
