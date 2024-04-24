document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const developerName = document.querySelector('.developer-name');
    const gameScreen = document.getElementById('game-screen');
    const status = document.getElementById('status');
    const newGameButton = document.getElementById('new-game');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    };

    const checkDraw = () => {
        return !gameBoard.includes('');
    };

    const updateStatus = () => {
        const winner = checkWinner();
        if (winner) {
            status.textContent = `${winner} wins!`;
            showGameScreen();
        } else if (checkDraw()) {
            status.textContent = 'It\'s a draw!';
            showGameScreen();
        } else {
            status.textContent = `Current player: ${currentPlayer}`;
        }
    };

    const handleCellClick = (index) => {
        if (gameBoard[index] || !gameActive) return;

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        updateStatus();
    };

    const handleNewGameClick = () => {
        hideGameScreen();
        resetGame();
    };

    const resetGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        cells.forEach((cell) => {
            cell.textContent = '';
        });

        status.textContent = 'Current player: X';
    };

    const showGameScreen = () => {
        board.style.display = 'none';
        gameScreen.style.display = 'block';
    };

    const hideGameScreen = () => {
        board.style.display = 'grid';
        gameScreen.style.display = 'none';
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    newGameButton.addEventListener('click', handleNewGameClick);

    // Uncomment the line below and replace [Your Name] with your actual name
    // developerName.textContent = 'Tic-Tac-Toe Game by [Your Name]';

    updateStatus();
});
