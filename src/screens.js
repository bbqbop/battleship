exports.initiateScreens = function(){
    const menus = document.querySelector('.menus');

     // SWITCH PLAYER SCREEN
     const switchPlayerScreen = document.createElement('div');
     switchPlayerScreen.classList.add('switchPlayerScreen');
     switchPlayerScreen.innerHTML = "<span></span>'s turn in &nbsp;<span><span>"
     switchPlayerScreen.style.transform = 'scale(0)'
     menus.append(switchPlayerScreen);

    return {
        enterNames: function(game){
            return new Promise((resolve, reject) => {
                const enterNameForm = document.createElement('form');
                const label = document.createElement('label');
                const nameInp = document.createElement('input');
                nameInp.placeholder = 'Player 1'
                label.textContent = 'Player 1 enter name:'
                label.append(nameInp);
                enterNameForm.append(label);
                menus.append(enterNameForm);
                nameInp.focus()


                let player = 'player1'
                enterNameForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const name = e.target[0].value === '' ? e.target[0].placeholder : e.target[0].value
                    game.players[player].name = name
                    if (game.twoPlayer && player === 'player1'){
                        nameInp.value = '';
                        nameInp.placeholder = 'Player 2'
                        label.textContent = 'Player 2 enter name:'
                        label.append(nameInp);
                        nameInp.focus();
                        player = 'player2'
                    }
                    else {
                        enterNameForm.style.transform = 'scale(0)';
                        resolve();
                    }
                })
            });
        },
        setupGameboard: function(game, board, update, player, gameMode){
            const fields = board.querySelectorAll('.field');
           
            return new Promise((resolve, reject) => {
                let curPlayer = player || 'player1';
                const setupContainer = document.createElement('div');
                setupContainer.classList.add('setupContainer');
                const title = document.createElement('h1');
                title.textContent = `${game.players[curPlayer].name} place your ships`;
                board.id = 'board1';
                const error = document.createElement('span');

                gameMode = gameMode || 'modern';
                const gameModeSelect = document.createElement('select');
                const optModern = document.createElement('option');
                optModern.textContent = 'Modern';
                optModern.id = 'modern';
                const optClassic = document.createElement('option');
                optClassic.textContent = 'Classic';
                optClassic.id = 'classic';
                gameModeSelect.addEventListener('change', (e) => {
                    gameMode = e.target.value.toLowerCase();
                    game.players[curPlayer].clearAll();
                    update(curPlayer, 'board1', game);
                    printShips();
                })
                gameModeSelect.append(optModern, optClassic);

                if (player === 'player2'){
                    optModern.id === gameMode ? optModern.selected = true : optClassic.selected = true;
                    gameModeSelect.disabled = true;
                }

                const randomBtn = document.createElement('button');
                randomBtn.textContent = 'Random';
                randomBtn.addEventListener('click', () => {
                    game.players[curPlayer].populateGameboard(game.gameMode[gameMode]);
                    update(curPlayer, 'board1', game);
                });

                startGameBtn = document.createElement('button');
                startGameBtn.textContent = game.twoPlayer && curPlayer !== 'player2' ? 'Next' : 'Start Game'
                startGameBtn.addEventListener('click', () => {
                    if (startGameBtn.textContent === 'Next'){
                        game.currentPlayer = !game.currentPlayer;
                        this.switchPlayers(game);
                        
                        // clear screen
                        setupContainer.innerHTML = '';
                        fields.forEach(field => {
                            field.classList.remove('ship');
                        });

                        setTimeout(() => {
                            this.setupGameboard(game, board, update, 'player2', gameMode);
                        },4000);
                    }
                    else {
                        if (!game.twoPlayer){
                            game.players.player2.populateGameboard(game.gameMode[gameMode]);
                        }
                        if (shipsPreview.childElementCount !== 0){

                            error.textContent = 'place all remaining ships!'
                            return;
                        }
                        setupContainer.innerHTML = '';
                        return resolve();
                    }
                });

                // Ships preview
                const shipsPreview = document.createElement('div');
                shipsPreview.classList.add('shipsPreview');

                function printShips(){
                    shipsPreview.innerHTML = '';
                    let boxSize = 30;
                    let shipsList = game.gameMode[gameMode].ships;
                    for (let i = 0; i < shipsList.length; i++){
                        const ship = document.createElement('div');
                        ship.classList.add('preview', 'ship', shipsList[i][1]);
                        ship.style.height = `${boxSize}px`;
                        ship.style.width = `${shipsList[i][0] * boxSize}px`;
                        ship.textContent = shipsList[i][2];
                        ship.style.fontSize = `calc(0.3rem * ${shipsList[i][0]})`
                        ship.draggable = true;
                        shipsPreview.append(ship);
                    }
                }
                printShips()

                ////////////////
                // Drag and Drop
                ////////////////
                let angle = 0;
                const previewShips = shipsPreview.querySelectorAll('div');
                previewShips.forEach(ship => {
                    ship.addEventListener('dragstart', dragStart);
                    ship.addEventListener('dragend', dragEnd);
                    ship.addEventListener('dblclick', () => {
                        angle = angle === 0 ? 90 : 0;
                        ship.style.transform = `rotate(${angle}deg)`
                    })
                })
                // document.addEventListener('drag', handleDrag);

                fields.forEach(field => {
                    field.addEventListener('dragenter', dragEnter);
                    field.addEventListener('dragover', dragOver);
                    field.addEventListener('dragleave', dragLeave);
                    field.addEventListener('drop', dragDrop);
                })


                // Drag functions
                    // Ships
                let offsetL;
                let offsetR;
                let offsetU;
                let offsetD;
                let draggedItem;
                let fieldsArr = [];
                let vert = false;
                let invalid = false;

                function dragStart(e){
                    const draggedRect = this.getBoundingClientRect();
                    offsetL = e.clientX - draggedRect.left;
                    offsetR = draggedRect.width - offsetL;
                    offsetU = e.clientY - draggedRect.top;
                    offsetD = draggedRect.height - offsetU;
                    draggedItem = e.target;

                    // create copy of ship in container to allow rotated drag image
                    const dragImageContainer = document.createElement('div');
                    dragImageContainer.id = 'dragImage';
                    dragImageContainer.style.position = 'absolute';
                    dragImageContainer.style.top = '-150px';
                    const copy = this.cloneNode(true);
                    copy.style.transform = `rotate(${angle}deg)`;
                    dragImageContainer.append(copy);
                    document.body.append(dragImageContainer);
                    e.dataTransfer.setDragImage(dragImageContainer, 0, 0);

                    setTimeout(() => this.style.display = 'none', 0);
                };
                function dragEnd(){
                    this.style.display = 'flex';
                    const dragImage = document.querySelector('#dragImage');
                    document.body.removeChild(dragImage);
                    offsetL = null;
                    offsetR = null;
                    offsetU = null;
                    offsetD = null;
                    clearFieldsArr();
                };
                function dragEnter(e){
                    invalid = false;
                    if(offsetU > 30 || offsetD > 30){
                        vert = true;
                    }   
                    const fieldsUp = (offsetU - offsetU % 30) / 30;
                    const fieldsDown = (offsetD - offsetD % 30) / 30;
                    const fieldsLeft = (offsetL - offsetL % 30) / 30;
                    const fieldsRight = (offsetR - offsetR % 30) / 30;

                    // add adjacent fields

                    const coords = e.target.dataset.coords;
                    
                    clearFieldsArr();
                    if(vert){
                        populateArray('up', fieldsUp, coords);
                        populateArray('down', fieldsDown, coords);
                    }
                    else {
                        populateArray('left', fieldsLeft, coords);
                        populateArray('right', fieldsRight, coords);
                    }

                    // console.log(fieldsUp, fieldsDown, fieldsLeft, fieldsRight) 
                    const classToAdd = invalid ? 'invalid' : 'hover'                
                    fieldsArr.forEach(field => field.classList.add(classToAdd))
                };

                function populateArray(direction, num, coords){
                    const x = parseInt(coords[1]);
                    const y = parseInt(coords[3]);
                    let col;
                    let row;
                    for (let i = 0 ; i <= num; i++){
                        switch (direction){
                            case 'up' : 
                                [col, row] = [x + i, y];
                                break;
                            case 'down' : 
                                [col, row] = [x - i, y];
                                break;
                            case 'left' :
                                [col, row] = [x, y - i];
                                break;
                            case 'right' :
                                [col, row] = [x, y + i];
                        }
                        const field = document.querySelector(`[data-coords="[${col},${row}]"]`)
                        if (field === null){
                            invalid = true;
                        } else {
                            fieldsArr.push(field)
                        }
                    }
                }

                function dragOver(e){
                    e.preventDefault();
                };

                function dragLeave(){
                };

                function dragDrop(e){
                    if(invalid){
                        return;
                    }
                    const length = draggedItem.offsetWidth / 30;
                    const initial = draggedItem.classList[2];
                    const startPos = e.target.dataset.coords;
                    
                    // game.players[curPlayer].placeShip()
                };

                function clearFieldsArr() {
                    fieldsArr.forEach((field) => {
                      field.classList.remove('hover', 'invalid');
                    });
                    fieldsArr = [];
                }
                // function handleDrag(e){
                //     console.log('here')
                //     draggedItem.style.transform = `translateXe.clientX;
                //     draggedItem.style.top = e.clientY;
                // }
                


                
                setupContainer.append(title, gameModeSelect, randomBtn, startGameBtn, error, board, shipsPreview);
                menus.append(setupContainer);
            })
        },
        switchPlayers: async function(game){
                const currentPlayer = game.currentPlayer ? game.players.player1.name : game.players.player2.name;
                const span1 = document.querySelector('.switchPlayerScreen span:first-child');
                const span2 = document.querySelector('.switchPlayerScreen span:last-child');
                const board1 = document.querySelector('#board1');
                const elementsToBlur = document.querySelectorAll('.content > *:not(.switchPlayerScreen)');
                elementsToBlur.forEach(element => element.style.filter = 'blur(15px)');
                board1.classList.toggle('hide');
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
                    span2.textContent = '';
                    this.eventListenerActive = true;
                    board1.classList.toggle('hide');
                }, 4000)
                return;
        },
    }
};