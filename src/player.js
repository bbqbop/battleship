const { Ship } = require('./ship');

exports.Player = function(){
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.ships = {};
    this.hasLost = false;
}
this.Player.prototype = {
    placeShip: function(length, startPos, isVert){
        let [row, col] = startPos;
        this.testShipPlacement(length, row, col , isVert);
        const initial = this.findShipType(length);
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
    testShipPlacement: function(length, row, col , isVert){
        for (i = 0; i < length; i++){
            if(isVert){
                if(this.board[row][col - i] !== null){
                    throw new Error('Invalid placement.');
                }
            }
            else{
                if(this.board[row + i][col] !== null){
                    throw new Error('Invalid placement.');
                }
            }
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
    populateGameboard: function(){
        const shipsLength = [5, 4, 3, 2, 2, 1, 1];
        let allShipsPlaced = false;

        while (!allShipsPlaced) {
            // Assume all ships are placed until proven otherwise
            allShipsPlaced = true; 

            for (let length of shipsLength) {
                let row = Math.floor(Math.random() * 10);
                let col = Math.floor(Math.random() * 10);
                let isVert = Math.random() > 0.5 ? true : false;

                try {
                    this.placeShip(length, [row, col], isVert);
                } catch {
                    // Set to false if any ship placement fails
                    allShipsPlaced = false; 
                    // Delete already placed ships
                    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null)); 
                    this.ships = {};
                    // start again
                    break;
                }
            }
        }
    },
    receiveAttack: function(coordinates) {
        let attackResult;

        const [row, col] = coordinates;
        const field = this.board[row][col]
        if(field == 'X' || field == 'O'){
            throw new Error('Invalid move, field has already been attacked');
        }
        if(field != null){
            attackResult = this.ships[field].hit()
            this.checkStatus();
            this.board[row][col] = 'O';
        }
        else{
            attackResult = 'MISS!'
            this.board[row][col] = 'X';
        }
        return {attackResult, isGameOver: this.hasLost};
    },
    checkStatus: function(){
        if(Object.values(this.ships).every(ship => ship.isSunk)){
            this.hasLost = true;
            const gameOverEvent = new CustomEvent('gameOver');
            window.dispatchEvent(gameOverEvent);
        };
    }
}

