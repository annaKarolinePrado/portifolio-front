// Variáveis globais
let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

joogadorX = localStorage.getItem("playerInputX");
joogadorO = localStorage.getItem("playerInputO");

atribuirJogadores();

function atribuirJogadores(){
    var vezX = document.getElementById("vezX");
    vezX.innerText = joogadorX;

    var vezO = document.getElementById("vezO");
    vezO.innerText = joogadorO;

    var jogadorVez = document.getElementById("currentJogador");
    jogadorVez.innerText = joogadorX;
}

// Função para trocar o menu
function toggleMenu(isAdicionar) {
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
    } else {
        if (!isAdicionar) {
            return;
        }
        menu.classList.add('active');
    }
}

// Função para fazer uma jogada
function makeMove(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].innerText = currentPlayer;
        document.querySelectorAll('.cell')[index].classList.add(currentPlayer);

        var jogadorVez = document.getElementById("currentJogador");

        // Verificar se houve vencedor
        if (checkWin()) {
            jogadorVez = currentPlayer !== 'X' ? joogadorO : joogadorX;
            document.getElementById('result').innerText = `${jogadorVez} Venceu!`;
            gameActive = false;
            showWinningLine();
            confettiEffect();
            showWinOverlay(jogadorVez);
        } else {
            // Verificar se não há mais movimentos possíveis
            if (board.includes('') === false) {
                document.getElementById('result').innerText = 'Empate! Não há mais movimentos possíveis.';
                gameActive = false;
            } else {
                // Trocar de jogador
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                jogadorVez.innerText = currentPlayer !== 'X' ? joogadorO : joogadorX;
                document.getElementById('currentPlayer').innerText = currentPlayer;
            }
        }
    }
}


// Função para verificar se há um vencedor
function checkWin() {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Função para mostrar a linha vencedora
function showWinningLine() {
    const line = document.getElementById('line');
    const condition = winningConditions.find(([a, b, c]) => board[a] === board[b] && board[a] === board[c]);

    if (condition) {
        const [a, b, c] = condition;
        const cells = document.querySelectorAll('.cell');
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];

        const startX = cellA.offsetLeft + cellA.offsetWidth / 2;
        const startY = cellA.offsetTop + cellA.offsetHeight / 2;
        const endX = cellC.offsetLeft + cellC.offsetWidth / 2;
        const endY = cellC.offsetTop + cellC.offsetHeight / 2;

        const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
        const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg) scaleX(1)`;
        line.style.top = `${startY}px`;
        line.style.left = `${startX}px`;
    }
}

// Função para estourar confetes
function confettiEffect() {
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Função para parar o jogo
function stopGame() {
    gameActive = false;
    document.getElementById('result').innerText = 'Jogo parado.';
}

function showWinOverlay(winner) {
    const overlay = document.getElementById('winOverlay');
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.innerText = `${winner} Venceu!`;
    overlay.classList.add('show');
    confettiEffect();
    confettiEffect();

}

// Função para reiniciar o jogo
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('result').innerText = '';
    document.getElementById('currentPlayer').innerText = currentPlayer;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
    const line = document.getElementById('line');
    line.style.transition = 'none';
    line.style.transform = 'scaleX(0)';

    setTimeout(() => {
        line.style.transition = 'transform 0.5s ease-in-out';
    }, 50);

    // Esconder a tela de vitória
    const overlay = document.getElementById('winOverlay');
    overlay.classList.remove('show');
}



