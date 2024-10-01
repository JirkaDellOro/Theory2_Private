var AdventureBig;
(function (AdventureBig) {
    AdventureBig.locations = {};
    ;
    AdventureBig.locations["Hall"] = {
        description: "You are in a big hall with doors leading to the west, north and east.",
        items: ["small bell", "helmet", "sword"],
        connections: { "west": "Kitchen", "north": "Garden", "east": "Office" },
        visits: 0
    };
    AdventureBig.locations["Kitchen"] = {
        description: "You are in a rustic and somewhat filthy kitchen. There's a door to the east",
        items: ["knife", "bottle of wine"],
        connections: { "east": "Hall" },
        visits: 0
    };
})(AdventureBig || (AdventureBig = {}));
//# sourceMappingURL=AdventureBigDef.js.map