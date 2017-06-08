/**
 *@author: Laurentiu
 */

function randomPointsGenerator(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xs = [];
    this.ys = [];

    this.generate = function (n, px, py, w, h) {
        while (true) {
            var crtX = getRandomInt(this.x, this.x + this.width);
            var crtY = getRandomInt(this.y, this.y + this.height);

            if (inside(crtX, crtY, px, py, w, h)) {
                continue;
            }

            var tooClose = false;
            for (var i = 0; i < this.xs.length; i++) {
                if (Math.abs(crtX - this.xs[i]) < 25 && Math.abs(crtY - this.ys[i]) < 25) {
                    tooClose = true;
                    break;
                }
            }

            if (tooClose) {
                continue;
            }

            this.xs.push(crtX);
            this.ys.push(crtY);

            if (this.xs.length == n) {
                break;
            }
        }
    }
}

function inside(x, y, sx, sy, w, h) {
    var ex = sx + w;
    var ey = sy + h;
    var xinside = sx < x && x < ex;
    var yinside = sy < y && y < ey;
    return xinside && yinside;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mean(y1, y2) {
    return Math.floor((y1 + y2) / 2);
}
