import { Move } from "./SnakeCommands/snakeCommand.js";
import { Apple } from "./fruit/apple.js";

class Snake {
    static appleIsEaten = false;
    points = 0;
    currName;
    constructor() {
        this.rectangles = [];
        this.positionQueue = [{ x: 10, y: 10 }];
        this.defaultMoveDirection = { dx: 1, dy: 0 };
        this.currentMoveDirection = { ...this.defaultMoveDirection };
        this.autoMoveEnabled = true;
        Apple.addApple();
    }

    addToScoreboard() {
        if(!this.currName) {
            this.currName = prompt('Enter your name', '');
            if(!this.currName) {
                return;
            }
            localStorage.setItem(this.currName, 0);
        }else {
            return
        }
    }

    addToSnake(x, y) {
        let svg = document.querySelector('.area');
        let newRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        newRect.setAttribute('width', '20');
        newRect.setAttribute('height', '20');
        newRect.setAttribute('x', x);
        newRect.setAttribute('y', y);
        newRect.setAttribute('fill', 'green');
        newRect.classList.add('snake');
        svg.appendChild(newRect);
        this.rectangles.push(newRect);
    }

    updateSnakePositions(dx, dy) {
        for (let i = this.positionQueue.length - 1; i > 0; i--) {
            this.positionQueue[i].x = this.positionQueue[i - 1].x;
            this.positionQueue[i].y = this.positionQueue[i - 1].y;
        }

        this.positionQueue[0].x += dx;
        this.positionQueue[0].y += dy;

        for (let i = 0; i < this.rectangles.length; i++) {
            this.rectangles[i].setAttribute('x', this.positionQueue[i].x);
            this.rectangles[i].setAttribute('y', this.positionQueue[i].y);
        }
    }

    checkSelfCollision() {
        const headPosition = this.positionQueue[0];
        for (let i = 1; i < this.positionQueue.length; i++) {
            const segmentPosition = this.positionQueue[i];
            if (headPosition.x == segmentPosition.x && headPosition.y === segmentPosition.y) {
                return true;
            }
        }
        return false;
    }


    moveSnake(event, moveRate) {
        const move = new Move(this.rectangles[0], this.positionQueue[0], moveRate);
        const apple = document.getElementById('apple');
        let dx = 0;
        let dy = 0;

        move.move(event);

        dx = move.getDx();
        dy = move.getDy();

        this.currentMoveDirection.dx = dx;
        this.currentMoveDirection.dy = dy;

        const headPosition = {
            x: this.positionQueue[0].x + dx,
            y: this.positionQueue[0].y + dy,
            width: parseFloat(this.rectangles[0].getAttribute('width')),
            height: parseFloat(this.rectangles[0].getAttribute('height')),
        };

        if (this.checkSelfCollision()) {
            localStorage.setItem(this.currName, this.points);
            alert(`Game Over,${this.currName}, your reached ${this.points} points!`);
            window.location.reload();
        }

        const appleX = parseFloat(apple.getAttribute('x'));
        const appleY = parseFloat(apple.getAttribute('y'));
        const appleWidth = parseFloat(apple.getAttribute('width'));
        const appleHeight = parseFloat(apple.getAttribute('height'));

        if (
            headPosition.x < appleX + appleWidth &&
            headPosition.x + headPosition.width > appleX &&
            headPosition.y < appleY + appleHeight &&
            headPosition.y + headPosition.height > appleY
        ) {
            Apple.removeApple();
            this.points += 15;

            const lastRect = this.rectangles[this.rectangles.length - 1];
            const newX = parseFloat(lastRect.getAttribute('x')) + dx;
            const newY = parseFloat(lastRect.getAttribute('y')) + dy;

            this.addToSnake(newX, newY);
            this.positionQueue.push({ x: newX, y: newY });
            Apple.appleIsEaten = true;
        }

        this.updateSnakePositions(dx, dy);
    }


    toggleAutoMove() {
        this.autoMoveEnabled = !this.autoMoveEnabled;
    }

    moveOnItsOwn() {
        const dx = this.currentMoveDirection.dx;
        const dy = this.currentMoveDirection.dy;

        const newHeadPosition = {
            x: this.positionQueue[0].x + dx,
            y: this.positionQueue[0].y + dy,
        };

        this.positionQueue.unshift(newHeadPosition);

        this.positionQueue = this.positionQueue.slice(0, this.rectangles.length);

        for (let i = 0; i < this.rectangles.length; i++) {
            this.rectangles[i].setAttribute('x', this.positionQueue[i].x);
            this.rectangles[i].setAttribute('y', this.positionQueue[i].y);
        }
    }

    gameLoop(time = 150) {

        if (this.autoMoveEnabled) {
            this.moveOnItsOwn();
        }

        if (Apple.appleIsEaten) {
            time -= 5;
            Apple.appleIsEaten = false;
        }

        setTimeout(() => {
            requestAnimationFrame(() => this.gameLoop(time));
        }, time);
    }
}

const moveRate = 5;

const snake = new Snake();
snake.addToSnake(10, 10);


window.addEventListener('keydown', (event) => {
    snake.moveSnake(event, moveRate);
}, true);

const btn = document.querySelector('.btn');
btn.addEventListener('click', () => {
    snake.toggleAutoMove();
    snake.gameLoop();
    snake.addToScoreboard()
}, true);

