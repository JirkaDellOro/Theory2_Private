export var Jirka;
(function (Jirka) {
    function strategy(_score, _active, _potential) {
        // return Math.random() < 0.5;
        return _potential < 20;
    }
    Jirka.strategy = strategy;
})(Jirka || (Jirka = {}));
//# sourceMappingURL=Strategy.js.map