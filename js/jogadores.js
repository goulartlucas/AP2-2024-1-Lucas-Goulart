if (sessionStorage.getItem('auth') !== 'true') {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('m').addEventListener('click', () => carregarJogadores('https://botafogo-atletas.mange.li/2024-1/masculino'));
    document.getElementById('f').addEventListener('click', () => carregarJogadores('https://botafogo-atletas.mange.li/2024-1/feminino'));
    document.getElementById('t').addEventListener('click', () => carregarJogadores('https://botafogo-atletas.mange.li/2024-1/all'));

    carregarJogadores('https://botafogo-atletas.mange.li/2024-1/all');

    const barraDeBusca = document.getElementById('searchBar');
    barraDeBusca.addEventListener('input', filtrarJogadores);
});

function carregarJogadores(url) {
    obterDadosJogadores(url).then(dadosJogadores => {
        exibirJogadores(dadosJogadores);
    }).catch(error => {
        console.error('Erro ao carregar jogadores:', error);
    });
}

async function obterDadosJogadores(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados: ' + response.statusText);
        }
        const dados = await response.json();
        return dados;
    } catch (error) {
        console.error('Erro na função obterDadosJogadores:', error);
        throw error;
    }
}

function exibirJogadores(jogadores) {
    const listaJogadores = document.getElementById('playersList');
    listaJogadores.innerHTML = ''; // Clear existing players

    jogadores.forEach(jogador => {
        const container = document.createElement("div");
        container.className = "player-card";
        container.innerHTML = criarCardJogador(jogador);
        listaJogadores.appendChild(container);
    });
}

function criarCardJogador(jogador) {
    return `
        <img src="${jogador.imagem}" alt="${jogador.nome}">
        <h2>${jogador.nome}</h2>
        <p>${jogador.posicao}</p>
        <a href="detalhes.html?id=${jogador.id}">Saiba Mais</a>
    `;
}

function filtrarJogadores() {
    const barraDeBusca = document.getElementById('searchBar');
    const filtro = barraDeBusca.value.toLowerCase();
    const jogadores = Array.from(document.getElementsByClassName('player-card'));

    jogadores.forEach(jogador => {
        const nomeElement = jogador.querySelector('h2');
        if (nomeElement) {
            const nomeJogador = nomeElement.textContent.toLowerCase();
            jogador.style.display = nomeJogador.includes(filtro) ? '' : 'none';
        }
    });
}
