var canvas;
var context;
var animal;
var zooNode;
var nodes;
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["DOWN"] = 1] = "DOWN";
    Direction[Direction["LEFT"] = 2] = "LEFT";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
})(Direction || (Direction = {}));
;
init();
function init() {
    canvas = document.getElementById("theCanvas");
    context = canvas.getContext("2d");
    nodes = [];
    animal = new Animal("Kirby", "#ff0000", 100, 100, 10, 10);
    for (var i = 0; i < 10; i++) {
        nodes.push(new ZooNode(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height)));
    }
    update();
}
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    render();
    window.setTimeout(update, 30);
}
function render() {
    context.fillStyle = animal.getColor();
    context.fillRect(animal.getX(), animal.getY(), animal.getWidth(), animal.getHeight());
    animal.setVY(0);
    animal.update();
    animal.move(Direction.RIGHT, 1);
    animal.setVX(2);
    context.fillStyle = "#000";
    for (var i = 0; i < nodes.length; i++) {
        context.fillRect(nodes[i].x, nodes[i].y, 10, 10);
    }
}
//# sourceMappingURL=app.js.map