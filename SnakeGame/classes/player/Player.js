export class Player {
    constructor(currPlayer) {
        this.currPlayer = currPlayer;
    }

    addToScoreboard() {
        localStorage.setItem(this.currPlayer, [0, this.dateOfPlayersEntry()]);
    }

    dateOfPlayersEntry() {
        const timestamp = Date.now();
        const dateObject = new Date(timestamp);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
}