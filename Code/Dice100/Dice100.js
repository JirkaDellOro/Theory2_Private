"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let score = [0, 0];
let active = 0;
let potential = 0;
let strategy = [strategy10, strategy10];
window.addEventListener("load", start);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield loadScript("https://aspepex.github.io/HundoDice/strategy.js");
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
    });
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
function loadScript(_url) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
