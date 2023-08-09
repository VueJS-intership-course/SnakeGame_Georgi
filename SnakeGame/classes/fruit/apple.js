import * as constants from '../constants.js'

export class Apple {
    static add() {
        const x = Math.floor(Math.random() * constants.GRID_SIZE);
        const y = Math.floor(Math.random() * constants.GRID_SIZE);
        return { x, y };
    }
}