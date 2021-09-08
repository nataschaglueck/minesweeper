class Game {
    constructor(isFlaggingOn, gameOver){
        this.isFlaggingOn = isFlaggingOn;
        this.gameOver = gameOver;
    }

    resetGame() {
        this.isFlaggingOn = false;
        this.gameOver = false;
    };
};

export default Game;