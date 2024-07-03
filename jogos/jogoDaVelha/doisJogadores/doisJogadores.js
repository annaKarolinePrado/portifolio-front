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

document.getElementById('botaoIniciar').addEventListener('click', function(event) {
    const playerInputX = document.getElementById('playerInputX');
    const playerInputO = document.getElementById('playerInputO');

    if (playerInputX.value.trim() === '') {
        showModal('Por favor, preencha o nome do Jogador X.', playerInputX);
        return;
    }

    if (playerInputO.value.trim() === '') {
        showModal('Por favor, preencha o nome do Jogador O.', playerInputO);
        return;
    }

    // Redirecionar para a página do jogo
    window.location.href = 'tabuleiroJogoDaVelha.html';
});

function showModal(message, inputToFocus) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalOkButton = document.getElementById('modal-ok-button');

    modalMessage.textContent = message;
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');

    modalOkButton.onclick = function() {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        inputToFocus.focus();
    };
}

function salvarJogadores(){
    var jogadorX = document.getElementById("playerInputX").value
    var jogadorO = document.getElementById("playerInputO").value
    
    localStorage.setItem("playerInputX", jogadorX)
    localStorage.setItem("playerInputO", jogadorO)
}