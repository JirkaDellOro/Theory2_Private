var GameOfLife;
(function (GameOfLife) {
    Setup.title("GameOfLife");
    var sizeCell = 10;
    var nCellsX = 100;
    var nCellsY = 60;
    Setup.size(nCellsX * sizeCell, nCellsY * sizeCell);
    var stateCurrent = [[]];
    var stateNext = [[]];
    var timeslice = 200;
    var stepper = document.getElementById("stepper");
    var color = document.getElementById("color");
    stepper.addEventListener("mousedown", Setup.stopPropagation);
    stepper.addEventListener("keydown", Setup.stopPropagation);
    stepper.addEventListener("change", change);
    function change(_event) {
        setFrameRate(stepper.valueAsNumber);
    }
    init();
    setFrameRate(stepper.valueAsNumber);
    function setFrameRate(_fps) {
        timeslice = (_fps > 0) ? 1000 / _fps : 1000000;
        Setup.clearTimeout();
        nextGeneration();
    }
    function nextGeneration() {
        next();
        swapArrays();
        draw();
        Setup.setTimeout(nextGeneration, timeslice);
    }
    function init() {
        for (var x = 0; x < nCellsX; x++) {
            stateCurrent[x] = [];
            stateNext[x] = [];
            if (x != 0 && x != nCellsX - 1) {
                for (var y = 1; y < nCellsY - 1; y++) {
                    if (Math.random() > 0.5)
                        stateCurrent[x][y] = true;
                }
            }
        }
    }
    function draw() {
        crc2.fillStyle = "black"; //'#808080';
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        for (var x = 0; x < nCellsX; x++) {
            for (var y = 0; y < nCellsY; y++) {
                if (stateCurrent[x][y]) {
                    var c = "#ffffff";
                    if (color.checked)
                        c = "hsl(" + y * (360 / nCellsY) + ",100%," + (20 + x * 80 / nCellsX) + "%)";
                    crc2.fillStyle = c;
                    crc2.fillRect(1 + x * sizeCell, 1 + y * sizeCell, sizeCell - 2, sizeCell - 2);
                }
            }
        }
    }
    function next() {
        for (var x = 1; x < nCellsX - 1; x++) {
            for (var y = 1; y < nCellsY - 1; y++) {
                var countCell = 0;
                for (var tx = -1; tx <= 1; tx++) {
                    for (var ty = -1; ty <= 1; ty++) {
                        countCell += (stateCurrent[x + tx][y + ty] && !(tx == 0 && ty == 0) ? 1 : 0);
                    }
                }
                stateNext[x][y] = stateCurrent[x][y];
                if (stateCurrent[x][y]) {
                    if (countCell < 2 || countCell > 3)
                        stateNext[x][y] = false;
                }
                else {
                    if (countCell == 3)
                        stateNext[x][y] = true;
                }
            }
        }
    }
    function swapArrays() {
        var temp = stateCurrent;
        stateCurrent = stateNext;
        stateNext = temp;
    }
})(GameOfLife || (GameOfLife = {}));
//# sourceMappingURL=GameOfLife.js.map