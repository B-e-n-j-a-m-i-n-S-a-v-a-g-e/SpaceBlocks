var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pig = (function (_super) {
    __extends(Pig, _super);
    function Pig() {
        _super.apply(this, arguments);
    }
    Pig.prototype.oink = function () {
        console.log("OINK!");
    };
    return Pig;
})(Animal);
//# sourceMappingURL=Pig.js.map