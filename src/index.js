const { Game } = require('./game');
const { initiateUI } = require('./ui.js');
import './style.css';

let newGame; 
let UI = initiateUI();
UI.setupSplashMenu(startGame);

function startGame(twoPlayer){
    newGame = new Game(twoPlayer);
    newGame.players.player1.populateGameboard();
    newGame.players.player2.populateGameboard();
    UI.update(newGame);
    UI.setupEventListeners(newGame.curPlayerAttacks.bind(newGame), newGame);
    console.log(newGame)    
}

window.addEventListener('gameOver', () => {
    newGame.gameOver = true;
    UI.eventListenersActive = false;
    let winner;
    for (let player in newGame.players){
        if(!newGame.players[player].hasLost)
            winner = newGame.players[player].name;
    }   
    UI.toggleGameOver(winner);
});
window.addEventListener('newGame', () => {
    startGame();
})
    

