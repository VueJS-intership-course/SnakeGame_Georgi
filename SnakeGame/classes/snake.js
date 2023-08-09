import * as constants from './constants.js';
import { Apple } from './fruit/apple.js';
import { Player } from './player/Player.js';
import { Scoreboard } from './scoreboard/scoreboard.js';

export class Snake {
    points = 0;
    currPlayer;
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.grid = this.createEmptyGrid();
        this.snake = [{ x: 1, y: 0 }];
        this.apple = Apple.add();
        this.direction = constants.STARTING_MOVEMENT;
        this.gameOver = false;
        this.frameInterval = 1000 / 5;
        this.lastFrameTime = performance.now();

        this.setupListeners();
        this.gameLoop();
    }

    addPlayer() {
        const self = this;
        this.currPlayer = prompt('Enter your name', '');

        if (!this.currPlayer) {
            alert('You should enter a valid name!');
        } else {
            const player = new Player(this.currPlayer);
            player.addToScoreboard(self.currPlayer);
        }
    }

    createEmptyGrid() {
        const grid = [];
        for (let i = 0; i < this.gridSize; i++) {
            const row = new Array(this.gridSize).fill(0);
            grid.push(row);
        }

        return grid;
    }

    setupListeners() {
        document.addEventListener('keydown', (event) => this.handleUserInput(event));
    }

    handleUserInput(event) {
        if (event.code === 'ArrowUp' && this.direction.y !== 1) {
            this.direction = { x: 0, y: -1 };
        } else if (event.code === 'ArrowDown' && this.direction.y !== -1) {
            this.direction = { x: 0, y: 1 };
        } else if (event.code === 'ArrowLeft' && this.direction.x !== 1) {
            this.direction = { x: -1, y: 0 };
        } else if (event.code === 'ArrowRight' && this.direction.x !== -1) {
            this.direction = { x: 1, y: 0 };
        }
    }

    updateSnakePosition() {
        if (this.gameOver) return;

        const newHead = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y,
        };

        if (newHead.x < 0) {
            newHead.x = this.gridSize - 1;
        } else if (newHead.x >= this.gridSize) {
            newHead.x = 0;
        }

        if (newHead.y < 0) {
            newHead.y = this.gridSize - 1;
        } else if (newHead.y >= this.gridSize) {
            newHead.y = 0;
        }

        if (this.grid[newHead.y][newHead.x] === 1) {
            console.log('Collision detected');
            this.gameOver = true;
            return;
        }

        this.snake.unshift(newHead);

        this.grid[newHead.y][newHead.x] = 1;

        if (newHead.x === this.apple.x && newHead.y === this.apple.y) {
            this.points += 15;
            this.apple = Apple.add();
        } else {
            this.grid[this.snake[this.snake.length - 1].y][this.snake[this.snake.length - 1].x] = 0;
            this.snake.pop();
        }
    }


    render() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';

        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (this.grid[y][x] === 1) {
                    cell.classList.add('snake');
                } else if (x === this.apple.x && y === this.apple.y) {
                    cell.classList.add('apple');
                }
                gridElement.appendChild(cell);
            }
        }
    }

    gameLoop() {
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastFrameTime;

        if (deltaTime > this.frameInterval) {
            this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);

            this.updateSnakePosition();
            this.render();
        }

        if (!this.gameOver) {
            requestAnimationFrame(() => this.gameLoop());
        } else {
            alert(`Game Over,${this.currName}, your reached ${this.points} points!`);
            localStorage.setItem(this.currPlayer, this.points);
            console.log(this.currPlayer)
        }
    }


    run() {
        this.setupListeners();
        this.gameLoop();
    }
}
