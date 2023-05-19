const { Game } = require('./game');
const { initiateUI } = require('./ui.js');
import './style.css';

let game; 
let UI = initiateUI();
UI.setupSplash(startGame);

async function startGame(twoPlayer, gameRecord = false){
    game = new Game(twoPlayer);
    await UI.gameSetup(game, gameRecord);
    UI.drawGame(game);
    UI.update(game);
    UI.setupEventListeners(game.curPlayerAttacks.bind(game), game);
}

window.addEventListener('gameOver', (e) => {
    game.gameOver = true;
    const loserName = e.detail;
    let winner;
    for (let player in game.players){
        if(game.players[player].name !== loserName){
            winner = game.players[player].name;
            game.players[player].wins++;
        }
    }   
    UI.toggleGameOver(winner, game);
});

window.addEventListener('newGame', () => {
    const gameRecord = {
        player1: {
            name: game.players.player1.name,
            wins: game.players.player1.wins
        },
        player2: {
            name: game.players.player2.name,
            wins: game.players.player2.wins
        },
        twoPlayer: game.twoPlayer
    };
    startGame(gameRecord.twoPlayer, gameRecord) 
})

