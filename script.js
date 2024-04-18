
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
document.addEventListener('DOMContentLoaded', function() {
    // Initialise variables
    let currentPlayer = 'X';
    let cells = document.querySelectorAll('.cell');
    let winner = null;

    // Function to check for a win
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (cells[a].textContent === currentPlayer &&
                cells[b].textContent === currentPlayer &&
                cells[c].textContent === currentPlayer) {
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

    // Function to handle cell click
    function cellClick(event) {
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
            }
        }
    }

    // Add click event listeners to cells
    cells.forEach(cell => {
        cell.addEventListener('click', cellClick);
    });

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

    // restart button
    document.getElementById('restartButton').addEventListener('click', restartGame);
});

// Return function
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle back button click
    document.getElementById('menuButton').addEventListener('click', function() {
        document.getElementById('game').classList.add('hidden');
        document.getElementById('startPage').classList.remove('hidden');
    });
});

