const API_URL = 'http://127.0.0.1:8000';

let cardsParaRevisar = [];
let cardAtualIndex = 0;

// ---- CARREGAR CARDS NA HOME ----
async function loadCards() {
    try {
        const res = await fetch(`${API_URL}/cards/`);
        if (!res.ok) return;
        const cards = await res.json();

        const grid = document.getElementById('cards-grid');
        const emptyMsg = document.getElementById('empty-msg');
        grid.innerHTML = '';

        if (cards.length === 0) {
            emptyMsg.style.display = 'block';
            return;
        }

        emptyMsg.style.display = 'none';
        cards.forEach(card => {
            const el = document.createElement('div');
            el.className = 'card-item';
            el.innerHTML = `
                <span class="card-frente">${card.frente}</span>
                <span class="card-verso">${card.verso}</span>
            `;
            grid.appendChild(el);
        });
    } catch (e) {
        console.error('Erro ao carregar cards:', e);
    }
}

// ---- SALVAR CARD ----
document.getElementById('btn-salvar').addEventListener('click', async () => {
    const frente = document.getElementById('frente').value.trim();
    const verso = document.getElementById('verso').value.trim();
    const msg = document.getElementById('mensagem');

    if (!frente || !verso) {
        msg.style.color = '#EF4444';
        msg.innerText = '⚠️ Preencha frente e verso!';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/cards/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ frente, verso })
        });

        if (response.ok) {
            msg.style.color = '#10B981';
            msg.innerText = '✅ Salvo com sucesso!';
            document.getElementById('frente').value = '';
            document.getElementById('verso').value = '';
            loadCards();
        } else {
            msg.style.color = '#EF4444';
            msg.innerText = '🚨 Erro ao salvar.';
        }
    } catch (error) {
        msg.style.color = '#EF4444';
        msg.innerText = '🚨 Sem conexão com o backend.';
    }
});

// ---- ABRIR ESTUDO ----
async function abrirEstudo() {
    try {
        const res = await fetch(`${API_URL}/cards/revisar`);
        cardsParaRevisar = await res.json();

        if (cardsParaRevisar.length === 0) {
            alert('✅ Tudo revisado por hoje!');
            return;
        }

        cardAtualIndex = 0;
        document.getElementById('tela-gestao').style.display = 'none';
        document.getElementById('tela-estudo').style.display = 'block';
        atualizarInterfaceEstudo();
    } catch (e) {
        console.error('Erro ao abrir estudo:', e);
    }
}

// ---- ATUALIZAR CARD NA TELA
function atualizarInterfaceEstudo() {
    const total = cardsParaRevisar.length;
    const atual = cardAtualIndex + 1;

    document.getElementById('progresso-texto').innerText = `Card ${atual} de ${total}`;

    const card = cardsParaRevisar[cardAtualIndex];
    document.getElementById('card-revisao').innerHTML = `<div>${card.frente}</div>`;

    document.getElementById('area-revelar').style.display = 'block';
    document.getElementById('controles-revisao').style.display = 'none';
}

// ---- REVELAR VERSO ----
function revelarVerso() {
    const card = cardsParaRevisar[cardAtualIndex];
    document.getElementById('card-revisao').innerHTML = `
        <div style="font-size: 0.85em; opacity: 0.75;">${card.frente}</div>
        <div style="width: 50px; border-top: 1px solid rgba(255,255,255,0.3); margin: 16px auto;"></div>
        <div>${card.verso}</div>
    `;
    document.getElementById('area-revelar').style.display = 'none';
    document.getElementById('controles-revisao').style.display = 'grid';
}

// ---- ENVIAR REVISÃO ----
async function enviarRevisao(nivel, event) {
    event?.preventDefault();

    const card = cardsParaRevisar[cardAtualIndex];
    if (!card) return;

    try {
        const response = await fetch(`${API_URL}/cards/${card.id}/revisar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dificuldade: nivel })
        });

        if (response.ok) {
            cardAtualIndex++;

            if (cardAtualIndex < cardsParaRevisar.length) {
                atualizarInterfaceEstudo(); // próximo card, só frente
            } else {
                alert('🎯 Sessão concluída!');
                voltarGestao();
            }
        }
    } catch (error) {
        console.error('Erro ao revisar:', error);
    }
}

// ---- VOLTAR PARA HOME ----
function voltarGestao() {
    document.getElementById('tela-estudo').style.display = 'none';
    document.getElementById('tela-gestao').style.display = 'block';
    cardAtualIndex = 0;
    cardsParaRevisar = [];
    loadCards();
}

