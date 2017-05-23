/**
 * Created by laure on 5/23/2017.
 */
var bmwInput = {
    fr : [457, 195, 40, 80, "#0000BB"],
    fl : [457, 215, 40, 325, "#BBBB00"],
    br : [513, 195, 918, 117, "#FFFF0C"],
    bl : [513, 215, 918, 288, "#4ACFC4"],
    result : [],
    generateResult : function () {
        this.result.push(this.fr);
        this.result.push(this.fl);
        this.result.push(this.br);
        this.result.push(this.bl);
    }
};

function pathsGenerator() {
    this.result = [];

    this.generate = function (input) {
        var test = [];
        input.generateResult();
        input.result.forEach(function (x) {
            test.push(new Path(x[0], x[1], x[2], x[3], x[4]));
        })
        this.result = test;
    }
}
