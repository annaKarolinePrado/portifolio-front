function toggleMenu(isAdicionar) {
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
    } else {
        if (!isAdicionar) return;
        menu.classList.add('active');
    }
}

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let playerName = '';
let gameDifficulty = 'medium';

function startGame() {
    playerName = document.getElementById('player-name').value;
    if (!playerName) {
        alert("Por favor, insira seu nome para iniciar o jogo.");
        return;
    }
    gameDifficulty = document.getElementById('difficulty').value;
    document.getElementById('game-message').innerText = `Boa sorte, ${playerName}! Você é o X.`;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    initializeGameBoard();
}

function initializeGameBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    currentPlayer = 'X';
}

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (board[cellIndex] !== '') return;
    board[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.setAttribute('data-player', currentPlayer); // Adiciona o atributo data-player
    if (checkWin(currentPlayer)) {
        document.getElementById('game-message').innerText = `${currentPlayer === 'X' ? playerName : 'IA'} venceu!`;
        endGame();
    } else if (board.every(cell => cell !== '')) {
        document.getElementById('game-message').innerText = 'Empate!';
        endGame();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
            iaMove();
        }
    }
}

function iaMove() {
    let move;
    if (gameDifficulty === 'medium') {
        move = getRandomMove();
    } else {
        move = getBestMove();
    }
    board[move] = 'O';
    const cell = document.querySelector(`.cell[data-index='${move}']`);
    cell.innerText = 'O';
    cell.setAttribute('data-player', 'O'); // Adiciona o atributo data-player
    cell.removeEventListener('click', handleCellClick);
    if (checkWin('O')) {
        document.getElementById('game-message').innerText = 'IA venceu!';
        endGame();
    } else if (board.every(cell => cell !== '')) {
        document.getElementById('game-message').innerText = 'Empate!';
        endGame();
    } else {
        currentPlayer = 'X';
    }
}

function getRandomMove() {
    const availableMoves = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}

function getBestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    if (checkWin('O')) return 10 - depth;
    if (checkWin('X')) return depth - 10;
    if (board.every(cell => cell !== '')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

function endGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function resetGame() {
    initializeGameBoard();
    document.getElementById('game-message').innerText = `Boa sorte, ${playerName}! Você é o X.`;
}

