document.addEventListener('DOMContentLoaded', function () {
    const perfilButton = document.querySelector('.button-perfil');
    const dropdownMenu = document.querySelector('.perfil-dropdown .dropdown-perfil');

    perfilButton.addEventListener('click', function () {
        dropdownMenu.classList.toggle('active');
    });

    // Cerrar el dropdown si se hace clic fuera
    document.addEventListener('click', function (e) {
        if (!perfilButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
});