import { Fruit } from "../Fruit.js";
import * as constants from '../../constants.js';


export class Apple extends Fruit {
    constructor() {
        super()
        this.className = constants.APPLE_ClassName;
        this.score = 15;
    }
}