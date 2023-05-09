exports.initiateUI = function(){
    const content = document.querySelector('.content');
    content.innerHTML = '';

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

    window.addEventListener('gameOver', (event) => {
        gameOver.style.transform = 'scale(1)';
        player1Board.style.filter = 'blur(5px)'
        player2Board.style.filter = 'blur(5px)'
        gameOverResult.textContent = `${event.detail} loses!`
    })
    newGameBtn.addEventListener('click', () => {
        gameOver.style.transform = 'scale(0)';
        player1Board.style.filter = '';
        player2Board.style.filter = '';
        const newGameEvent = new CustomEvent('newGame');
        window.dispatchEvent(newGameEvent);
    })


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
        update : function(game){
            for (let i = 9; i >= 0; i--){
                for (let j = 0; j < 10; j++){
                    const field = document.querySelector(`[data-coords="[${i},${j}]"`)
                    const fieldData = game.players.player1.board[i][j];
                    if(fieldData === 'X'){
                        field.classList.add('miss')
                        field.style.color = 'blue'
                        field.textContent = fieldData;
                    }
                    else if(fieldData === 'O'){
                        field.classList.add('hit')
                        field.style.color = 'red'
                        field.textContent = fieldData;
                    }
                    else if (fieldData !== null){    
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
                let counterResult = result[1].attackResult;
                printDisplay(display2, attackResult[0]);
                this.eventListenerActive = false;
                setTimeout(() => {
                    printDisplay(display1, counterResult[0])
                    if (counterResult[0] === 'SUNK!'){
                        setShipSunk(counterResult[1], true);
                    }
                }, 1000);
                printResult(attackResult, event.target);
                setTimeout(()=>{
                    this.update(game)
                    this.eventListenerActive = true
                }, 1000);
            } catch(error){
                printDisplay(display2, '!');
            }
            
            return;
        },
    }
}