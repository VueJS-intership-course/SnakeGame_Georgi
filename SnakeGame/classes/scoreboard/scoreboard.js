import * as constats from '../constants.js';

export class Scoreboard {
    constructor(points) {
        this.points = points;
    }

    static showScoreboard() {
        const scoreBoard = document.querySelector('.scoreBoard');
        const ul = document.querySelector('.playersScore');

        if (getComputedStyle(scoreBoard).display === 'none') {
            scoreBoard.style.display = 'block';

            ul.innerHTML = '';
            if (!localStorage.length) {
                ul.innerHTML = '';
                const h1El = document.createElement('h1');
                h1El.textContent = 'NO SCORES YET';
                ul.append(h1El)
            }

            const scores = Object.keys(localStorage).map(key => ({
                player: key,
                score: parseInt(localStorage.getItem(key).split(',')[0]),
                date: localStorage.getItem(key).split(',')[1]
            }));

            scores.sort((a, b) => b.score - a.score); 

            scores.forEach(score => {
                const li = document.createElement('li');
                li.textContent = `Player: ${score.player} => score: ${score.score} points, date: ${score.date}`;
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