import { Fruit } from "../Fruit.js";
import * as constants from '../../constants.js';

export class Banana extends Fruit {
    constructor() {
        super()
        this.className = constants.BANANA_ClassName;
        this.score = 45;
    }
}

