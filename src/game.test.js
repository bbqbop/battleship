const { Ship } = require('./ship');
const { Player } = require('./player.js');
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

// PLAYER FACTORY

test('Player factory initializes gameboard with 10 rows', () => {
    const board1 = new Player;
    expect(board1.board.length).toBe(10);
});

test('Player factory initializes gameboard with 10 colums', () => {
    const board1 = new Player;
    expect(board1.board[9].length).toBe(10);
});

test('.placeShip(length, start, isVert) places ships on gameboard with ship initials', () => {
    const board1 = new Player;
    board1.placeShip(3, [2, 2], false)
    expect(board1.board[2][2]).toBe('C');
    expect(board1.board[3][2]).toBe('C');
    expect(board1.board[4][2]).toBe('C');
});

test('.placeShip(length, start, isVert) stores new Ship in Player.ships object', () => {
    const board1 = new Player;
    board1.placeShip(3, [2, 2], false)
    expect(board1.ships.C).toEqual({"hitCount": 0, "isSunk": false, "length": 3});
});

test('.placeShip(length, start, isVert) throws error when its limits are out of bounds', () => {
    const board1 = new Player;
    expect((() => board1.placeShip(3, [9, 2], false))).toThrow(('Invalid placement. Out of bounds'));
    ;
});

test('.placeShip(length, start, isVert) throws error when its limits are crossing another ship', () => {
    const player1 = new Player;
    player1.placeShip(3, [0, 0], false);
    expect((() => player1.placeShip(3, [2, 2], true))).toThrow(('Invalid placement. Ships cannot cross'));
    ;
});

test('.populateGameboard places 7 ships on the GameBoard randomly', () => {
    const player1 = new Player;
    player1.populateGameboard();
    expect(Object.keys(player1.ships).length).toBe(7);
    ;
});

test('.receiveAttack(coordinates) stores missed attack on gameboard as X', () => {
    const board1 = new Player;
    board1.receiveAttack([2,2]);
    expect(board1.board[2][2]).toBe('X');
})

test('.receiveAttack(coordinates) calls hit() on a ship when hit', () => {
    const board1 = new Player;
    board1.placeShip(3, [2, 2], false);
    board1.receiveAttack([2,2]);
    expect(board1.ships.C.hitCount).toBe(1);
})

test('.receiveAttack(coordinates) throws Error when same coordinates are hit twice', () => {
    const board1 = new Player;
    board1.placeShip(3, [2, 2], false);
    board1.receiveAttack([2,2]);
    expect(() => board1.receiveAttack([2,2])).toThrow('Invalid move, field has already been attacked');
})


test('hasLost flips to true when all ships are sunk', () => {
    const board1 = new Player;
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
    expect(newGame.currentPlayer).toBe(true)
    expect(newGame.players.player1.board.some(row => row.includes('X'))).toBe(true)
})

test('Computer will shoot again after receiving error of hitting the same target twice', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
    const newGame = new Game();
    newGame.compAttack();
    expect(() => newGame.compAttack()).toThrow('Maximum call stack size exceeded')
    jest.spyOn(Math, 'random').mockRestore();
})