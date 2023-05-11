const { Player } = require('./player');

exports.Game = function(){
    this.players = {
        player1: new Player('Player1'),
        player2: new Player('Computer'),
    };
    this.currentPlayer = true;
    this.twoPlayer = false;
    this.gameOver = false;
    this.compQueue = {lastHits: [],direction: null, cue: []};
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
                console.log(this.compQueue);
                if (this.compQueue.cue.length > 0){
                    [ row, col ] = this.compQueue.cue.shift();
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
                    this.clearQueueDirection(row, col);
                }
            } catch{
                if (this.compQueue.cue.length > 0){
                    [ row, col ] = this.compQueue.cue.shift();
                }
                else{ 
                    row = Math.floor(Math.random() * 10);
                    col = Math.floor(Math.random() * 10);
                }
            }
        }
        return result;
    },
    fillQueue: function(row, col){
        // if hit is second hit
            // compare with last hit
        if (this.compQueue.lastHits.length > 0){
            const [lastRow, lastCol] = this.compQueue.lastHits.shift();
            // if vertical
            if (row === lastRow + 1 || row === lastRow - 1 && col === lastCol){
                this.compQueue.direction = 'vertical'
                const fieldsInCol = [[row+1,col],[row-1,col],[lastRow+1, col],[lastRow-1, col]]
                fieldsInCol.forEach(coord => this.compQueue.cue.unshift(coord))

            }
            // if horizontal
            else {
                this.compQueue.direction = 'horizontal'
                const fieldsInRow = [[row,col+1],[row,col-1],[row, lastCol+1],[row, lastCol-1]]
                fieldsInRow.forEach(coord => this.compQueue.cue.unshift(coord)
                )

            }
        }
        this.compQueue.lastHits.push([row,col]);
        
        const surroundingCoords = [
            [row, col+1], [row+1, col],
            [row, col-1], [row-1, col]
        ]

        surroundingCoords.forEach(coord => {
            if(coord[0] >= 0 && coord[0] <= 9 && coord[1] >= 0 && coord[1] <= 9){
                this.compQueue.cue.push(coord);
            }
        })
    },
    clearQueueDirection: function(row, col){
        if (this.compQueue.direction === 'horizontal'){
            this.compQueue.lastHits.forEach(entry => {
                if(entry[0] === row){
                    // console.log('here', row, col)
                    const idx = this.compQueue.lastHits.indexOf(entry);
                    this.compQueue.lastHits.splice(idx, 1)
                    console.log('spliceHor', this.compQueue.lastHits.splice(idx, 1))
                }
            })
        }
        else {
            this.compQueue.lastHits.forEach(entry => {
                if(entry[1] === col){
                    const idx = this.compQueue.lastHits.indexOf(entry);
                    this.compQueue.lastHits.splice(idx, 1)
                    console.log('spliceVert', this.compQueue.lastHits.splice(idx, 1))
                }
            })
        }
    }

};


