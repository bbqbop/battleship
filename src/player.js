const { Ship } = require('./ship');

exports.Player = function(){
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.ships = {};
    this.hasLost = false;
}
this.Player.prototype = {
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
                this.testShipCrossing(row, col - i);
                this.board[row][col - i] = initial;
            }
            else{
                this.testShipCrossing(row, col + i);
                this.board[row + i][col] = initial;
            }
        }        
    },
    populateGameboard: function(){
        const shipsLength = [5, 4, 3, 2, 2, 1, 1];
        let allShipsPlaced = false;

        while (!allShipsPlaced) {
            allShipsPlaced = true; // Assume all ships are placed until proven otherwise

            for (let length of shipsLength) {
                let row = Math.floor(Math.random() * 9);
                let col = Math.floor(Math.random() * 9);
                let isVert = Math.random() > 0.5 ? true : false;

            try {
                this.placeShip(length, [row, col], isVert);
            } catch (error) {
                console.log('Error placing ship:', error.message);
                allShipsPlaced = false; // Set to false if any ship placement fails
                this.board = new Array(10).fill(null).map(() => new Array(10).fill(null)); // Clear the board
                break; // Restart the loop for retrying ship placement
            }
            }
  }
    },
    testShipCrossing: function(row, col){
        if(this.board[row][col] !== null){
            throw new Error('Invalid placement. Ships cannot cross');
        }
    },
    findShipType: function(length) {
        switch(length){
            case(5): return 'A';
            case(4): return 'B';
            case(3): return 'C';
            case(2): return this.ships.D1 ? 'D2' : 'D1';
            case(1): return this.ships.S1 ? 'S2' : 'S1';
        }
    },
    receiveAttack: function(coordinates) {
        const [row, col] = coordinates;
        const field = this.board[row][col]
        if(field == 'X'){
            throw new Error('Invalid move, field has already been attacked')
        }
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


// const player1 = new this.Player;
// player1.populateGameboard();
// // player1.placeShip(3, [0, 0], false);
// // player1.placeShip(3, [2, 2], true);
// console.log(player1.board)
// console.log(player1.ships)
