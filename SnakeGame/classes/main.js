import * as constants from './constants.js';
import { Snake } from './snake/snake.js';
import { Scoreboard } from './scoreboard/scoreboard.js';
let gameIsRunning = false


const snakeGame = new Snake(constants.GRID_SIZE);
const startBtn = document.querySelector('.start-game');

startBtn.addEventListener('click', () => {
    if (!constants.gameIsRunning) {
        gameIsRunning = true;
        startBtn.disabled = true;
        snakeGame.addPlayer();
        snakeGame.run()
    }
});

const scoreboardBtn = document.querySelector('.scoreboardBtn');
scoreboardBtn.addEventListener('click', () => Scoreboard.showScoreboard())


