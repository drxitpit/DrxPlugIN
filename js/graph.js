/**
 * Created by laure on 5/23/2017.
 */

function graph(V) {
    var inf = 1000000;
    var nodes = [];
    var edges = []
    var n = 0;
    var dist = [];

    this.init = function (V) {
        this.nodes = V;
        n = V.length;
        for (var i = 0; i < n; i++) {
            dist.push([]);
            for (var j = 0; j < n; j++) {
                var w = helper.euclidianDistance(V[i], V[j]);
                if (w < 60) {
                    dist[i].push(w);
                }
                else {
                    dist[i].push(inf);
                }
            }
        }

        for (var k = 0; k < n; k++)
            for (var i = 0; i < n; i++)
                for (var j = 0; j < n; j++)
                    if (dist[i][j] > dist[i][k] + dist[k][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
    }

    function getDist(p, q) {

    }
}


function vertex(x, y) {

}
