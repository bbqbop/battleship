const { Player } = require('./player');

exports.Game = function(){
    this.players = {
        player1: new Player('Player1'),
        player2: new Player('Computer'),
    };
    this.currentPlayer = true;
    this.twoPlayer = false;
    this.gameOver = false;
    this.compQueue = [];
}
this.Game.prototype = {
    curPlayerAttacks: function(coords){
        let attackResult;
        let counterResult;
        if(this.currentPlayer){
            attackResult = this.players.player2.receiveAttack(coords);
        }
        else {                                                       // for 2 player mode
            attackResult = this.players.player1.receiveAttack(coords);
        }
        if (!this.twoPlayer){
            counterResult = this.compAttack();
        } 
        else {
            this.currentPlayer = !this.currentPlayer
        }
        return [attackResult, counterResult];
    },
    compAttack: function(){
        let result;
        let row;
        let col;
        while(!result){
            try{
                if (this.compQueue.length > 0){
                    console.log(this.compQueue);
                    [ row, col ] = this.compQueue.shift();
                }
                else {
                    row = Math.floor(Math.random() * 10);
                    col = Math.floor(Math.random() * 10);
                }
                result = this.players.player1.receiveAttack([row,col]);
                if (result.attackResult[0] === 'HIT!'){
                    this.fillQueue(row, col);
                }
                if (result.attackResult[0] === 'SUNK!'){
                    this.compQueue = []
                }
            } catch{
                if (this.compQueue.length > 0){
                    [ row, col ] = this.compQueue.shift();
                }
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
            }
        }
        return result;
    },
    fillQueue(row, col){
        const surroundingCoords = [
            [row, col+1], [row+1, col],
            [row, col-1], [row-1, col]
        ]
        surroundingCoords.forEach(coord => {
            if(coord[0] >= 0 && coord[0] <= 9 && coord[1] >= 0 && coord[1] <= 9){
                this.compQueue.push(coord);
            }
        })
    }
};


