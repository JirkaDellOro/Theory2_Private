"use strict";
let score = [0, 0];
let active = 0;
let potential = 0;
let strategy = [strategy10, strategy10];
window.addEventListener("load", start);
async function getAgents() {
    // let url: string = "../Agent.js"
    let url = "https://jirkadelloro.github.io/Agent/Agent.js";
    let Agent = (await import(url)).default;
    await Agent.createDialog(2, ["strategy"]);
    strategy[0] = Agent.get(0).strategy;
    strategy[1] = Agent.get(1).strategy;
}
async function start() {
    await getAgents();
    const button = document.createElement("button");
    button.innerText = "Start";
    button.addEventListener("click", simulate);
    document.body.appendChild(button);
}
async function simulate() {
    score = [0, 0];
    active = 0;
    potential = 0;
    do {
        let go = strategy[active](score.slice(), active, potential);
        if (go) {
            let roll = 1 + Math.floor(Math.random() * 6);
            if (roll > 1)
                potential += roll;
            else if (togglePlayer())
                break;
        }
        else {
            score[active] += potential;
            if (togglePlayer())
                break;
        }
    } while (true);
    console.log(`Player ${score[active] < score[1 - active] ? 1 - active : active} won with ${score[active]} points`);
}
function strategy10(_score, _active, _potential) {
    let go = _potential < 50;
    return go;
}
function togglePlayer() {
    console.log(score[0], score[1], potential);
    potential = 0;
    if (active == 1 && (score[active] >= 100 || score[1 - active] >= 100))
        return true;
    active = 1 - active;
    return false;
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