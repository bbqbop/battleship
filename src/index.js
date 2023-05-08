const { Game } = require('./game');
const { initiateUI } = require('./ui.js');
import './style.css';

const newGame = new Game();
newGame.players.player1.populateGameboard();
newGame.players.player2.populateGameboard();
const UI = initiateUI();
console.log(newGame)
UI.update(newGame);

