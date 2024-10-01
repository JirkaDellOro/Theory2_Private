namespace AdventureBig {
    var currentLocation: Location = locations["Hall"];
    currentLocation.visits++;
    var inventory: string[] = [];
    var command: string = "";
    var output: string = "Welcome to this exciting adventure\n";

    while (command != "quit" && command != "q") {
        output += "\nWhat would you like to do?";
        command = prompt(output, "commands");
        console.log(command);

        var listItems: boolean = false;
        var itemList: string[] = [];

        switch (command) {
            case "commands":
                output = "You may type the following commands:\n look(l), inventory(i), drop(d), take(t),\n north, south, east, west, quit(q)]";
                break;
            case "look":
            case "l":
                output = currentLocation.description + "\n";
                output += "You may take\n";
                listItems = true;
                if (currentLocation.items.length > 0)
                    itemList = currentLocation.items;
                break;
            case "inventory":
            case "i":
                output = "You carry\n";
                listItems = true;
                if (inventory.length > 0)
                    itemList = inventory;
                break;
            case "take":
            case "t":
                output = "You picked\n";
                listItems = true;
                if (currentLocation.items.length) {
                    var itemTransferred: string = transferRandomItem(currentLocation.items, inventory);
                    itemList = [itemTransferred];
                }
                break;
            case "drop":
            case "d":
                output = "You dropped\n";
                listItems = true;
                if (inventory.length) {
                    var itemTransferred: string = transferRandomItem(inventory, currentLocation.items);
                    itemList = [itemTransferred];
                }
                break;
            case "north":
            case "east":
            case "south":
            case "west":
                var toId: string = currentLocation.connections[command];
                if (!toId)
                    output = "You can't go that way";
                else if (locations[toId]) {
                    currentLocation = locations[toId];
                    currentLocation.visits++;
                    output = "You went to the " + toId + "\n";
                    console.log("Visits to the " + toId + ": " + currentLocation.visits);
                }
                else
                    output = ("Error: no location defined in this direction");
                break;
            default:
                output = "I don't understand...";
                continue;
        }

        if (listItems)
            if (itemList.length)
                for (var i: number = 0; i < itemList.length; i++)
                    output += "a " + itemList[i] + "\n";
            else
                output += "nothing\n";
    }

    function transferRandomItem(_from: string[], _to: string[]): string {
        var choose: number = Math.floor(Math.random() * _from.length);
        var itemChosen: string = _from.splice(choose, 1)[0];
        _to.push(itemChosen);
        return itemChosen;
    }
}