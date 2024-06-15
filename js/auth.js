import { hex_sha256 } from './sha256-min.mjs';

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            autenticarUsuario();
        });
    }

function autenticarUsuario() {
    const password = document.getElementById('password').value;
    const hashedPassword = hex_sha256(password);

    if (hashedPassword === hex_sha256('admin')) {
        sessionStorage.setItem('auth', 'true');
        window.location.href = 'jogadores.html';
    } else {
        alert('Nome de usuário ou senha incorretos!');
    }
}


