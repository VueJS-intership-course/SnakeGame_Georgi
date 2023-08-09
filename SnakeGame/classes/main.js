import * as constants from './constants.js';
import { Snake } from './snake.js';
import { Scoreboard } from './scoreboard/scoreboard.js';

const snakeGame = new Snake(constants.GRID_SIZE);
const startBtn = document.querySelector('.start-game');

startBtn.addEventListener('click', () => {
    snakeGame.addPlayer()
});

const scoreboardBtn = document.querySelector('.scoreboardBtn');
scoreboardBtn.addEventListener('click', () => Scoreboard.showScoreboard())


