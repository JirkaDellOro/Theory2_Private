module GrowSimple {
    /**
     * A Node-Element is supposed to keep two Node-Elements to create a binary tree.
     * Elements can be null which means "game over".
     * An Element identical to the start-node means that this branch is not an option.
     */
    interface Node extends Array<Node> {
    }

    // --------------------- Init
    var opt1: HTMLButtonElement;
    var opt2: HTMLButtonElement;
    var growth: HTMLInputElement;

    var depthMax: number = 10;
    var nodeStart: Node = [];
    var nodeCurrent: Node = nodeStart;
    var depthCurrent: number = 0;

    initGameTree();
    initMenu();
    console.dir(nodeCurrent);
    displayButtons(nodeCurrent);
    displayMeter(depthCurrent);

    // --------------------- Functions
    function displayButtons(_n: Node): void {
        opt1.disabled = (_n[0] == nodeStart);
        opt2.disabled = (_n[1] == nodeStart);
    }
    function displayMeter(_depth: number): void {
        growth.value = (_depth / depthMax).toString();
    }

    function buttonClicked(_event: Event): void {
        var option: number;
        switch (_event.target) {
            case opt1: option = 0; break;
            case opt2: option = 1; break;
            default: return;
        }
        selectOption(option);
    }

    function selectOption(_opt: number): void {
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

    function endGame(_message: string): void {
        console.log(_message);
        alert(_message);
        depthCurrent = 0;
        nodeCurrent = nodeStart;
        displayButtons(nodeCurrent);
        displayMeter(depthCurrent);
    }

    function initMenu(): void {
        opt1 = <HTMLButtonElement>document.getElementById("opt1");
        opt2 = <HTMLButtonElement>document.getElementById("opt2");
        growth = <HTMLInputElement>document.getElementById("growth");
        document.addEventListener("click", buttonClicked);
    }


    function initGameTree(): void {
        var node: Node = nodeStart;
        for (var i: number = 0; i < depthMax; i++) {
            console.log("loop: " + i);
            var nodeDead: Node = createDeadBranch(i);
            node.push(nodeDead);
            var nodeEmpty: Node = [];
            Math.random() < 0.5 ? node.push(nodeEmpty) : node.unshift(nodeEmpty);
            node = nodeEmpty;
        }
    }

    function createDeadBranch(_depth: number): Node {
        _depth++;
        console.log("recdepth: " + _depth);
        var r: number = Math.random();
        if (_depth > depthMax - 2 || r < 0.3)
            return null;
        if (r < 0.6)
            return nodeStart;
        var node: Node = [];
        node.push(createDeadBranch(_depth));
        node.push(createDeadBranch(_depth));
        if (node[0] == nodeStart && node[1] == nodeStart)
            return null;
        return node;
    }
}