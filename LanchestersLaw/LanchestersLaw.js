var LanchestersLaw;
(function (LanchestersLaw) {
    var V = Vector2D;
    var nRed = 0;
    var nBlue = 0;
    var aUnits = new Array();
    var fighting = false;
    var iDragging = -1;
    Setup.size(800, 600);
    Setup.title("LanchestersLaw");
    Setup.addEventListener(EVENTTYPE.MOUSEDOWN, mousedown);
    Setup.addEventListener(EVENTTYPE.MOUSEUP, mouseup);
    Setup.addEventListener(EVENTTYPE.MOUSEMOVE, mousemove);
    function mousedown(_event) {
        for (var i in aUnits) {
            if (aUnits[i].testHit(Setup.pointerX, Setup.pointerY)) {
                iDragging = i;
            }
        }
    }
    function mouseup(_event) {
        console.log("up");
        iDragging = -1;
    }
    function mousemove(_event) {
        console.log("move");
        if (iDragging > -1) {
            aUnits[iDragging].setPosition(new V.Vector2D(Setup.pointerX, Setup.pointerY));
            displayUnits();
        }
    }
    function startFight(_powerRed, _powerBlue) {
        for (var i in aUnits) {
            var unit = aUnits[i];
            unit.setPower((unit.getParty() == LanchestersLaw.PARTY.RED) ? _powerRed : _powerBlue);
            unit.setHealth(1);
        }
        fighting = true;
        animate();
    }
    LanchestersLaw.startFight = startFight;
    function animate() {
        if (fighting) {
            fighting = fight();
            Setup.setTimeout(animate, 20);
            if (!fighting) {
                showResult();
            }
        }
    }
    function showResult() {
        var remain = new Array(0, 0, 0);
        var health = new Array(0, 0, 0);
        for (var i in aUnits) {
            var unit = aUnits[i];
            remain[unit.getParty()] += 1;
            health[unit.getParty()] += unit.getHealth();
        }
        var lossRed = (nRed - health[LanchestersLaw.PARTY.RED]) / nRed;
        var lossBlue = (nBlue - health[LanchestersLaw.PARTY.BLUE]) / nBlue;
        LanchestersLaw.addResultText("Avg. Loss Red:  " + (lossRed).toFixed(2) + "\n");
        LanchestersLaw.addResultText("Avg. Loss Blue: " + (lossBlue).toFixed(2) + "\n");
        LanchestersLaw.addResultText("Ratio: " + (lossBlue / lossRed).toFixed(2) + " <-> " + (lossRed / lossBlue).toFixed(2) + "\n");
    }
    function displayUnits() {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        for (var i in aUnits) {
            aUnits[i].display();
        }
    }
    function arrangeUnits(_nRed, _nBlue, _arrange) {
        nRed = _nRed;
        nBlue = _nBlue;
        fighting = false;
        aUnits = [];
        var w = crc2.canvas.width;
        var h = crc2.canvas.height;
        var p;
        // generate red units
        for (var i = 0; i < _nRed; i++) {
            switch (_arrange) {
                case "T-Pose":
                case "Parallel":
                    p = new V.Vector2D((i + 0.5) * w / _nRed, 20);
                    break;
                case "Circular":
                    var angle = 2 * i * Math.PI / _nRed;
                    p = new V.Vector2D(0.5 * (w + (h - 20) * Math.cos(angle)), 0.5 * (h + (h - 20) * Math.sin(angle)));
                    break;
                default:
                    p = new V.Vector2D(Math.random() * w, Math.random() * h);
                    break;
            }
            var unit = new LanchestersLaw.Unit(LanchestersLaw.PARTY.RED, p);
            aUnits.push(unit);
        }
        // generate blue units
        for (var i = 0; i < _nBlue; i++) {
            switch (_arrange) {
                case "Parallel":
                    p = new V.Vector2D((i + 0.5) * w / _nBlue, h - 20);
                    break;
                case "T-Pose":
                    p = new V.Vector2D(1 + w / 2, h - (i + 0.5) * (h - 30) / _nBlue);
                    break;
                case "Circular":
                    var angle = 2 * i * Math.PI / _nBlue;
                    p = new V.Vector2D(0.5 * (w + (h / 2) * Math.cos(angle)), 0.5 * (h + (h / 2) * Math.sin(angle)));
                    break;
                default:
                    p = new V.Vector2D(Math.random() * w, Math.random() * h);
                    break;
            }
            var unit = new LanchestersLaw.Unit(LanchestersLaw.PARTY.BLUE, p);
            aUnits.push(unit);
        }
        displayUnits();
    }
    LanchestersLaw.arrangeUnits = arrangeUnits;
    function fight() {
        var stillFighting = false;
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        for (var i in aUnits) {
            var unit = aUnits[i];
            unit.display();
            if (unit.getHealth() > 0) {
                var enemyParty = (unit.getParty() == LanchestersLaw.PARTY.RED) ? LanchestersLaw.PARTY.BLUE : LanchestersLaw.PARTY.RED;
                var enemy = aUnits[i].findNearestUnit(aUnits, enemyParty);
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
})(LanchestersLaw || (LanchestersLaw = {}));
//# sourceMappingURL=LanchestersLaw.js.map