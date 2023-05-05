//This will populate a map with a seed

console.log("map.js started loading");
import mapSeedEntityLoader from './map-seed-entity-loader.js';

export default class Map {
    constructor (player, seed) {
        this.background = seed.background;
        this.seededEntities = new mapSeedEntityLoader(seed.entities); // allows player to reset map with seeded entities at any time
        this.addSeededEntities(player)
    };

    addSeededEntities(player) {
        this.entities = this.seededEntities.entities;
        this.entities.player = player  //gives player unique entityId
        
        for(const entity in this.entities) {
            this.entities[entity].map = this
        }
    }
}


console.log("map.js finished loading");