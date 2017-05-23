/**
 * Created by laur on 5/23/2017.
 */

/**
 *
 * @param ctx the context
 * @constructor
 */
function DrawingContext(ctx) {
    this.ctx = ctx;
    this.points = [];
    this.paths = [];
    this.gameOver = false;
    var noPathsCompleted = 0;
    var currentPath = null;
    var selectablePoints = [];

    this.init = function (points, paths) {
        this.points = points;
        this.paths = paths;
        points.forEach(function (point) {
            point.draw(this.ctx, "#000000")
        });
        paths.forEach(function (path) {
            path.init(this.ctx)
        });
    };

    this.selectPoint = function (x, y) {
        if (currentPath === null) {
            handleNullPath.call(this, x, y);
        }
        else {
            handleCurrentPath.call(this, x, y);
        }
    };

    var getClosePoints = function (point, radius) {
        var result = [];
        for (var i = 0; i < this.points.length; i++) {
            if (helper.checkFoundPoint(point.x, point.y, this.points[i].x, this.points[i].y, radius) && this.points[i].selectable) {
                result.push(this.points[i]);
            }
        }
        return result;
    };

    function handleNullPath(x, y) {
        for (var i = 0; i < this.paths.length; i++) {
            if (this.paths[i].canStart(x, y)) {
                currentPath = this.paths[i];
                break;
            }
        }
        if (currentPath !== null) {
            var closePoints = getClosePoints(currentPath.start, 60);
            closePoints.forEach(function (p) {
                p.draw(this.ctx, "#FF0000")
            });
            selectablePoints = closePoints;
        }
    }


    function handleCurrentPath(x, y) {
        var path = currentPath;
        var closePoints = getClosePoints(new Point(x, y), 10);

        var point = (closePoints.length > 0) ? closePoints[0] : null;
        if (point !== null && selectablePoints.indexOf(point) >= 0) {
            selectablePoints.forEach(function (p) {
                p.draw(this.ctx, "#000000");
            });
            path.drawNextPoint(this.ctx, point);
            selectablePoints = getClosePoints(currentPath.crtPoint, 60);
            selectablePoints.forEach(function (p) {
                p.draw(this.ctx, "#FF0000")
            });
        }
        else {
            var isFinish = path.checkFinish(x, y);
            if (isFinish) {
                selectablePoints.forEach(function (p) {
                    p.draw(this.ctx, "#000000");
                });
                path.drawNextPoint(ctx, new Point(x, y))
            }
        }
        if (path.isCompleted) {
            path.showCompleted(this.ctx);
            noPathsCompleted++;
            currentPath = null;
        }
        if (noPathsCompleted === this.paths.length) {
            console.log(userDist)
            this.gameOver = true;
        }
    }
}

function Path(sx, sy, ex, ey, fillStyle) {
    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
    this.fillStyle = fillStyle;
    this.isCompleted = false;
    this.start = null;
    this.crtPoint = null;
    var end = null;

    this.init = function (ctx) {
        this.start = new Point(this.sx, this.sy);
        end = new Point(this.ex, this.ey);
        this.start.draw(ctx, this.fillStyle);
        end.draw(ctx, this.fillStyle);
    };

    this.canStart = function (x, y) {

        if (this.start === null || this.isCompleted) return false;

        return helper.checkFoundPoint(x, y, this.start.x, this.start.y, 10);
    };

    this.drawNextPoint = function (ctx, point) {
        if (this.crtPoint === null) {
            this.crtPoint = this.start;
        }
        else {
            if (point.equalEps(end)) {
                this.isCompleted = true;
                point = end;
            }
            var line = new Line(this.crtPoint, point);
            line.draw(ctx, this.fillStyle);
            point.draw(ctx, this.fillStyle);
            point.selectable = false;
            this.crtPoint = point;

        }
    };

    this.checkFinish = function (x, y) {
        if (helper.euclidianDistance(this.crtPoint, end) > 60) return false;
        return helper.closeEps(new Point(x, y), end, 10);
    };

    this.showCompleted = function (ctx) {
        graph.getPath(this.start, end, ctx);
        DrawingHelper(this.ey, ctx);
    }
}

function Point(x, y) {
    this.x = x;
    this.y = y;
    this.selectable = true;
    this.draw = function (ctx, fillStyle) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4.5, 0, 2 * Math.PI);
        if (fillStyle !== null) {
            ctx.fillStyle = fillStyle;
        }
        ctx.closePath();
        ctx.fill();
        if(allPoints.indexOf(this) == -1) allPoints.push(this);
    };

    this.equalEps = function (p) {
        return helper.closeEps(p, this, 10);
    }
}

function Line(start, end) {
    this.start = start;
    this.end = end;
    this.skip = false;
    this.draw = function (ctx, fillStyle) {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        if (fillStyle !== null) {
            ctx.strokeStyle = fillStyle;
        }
        ctx.stroke();
        if(!this.skip) {
            userDist += helper.euclidianDistance(this.start, this.end);
        }
    }
}

function DrawingHelper(ey, ctx) {
    if (ey === 80 || ey === 325) {
        var dy1 = 3;
        var dy2 = 5;
        var y1 = ey === 80 ? 60 : 305;
        var y2 = ey === 80 ? 50 : 295;
        for (var i = 0; i < 10; i++) {
            var p1 = new Point(32, y1 + i * dy1);
            var p2 = new Point(12, y2 + i * dy2);
            var line = new Line(p1, p2);
            line.skip = true;
            line.draw(ctx, "#FFFF00");
        }
    }
    else {
        var y = ey === 117 ? 107 : 278;
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(928, y, 10, 20);
    }
}

