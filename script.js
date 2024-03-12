
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
const cells = document.querySelector(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const returnMenu = document.querySelector("#returnMenu")
const winConditions = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", ""];
let currentPlayer = "X"
let running = false;

initialiseGame();

function initialiseGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`
};

function cellClicked() {
    
};

function updateCell(cell, index) {

};

function changePlayer() {

};

function checkWinner() {

};

function restartGame() {

};

function menuReturn() {

}