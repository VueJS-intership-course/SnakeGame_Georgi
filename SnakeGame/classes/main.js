import * as constants from './constants.js';
import { Snake } from './snake/snake.js';
import { Scoreboard } from './scoreboard/scoreboard.js';


const backdrop = document.querySelector('.backdrop')
const area = document.getElementById('grid');
let gameIsRunning = false;
let snakeGame;


const btnBig = document.querySelector('.chooseSize-big');
btnBig.addEventListener('click', () => {
    snakeGame = new Snake(constants.GRID_SIZE_BIG);
    area.style.gridTemplateRows = `repeat(${constants.GRID_SIZE_BIG}, ${constants.DEFAULT_GRID_CELLS_SIZE}px)`;
    area.style.gridTemplateColumns = `repeat(${constants.GRID_SIZE_BIG}, ${constants.DEFAULT_GRID_CELLS_SIZE}px)`;
    backdrop.style.display = 'none';
})

const smallBtn = document.querySelector('.chooseSize-small')
smallBtn.addEventListener('click', () => {
    snakeGame = new Snake(constants.DEFAULT_GRID_SIZE);
    area.style.gridTemplateRows = `repeat(${constants.DEFAULT_GRID_SIZE}, ${constants.DEFAULT_GRID_CELLS_SIZE}px);`;
    area.style.gridTemplateColumns = `repeat(${constants.DEFAULT_GRID_SIZE}, ${constants.DEFAULT_GRID_CELLS_SIZE}px);`;
    backdrop.style.display = 'none'
})


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


