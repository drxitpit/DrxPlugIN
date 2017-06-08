// define canvas
var canvas = document.getElementById("drxCanvas");
var ctx = canvas.getContext("2d");

// define battery
var battery = new Image();
battery.onload = function () {
    ctx.drawImage(battery, 460, 177);
};
battery.src = "img/battery.png";

// define drx logo
var drx = new Image();
drx.onload = function () {
    ctx.drawImage(drx, 750, 450);
}
drx.src = "img/drxLogo.jpg";

var n = 240;
var allPoints = [];
var generator = new randomPointsGenerator(58, 54, 840, 300);
generator.generate(n, 440, 160, 90, 80);

var points = []
for (var i = 0; i < n; i++) {
    var point = new Point(generator.xs[i], generator.ys[i]);
    point.selectable = true;
    points.push(point);
}
var pathsGenerator = new pathsGenerator();
pathsGenerator.generate(bmwInput);
var paths = pathsGenerator.result;

var drawingContext = new DrawingContext(ctx);
drawingContext.init(points, paths);

var graph = new Graph();
graph.init(allPoints);
var dist = 0;
var edist = 0;
var userDist = 0;
for(var i = 0; i < 8; i++) {
    dist += graph.getDist(allPoints[n + i], allPoints[n + i + 1]);
    edist += helper.euclidianDistance(allPoints[n + i], allPoints[n + i + 1]);
    i++;
}
console.log(dist);
console.log(edist);


canvas.onclick = function (e) {
    var mousePos = helper.getMousePosition(canvas, e);
    drawingContext.selectPoint(mousePos.x, mousePos.y);
}
