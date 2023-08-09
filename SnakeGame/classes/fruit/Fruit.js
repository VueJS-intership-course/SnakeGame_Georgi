import * as constants from '../constants.js';

export class Fruit {
    add() {
        const x = Math.floor(Math.random() * constants.GRID_SIZE);
        const y = Math.floor(Math.random() * constants.GRID_SIZE);
        return { x, y };
    }
}


export class Banana extends Fruit {
    constructor() {
        super()
        this.className = constants.BANANA_ClassName
    }
}

