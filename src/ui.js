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
        setupEventListeners: function(attack, game){
            const board2 = document.querySelector('.boardWrapper:last-of-type .board');
            const fields = board2.querySelectorAll('.field');
            fields.forEach(field => {
                field.addEventListener('click', (event) => {
                    this.handleAttacks(event, attack, game);
                })
            })
        },
        handleAttacks: function(event, attack, game){
            const coords = event.target.dataset.coords.slice(1, -1).split(',');
            try {
                let result = attack(coords);
                let attackResult = result[0].attackResult;
                let counterResult = result[1].attackResult;
                display2.textContent = attackResult;
                setTimeout(() => {
                    display1.textContent = counterResult;
                }, 750);
                printResult(attackResult, event.target);
            } catch(error){
                console.log(error);
            }
            setTimeout(()=>{
                this.update(game)
            }, 750);
        },
    }
}