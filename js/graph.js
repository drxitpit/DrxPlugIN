/**
 * Created by laure on 5/23/2017.
 */

function Graph() {
    var inf = 1000000;
    var n = 0;
    var dist = [];
    var next = [];
    this.points = [];

    this.init = function (V) {
        this.points = V;
        n = V.length;
        for (var i = 0; i < n; i++) {
            dist.push([]);
            next.push([]);
            for (var j = 0; j < n; j++) {
                var w = helper.euclidianDistance(V[i], V[j]);
                if (w < 60) {
                    dist[i].push(w);
                    next[i].push(j);
                }
                else {
                    dist[i].push(inf);
                    next[i].push(null);
                }
            }
        }

        for (var k = 0; k < n; k++)
            for (var i = 0; i < n; i++)
                for (var j = 0; j < n; j++)
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next[i][j] = next[i][k];
                    }
    }

    this.getDist = function (p, q) {
        var i = this.points.indexOf(p);
        var j = this.points.indexOf(q);
        return dist[i][j];
    }

    this.getPath = function (p, q, ctx) {
        var i = this.points.indexOf(p);
        var j = this.points.indexOf(q);
        var path = reconstruct(i, j);
        for(var i = 0; i < path.length-1; i++) {
            var p1 = this.points[path[i]];
            var p2 = this.points[path[i+1]];
            var line = new Line(p1, p2);
            line.skip = true;
            line.draw(ctx, "#00FF00");
        }
    }

    var reconstruct = function(i, j) {
        if(next[i][j] == null) {
            return [];
        }
        var path = [i];
        while(i != j) {
            i = next[i][j];
            path.push(i);
        }
        return path;
    }
}


function vertex(x, y) {

}
