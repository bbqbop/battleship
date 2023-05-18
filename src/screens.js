exports.initiateScreens = function(){
    const menus = document.querySelector('.menus');

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
                splash.style.transform = 'scale(0)';
                startGame(false);
                setTimeout(()=> menus.removeChild(splash), 0);
            });
            twoPlayerBtn.addEventListener('click', ()=>{
                splash.style.transform = 'scale(0)'
                startGame(true);
                setTimeout(()=> menus.removeChild(splash), 0);
            });
            
        },
        enterNames: function(game){
            return new Promise((resolve, reject) => {
                const enterNameForm = document.createElement('form');
                enterNameForm.classList.add('enterNames');
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
                        setTimeout(()=> menus.removeChild(enterNameForm), 0);
                    }
                })
            });
        },
        setupGameboard: function(game, board, update, player, gameMode){
            const fields = board.querySelectorAll('.field');
           
            return new Promise((resolve, reject) => {
                let curPlayer = player || 'player1';
                const setupContainer = document.createElement('div');
                setupContainer.classList.add(`setup`);
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
                    game.players[curPlayer].populateGameboard(game.gameModes[gameMode]);
                    update(curPlayer, 'board1', game);
                    shipsPreview.innerHTML = '';
                });

                startGameBtn = document.createElement('button');
                startGameBtn.textContent = game.twoPlayer && curPlayer !== 'player2' ? 'Next' : 'Start Game'
                startGameBtn.addEventListener('click', () => {
                    if (shipsPreview.childElementCount !== 0){
                        error.textContent = 'place all remaining ships!'
                        return;
                    }
                    if (startGameBtn.textContent === 'Next'){
                        game.currentPlayer = !game.currentPlayer;
                        this.switchPlayers(game);
                        
                        fields.forEach(field => {
                            field.classList.remove(...field.classList);
                            field.classList.add('field');
                            field.removeEventListener('dragenter', dragEnter);
                            field.removeEventListener('dragover', dragOver);
                            field.removeEventListener('drop', dragDrop);
                        });
                        menus.removeChild(setupContainer);

                        setTimeout(() => {
                            return resolve(this.setupGameboard(game, board, update, 'player2', gameMode));
                        },4000);
                    }
                    else {
                        if (!game.twoPlayer){
                            game.players.player2.populateGameboard(game.gameModes[gameMode]);
                        }
                        menus.removeChild(setupContainer);
                        game.currentPlayer = true;
                        this.switchPlayers(game);
                        return resolve();
                    }
                });

                ///////////////////
                // Ships preview //
                ///////////////////

                const shipsPreview = document.createElement('div');
                shipsPreview.classList.add('shipsPreview');

                function printShips(){
                    shipsPreview.innerHTML = '';
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
                    update(curPlayer, 'board1', game)
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
            })
        },
        switchPlayers: async function(game){
            const switchPlayerScreen = document.createElement('div');
            switchPlayerScreen.classList.add('switchPlayerScreen');
            switchPlayerScreen.innerHTML = "<span></span>'s turn in &nbsp;<span><span>"
            switchPlayerScreen.style.transform = 'scale(0)'
            menus.append(switchPlayerScreen);

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
                menus.removeChild(switchPlayerScreen);
            }, 4000)
            return;
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
            gameOver.style.transform = 'scale(0)';
            menus.append(gameOver);

            this.eventListenerActive = false; 
            gameOver.style.transform = 'scale(1)';
            player1Board.style.filter = 'blur(5px)'
            player2Board.style.filter = 'blur(5px)'
            gameOverResult.textContent = `${winner} wins!`
            newGameBtn.addEventListener('click', () => {
                gameOver.style.transform = 'scale(0)';
                player1Board.style.filter = '';
                player2Board.style.filter = '';
                splash.style.transform = 'scale(1)';
                setTimeout(()=> menus.removeChild(gameOver), 0);
            })
        },
    }
};