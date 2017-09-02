function perOfNum(per, num) {
    return Math.round(per * num / 100);
}
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function merge(target) {
    var objs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objs[_i - 1] = arguments[_i];
    }
    var obj, prop, val;
    for (var i = 0; i < objs.length; ++i) {
        obj = objs[i];
        for (prop in obj) {
            val = obj[prop];
            if (typeof val === 'object') {
                if (typeof target[prop] !== 'object') {
                    target[prop] = {};
                }
                merge(target[prop], val);
            }
            else {
                target[prop] = val;
            }
        }
    }
    return target;
}
//# sourceMappingURL=Utils.js.map