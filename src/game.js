const { Player } = require('./player');

exports.Game = function(){
    this.players = {
        player1: new Player(),
        player2: new Player(),
    };
    this.currentPlayer = true;
    this.compEnemy = true;
}
this.Game.prototype = {
    curPlayerAttacks: function(coordinates){
        this.currentPlayer = !this.currentPlayer
        if(this.currentPlayer){
            this.players.player1.receiveAttack(coordinates);
        }
        else {
            this.players.player2.receiveAttack(coordinates);
        }
        if (this.compEnemy && !this.currentPlayer){
            this.compAttack();
        } 
    },
    compAttack: function(){
        this.currentPlayer = !this.currentPlayer;
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        try{
            this.players.player1.receiveAttack([row,col]);
        }
        catch{
            this.compAttack();
        }
    }
};

// const newGame = new this.Game();
// newGame.curPlayerAttacks([2,2]);
// console.log(newGame.players.player1.board)
// newGame.curPlayerAttacks([4,4]);
// console.log(newGame.players.player1.board)


