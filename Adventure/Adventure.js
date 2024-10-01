var Adventure;
(function (Adventure) {
    var itemsInRoom = ["torch", "stone", "club", "knife", "potion"];
    var inventory = [];
    var command = "";
    var output = "Welcome to this exciting adventure\n";
    while (command != "quit" && command != "q") {
        output += "\nWhat would you like to do? [look, inventory, drop, take, quit]";
        command = prompt(output);
        console.log(command);
        var itemList = "";
        var choose;
        var itemChosen = "";
        switch (command) {
            case "look":
            case "l":
                output = "You are in a barely lit cavern. ";
                if (itemsInRoom.length > 0) {
                    output += "You see\n";
                    for (var i = 0; i < itemsInRoom.length; i++)
                        itemList += "a " + itemsInRoom[i] + "\n";
                }
                break;
            case "inventory":
            case "i":
                output = "You carry\n";
                if (inventory.length > 0) {
                    for (var i = 0; i < inventory.length; i++)
                        itemList += "a " + inventory[i] + "\n";
                }
                break;
            case "take":
            case "t":
                output = "You picked\n";
                if (itemsInRoom.length) {
                    choose = Math.floor(Math.random() * itemsInRoom.length);
                    itemChosen = itemsInRoom.splice(choose, 1)[0];
                    inventory.push(itemChosen);
                    itemList += "a " + itemChosen + "\n";
                }
                break;
            case "drop":
            case "d":
                output = "You dropped\n";
                if (inventory.length) {
                    choose = Math.floor(Math.random() * inventory.length);
                    itemChosen = inventory.splice(choose, 1)[0];
                    itemsInRoom.push(itemChosen);
                    itemList += "a " + itemChosen + "\n";
                }
                break;
            default:
                output = "I don't understand...";
                continue;
        }
        output += (itemList != "") ? itemList : "nothing\n";
    }
})(Adventure || (Adventure = {}));
//# sourceMappingURL=Adventure.js.map