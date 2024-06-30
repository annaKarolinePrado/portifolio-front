
function toggleMenu(isAdicionar) {
    const menu = document.querySelector('.menu');
    if (menu.classList.contains('active')) {
        
        menu.classList.remove('active'); // Remove a classe 'active' se estiver presente

    } else {
        if (!isAdicionar){
            return
        }
        menu.classList.add('active'); // Adiciona a classe 'active' se não estiver presente
    }
}