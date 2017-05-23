/**
 * Created by tl01800941 on 5/23/2017.
 */

var helper = {
    getMousePosition: function (canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    },
    checkFoundPoint: function (x1, y1, x2, y2, radius) {
        var dist = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
        return dist < radius * radius;
    },

    manhattanDistance: function (p, q) {
        return Math.abs(p.x - q.x) + Math.abs(p.y - q.y);
    },

    euclidianDistance: function (p, q) {
        return Math.sqrt((p.x - q.x) * (p.x - q.x) + (p.y - q.y) * (p.y - q.y));
    },

    closeEps: function (p, q, eps) {
        return helper.manhattanDistance(p, q) < eps;
    }
}
