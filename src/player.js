const { Ship } = require('./ship');

exports.Player = function(name){
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.ships = {};
    this.hasLost = false;
    this.name = name;
}
this.Player.prototype = {
    placeShip: function(length, initial, startPos, isVert){
        let [row, col] = startPos;
        this.testShipPlacement(length, row, col , isVert);
        this.ships[initial] = new Ship(length);
        for (i = 0; i < length; i++){
            if(isVert){
                this.board[row - i][col] = initial;
                this.ships[initial].coords.push([row - i, col])
            }
            else{
                this.board[row][col + i] = initial;
                this.ships[initial].coords.push([row, col + i])

            }
        }        
    },
    testShipPlacement: function(length, row, col , isVert){
        for (i = 0; i < length; i++){
            if(isVert){
                if(this.board[row - i][col] !== null){
                    throw new Error('Invalid placement.');
                }
            }
            else{
                if(this.board[row][col + i] !== null){
                    throw new Error('Invalid placement.');
                }
            }
        }   
    },
    findShipType: function(length) {
        switch(length){
            case(5): return 'A';
            case(4): return 'B';
            case(3): return this.ships.C ? 'S' : 'C';
            case(2): return 'D';
        }
    },
    populateGameboard: function(gameMode){
        let allShipsPlaced = false;

        while (!allShipsPlaced) {
            // Assume all ships are placed until proven otherwise
            allShipsPlaced = true; 

            for (let ship of gameMode.ships) {
                let length = ship[0];
                let initial = ship[1];
                let row = Math.floor(Math.random() * 10);
                let col = Math.floor(Math.random() * 10);
                let isVert = Math.random() > 0.5 ? true : false;

                try {
                    this.placeShip(length, initial, [row, col], isVert);
                } catch {
                    // Set to false if any ship placement fails
                    allShipsPlaced = false; 
                    // Delete already placed ships
                    this.clearAll();
                    // start again
                    break;
                }
            }
        }
    },
    clearAll: function(){
        this.board = new Array(10).fill(null).map(() => new Array(10).fill(null)); 
        this.ships = {};
    },
    receiveAttack: function(coordinates) {
        let attackResult;

        const [row, col] = coordinates;
        const field = this.board[row][col]
        if(field == 'X' || field == 'O'){
            throw new Error('Invalid move, field has already been attacked');
        }
        if(row < 0 || row > 9 || col < 0 || col > 9){
            throw new Error('Invalid move, coordinates out of bounds')
        }
        if(field != null){
            attackResult = this.ships[field].hit()
            this.checkStatus();
            this.board[row][col] = 'O';
        }
        else{
            attackResult = ['MISS!',null]
            this.board[row][col] = 'X';
        }
        return {attackResult, isGameOver: this.hasLost};
    },
    checkStatus: function(){
        if(Object.values(this.ships).every(ship => ship.isSunk)){
            this.hasLost = true;
            const gameOverEvent = new CustomEvent('gameOver', {detail: this.name});
            window.dispatchEvent(gameOverEvent);
        };
    }
}

