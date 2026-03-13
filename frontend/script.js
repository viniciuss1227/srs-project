document.getElementById('btn-salvar').addEventListener('click', async () => {
    const frente = document.getElementById('frente').value;
    const verso = document.getElementById('verso').value;
    const msg = document.getElementById('mensagem');

    try {
        const response = await fetch('http://127.0.0.1:8000/cards/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ frente, verso, deck_id: 1 })
        });

        if (response.ok) {
            msg.innerText = "✅ Salvo com sucesso!";
            document.getElementById('frente').value = '';
            document.getElementById('verso').value = '';
        }
    } catch (error) {
        msg.innerText = "🚨 Erro de conexão!";
    }
});