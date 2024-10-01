var GrowSimple;
(function (GrowSimple) {
    // --------------------- Init
    var opt1;
    var opt2;
    var growth;
    var depthMax = 10;
    var nodeStart = [];
    var nodeCurrent = nodeStart;
    var depthCurrent = 0;
    initGameTree();
    initMenu();
    console.dir(nodeCurrent);
    displayButtons(nodeCurrent);
    displayMeter(depthCurrent);
    // --------------------- Functions
    function displayButtons(_n) {
        opt1.disabled = (_n[0] == nodeStart);
        opt2.disabled = (_n[1] == nodeStart);
    }
    function displayMeter(_depth) {
        growth.value = (_depth / depthMax).toString();
    }
    function buttonClicked(_event) {
        var option;
        switch (_event.target) {
            case opt1:
                option = 0;
                break;
            case opt2:
                option = 1;
                break;
            default: return;
        }
        selectOption(option);
    }
    function selectOption(_opt) {
        if (nodeCurrent[_opt] == null)
            endGame("Game Over");
        else {
            nodeCurrent = nodeCurrent[_opt];
            console.log(nodeCurrent);
            depthCurrent++;
            displayButtons(nodeCurrent);
            displayMeter(depthCurrent);
        }
        if (nodeCurrent.length == 0)
            endGame("You win!");
    }
    function endGame(_message) {
        console.log(_message);
        alert(_message);
        depthCurrent = 0;
        nodeCurrent = nodeStart;
        displayButtons(nodeCurrent);
        displayMeter(depthCurrent);
    }
    function initMenu() {
        opt1 = document.getElementById("opt1");
        opt2 = document.getElementById("opt2");
        growth = document.getElementById("growth");
        document.addEventListener("click", buttonClicked);
    }
    function initGameTree() {
        var node = nodeStart;
        for (var i = 0; i < depthMax; i++) {
            console.log("loop: " + i);
            var nodeDead = createDeadBranch(i);
            node.push(nodeDead);
            var nodeEmpty = [];
            Math.random() < 0.5 ? node.push(nodeEmpty) : node.unshift(nodeEmpty);
            node = nodeEmpty;
        }
    }
    function createDeadBranch(_depth) {
        _depth++;
        console.log("recdepth: " + _depth);
        var r = Math.random();
        if (_depth > depthMax - 2 || r < 0.3)
            return null;
        if (r < 0.6)
            return nodeStart;
        var node = [];
        node.push(createDeadBranch(_depth));
        node.push(createDeadBranch(_depth));
        if (node[0] == nodeStart && node[1] == nodeStart)
            return null;
        return node;
    }
})(GrowSimple || (GrowSimple = {}));
//# sourceMappingURL=GrowSimple.js.map