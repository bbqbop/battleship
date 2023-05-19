const { initiateScreens } = require('./screens');
const screens = initiateScreens();

exports.initiateUI = function(){
    const content = document.querySelector('.content');
    const gameRecord = document.querySelector('.gameRecord');

    function createGrid(){
        const board = document.createElement('div');
        board.classList.add('board');
        const yLabels = 'ABCDEFGHIJ';
        for (let i = 10; i >= 0; i--){
            const row = document.createElement('div');
            row.classList.add('row')
            row.dataset.row = i-1;
            for (let j = 0; j <= 10; j++){
                const field = document.createElement('div');

                // print labels for the grid
                if(i == 0 || j == 0){               
                    field.classList.add('label')
                    if(i == 0){                     // X LABELS
                        if (j == 0){
                            field.textContent = '';
                            field.classList.add('corner')
                        }
                        else {
                            field.textContent = j;
                        }
                    }
                    else if(j == 0){                // Y LABELS
                        field.textContent = yLabels[i-1];
                    }
                }

                // print rows
                else{
                    field.classList.add('field');
                    field.dataset.coords = `[${i-1},${j-1}]`;
                }
                row.append(field);
            }
            board.append(row);
        }
        return board;
    };


    function printResult(result, field){
        switch(result[0]){
            case 'MISS!': 
                field.textContent = 'X';
                field.style.color = 'blue'
                break;
            case 'HIT!': 
                field.textContent = 'O';
                field.style.color = 'red'
                break;
            case 'SUNK!':
                field.textContent = 'O';
                field.style.color = 'red'
                setShipSunk(result[1], false)
                break;
        }
    };

    function printDisplay(display, string){
        display.style.opacity = '0';
        setTimeout(()=> {
            display.textContent = string;
            display.style.opacity = '1'
        },350);
        setTimeout(() => {
            display.style.opacity = '0'
        }, 1000);
    }


    function setShipSunk(ship, isBoard1){
        const boardSelector = isBoard1 ? '#board1' : '#board2';
        ship.coords.forEach(coord => {
            const sunkField = document.querySelector(`${boardSelector} [data-coords="[${coord}]"]`)
            sunkField.classList.add('sunk');
        })
    }
    
    return {
        gameSetup: async function(game, gameRecord = false){
            if (!gameRecord){
                await screens.enterNames(game);
            } else {
                game.players.player1.name = gameRecord.player1.name;
                game.players.player1.wins = gameRecord.player1.wins;
                game.players.player2.name = gameRecord.player2.name;
                game.players.player2.wins = gameRecord.player2.wins;
            }
            const userBoard = createGrid();
            await screens.setupGameboard(game, userBoard, this.updateGameboard);
            return Promise.resolve();
        },
        drawGame: function(game){
            content.innerHTML = '';
            const gameDiv = document.createElement('div');
            gameDiv.classList.add('gameDiv');
            const player1Board = createGrid();
            player1Board.id = 'board1';
            const player2Board = createGrid();
            player2Board.id = 'board2';
            const display1 = document.createElement('div');
            display1.classList.add('display');
            display1.id = 'display1';
            const d1Text = document.createElement('div');
            display1.append(d1Text);
            const display2 = document.createElement('div');
            display2.classList.add('display');
            display2.id = 'display2';
            const d2Text = document.createElement('div');
            display2.append(d2Text);

            gameDiv.append(player1Board, display1, player2Board, display2);
            content.append(gameDiv)

            gameDiv.style.opacity = '0';
            setTimeout(() => gameDiv.style.opacity = '1', 350);
        },
        update : function(game){
            if (game.twoPlayer){
                display1.textContent = game.currentPlayer ? game.players.player1.name : game.players.player2.name;
            }
            const currentPlayer = game.currentPlayer ? 'player1' : 'player2';
            const oppenentPlayer = game.currentPlayer ? 'player2' : 'player1';
            this.updateGameboard(currentPlayer, game, 'board1');
            this.updateGameboard(oppenentPlayer, game, 'board2');      
        },
        updateGameboard : function(player, game, board = 'setup'){
            for (let i = 9; i >= 0; i--){
                for (let j = 0; j < 10; j++){
                    const field = document.querySelector(`#${board} [data-coords="[${i},${j}]"`);
                    field.textContent = '';
                    field.classList.remove(...field.classList);
                    field.classList.add('field');

                    const fieldData = game.players[player].board[i][j];
                    if(fieldData === 'X'){
                        field.classList.add('miss')
                        field.textContent = fieldData;
                    }
                    else if(fieldData === 'O'){
                        if(board === 'board1'){
                            field.classList.add('ship')
                        }
                        field.classList.add('hit')
                        field.textContent = fieldData;
                        // FIND SHIP TYPE
                        for (ship in game.players[player].ships){
                            const shipCoords = game.players[player].ships[ship].coords;
                            shipCoords.some(coords => {
                                if (coords[0] === i && coords[1] === j){
                                    if(game.players[player].ships[ship].isSunk){
                                        return field.classList.add('sunk')
                                    }
                                    else{
                                        return field.classList.add(ship);
                                    }
                                }
                            })
                        }
                    }
                    else if (fieldData !== null && board === 'board1' || fieldData !== null && board === 'setup'){    
                        field.classList.add('ship');
                        field.classList.add(fieldData);
                    }

                }
            }
        }, 
        eventListenerActive: true,
        setupEventListeners: function(attack, game){
            const board2 = document.querySelector('.content #board2');
            const fields = board2.querySelectorAll('.field');
            fields.forEach(field => {
                field.addEventListener('click', (event) => {
                    this.handleAttacks(event, attack, game);
                })
            })
        },
        handleAttacks: function(event, attack, game){
            if (!this.eventListenerActive){
                return;
            };
            const display1 = document.querySelector('#display1 div')
            const display2 = document.querySelector('#display2 div')

            const coords = event.target.dataset.coords.slice(1, -1).split(',');
            let result;
            try {
                result = attack(coords);

                let attackResult = result[0].attackResult;
                printDisplay(display2, attackResult[0]);
                this.eventListenerActive = false;

                // IF SINGLE PLAYER
                if(!game.twoPlayer){
                    let counterResult = result[1].attackResult;
                    setTimeout(() => {
                        printDisplay(display1, counterResult[0])
                        if (counterResult[0] === 'SUNK!'){
                            setShipSunk(counterResult[1], true);
                        }
                    }, 1000);
                }
                printResult(attackResult, event.target);
                if(game.gameOver){
                    return
                }
                if (game.twoPlayer){
                    setTimeout(async () => {
                        await screens.switchPlayers(game);
                        this.update(game);
                        this.eventListenerActive = true
                    },1000)
                }
                else {
                setTimeout(()=>{
                    this.update(game)
                    this.eventListenerActive = true
                }, 1000);
            }
            } catch(error){
                printDisplay(display2, '!');
            }
            
            return;
        },
        toggleGameOver: function(winner, game){
            gameRecord.innerHTML = '';
            const recordPlayer1 = document.createElement('div')
            const recordPlayer2 = document.createElement('div')
            recordPlayer1.textContent = `${game.players.player1.name} : ${game.players.player1.wins} wins`;
            recordPlayer2.textContent = `${game.players.player2.name} : ${game.players.player2.wins} wins`;
            gameRecord.append(recordPlayer1, recordPlayer2);

            screens.gameOver(winner);
        },
        setupSplash: function(startGame){
            screens.splash(startGame);
        }
    }
}