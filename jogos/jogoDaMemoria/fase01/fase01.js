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
let attempts = 0;
let matches = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = ''; // Clear the game board
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

  updateAttemptsMessage();
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
  attempts++;
  updateAttemptsMessage();
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.id === secondCard.dataset.id;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matches++;
  checkVictory();
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function updateAttemptsMessage() {
  const attemptsMessage = document.getElementById('attemptsMessage');
  attemptsMessage.textContent = `Tentativas: ${attempts}`;
}

function checkVictory() {
  if (matches === cards.length) {
      const victoryMessage = document.getElementById('victoryMessage');
      victoryMessage.classList.remove('hidden');
  }
}

function restartGame() {
  attempts = 0;
  matches = 0;
  createBoard();
  const victoryMessage = document.getElementById('victoryMessage');
  victoryMessage.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', createBoard);
