/**
 * Created by laure on 6/7/2017.
 */

function drawer(context, vRadius) {
    var ctx = ctx;
    var radius = vRadius;
    var elem = null;
    var style = null;

    this.draw = function(element, fillStyle) {
        elem = element;
        style = fillStyle;
        if(element instanceof vertex) {
            drawVertex();
        }
        else if(element instanceof edge) {
            drawEdge();
        }
        else{}
    };

    var drawVertex = function() {
        ctx.beginPath();
        ctx.arc(e.x, e.y, radius, 0, 2 * Math.PI);
        if (style !== null) {
            ctx.fillStyle = style;
        }
        ctx.closePath();
        ctx.fill();
    }

    var drawEdge = function () {
        ctx.beginPath();
        ctx.moveTo(elem.v1.x, elem.v1.y);
        ctx.lineTo(elem.v2.x, elem.v2.y);
        if (style !== null) {
            ctx.strokeStyle = style;
        }
        ctx.stroke();
    }
}
