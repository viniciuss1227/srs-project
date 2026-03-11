from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timedelta
from database import Base

class Card(Base):

    __tablename__ = "cards"
    

    id = Column(Integer, primary_key=True, index=True)
    frente = Column(String)
    verso= Column(String)
    intervalo = Column(Integer, default=0) # Dias para a próxima revisão
    proxima_revisao = Column(DateTime, default=datetime.now)

# Método simples para atualizar o card (Lógica interna)
def revisar(self, acertou: bool):
    if acertou:
        # Se acertou, dobra o intervalo (mínimo 1 dia)
        self.intervalo = 1 if self.intervalo == 0 else self.intervalo * 2
    else:
        # Se errou, volta para o ínicio
        self.intervalo = 0

        self.proxima_revisao = datetime.now() + timedelta(days=self.intervalo)
