/**
 * Created by laure on 5/23/2017.
 */
function CustomFileReader() {
    var reader = new FileReader();
    this.result = null;
    reader.onload = function () {
        this.result = reader.result;
    }

    this.read = function (path) {
        reader.readAsText(path);
    }
}

function Param() {
    this.sx = 0;
    this.sy = 0;
    this.ex = 0;
    this.ey = 0;


}
