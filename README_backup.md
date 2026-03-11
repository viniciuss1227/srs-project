# 🚀 Spaced Repetition API (SRS)

Este projeto é uma API robusta para gerenciamento de flashcards baseada no sistema de **Repetição Espaçada (SRS)**. O objetivo é otimizar a memorização de longo prazo através de agendamentos inteligentes de revisão, combatendo a Curva do Esquecimento.

## 🧠 O Diferencial Técnico
Diferente de um CRUD comum, esta API foca em **lógica de negócio aplicada**:
- **Algoritmo de Agendamento**: Cálculo dinâmico de próximos intervalos baseado no desempenho do usuário.
- **Arquitetura Limpa**: Separação de responsabilidades entre banco de dados, modelos de dados e rotas da API (KISS principle).
- **Persistência Robusta**: Uso de ORM para garantir a integridade dos dados.

## 🛠️ Tecnologias Utilizadas
- **Python 3.13**
- **FastAPI**: Framework moderno de alta performance.
- **SQLAlchemy**: ORM para mapeamento objeto-relacional.
- **SQLite**: Banco de dados relacional para persistência local.
- **Pydantic**: Validação de dados e tipagem estática.

## 📂 Estrutura do Projeto
```text
backend/
├── main.py         # Entry point e rotas da API
├── models.py       # Definição das tabelas e lógica de revisão (POO)
├── database.py     # Configuração e conexão do banco de dados
└── requirements.txt # Dependências do projeto