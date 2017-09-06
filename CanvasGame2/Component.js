var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
