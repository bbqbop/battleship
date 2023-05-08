const { Player } = require('./player');

exports.Game = function(){
    this.players = {
        player1: new Player(),
        player2: new Player(),
    };
    this.currentPlayer = true;
    this.compEnemy = true;
    this.gameOver = false;
}
this.Game.prototype = {
    curPlayerAttacks: function(coords){
        let attackResult;
        let counterResult;
        this.currentPlayer = !this.currentPlayer
        if(this.currentPlayer){
            attackResult = this.players.player1.receiveAttack(coords);
        }
        else {
            attackResult = this.players.player2.receiveAttack(coords);
            this.checkStatus(attackResult);
        }
        if (this.compEnemy && !this.currentPlayer){
            counterResult = this.compAttack();
            this.checkStatus(counterResult);
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
    checkStatus: function(obj){
        console.log(obj)
        if(obj.isGameOver){
            this.gameOver = true;
        }
    }
};


