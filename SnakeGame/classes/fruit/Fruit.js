import * as constants from '../constants.js';

export class Fruit {
    add() {
        const x = Math.floor(Math.random() * constants.DEFAULT_GRID_CELLS_SIZE);
        const y = Math.floor(Math.random() * constants.DEFAULT_GRID_CELLS_SIZE);
        return { x, y };
    }
}


