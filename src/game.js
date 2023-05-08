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
        console.log(attackResult, counterResult)
        return [attackResult, counterResult];
    },
    compAttack: function(){
        let result;
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        while(!result){
            try{
                result = this.players.player1.receiveAttack([row,col]);
            } catch{
                console.log('CAUGHT')
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
            }
        }

        return result;
    },
};


