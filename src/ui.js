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
                    field.textContent = game.players.player1.board[i][j];
                }
            }
        },
    }
}