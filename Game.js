class Game {
    constructor(
    flaggingOn,
    gameOver
    ){
        this.flaggingOn = flaggingOn;
        this.gameOver = gameOver;
    }

    resetGame() {
        this.flaggingOn = false;
        this.gameOver = false;
    };
};

export default Game;