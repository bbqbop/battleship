const { Player } = require('./player');

exports.Game = function(twoPlayer){
    this.players = {
        player1: new Player('Player1'),
        player2: new Player('Computer'),
    };
    this.currentPlayer = true;
    this.twoPlayer = twoPlayer;
    this.gameOver = false;
    this.compQueue = {lastHits: [], direction: null, cue: []};
}
this.Game.prototype = {
    curPlayerAttacks: function(coords){
        if(this.gameOver) return
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
        if(this.gameOver) return
        let result;
        let row;
        let col;
        while(!result){
            try{
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
                    this.clearQueue(result.attackResult[1].coords);
                }
            } catch{
                continue
            }
        }
        return result;
    },
    fillQueue: function(row, col){
        // if hit is second hit
            // compare with last hit
        if (this.compQueue.lastHits.length > 0){
            if (!this.compQueue.direction){
                this.trackDirection(row, col);
            }
            const [lastRow, lastCol] = this.compQueue.lastHits[this.compQueue.lastHits.length - 1];
            
            let fieldsInDirection;
            if (this.compQueue.direction === 'vertical'){
                fieldsInDirection = [[row+1,col],[row-1,col],[lastRow+1, col],[lastRow-1, col]]
            }
            else if (this.compQueue.direction === 'horizontal'){
                fieldsInDirection = [[row,col+1],[row,col-1],[row, lastCol+1],[row, lastCol-1]]
            }  
                
            fieldsInDirection.forEach(coord => {
                const isInCue = this.compQueue.cue.some(arr => {
                    return JSON.stringify(arr) === JSON.stringify(coord)
                })
                if(!isInCue){
                    this.compQueue.cue.unshift(coord)
                }
            })
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
    clearQueue: function(shipCoords){
        shipCoords.forEach(x => {
            this.compQueue.lastHits.some(y => {
                strX = JSON.stringify(x);
                strY = JSON.stringify(y);
                if (strX === strY){
                    const idx = this.compQueue.lastHits.findIndex(z => {
                        return JSON.stringify(z) === strY;
                    })
                    this.compQueue.lastHits.splice(idx, 1);
                }
            })
        })
        this.compQueue.direction = null;
        if (this.compQueue.lastHits.length > 0){
            const [row, col] = this.compQueue.lastHits.pop()
            this.fillQueue(row, col);
        }
    },
    trackDirection: function(row, col){
        const [lastRow, lastCol] = this.compQueue.lastHits[this.compQueue.lastHits.length - 1];
        if (row === lastRow + 1 && col === lastCol || row === lastRow - 1 && col === lastCol){
            this.compQueue.direction = 'vertical'
        }
        else if (col === lastCol + 1 && row === lastRow || col === lastCol - 1 && row === lastRow){

            this.compQueue.direction = 'horizontal'
        }
        return;
    }
}


