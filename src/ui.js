exports.initiateUI = function(){
    const content = document.querySelector('.content');
    content.innerHTML = '';

    // Splash page
    const splash = document.createElement('div');
    splash.classList.add('splash');
    const singlePlayerBtn = document.createElement('button');
    singlePlayerBtn.id = 'singlePlayerBtn'
    singlePlayerBtn.textContent = 'Single player'
    const twoPlayerBtn = document.createElement('button');
    twoPlayerBtn.id = 'twoPlayerBtn'
    twoPlayerBtn.textContent = 'Two players'
    splash.append(singlePlayerBtn, twoPlayerBtn);
    content.append(splash)

    // GameBoards

    const player1Board = createGrid();
    player1Board.id = 'board1';
    const player2Board = createGrid();
    player2Board.id = 'board2';
    const display1 = document.createElement('div');
    display1.classList.add('display');
    display1.id = 'display1';
    const display2 = document.createElement('div');
    display2.classList.add('display');
    display2.id = 'display2';

   
    content.append(player1Board, display1, player2Board, display2);

    // GAMEOVER SCREEN

    const gameOver = document.createElement('div');
    gameOver.classList.add('gameOverScreen');
    const gameOverTitle = document.createElement('h1');
    gameOverTitle.textContent = 'GAME OVER'
    const gameOverResult = document.createElement('h2');
    const newGameBtn = document.createElement('button');
    newGameBtn.textContent = 'Start new game';
    gameOver.append(gameOverTitle, gameOverResult, newGameBtn);
    gameOver.style.transform = 'scale(0)';
    content.append(gameOver);

    newGameBtn.addEventListener('click', () => {
        gameOver.style.transform = 'scale(0)';
        player1Board.style.filter = '';
        player2Board.style.filter = '';
        const newGameEvent = new CustomEvent('newGame');
        window.dispatchEvent(newGameEvent);
    })

    // SWITCH PLAYER SCREEN
    const switchPlayerScreen = document.createElement('div');
    switchPlayerScreen.classList.add('switchPlayerScreen');
    switchPlayerScreen.innerHTML = "<span></span>'s turn in &nbsp;<span><span>"
    switchPlayerScreen.style.transform = 'scale(0)'
    content.append(switchPlayerScreen);


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
        display.textContent = string;

        setTimeout(() => {
            display.textContent = '';
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
        setupSplashMenu: function(callback){
            singlePlayerBtn.addEventListener('click', ()=>{
                callback(false);
            });
            twoPlayerBtn.addEventListener('click', ()=>{
                callback(true);
            });
        },
        update : function(game){
            const currentPlayer = game.currentPlayer ? 'player1' : 'player2';
            const oppenentPlayer = game.currentPlayer ? 'player2' : 'player1';
            this.updateGameboard(currentPlayer, 'board1', game);
            this.updateGameboard(oppenentPlayer, 'board2', game);      
        },
        updateGameboard : function(player, board, game){
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
                    else if (fieldData !== null && board === 'board1'){    
                        field.classList.add('ship');
                        field.classList.add(fieldData);
                    }

                }
            }
        },
        eventListenerActive: true,
        setupEventListeners: function(attack, game){
            const board2 = document.querySelector('#board2');
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
                if (game.twoPlayer){
                    setTimeout(() => {
                    this.switchPlayers(game);
                    }, 1500)
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
        toggleGameOver: function(winner){
                gameOver.style.transform = 'scale(1)';
                player1Board.style.filter = 'blur(5px)'
                player2Board.style.filter = 'blur(5px)'
                gameOverResult.textContent = `${winner} wins!`
        
        },
        switchPlayers: function(game){
            const currentPlayer = game.currentPlayer ? game.players.player1.name : game.players.player2.name;
            const span1 = document.querySelector('.switchPlayerScreen span:first-child');
            const span2 = document.querySelector('.switchPlayerScreen span:last-child');
            const elementsToBlur = document.querySelectorAll('.content > *:not(.switchPlayerScreen)');
            elementsToBlur.forEach(element => element.style.filter = 'blur(15px)');
            player1Board.classList.toggle('hide');
            switchPlayerScreen.style.transform = 'scale(1)';
            span1.textContent = currentPlayer;
            for (let i = 1; i < 4; i++){
                setTimeout(() => {
                    span2.textContent = 4 - i;
                }, 1000 * i)
            }
            setTimeout(() => {
                switchPlayerScreen.style.transform = 'scale(0)';
                elementsToBlur.forEach(element => element.style.filter = 'blur(0px)');
                this.update(game);
                span2.textContent = '';
                this.eventListenerActive = true;
                player1Board.classList.toggle('hide');
            }, 4000)
            return;
        }
    }
}