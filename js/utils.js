/**
 * Created by laure on 5/23/2017.
 */
function CustomFileReader() {
    var reader = new FileReader();
    this.result = null;
    reader.addEventListener("loadend", function () {

    });

    this.read = function (path) {
        var file = new File(path);
        reader.readAsText(file);
    }
}

function Param() {
    this.sx = 0;
    this.sy = 0;
    this.ex = 0;
    this.ey = 0;


}
