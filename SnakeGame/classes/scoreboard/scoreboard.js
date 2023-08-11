import { Database } from '../Database/database.js';
import * as constats from '../constants.js';

export class Scoreboard {
    constructor(points) {
        this.points = points;
    }

    static async showScoreboard() {
        const scoreBoard = document.querySelector('.scoreBoard');
        const ul = document.querySelector('.playersScore');

        if (getComputedStyle(scoreBoard).display === 'none') {
            scoreBoard.style.display = 'block';

            ul.innerHTML = '';
            if (!localStorage.length) {
                ul.innerHTML = '';
                const h1El = document.createElement('h1');
                h1El.textContent = 'NO SCORES YET';
                ul.append(h1El);
            }

            const scores = await Database.getAll();

            scores.sort((a, b) => b.points - a.points);

            scores.forEach(score => {
                const li = document.createElement('li');
                li.textContent = `Player: ${score.name} => score: ${score.points} points, date: ${score.date}`;
                ul.append(li);
            });
        } else if (getComputedStyle(scoreBoard).display === 'block') {
            scoreBoard.style.display = 'none';
        }
    }

    ShowlivePoints() {
        const livePoints = document.querySelector('.live-points');
        livePoints.textContent = Number(livePoints.textContent) + this.points;
    }
}