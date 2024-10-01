module GameOfLife {
    Setup.title("GameOfLife");
    var sizeCell: number = 10;
    var nCellsX: number = 100;
    var nCellsY: number = 60;
    Setup.size(nCellsX * sizeCell, nCellsY * sizeCell);
    var stateCurrent: boolean[][] = [[]];
    var stateNext: boolean[][] = [[]];
    var timeslice: number = 200;


    var stepper: HTMLInputElement = <HTMLInputElement>document.getElementById("stepper");
    var color: HTMLInputElement = <HTMLInputElement>document.getElementById("color");
    stepper.addEventListener("mousedown", Setup.stopPropagation);
    stepper.addEventListener("keydown", Setup.stopPropagation);
    stepper.addEventListener("change", change);

    function change(_event: Event): void {
        setFrameRate(stepper.valueAsNumber);
    }

    init();
    setFrameRate(stepper.valueAsNumber);

    function setFrameRate(_fps: number): void {
        timeslice = (_fps > 0) ? 1000 / _fps : 1000000;
        Setup.clearTimeout();
        nextGeneration();
    }

    function nextGeneration(): void {
        next();
        swapArrays();
        draw();

        Setup.setTimeout(nextGeneration, timeslice);
    }


    function init(): void {
        for (var x: number = 0; x < nCellsX; x++) {
            stateCurrent[x] = [];
            stateNext[x] = [];
            if (x != 0 && x != nCellsX - 1) {
                for (var y: number = 1; y < nCellsY - 1; y++) {
                    if (Math.random() > 0.5)
                        stateCurrent[x][y] = true;
                }
            }
        }
    }

    function draw(): void {
        crc2.fillStyle = "black"; //'#808080';
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        for (var x: number = 0; x < nCellsX; x++) {
            for (var y: number = 0; y < nCellsY; y++) {
                if (stateCurrent[x][y]) {
                    var c: string = "#ffffff";
                    if (color.checked)
                        c = "hsl(" + y * (360 / nCellsY) + ",100%," + (20 + x * 80 / nCellsX) + "%)";
                    crc2.fillStyle = c;
                    crc2.fillRect(1 + x * sizeCell, 1 + y * sizeCell, sizeCell - 2, sizeCell - 2);
                }
            }
        }
    }

    function next(): void {
        for (var x: number = 1; x < nCellsX - 1; x++) {
            for (var y: number = 1; y < nCellsY - 1; y++) {
                var countCell: number = 0;
                for (var tx: number = -1; tx <= 1; tx++) {
                    for (var ty: number = -1; ty <= 1; ty++) {
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

    function swapArrays(): void {
        var temp: boolean[][] = stateCurrent;
        stateCurrent = stateNext;
        stateNext = temp;
    }
}