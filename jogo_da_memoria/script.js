const cards = [
    { id: 1, content: '🍎' },
    { id: 2, content: '🍌' },
    { id: 3, content: '🍇' },
    { id: 4, content: '🍉' },
    { id: 5, content: '🍓' },
    { id: 6, content: '🍒' },
    { id: 7, content: '🍍' },
    { id: 8, content: '🥝' }
];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let totalMatches = 0;
let flips = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    const doubleCards = [...cards, ...cards];
    shuffle(doubleCards);

    doubleCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = '?';

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = card.content;

        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);

        cardElement.addEventListener('click', flipCard);

        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    flips++;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    totalMatches++;
    
    if (totalMatches === cards.length) {
        endGame();
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    updateMessage();
}

function updateMessage() {
    const messageElement = document.getElementById('message');
    messageElement.textContent = `Tentativas: ${flips}`;

    if (totalMatches === cards.length) {
        messageElement.textContent = 'Parabéns! Você venceu!';
    }
}

function restartGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    totalMatches = 0;
    flips = 0;
    updateMessage();
    createBoard();
}

function endGame() {
    lockBoard = true;
}

document.addEventListener('DOMContentLoaded', () => {
    createBoard();

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        restartGame();
    });
});
