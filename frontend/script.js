const API_URL = 'http://127.0.0.1:8000';

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
            body: JSON.stringify({ frente, verso, deck_id: 1 })
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

// Carrega os cards ao abrir a página
loadCards();
