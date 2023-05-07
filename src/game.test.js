const { Ship } = require('./ship');
const { GameBoard } = require('./gameboard.js');
const { Game } = require('./game');

// SHIP FACTORY

test('Ship initializes property object', () => {
    const myShip = new Ship(5);
    expect(myShip).toEqual({length: 5, hitCount: 0, isSunk: false})
});

test('Ship.hit() increases hit count', () => {
    const myShip = new Ship(5);
    myShip.hit();
    expect(myShip.hitCount).toBe(1);
});

test('Ship.hit() no of length times will sink it', () => {
    const myShip = new Ship(2);
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk).toBe(true);
});

// GAMEBOARD FACTORY

test('GameBoard factory initializes gameboard with 10 rows', () => {
    const board1 = new GameBoard;
    expect(board1.board.length).toBe(10);
});

test('GameBoard factory initializes gameboard with 10 colums', () => {
    const board1 = new GameBoard;
    expect(board1.board[9].length).toBe(10);
});

test('.placeShip(length, start, isVert) places ships on gameboard with ship initials', () => {
    const board1 = new GameBoard;
    board1.placeShip(3, [2, 2], false)
    expect(board1.board[2][2]).toBe('C');
    expect(board1.board[3][2]).toBe('C');
    expect(board1.board[4][2]).toBe('C');
});

test('.placeShip(length, start, isVert) stores new Ship in GameBoard.ships object', () => {
    const board1 = new GameBoard;
    board1.placeShip(3, [2, 2], false)
    expect(board1.ships.C).toEqual({"hitCount": 0, "isSunk": false, "length": 3});
});

test('.placeShip(length, start, isVert) throws error when its limits are out of bounds', () => {
    const board1 = new GameBoard;
    expect((() => board1.placeShip(3, [9, 2], false))).toThrow(('Invalid placement. Out of bounds'));
    ;
});

test('.receiveAttack(coordinates) stores missed attack on gameboard as X', () => {
    const board1 = new GameBoard;
    board1.receiveAttack([2,2]);
    expect(board1.board[2][2]).toBe('X');
})

test('.receiveAttack(coordinates) calls hit() on a ship when hit', () => {
    const board1 = new GameBoard;
    board1.placeShip(3, [2, 2], false);
    board1.receiveAttack([2,2]);
    expect(board1.ships.C.hitCount).toBe(1);
})

test('hasLost flips to true when all ships are sunk', () => {
    const board1 = new GameBoard;
    board1.placeShip(2, [2, 2], true);
    board1.receiveAttack([2,2]);
    board1.receiveAttack([2,1]);
    expect(board1.ships.D1.isSunk).toBe(true);
    expect(board1.hasLost).toBe(true);
})

// Game

test('Game has two players when instantiated', () => {
    const newGame = new Game();
    expect(Object.keys(newGame.players).length).toBe(2);
})

test('Game.curPlayerAttacks has player1 attack player2, then 2 - 1', () => {
    const newGame = new Game();
    newGame.compEnemy = false;
    newGame.curPlayerAttacks([2,2]);
    newGame.curPlayerAttacks([4,4]);
    expect(newGame.players.player2.board[2][2]).toBe('X');
    expect(newGame.players.player1.board[4][4]).toBe('X');
})

test('Computer attacks after player 1s move', () => {
    const newGame = new Game();
    newGame.curPlayerAttacks([2,2]);
    expect(newGame.players.player1.board.find(row => row.find(field => field == 'X')).length).toBe(10)
})