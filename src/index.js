const { Game } = require('./game');
const { initiateUI } = require('./ui.js');
import './style.css';

const newGame = new Game();
const UI = initiateUI();

newGame.players.player1.populateGameboard();
newGame.players.player2.populateGameboard();
UI.update(newGame);
UI.setupEventListeners(newGame.curPlayerAttacks.bind(newGame), newGame);

window.addEventListener('gameOver', () => {
    newGame.gameOver = true;
    UI.eventListenersActive = false;
})
    
console.log(newGame);