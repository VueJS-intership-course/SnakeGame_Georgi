import * as constants from '../constants.js'

export class Input {
  constructor(event, direction) {
    this.event = event
    this.direction = direction;
  }

  handleUserInput() {
    if (this.event.code === 'ArrowUp' && this.direction.y !== 1) {
      return constants.DIRECTION_UP;
    } else if (this.event.code === 'ArrowDown' && this.direction.y !== -1) {
      return constants.DIRECTION_DOWN;
    } else if (this.event.code === 'ArrowLeft' && this.direction.x !== 1) {
      return constants.DIRECTION_LEFT;
    } else if (this.event.code === 'ArrowRight' && this.direction.x !== -1) {
      return constants.DIRECTION_RIGHT;
    }
  }
}
