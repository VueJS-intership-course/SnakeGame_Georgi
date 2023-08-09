export class Player {
    constructor(currPlayer) {
        this.currPlayer = currPlayer;
    }

    addToScoreboard() {
        console.log(this.currPlayer);
        localStorage.setItem(this.currPlayer, 0);
    }
}