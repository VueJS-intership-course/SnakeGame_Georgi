import * as constants from '../constants.js'

export class Inputs {
  constructor(event) {
    this.direction = constants.STARTING_MOVEMENT;
    this.event = event;
    console.log(event);
  }

  handleUserInput(updateDirectionCallback) {
    if (this.event.code === 'ArrowUp' && this.direction.y !== 1) {
      updateDirectionCallback({ x: 0, y: -1 });
    } else if (this.event.code === 'ArrowDown' && this.direction.y !== -1) {
      updateDirectionCallback({ x: 0, y: 1 });
    } else if (this.event.code === 'ArrowLeft' && this.direction.x !== 1) {
      updateDirectionCallback({ x: -1, y: 0 });
    } else if (this.event.code === 'ArrowRight' && this.direction.x !== -1) {
      updateDirectionCallback({ x: 1, y: 0 });
    }
  }
}
