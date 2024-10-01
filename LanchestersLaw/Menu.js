var LanchestersLaw;
(function (LanchestersLaw) {
    Setup.addEventListener(EVENTTYPE.LOAD, function (_event) {
        var menu = document.getElementById("menu");
        menu.addEventListener("mousedown", Setup.stopPropagation);
        menu.addEventListener("keydown", Setup.stopPropagation);
        document.getElementById("go").addEventListener("click", go);
        document.getElementById("reset").addEventListener("click", changed);
        document.addEventListener("change", changed);
    });
    function stopEventPropagation(_event) {
        _event.stopPropagation();
    }
    function go(_event) {
        var powerRed = document.getElementById("powerRed");
        var powerBlue = document.getElementById("powerBlue");
        LanchestersLaw.startFight(powerRed.valueAsNumber / 100.0, powerBlue.valueAsNumber / 100.0);
    }
    function changed(_event) {
        var nRed = document.getElementById("nRed");
        var powerRed = document.getElementById("powerRed");
        var nBlue = document.getElementById("nBlue");
        var powerBlue = document.getElementById("powerBlue");
        var arrangementSelection = document.getElementsByName("arrangement");
        var arrangement;
        for (var i in arrangementSelection)
            if ((arrangement = arrangementSelection[i]).checked)
                break;
        showResultHeadline(nRed.valueAsNumber, powerRed.valueAsNumber / 100.0, nBlue.valueAsNumber, powerBlue.valueAsNumber / 100.0, arrangement.value);
        if (_event.target != powerBlue && _event.target != powerRed)
            LanchestersLaw.arrangeUnits(nRed.valueAsNumber, nBlue.valueAsNumber, arrangement.value);
    }
    function showResultHeadline(_nRed, _powerRed, _nBlue, _powerBlue, _arrange) {
        clearResultText();
        addResultText("Red:  n=" + _nRed + " p=" + _powerRed.toFixed(3) + "\n");
        addResultText("Blue: n=" + _nBlue + " p=" + _powerBlue.toFixed(3) + "\n");
        addResultText("Arrangement: " + _arrange + "\n");
    }
    LanchestersLaw.showResultHeadline = showResultHeadline;
    function addResultText(_result) {
        document.getElementById("result").textContent += _result;
    }
    LanchestersLaw.addResultText = addResultText;
    function clearResultText() {
        document.getElementById("result").textContent = "";
    }
    LanchestersLaw.clearResultText = clearResultText;
})(LanchestersLaw || (LanchestersLaw = {}));
//# sourceMappingURL=Menu.js.map