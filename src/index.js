const { Game } = require('./game');
const { initiateUI } = require('./ui.js');
import './style.css';

const newGame = new Game();
newGame.players.player1.populateGameboard();
newGame.players.player2.populateGameboard();
const UI = initiateUI();
UI.update(newGame);
UI.setupEventListeners(newGame.curPlayerAttacks.bind(newGame), newGame);

console.log(newGame);