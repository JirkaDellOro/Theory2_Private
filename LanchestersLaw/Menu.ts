module LanchestersLaw {
    Setup.addEventListener(EVENTTYPE.LOAD, function(_event: Event): void {
        var menu: HTMLElement = document.getElementById("menu");
        menu.addEventListener("mousedown", Setup.stopPropagation);
        menu.addEventListener("keydown", Setup.stopPropagation);
        document.getElementById("go").addEventListener("click", go);
        document.getElementById("reset").addEventListener("click", changed);
        document.addEventListener("change", changed);
    });

    function stopEventPropagation(_event: Event): void {
        _event.stopPropagation();
    }

    function go(_event: Event): void {
        var powerRed: HTMLInputElement = <HTMLInputElement> document.getElementById("powerRed");
        var powerBlue: HTMLInputElement = <HTMLInputElement> document.getElementById("powerBlue");
        startFight(powerRed.valueAsNumber / 100.0, powerBlue.valueAsNumber / 100.0);
    }

    function changed(_event: Event): void {
        var nRed: HTMLInputElement = <HTMLInputElement> document.getElementById("nRed");
        var powerRed: HTMLInputElement = <HTMLInputElement> document.getElementById("powerRed");
        var nBlue: HTMLInputElement = <HTMLInputElement> document.getElementById("nBlue");
        var powerBlue: HTMLInputElement = <HTMLInputElement> document.getElementById("powerBlue");
        var arrangementSelection: NodeList = document.getElementsByName("arrangement");
        var arrangement: HTMLInputElement;
        for (var i in arrangementSelection)
            if ((arrangement = <HTMLInputElement> arrangementSelection[i]).checked)
                break;

        showResultHeadline(nRed.valueAsNumber, powerRed.valueAsNumber / 100.0, nBlue.valueAsNumber, powerBlue.valueAsNumber / 100.0, arrangement.value);

        if (_event.target != powerBlue && _event.target != powerRed)
            arrangeUnits(nRed.valueAsNumber, nBlue.valueAsNumber, arrangement.value);
    }

    export function showResultHeadline(_nRed: number, _powerRed: number, _nBlue: number, _powerBlue: number, _arrange: string): void {
        clearResultText();
        addResultText("Red:  n=" + _nRed + " p=" + _powerRed.toFixed(3) + "\n");
        addResultText("Blue: n=" + _nBlue + " p=" + _powerBlue.toFixed(3) + "\n");
        addResultText("Arrangement: " + _arrange + "\n");
    }

    export function addResultText(_result: string): void {
        document.getElementById("result").textContent += _result;
    }
    export function clearResultText(): void {
        document.getElementById("result").textContent = "";
    }
}