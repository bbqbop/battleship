const { Ship } = require('./ship');

exports.Gameboard = function(){
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.ships = {};
    this.hasLost = false;
}
this.Gameboard.prototype = {
    placeShip: function(length, startPos, isVert){
        const initial = this.findShipType(length);
        let [row, col] = startPos;
        const maxCoordinate = isVert ? col - length + 1 : row + length - 1;
        if (maxCoordinate < 0 || maxCoordinate > 9){
            throw new Error('Invalid placement. Out of bounds')
        };
        this.ships[initial] = new Ship(length);
        for (i = 0; i < length; i++){
            if(isVert){
                this.board[row][col - i] = initial;
            }
            else{
                this.board[row + i][col] = initial;
            }
        }        
    },
    findShipType: function(length) {
        switch(length){
            case(5): return 'A';
            case(4): return 'B';
            case(3): return 'C';
            case(2): return this.ships.C1 ? 'D2' : 'D1';
            case(1): return this.ships.S1 ? 'S2' : 'S1';
        }
    },
    receiveAttack: function(coordinates) {
        const [row, col] = coordinates;
        const field = this.board[row][col]
        if(field != null){
            this.ships[field].hit()
            this.checkStatus();
        }
        this.board[row][col] = 'X';
    },
    checkStatus: function(){
        if(Object.values(this.ships).every(ship => ship.isSunk)){
            this.hasLost = true;
        };
    }
}

const board = new this.Gameboard;
board.placeShip(2,[2,2],false)
board.receiveAttack([2,2])
board.receiveAttack([3,2])

console.log(board)