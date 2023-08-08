export class Move {
  constructor(object, position, moveRate) {
    this.object = object;
    this.position = position;
    this.moveRate = moveRate;
    this.dx = 0;
    this.dy = 0;
  }

  updateYPosition(distance) {
    this.position.y = this.position.y - distance;
    if (this.position.y < 0) {
      this.position.y = 499;
    } else if (this.position.y > 499) {
      this.position.y = 0;
    }

  }

  updateXPosition(distance) {
    this.position.x = this.position.x + distance;

    if (this.position.x < 0) {
      this.position.x = 499;
    } else if (this.position.x > 499) {
      this.position.x = 0;
    }
  }

  move(event) {
    if (event.defaultPrevented) {
      return;
    }

    if (event.code === 'ArrowDown') {
      this.dy = this.moveRate;
      this.updateYPosition(-this.moveRate);
    } else if (event.code === 'ArrowUp') {
      this.dy = -this.moveRate;
      this.updateYPosition(this.moveRate);
    } else if (event.code === 'ArrowLeft') {
      this.dx = -this.moveRate;
      this.updateXPosition(-this.moveRate);
    } else if (event.code === 'ArrowRight') {
      this.dx = this.moveRate;
      this.updateXPosition(this.moveRate);
    }

    this.refreshPosition();
    event.preventDefault();
  }

  refreshPosition() {
    let x = this.position.x - this.object.getAttribute('width') / 2;
    let y = this.position.y - this.object.getAttribute('height') / 2;

    this.object.setAttribute('x', x);
    this.object.setAttribute('y', y);
  }

  getDx() {
    return this.dx;
  }

  getDy() {
    return this.dy;
  }
}
