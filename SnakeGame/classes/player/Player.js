export class Player {
    constructor(currPlayer) {
        this.currPlayer = currPlayer;
    }

    addToScoreboard() {
        localStorage.setItem(this.currPlayer, 0);
    }
}