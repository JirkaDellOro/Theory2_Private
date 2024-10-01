module LanchestersLaw {
    import V = Vector2D;
    var nRed: number = 0;
    var nBlue: number = 0;
    var aUnits: Unit[] = new Array();
    var fighting: boolean = false;
    var iDragging: number = -1;


    Setup.size(800, 600);
    Setup.title("LanchestersLaw");
    Setup.addEventListener(EVENTTYPE.MOUSEDOWN, mousedown);
    Setup.addEventListener(EVENTTYPE.MOUSEUP, mouseup);
    Setup.addEventListener(EVENTTYPE.MOUSEMOVE, mousemove);

    function mousedown(_event: MouseEvent): void {
        for (var i in aUnits) {
            if (aUnits[i].testHit(Setup.pointerX, Setup.pointerY)) {
                iDragging = i;
            }
        }
    }

    function mouseup(_event: MouseEvent): void {
        console.log("up");
        iDragging = -1;
    }

    function mousemove(_event: MouseEvent): void {
        console.log("move");
        if (iDragging > -1) {
            aUnits[iDragging].setPosition(new V.Vector2D(Setup.pointerX, Setup.pointerY));
            displayUnits();
        }
    }

    export function startFight(_powerRed: number, _powerBlue: number): void {
        for (var i in aUnits) {
            var unit: Unit = aUnits[i];
            unit.setPower((unit.getParty() == PARTY.RED) ? _powerRed : _powerBlue);
            unit.setHealth(1);
        }
        fighting = true;
        animate();
    }

    function animate(): void {
        if (fighting) {
            fighting = fight();
            Setup.setTimeout(animate, 20);
            if (!fighting) {
                showResult();
            }
        }
    }

    function showResult(): void {
        var remain: number[] = new Array(0, 0, 0);
        var health: number[] = new Array(0, 0, 0);
        for (var i in aUnits) {
            var unit: Unit = aUnits[i];
            remain[unit.getParty()] += 1;
            health[unit.getParty()] += unit.getHealth();
        }
        var lossRed: number = (nRed - health[PARTY.RED]) / nRed;
        var lossBlue: number = (nBlue - health[PARTY.BLUE]) / nBlue;
        addResultText("Avg. Loss Red:  " + (lossRed).toFixed(2) + "\n");
        addResultText("Avg. Loss Blue: " + (lossBlue).toFixed(2) + "\n");
        addResultText("Ratio: " + (lossBlue / lossRed).toFixed(2) + " <-> " + (lossRed / lossBlue).toFixed(2) + "\n");
    }

    function displayUnits(): void {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        for (var i in aUnits) {
            aUnits[i].display();
        }
    }

    export function arrangeUnits(_nRed: number, _nBlue: number, _arrange: string): void {
        nRed = _nRed;
        nBlue = _nBlue;
        fighting = false;
        aUnits = [];
        var w: number = crc2.canvas.width;
        var h: number = crc2.canvas.height;

        var p: V.Vector2D;

        // generate red units
        for (var i: number = 0; i < _nRed; i++) {
            switch (_arrange) {
                case "T-Pose":
                case "Parallel": p = new V.Vector2D((i + 0.5) * w / _nRed, 20); break;
                case "Circular":
                    var angle: number = 2 * i * Math.PI / _nRed;
                    p = new V.Vector2D(0.5 * (w + (h - 20) * Math.cos(angle)), 0.5 * (h + (h - 20) * Math.sin(angle)));
                    break;
                default: p = new V.Vector2D(Math.random() * w, Math.random() * h); break;
            }
            var unit: Unit = new Unit(PARTY.RED, p);
            aUnits.push(unit);
        }
        // generate blue units
        for (var i: number = 0; i < _nBlue; i++) {
            switch (_arrange) {
                case "Parallel": p = new V.Vector2D((i + 0.5) * w / _nBlue, h - 20); break;
                case "T-Pose": p = new V.Vector2D(1 + w / 2, h - (i + 0.5) * (h - 30) / _nBlue); break;
                case "Circular":
                    var angle: number = 2 * i * Math.PI / _nBlue;
                    p = new V.Vector2D(0.5 * (w + (h / 2) * Math.cos(angle)), 0.5 * (h + (h / 2) * Math.sin(angle)));
                    break;
                default: p = new V.Vector2D(Math.random() * w, Math.random() * h); break;
            }
            var unit: Unit = new Unit(PARTY.BLUE, p);
            aUnits.push(unit);
        }

        displayUnits();
    }

    function fight(): boolean {
        var stillFighting: boolean = false;
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        for (var i in aUnits) {
            var unit: Unit = aUnits[i];
            unit.display();
            if (unit.getHealth() > 0) {
                var enemyParty: PARTY = (unit.getParty() == PARTY.RED) ? PARTY.BLUE : PARTY.RED;
                var enemy: Unit = aUnits[i].findNearestUnit(aUnits, enemyParty);
                if (enemy == null)
                    continue;
                unit.displayLine(enemy);
                enemy.hit(unit.getPower());
                stillFighting = true;
            }
        }
        for (var i in aUnits) {
            aUnits[i].update();
        }

        return stillFighting;
    }
}