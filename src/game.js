const { Player } = require('./player');

exports.Game = function(){
    this.players = {
        player1: new Player(),
        player2: new Player(),
    };
    this.currentPlayer = true;
    this.twoPlayer = false;
    this.gameOver = false;
}
this.Game.prototype = {
    curPlayerAttacks: function(coords){
        let attackResult;
        let counterResult;
        if(this.currentPlayer){
            attackResult = this.players.player2.receiveAttack(coords);
            this.currentPlayer = !this.currentPlayer
        }
        else {                                                       // for 2 player mode
            attackResult = this.players.player1.receiveAttack(coords);
            this.currentPlayer = !this.currentPlayer
        }

        if (!this.twoPlayer){
            counterResult = this.compAttack();
        } 
        return [attackResult, counterResult];
    },
    compAttack: function(){
        let result;
        this.currentPlayer = !this.currentPlayer;
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        try{
            result = this.players.player1.receiveAttack([row,col]);
        }
        catch{
            this.compAttack();
        }
        return result;
    },
};


