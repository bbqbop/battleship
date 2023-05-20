# BattleShip
An implementation of the classic game in JavaScript

The file setup follows the Model-View-Controller (MVC-pattern) and I tried to keep the modules as independent as possible. 
All information flow is going only in one direction, bundling in the controller file index.js.

The logic can be visualized like : 
```
ship.js -> player.js -> game.js ->    index.js    <- ui.js <- screens.js
Model (game logic)                || Controller ||  View (user interface)
```

## Game Logic Modules

### - ship.js 
contains the ship constructor function. 
Every ship keeps track of its length, hitCount, if it's sunk or not and its coordinates on the grid. The public function .hit() allows control to the player.

### - player.js
The player.js module provides functionality related to the player in the Battleship game. It includes methods for placing ships on the game board, populating the game board randomly, receiving attacks, and checking the player's game status.

### - game.js
The game.js module provides functionality for managing the game logic in the Battleship game. It includes methods for handling attacks between players, generating computer attacks, and managing the game state.
It also contains the computer logic: 
In summary, the compAttack() method performs intelligent computer attacks by utilizing an attack queue and adjusting the queue based on hits and sinkings. The computer attempts to target ships efficiently by tracking their direction on the gameboard.

### - game.test.js
The game.test.js file contains test cases for the Ship, Player, and Game classes. These tests verify the behavior and functionality of the Ship, Player, and Game classes in the Battleship game implementation.

## index.js
The index.js file is the entry point of the Battleship game application. It contains the main code to start and manage the game.
In summary, index.js handles the initialization of the game, sets up the UI, manages events related to game over and new game, and interacts with the UI module to update the game state and interface.

## User interface modules

### - ui.js
The ui.js file provides the user interface functionality for the game. It exports an initiateUI function that initializes the UI and returns an object with various methods for interacting with the UI for the general gameplay. It delegates all additional logic to screens.js

### - screens.js
Screens.js returns methods for printing all additional screens. 
- splash(): This function displays a splash screen with two buttons for single-player and two-player modes. It listens for click events on the buttons and calls the startGame function with the appropriate parameters.

- enterNames(): This function displays a form for players to enter their names. It returns a promise that resolves when the form is submitted, passing the entered names to the game object.

- setupGameboard(): This function sets up the game board screen for ship placement. It returns a promise that resolves when the setup is complete. It includes drag-and-drop functionality for placing ships on the board, and it provides options for selecting the game mode. The function also includes event listeners for random ship placement and starting the game.

- switchPlayers(): This function displays a screen indicating the current player's turn. It returns a promise that resolves after a certain duration, indicating the completion of the screen.

- gameOver(): This function displays a game over screen, showing the winner's name and providing an option to start a new game.

These functions work together to create and manage different screens within the game.
```
/////////////////////
// Dierk Peters 23 //
/////////////////////
```



