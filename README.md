#  SRS Flashcards - Spaced Repetition System

Este projeto é uma API robusta para gerenciamento de flashcards baseada no sistema de **Repetição Espaçada (SRS)**. O objetivo é otimizar a memorização de longo prazo através de agendamentos inteligentes de revisão, combatendo a Curva do Esquecimento.

##  O Diferencial Técnico
Diferente de um CRUD comum, esta API foca em **lógica de negócio aplicada**:
- **Algoritmo de Agendamento**: Cálculo dinâmico de próximos intervalos baseado no desempenho do usuário (Again, Hard, Good, Easy).
- **Arquitetura Limpa**: Separação de responsabilidades entre banco de dados, modelos de dados e rotas da API (KISS principle).
- **Experiência SPA:**: Navegação fluida entre os modos de gestão e estudo sem recarregameno de página, garantindo foco no aprendizado.

##  Tecnologias Utilizadas
- **Backend**
  - **Python 3.13** com FastAPI para uma API de alta performance.
  - **SQLALchemy** (ORM) para persistência de dados robusta no SQLite.
  - **Pydantic** para validação rigorosa de dados.
 
- **Frontend**
  - **JavaScript** Vanilla: Lógica de estado da aplicação e consumo de API assíncrona (Fetch API).
  - **CSS3 Moderno**: Uso de variáveis (:root), Flexbox e Grid para uma interface responsiva e imersiva.
  - **HTML5**: Estrutura semântica para acessibilidade e organização.
 
##  Como funciona o Algoritmo
O sistema utiliza uma implementação customizada baseada em intervalos de confiança:
1. **Again**: Reinicia o ciclo de memorização do card.

2. **Hard**: Aumenta o intervalo de forma conservadora.

3. **Good**: Dobra o intervalo atual.

4. **Easy**: Aplica um multiplicador agressivo (3.5x) para cards já dominados.

##  Estrutura do Projeto
```text
├── backend/
│   ├── main.py         # Entry point e rotas da API (FastAPI)
│   ├── models.py       # Definição das tabelas e lógica do algoritmo SRS
│   ├── database.py     # Configuração da conexão SQLite
│   └── requirements.txt 
└── frontend/
    ├── index.html      # Interface Single Page Application
    ├── script.js       # Lógica de controle de estado e integração com API
    └── style.css       # Estilização moderna e modo imersivo
