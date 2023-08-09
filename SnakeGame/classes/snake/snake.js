import * as constants from '../constants.js';
import { Apple } from '../fruit/apple/Apple.js';
import { Banana } from '../fruit/banana/Banana.js';
import { Player } from '../player/Player.js';
import { Input } from '../input/input.js';

export class Snake {
    points = 0;
    currPlayer;
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.grid = this.createEmptyGrid();
        this.snake = constants.SNAKE;
        this.fruit = Math.random() > 0.2 ? new Apple() : new Banana();
        this.fruitCoordinates = this.fruit.add();
        this.direction = constants.STARTING_MOVEMENT;
        this.gameOver = false;
        this.frameInterval = constants.GAME_LOOP_INTERVAL_TIME / constants.GAME_LOOP_FPS;
        this.lastFrameTime = performance.now();

        this.render()
    }

    addPlayer() {
        const self = this;
        this.currPlayer = prompt('Enter your name', '');

        if (!this.currPlayer) {
            alert(new Error('You should enter a valid name!'));
        } else {
            const player = new Player(this.currPlayer);
            console.log(this.currPlayer)
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
        document.addEventListener('keydown', (event) => {
            let input = new Input(event, this.direction);
            this.direction = input.handleUserInput()
        });
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
            this.gameOver = true;
            return;
        }

        this.snake.unshift(newHead);

        this.grid[newHead.y][newHead.x] = 1;

        if (newHead.x === this.fruitCoordinates.x && newHead.y === this.fruitCoordinates.y) {
            if (this.fruit instanceof Apple) {
                this.points += 15;
            } else if (this.fruit instanceof Banana) {
                this.points += 45;
            }
            this.fruitCoordinates = Math.random() > 0.3 ? new Apple().add() : new Banana().add();
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
                } else if (x === this.fruitCoordinates.x && y === this.fruitCoordinates.y) {
                   cell.classList.add(this.fruit.className)
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
            alert(`Game Over,${this.currPlayer}, your reached ${this.points} points!`);
            window.location.reload()
            localStorage.setItem(this.currPlayer, this.points);
        }
    }

    run() {
        this.setupListeners();
        this.gameLoop();
    }
}
