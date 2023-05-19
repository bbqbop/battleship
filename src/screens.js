exports.initiateScreens = function(){
    const content = document.querySelector('.content');
    const menus = document.querySelector('.menus');

    const title = document.querySelector('.header h1');
    if(window.innerWidth <= 700){
        title.style.transform = `scale(2) translateY(24vh)`;
        title.style.position = 'absolute'
        title.style.left = `calc(50vw - ${title.offsetWidth / 2}px)`
        console.dir(title)
    } else {
        title.style.transform = `translateX(-50%) translateY(30vh) scale(2)`;
    }
    return {
        splash: function(startGame){
            const splash = document.createElement('div');
            splash.classList.add('splash');
            const singlePlayerBtn = document.createElement('button');
            singlePlayerBtn.id = 'singlePlayerBtn'
            singlePlayerBtn.textContent = 'Single player'
            const twoPlayerBtn = document.createElement('button');
            twoPlayerBtn.id = 'twoPlayerBtn'
            twoPlayerBtn.textContent = 'Two players'
            splash.append(singlePlayerBtn, twoPlayerBtn);
            menus.append(splash)

            singlePlayerBtn.addEventListener('click', ()=>{
                splash.style.opacity = '0'
                setTimeout(()=> {
                    startGame(false);
                    setTimeout(()=> menus.removeChild(splash), 0);
                }, 350);
            });
            twoPlayerBtn.addEventListener('click', ()=>{
                splash.style.opacity = '0'
                setTimeout(()=> {
                    startGame(true);
                    setTimeout(()=> menus.removeChild(splash), 0);
            }, 350);
            });
            
        },
        enterNames: function(game){
            return new Promise((resolve, reject) => {
                const enterNameForm = document.createElement('form');
                enterNameForm.classList.add('enterNames');
                const label = document.createElement('label');
                const nameInp = document.createElement('input');
                nameInp.placeholder = 'Player 1'
                label.textContent = 'Player 1 enter name : '
                label.append(nameInp);
                enterNameForm.append(label);
                menus.append(enterNameForm);

                enterNameForm.style.opacity = '0';
                setTimeout(()=> {
                    enterNameForm.style.opacity = '1';
                },0)

                nameInp.focus()

                let player = 'player1'
                enterNameForm.addEventListener('submit', (e) => {
                    
                    enterNameForm.style.opacity = '0';
                
                    e.preventDefault();
                    const name = e.target[0].value === '' ? e.target[0].placeholder : e.target[0].value
                    game.players[player].name = name
                    if (game.twoPlayer && player === 'player1'){
                        setTimeout(()=> {
                            enterNameForm.style.opacity = '1';
                            nameInp.value = '';
                            nameInp.placeholder = 'Player 2'
                            label.textContent = 'Player 2 enter name : '
                            label.append(nameInp);
                            nameInp.focus();
                            player = 'player2'
                        }, 350)
                    }
                    else {
                        setTimeout(() => {
                            enterNameForm.style.opacity = '0';
                            resolve();
                            setTimeout(()=> menus.removeChild(enterNameForm), 0);
                        },350);
                    }
                })
            });
        },
        setupGameboard: async function(game, board, updateGameboard, player, gameMode){
            if(window.innerWidth <= 700){
                title.style.transform = ``;
                title.style.position = 'static'
            } else {
                title.style.transform = 'translateX(-150%)';
            }
            title.style.color = 'antiquewhite'
            title.style.opacity = '0.8'

            return new Promise((resolve, reject) => {
                board.id = 'setup';
                const fields = board.querySelectorAll('.field');

                let curPlayer = player || 'player1';
                const setupContainer = document.createElement('div');
                setupContainer.classList.add(`setup`);
                const title = document.createElement('h1');
                title.textContent = `${game.players[curPlayer].name} place your ships`;
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
                    updateGameboard(curPlayer, game);
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
                    game.players[curPlayer].populateGameboard(game.gameModes[gameMode]);
                    updateGameboard(curPlayer, game);
                    shipsPreview.innerHTML = '';
                });

                startGameBtn = document.createElement('button');
                startGameBtn.textContent = game.twoPlayer && curPlayer !== 'player2' ? 'Next' : 'Start Game'
                startGameBtn.addEventListener('click', async () => {
                    if (shipsPreview.childElementCount !== 0){
                        error.textContent = 'place all remaining ships!'
                        return;
                    }
                    setupContainer.style.opacity = '0';
                    setTimeout(async () => {
                        if (startGameBtn.textContent === 'Next'){
                            game.currentPlayer = !game.currentPlayer;
                            
                            fields.forEach(field => {
                                field.classList.remove(...field.classList);
                                field.classList.add('field');
                                field.removeEventListener('dragenter', dragEnter);
                                field.removeEventListener('dragover', dragOver);
                                field.removeEventListener('drop', dragDrop);
                            });
                            menus.removeChild(setupContainer);

                            await this.switchPlayers(game);
                            return resolve(this.setupGameboard(game, board, updateGameboard, 'player2', gameMode));
                            
                        }
                        else {
                            if (!game.twoPlayer){
                                game.players.player2.populateGameboard(game.gameModes[gameMode]);
                            }
                            menus.removeChild(setupContainer);
                            game.currentPlayer = true;
                            await this.switchPlayers(game);
                            return resolve();
                        }
                    }, 350)
                });

                ///////////////////
                // Ships preview //
                ///////////////////

                const shipsPreview = document.createElement('div');
                shipsPreview.classList.add('shipsPreview');

                function printShips(){
                    shipsPreview.innerHTML = '';

                    // show instruction only until first click
                    instruction = document.createElement('p');
                    instruction.textContent = 'double click to flip'
                    shipsPreview.append(instruction)
                    instruction.style.position = 'absolute'
                    instruction.style.left = 'calc(50% - 120px)'
                    instruction.style.marginTop = '10px';
                    shipsPreview.addEventListener('mousedown', removeInstruction);
                    function removeInstruction(){
                        instruction.style.opacity = '0'
                        setTimeout(()=>{
                            shipsPreview.removeChild(instruction);
                            shipsPreview.removeEventListener('mousedown', removeInstruction);
                        }, 350)
                    }
                    
                    let boxSize = 30;
                    let shipsList = game.gameModes[gameMode].ships;
                    for (let i = 0; i < shipsList.length; i++){
                        const ship = document.createElement('div');
                        ship.classList.add('preview', 'ship', shipsList[i][1]);
                        ship.style.height = `${boxSize}px`;
                        ship.style.width = `${shipsList[i][0] * boxSize}px`;
                        ship.textContent = shipsList[i][2];
                        ship.style.fontSize = `calc(0.3rem * ${shipsList[i][0]})`
                        ship.draggable = true;
                        shipsPreview.append(ship);
                        if (i === 0) {
                            ship.dataset.direction = 'vertical';
                            ship.style.transform = 'rotate(90deg)';
                        } else {
                            ship.dataset.direction = 'horizontal';
                            ship.style.transform = 'rotate(0deg)';
                        }

                        let angle = 0;
                        ship.addEventListener('dragstart', dragStart);
                        ship.addEventListener('dragend', dragEnd);
                        ship.addEventListener('dblclick', () => {
                            angle = angle === 0 ? 90 : 0;
                            ship.style.transform = `rotate(${angle}deg)`
                            ship.dataset.direction = angle === 0 ? 'horizontal' : 'vertical';
                        })
                    }
                }
                printShips()

                fields.forEach(field => {
                    field.addEventListener('dragenter', dragEnter);
                    field.addEventListener('dragover', dragOver);
                    field.addEventListener('drop', dragDrop);
                })
                //////////////////////////
                // Drag & Drop functions//
                //////////////////////////

                let draggedShip;
                let fieldsArr = [];
                let vert = false;
                let invalid = false;

                function dragStart(e){
                    draggedShip = e.target;
                    vert = draggedShip.dataset.direction === 'vertical';

                    // create copy of ship in container to allow rotated drag image
                    const dragImageContainer = document.createElement('div');
                    dragImageContainer.id = 'dragImage';
                    dragImageContainer.style.position = 'absolute';
                    dragImageContainer.style.top = '-150px';
                    const copy = this.cloneNode(true);
                    const angle = vert ? 90 : 0;
                    copy.style.transform = `rotate(${angle}deg)`;
                    dragImageContainer.append(copy);
                    document.body.append(dragImageContainer);
                    e.dataTransfer.setDragImage(dragImageContainer, 0, 0);

                    e.dataTransfer.setData('text/plain', ''); // Set data to enable dragging in Firefox

                    setTimeout(() => this.style.display = 'none', 0);
                };

                function dragEnd(){
                    this.style.display = 'flex';
                    const dragImage = document.querySelector('#dragImage');
                    document.body.removeChild(dragImage);
                    clearFieldsArr();
                    vert = false;
                };

                function dragEnter(e){
                    invalid = false; 

                    // add adjacent fields
                    const length = parseInt(draggedShip.style.width.slice(0,-2)) / 30 - 1
                    const coords = e.target.dataset.coords;
                    clearFieldsArr();
                    populateArray(length, coords);
                   
                    const classToAdd = invalid ? 'invalid' : 'hover'                
                    fieldsArr.forEach(field => field.classList.add(classToAdd))
                };

                function dragOver(e){
                    e.preventDefault();
                };

                function dragDrop(e){
                    if(invalid){
                        return;
                    }
                    
                    const x = parseInt(e.target.dataset.coords[1]);
                    const y = parseInt(e.target.dataset.coords[3]);
                    const length = parseInt(draggedShip.style.width.slice(0,-2)) / 30;
                    const initial = draggedShip.classList[2];
                    const startPos = [x, y];

                    game.players[curPlayer].placeShip(length, initial, startPos, vert)
                    updateGameboard(curPlayer, game)
                    shipsPreview.removeChild(draggedShip);
                };

                // helper functions

                function populateArray(num, coords){
                    const x = parseInt(coords[1]);
                    const y = parseInt(coords[3]);
                    let col;
                    let row;
                    for (let i = 0 ; i <= num; i++){
                        [col, row] = vert ? [x - i, y] : [x, y + i];
                        const field = document.querySelector(`[data-coords="[${col},${row}]"]`)
                        if (field === null || field.classList[1] === 'ship'){
                            invalid = true;
                        } else {
                            fieldsArr.push(field)
                        }
                    }
                }
                
                function clearFieldsArr() {
                    fieldsArr.forEach((field) => {
                      field.classList.remove('hover', 'invalid');
                    });
                    fieldsArr = [];
                }
                
                setupContainer.append(title, gameModeSelect, randomBtn, startGameBtn, error, board, shipsPreview);
                menus.append(setupContainer);

                setupContainer.style.opacity = '0';
                setTimeout(()=> setupContainer.style.opacity = '1', 350)
            })
        },
        switchPlayers: async function(game){
            return new Promise((resolve, reject) => {
                const switchPlayerScreen = document.createElement('div');
                switchPlayerScreen.classList.add('switchPlayerScreen');
                switchPlayerScreen.innerHTML = "<span></span>'s turn in &nbsp;<span><span>"
                switchPlayerScreen.style.opacity = '0'
                menus.append(switchPlayerScreen);

                const currentPlayer = game.currentPlayer ? game.players.player1.name : game.players.player2.name;
                const span1 = document.querySelector('.switchPlayerScreen span:first-child');
                const span2 = document.querySelector('.switchPlayerScreen span:last-child');
                const board1 = document.querySelector('#board1');
                const elementsToBlur = document.querySelectorAll('.content > *:not(.switchPlayerScreen)');
                setTimeout(()=>{
                elementsToBlur.forEach(element => element.style.filter = 'blur(15px)');
                if (board1) {
                    board1.classList.toggle('hide');
                }
                switchPlayerScreen.style.opacity = '1';
                span1.textContent = currentPlayer;
                for (let i = 0; i < 3; i++){
                    setTimeout(() => {
                        span2.textContent = 3 - i;
                    }, 1000 * i)
                }
                setTimeout(() => {
                    switchPlayerScreen.style.opacity = '0';
                    elementsToBlur.forEach(element => element.style.filter = 'blur(0px)');
                    span2.textContent = '';
                    this.eventListenerActive = true;
                    if(board1){
                        board1.classList.toggle('hide');
                    }
                    setTimeout(() => menus.removeChild(switchPlayerScreen),0);
                    return resolve();
                }, 3000)
                },350)
            })
        },
        gameOver: function(winner){
            const gameOver = document.createElement('div');
            gameOver.classList.add('gameOverScreen');
            const gameOverTitle = document.createElement('h1');
            gameOverTitle.textContent = 'GAME OVER'
            const gameOverResult = document.createElement('h2');
            const newGameBtn = document.createElement('button');
            newGameBtn.textContent = 'Start new game';
            gameOver.append(gameOverTitle, gameOverResult, newGameBtn);
            gameOver.style.opacity = '0';
            menus.append(gameOver);

            this.eventListenerActive = false; 
            setTimeout(() => {
                title.style.color = 'black'
                title.style.transform = `translateX(-50%) translateY(30vh) scale(2)`;
                gameOver.style.opacity = '1';
                content.style.filter = 'blur(15px)'
                gameOverResult.textContent = `${winner} wins!`
                newGameBtn.addEventListener('click', () => {
                    setTimeout(()=> {
                        gameOver.style.opacity = '0';
                        content.style.opacity = '0';
                        const newGameEvent = new CustomEvent('newGame');
                        window.dispatchEvent(newGameEvent);
                        setTimeout(()=> {
                            menus.removeChild(gameOver)
                            content.innerHTML = '';
                        }, 350);
                    }, 350)
                })
            }, 1500)
        },
    }
}