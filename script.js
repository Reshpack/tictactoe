
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
    const announcer = document.querySelector(".announcer");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = 'X';
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

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winningConditions = winningConditions[i];
            const a = board[winningConditions[0]];
            const b = board[winningConditions[1]];
            const c = board[winningConditions[2]];
            if(a === '' || b === '' || c === '') {
                continue
            }
            if(a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
         }

        if (!board.includes(''))
            announce(TIE);
    }

    const announce = (type) => {
        switch(type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won!';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won!';
                break;
            case TIE:
                announcer.innerHTML = 'Tie!';
        }
        announcer.classList.remove('hide');
    }


    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? "O" : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const UserAction = (cell, index) => {
        if(isValidAction(cell) && isGameActive) {
            cell.innerText = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => UserAction(cell, index));
    });


    resetButton.addEventListener("click", resetBoard);
});