
// Menu screen 
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        // Hide the start page
        document.getElementById('startPage').classList.add('hidden');
        // Show the game
        document.getElementById('game').classList.remove('hidden');
    }
});

// Game
window.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelector(".cell"));
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.querySelector("#resetButton");
    const menuButton = document.querySelector("#menuButton");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYER0_WON";
    const TIE = "TIE";

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6], 
    ];

    

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => UserActivation(cell, index));
    });


    resetButton.addEventListener("click", resetBoard);
});