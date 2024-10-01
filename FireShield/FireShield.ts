module FireShield {
    var nPlayers: number = 200;
    var fSize: number = 2.0;
    var fColor: number = 40.0;
    var aPlayers: FireShield.Player[] = [];
    var iHit: number = -1;
    var mousePress: boolean = false;
    var mouseDrag: boolean = true;


    init();
    Setup.addEventListener(EVENTTYPE.MOUSEDOWN, mousedown);
    Setup.addEventListener(EVENTTYPE.TOUCHSTART, mousedown);
    Setup.addEventListener(EVENTTYPE.MOUSEUP, mouseup);
    Setup.addEventListener(EVENTTYPE.TOUCHEND, mouseup);
    Setup.addEventListener(EVENTTYPE.MOUSEMOVE, mousemove);
    Setup.addEventListener(EVENTTYPE.TOUCHMOVE, mousemove);

    animate();

    function animate(): void {
        update();
        Setup.setTimeout(animate, 20);
    }

    function init(): void {
        Setup.size(800, 600);
        Setup.title("FireShield");
        var w: number = crc2.canvas.width;
        var h: number = crc2.canvas.height;

        // generate all player-objects
        for (var i: number = 0; i < nPlayers; i++) {
            console.count("Player");
            var player: FireShield.Player = new FireShield.Player(Math.random() * w, Math.random() * h);
            player.setTargetPos(player.posX, player.posY);
            aPlayers[i] = player;
        }

        // determine fire and shield for each player
        for (var i: number = 0; i < nPlayers; i++) {
            aPlayers[i].findFireAndShield(aPlayers);
        }

        //set color and size for each player
        for (var i: number = 0; i < nPlayers; i++) {
            aPlayers[i].calculateColorAndSize(fSize, fColor);
        }
    }

    function update(): void {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        for (var i: number = 0; i < nPlayers; i++) {
            aPlayers[i].move();
        }

        for (var i: number = 0; i < nPlayers; i++) {
            aPlayers[i].displayLine();
        }

        crc2.stroke();
        for (var i: number = 0; i < nPlayers; i++) {
            aPlayers[i].display();
            aPlayers[i].calculateTargetPosition();
        }
    }


    function mousedown(_event: MouseEvent): void {
        for (var i: number = nPlayers - 1; i >= 0; i--) {
            if (aPlayers[i].testHit(Setup.pointerX, Setup.pointerY)) {
                iHit = i;
                mousePress = true;
            }
        }
    }

    function mouseup(_event: MouseEvent): void {
        if (iHit > -1 && !mouseDrag) {
            aPlayers[iHit].toggleLock();
        }
        iHit = -1;
        mousePress = false;
        mouseDrag = false;
    }

    function mousemove(_event: MouseEvent): void {
        if (iHit > -1 && mousePress) {
            aPlayers[iHit].setPosition(Setup.pointerX, Setup.pointerY);
            aPlayers[iHit].bLock = true;
            mouseDrag = true;
        }
    }
}