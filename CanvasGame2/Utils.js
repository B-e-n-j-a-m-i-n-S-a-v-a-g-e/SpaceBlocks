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
function checkCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=Utils.js.map