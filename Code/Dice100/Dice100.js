import { ABC } from "../Import/Import.js";
let score = [0, 0];
let active = 0;
let potential = 0;
let strategy = [strategy10, strategy10];
let import0 = new ABC.Import();
window.addEventListener("load", start);
async function start() {
    document.body.appendChild(import0.form);
    const button = document.createElement("button");
    button.innerText = "Start";
    button.addEventListener("click", simulate);
    document.body.appendChild(button);
}
// await loadScript("https://aspepex.github.io/HundoDice/strategy.js");
// strategy[1] = Reflect.get(window, "HundoDice").strategy
async function simulate() {
    if (!await import0.import(["strategy"]))
        return;
    strategy[1] = import0.strategy;
    console.log(import0);
    do {
        let go = strategy[active](score, active, potential);
        if (go) {
            let roll = 1 + Math.floor(Math.random() * 6);
            if (roll > 1)
                potential += roll;
            else
                togglePlayer();
        }
        else {
            score[active] += potential;
            if (active == 1 && (score[active] >= 100 || score[1 - active] >= 100))
                break;
            togglePlayer();
        }
    } while (true);
    togglePlayer();
    if (score[active] < score[1 - active])
        togglePlayer();
    console.log(`Player ${active} won with ${score[active]} points`);
}
function strategy10(_score, _active, _potential) {
    let go = _potential < 50;
    return go;
}
function togglePlayer() {
    console.log(score[0], score[1], potential);
    potential = 0;
    active = 1 - active;
}
async function loadScript(_url) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.async = false;
    let head = document.head;
    head.appendChild(script);
    return new Promise((_resolve, _reject) => {
        script.addEventListener("load", () => _resolve());
        script.addEventListener("error", () => {
            _reject();
        });
        script.src = _url.toString();
    });
}
//# sourceMappingURL=Dice100.js.map