import * as constants from './constants.js';
import { SnakeGame } from './snake.js';
import { Scoreboard } from './scoreboard/scoreboard.js';

const snakeGame = new SnakeGame(constants.GRID_SIZE);
const startBtn = document.querySelector('.start-game');

startBtn.addEventListener('click', () => {
    snakeGame.addPlayer()
});

const scoreboardBtn = document.querySelector('.scoreboardBtn');
scoreboardBtn.addEventListener('click', () => Scoreboard.showScoreboard())


