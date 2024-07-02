let tentativas = 25;
let cartas = [];
let cartasSelecionadas = [];
let paresEncontrados = 0;
let fase = 1;

document.addEventListener('DOMContentLoaded', () => {
    iniciarJogo();
});

function iniciarJogo() {
    const tabuleiro = document.getElementById('tabuleiro');
    tabuleiro.innerHTML = '';
    tentativas = 25;
    paresEncontrados = 0;
    cartasSelecionadas = [];
    document.getElementById('tentativas').textContent = `Tentativas restantes: ${tentativas}`;
    document.getElementById('mensagemFinal').textContent = '';

    let simbolos = fase === 1 
        ? ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🍑', '🍍'] 
        : ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🍑', '🍍', '🍋', '🥭', '🍏', '🍈', '🍅'];

    cartas = fase === 1 ? simbolos.concat(simbolos) : simbolos.concat(simbolos).slice(0, 25);
    cartas.sort(() => 0.5 - Math.random());

    tabuleiro.classList.remove('tabuleiro-4x4', 'tabuleiro-5x5');
    tabuleiro.classList.add(fase === 1 ? 'tabuleiro-4x4' : 'tabuleiro-5x5');

    cartas.forEach((simbolo, index) => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.simbolo = simbolo;
        carta.dataset.index = index;
        carta.addEventListener('click', () => revelarCarta(carta));
        tabuleiro.appendChild(carta);
    });
}

function revelarCarta(carta) {
    if (cartasSelecionadas.length < 2 && !carta.classList.contains('revelada')) {
        carta.classList.add('revelada');
        carta.textContent = carta.dataset.simbolo;
        cartasSelecionadas.push(carta);

        if (cartasSelecionadas.length === 2) {
            verificarPar();
        }
    }
}

function verificarPar() {
    tentativas--;
    document.getElementById('tentativas').textContent = `Tentativas restantes: ${tentativas}`;
    
    const [carta1, carta2] = cartasSelecionadas;
    if (carta1.dataset.simbolo === carta2.dataset.simbolo) {
        paresEncontrados++;
        cartasSelecionadas = [];

        if (paresEncontrados === cartas.length / 2) {
            if (fase === 1) {
                fase = 2;
                iniciarJogo();
            } else {
                document.getElementById('mensagemFinal').textContent = 'Parabéns, você completou o jogo!';
            }
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('revelada');
            carta2.classList.remove('revelada');
            carta1.textContent = '';
            carta2.textContent = '';
            cartasSelecionadas = [];
        }, 1000);
    }

    if (tentativas === 0 && paresEncontrados < cartas.length / 2) {
        document.getElementById('mensagemFinal').textContent = 'Acabaram as tentativas! Tente novamente.';
    }
}

function reiniciarJogo() {
    fase = 1;
    iniciarJogo();
}

function pararJogo() {
    fase = 1;
    iniciarJogo();
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
