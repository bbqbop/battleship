exports.initiateUI = function(){
    const content = document.querySelector('.content');
    const player1Board = createGrid();
    const player2Board = createGrid();
    content.append(player1Board, player2Board);

    function createGrid(){
        const board = document.createElement('div');
        board.classList.add('board');
        for (let i = 9; i >= 0; i--){
            const row = document.createElement('div');
            row.classList.add('row')
            row.dataset.row = i;
            for (let j = 0; j < 10; j++){
                const field = document.createElement('div');
                field.classList.add('field');
                field.dataset.coords = `[${i},${j}]`;
                // field.textContent = `[${i},${j}]`;
                row.append(field);
            }
            board.append(row);
        }
        return board;
    }
    return {
        update : function(game){
            for (let i = 9; i >= 0; i--){
                for (let j = 0; j < 10; j++){
                    const field = document.querySelector(`[data-coords="[${i},${j}]"`)
                    const fieldData = game.players.player1.board[i][j];
                    field.textContent = fieldData;
                    if(fieldData === 'X'){
                        field.style.color = 'blue'
                    }
                    else if(fieldData === 'O'){
                        field.style.color = 'red'
                    }
                    else if (fieldData !== null){    
                        field.style.color = 'green'
                    }
                }
            }
        },
        setupEventListeners: function(attack, game){
            const board2 = document.querySelector('.board:last-of-type');
            const fields = board2.querySelectorAll('.field');
            fields.forEach(field => {
                field.addEventListener('click', (e) => {
                    const coords = e.target.dataset.coords.slice(1, -1).split(',');
                    try {
                        let result = attack(coords);
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
                                alert(result);
                                break;
                        }
                    } catch(error){
                        console.log(error);
                    }
                    setTimeout(()=>{
                        this.update(game)
                    }, 750);
                })
            })
        },
    }
}