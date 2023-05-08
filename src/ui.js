exports.initiateUI = function(){
    const content = document.querySelector('.content');
    const boardWrapper1 = document.createElement('div');
    boardWrapper1.classList.add('boardWrapper');
    const boardWrapper2 = document.createElement('div');
    boardWrapper2.classList.add('boardWrapper');
    const player1Board = createGrid();
    const player2Board = createGrid();
    const display1 = document.createElement('div');
    display1.classList.add('display');
    const display2 = document.createElement('div');
    display2.classList.add('display');
    boardWrapper1.append(player1Board, display1);
    boardWrapper2.append(player2Board, display2);
    content.append(boardWrapper1, boardWrapper2);

    // GAMEOVER SCREEN

    const gameOver = document.createElement('div');
    gameOver.classList.add('gameOverScreen');
    const newGame = document.createElement('button');
    newGame.textContent = 'Start new game';
    gameOver.textContent = 'GAME OVER';
    gameOver.append(newGame);
    gameOver.style.transform = 'scale(0)';
    content.append(gameOver);

    window.addEventListener('gameOver', (details) => {
        gameOver.style.transform = 'scale(1)';
        console.log(details)
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
                if(i == 0 || j == 0){               // print labels for the grid
                    field.classList.add('label')
                    if(i == 0){                     // X
                        if (j == 0){
                            field.textContent = '';
                            field.classList.add('corner')
                        }
                        else {
                            field.textContent = j;
                        }
                    }
                    else if(j == 0){                // Y
                        field.textContent = yLabels[i-1];
                    }
                }
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
        switch(result){
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
                break;
        }
    };
    return {
        update : function(game){
            for (let i = 9; i >= 0; i--){
                for (let j = 0; j < 10; j++){
                    const field = document.querySelector(`[data-coords="[${i},${j}]"`)
                    const fieldData = game.players.player1.board[i][j];
                    field.textContent = fieldData;
                    if(fieldData === 'X'){
                        field.classList.add('miss')
                        field.style.color = 'blue'
                    }
                    else if(fieldData === 'O'){
                        field.classList.add('hit')
                        field.style.color = 'red'
                    }
                    else if (fieldData !== null){    
                        field.classList.add('ship')
                        field.style.color = 'green'
                    }
                }
            }
        },
        eventListenerActive: true,
        setupEventListeners: function(attack, game){
            const board2 = document.querySelector('.boardWrapper:nth-of-type(2) .board');
            console.log(board2)
            const fields = board2.querySelectorAll('.field');
            fields.forEach(field => {
                field.addEventListener('click', (event) => {
                    this.handleAttacks(event, attack, game);
                })
            })
        },
        handleAttacks: function(event, attack, game){
            if(!this.eventListenerActive){
                return;
            };
            const coords = event.target.dataset.coords.slice(1, -1).split(',');
            let result;
            try{
                result = attack(coords);
                let attackResult = result[0].attackResult;
                let counterResult = result[1].attackResult;
                display2.textContent = attackResult;
                this.eventListenerActive = false;
                setTimeout(() => {
                    display1.textContent = counterResult;
                }, 750);
                printResult(attackResult, event.target);
                setTimeout(()=>{
                    this.update(game)
                    this.eventListenerActive = true
                }, 750);
            }catch(error){
                display2.textContent = error.message;
            }
            return;
        },
    }
}