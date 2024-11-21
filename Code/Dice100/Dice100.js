"use strict";
let score = [0, 0];
let active = 0;
let potential = 0;
let strategy = [strategy10, strategy10];
strategy[1] = Reflect.get(window, "HundoDice").strategy;
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
function strategy10(_score, _active, _potential) {
    let go = _potential < 50;
    return go;
}
function togglePlayer() {
    console.log(score[0], score[1], potential);
    potential = 0;
    active = 1 - active;
}
