namespace AdventureBig {

    export var locations: Locations = {};

    export interface Locations {
        [id: string]: Location;
    };

    export interface Location {
        description: string;
        items: string[];
        connections: Connections;
        visits: number;
    }

    export interface Connections {
        [direction: string]: string;
    }

    locations["Hall"] = {
        description: "You δόφί are in a big hall with doors leading to the west, north and east.",
        items: ["small bell", "helmet", "sword"],
        connections: { "west": "Kitchen", "north": "Garden", "east": "Office" },
        visits: 0
    };
    locations["Kitchen"] = {
        description: "You are in a rustic and somewhat filthy kitchen. There's a door to the east",
        items: ["knife", "bottle of wine"],
        connections: { "east": "Hall" },
        visits: 0
    };
}