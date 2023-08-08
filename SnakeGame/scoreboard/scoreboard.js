export class Scoreboard {
    static showScoreboard() {
        const scoreBoard = document.querySelector('.scoreBoard');
        const ul = document.querySelector('.playersScore'); 

        if (getComputedStyle(scoreBoard).display === 'none') {
            scoreBoard.style.display = 'block';

            ul.innerHTML = ''; 
            if(!localStorage.length) {
                ul.innerHTML = ''; 
                const h1El = document.createElement('h1');
                h1El.textContent = 'NO SCORES YET';
                ul.append(h1El)
            }   

            Object.keys(localStorage).forEach(key => {
                const li = document.createElement('li');
                li.textContent = `Player: ${key} => score: ${localStorage.getItem(key)}`;
                ul.append(li);
            });
        } else if (getComputedStyle(scoreBoard).display === 'block') {
            scoreBoard.style.display = 'none';
        }

    }
}