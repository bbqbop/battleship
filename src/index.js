const { Game } = require('./game');
const { initiateUI } = require('./ui.js');
import './style.css';

let newGame; 
let UI;
UI = new initiateUI();


function startGame(){
    newGame = new Game();
    newGame.players.player1.populateGameboard();
    newGame.players.player2.populateGameboard();
    UI.update(newGame);
    UI.setupEventListeners(newGame.curPlayerAttacks.bind(newGame), newGame);    
}

window.addEventListener('gameOver', () => {
    newGame.gameOver = true;
    UI.eventListenersActive = false;
});
window.addEventListener('newGame', () => {
    startGame();
})
    
startGame();
console.log(newGame);