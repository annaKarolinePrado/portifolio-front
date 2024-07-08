
function toggleMenu(isAdicionar) {
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('active')) {
        
        menu.classList.remove('active');

    } else {
        if (!isAdicionar){
            return
        }
        menu.classList.add('active');
    }
}
function startLevel(level) {
    alert(`Starting level ${level}!`);
    // Aqui você pode adicionar a lógica para redirecionar o jogador para a fase correspondente.
    // Por exemplo, você pode mudar a URL para uma página específica de fase.
    // window.location.href = `level${level}.html`;
}
