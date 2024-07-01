const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.game-container');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const startGameButton = document.getElementById('startGameButton');
const playerXInput = document.getElementById('playerX');
const playerOInput = document.getElementById('playerO');
const playerNamesSection = document.getElementById('player-names');
const gameSection = document.getElementById('jogo-da-velha');
const winnerNameElement = document.getElementById('winnerName');
let circleTurn;
let playerXName;
let playerOName;

startGameButton.addEventListener('click', () => {
    playerXName = playerXInput.value;
    playerOName = playerOInput.value;
    if (playerXName && playerOName) {
        playerNamesSection.style.display = 'none';
        gameSection.style.display = 'block';
        startGame();
    } else {
        alert('Por favor, insira os nomes dos jogadores.');
    }
});

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Limpar o conteúdo de texto
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
    winnerNameElement.textContent = '';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw, currentClass) {
    if (draw) {
        winningMessageTextElement.innerText = 'Empate!';
    } else {
        const winnerName = currentClass === X_CLASS ? playerXName : playerOName;
        winnerNameElement.textContent = `${winnerName} Venceu!`;
        winnerNameElement.style.color = currentClass === X_CLASS ? '#ff0080' : '#ffff00';
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === X_CLASS ? 'X' : 'O'; 
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (circleTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function toggleMenu(isAdicionar) {
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
    } else {
        if (!isAdicionar){
            return;
        }
        menu.classList.add('active');
    }
}
