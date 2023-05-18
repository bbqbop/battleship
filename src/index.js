const { Game } = require('./game');
const { initiateUI } = require('./ui.js');
import './style.css';

let newGame; 
let UI = initiateUI();
UI.setupSplashMenu(startGame);

async function startGame(twoPlayer){
    newGame = new Game(twoPlayer);
    await UI.gameSetup(newGame);
    UI.update(newGame);
    UI.setupEventListeners(newGame.curPlayerAttacks.bind(newGame), newGame);
}

window.addEventListener('gameOver', () => {
    newGame.gameOver = true;
    let winner;
    for (let player in newGame.players){
        if(!newGame.players[player].hasLost)
            winner = newGame.players[player].name;
    }   
    UI.toggleGameOver(winner);
});

    

