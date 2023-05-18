const shipsPreview = document.querySelector('.shipsPreview');
let angle = 0;

const ships = [[5,'A','Carrier'],[4,'B','Battleship'],[3,'C','Cruiser'],[3,'S','Submarine'],[2,'D', 'Destroyer']];
const boxSize = 30;

for (let i = 0; i < ships.length; i++){
    const ship = document.createElement('div');
    ship.classList.add('field', 'ship', ships[i][1]);
    ship.style.height = `${boxSize}px`;
    ship.style.width = `${ships[i][0] * boxSize}px`;
    ship.textContent = ships[i][2];
    ship.style.fontSize = `calc(0.3rem * ${ships[i][0]})`
    ship.draggable = true;
    shipsPreview.append(ship);
}

const optionShips = shipsPreview.querySelectorAll('.ship');

const flipBtn = document.createElement('button');
flipBtn.textContent = 'Flip';
shipsPreview.append(flipBtn);
flipBtn.addEventListener('click', () => {
    angle = angle === 0 ? 90 : 0;
    optionShips.forEach(ship => {
        ship.style.transform = `rotate(${angle}deg)`;
    })
})

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

gameBoard.append(board)


// DRAG SHIPS
let draggedShip;

optionShips.forEach(ship => {
    ship.addEventListener('dragstart', (e) => {
        draggedShip = e.target;
        // e.target.style.display = 'none';
    });

    // Add event listener to the ship for rotation
    ship.addEventListener('click', () => {
        const currentAngle = parseInt(ship.style.transform.replace('rotate(', '').replace('deg)', ''));
        const newAngle = (currentAngle === 0) ? 90 : 0;
        ship.style.transform = `rotate(${newAngle}deg)`;
    });
});

const boardBlocks = document.querySelectorAll('.field:not(.ship)');
boardBlocks.forEach(block => {
    block.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    block.addEventListener('drop', dropShip);
});

function dropShip(e) {
    e.preventDefault();
    const targetBlock = e.target;
    targetBlock.appendChild(draggedShip);
}
