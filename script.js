
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
document.addEventListener('DOMContentLoaded', function () {
    let currentPlayer = 'X';
    let cells = document.querySelectorAll('.cell');
    let winner = null;
    let gameMode = 'human'; // Default to Human vs Human

    // Function to check for a win or draw
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6],            
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (
                cells[a].textContent === currentPlayer &&
                cells[b].textContent === currentPlayer &&
                cells[c].textContent === currentPlayer
            ) {
                // Highlight the winning pattern
                cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = '#E70A27';
                return currentPlayer;
            }
        }

        // Check for draw
        if ([...cells].every(cell => cell.textContent !== '')) {
            return 'draw';
        }

        return null;
    }

    // Function to handle AI's turn
    function aiPlay() {
        const emptyCells = [...cells].filter(cell => cell.textContent === '');
        if (emptyCells.length === 0 || winner) return;

        // AI chooses a random cell
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const aiCell = emptyCells[randomIndex];
        aiCell.textContent = currentPlayer;

        // After AI plays, check for win or draw
        winner = checkWin();
        if (winner === 'draw') {
            document.querySelector('.display').textContent = "It's a draw!";
        } else if (winner) {
            document.querySelector('.display').textContent = `Player ${winner} wins!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.querySelector('.display').textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Function to handle cell clicks for human players
    function handleHumanClick(event) {
        const cell = event.target;
        if (cell.textContent === '' && !winner) {
            cell.textContent = currentPlayer;
            winner = checkWin();
            if (winner === 'draw') {
                document.querySelector('.display').textContent = "It's a draw!";
            } else if (winner) {
                document.querySelector('.display').textContent = `Player ${winner} wins!`;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.querySelector('.display').textContent = `Player ${currentPlayer}'s turn`;
                if (gameMode === 'ai') {
                    setTimeout(aiPlay, 500); // AI plays after a delay
                }
            }
        }
    }

    // Function to restart the game
    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.backgroundColor = '#0FC0AD';
        });
        currentPlayer = 'X';
        winner = null;
        document.querySelector('.display').textContent = `Player ${currentPlayer}'s turn`;
    }

    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleHumanClick);
    });

    document.getElementById('restartButton').addEventListener('click', restartGame);

    document.getElementById('menuButton').addEventListener('click', function () {
        document.getElementById('game').classList.add('hidden');
        document.getElementById('startPage').classList.remove('hidden');
    });

    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            document.getElementById('startPage').classList.add('hidden');
            document.getElementById('game').classList.remove('hidden');
        }
    });

    // Mode switch with game reset
    document.getElementById('playerMode').addEventListener('click', function () {
        gameMode = 'human';
        restartGame(); // Reset game when changing mode
    });

    document.getElementById('aiMode').addEventListener('click', function () {
        gameMode = 'ai';
        restartGame(); // Reset game when changing mode
    });
});