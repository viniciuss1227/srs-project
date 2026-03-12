from sqlalchemy import Column, Integer, String, DateTime, Float
from datetime import datetime, timedelta
from database import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    frente = Column(String)
    verso = Column(String)
    intervalo = Column(Integer, default=0) 
    facilidade = Column(Float, default=2.5)
    proxima_revisao = Column(DateTime, default=datetime.now)

    def revisar(self, acertou: bool):
        if acertou:
            # Se acertou, dobra o intervalo (mínimo 1 dia)
            self.intervalo = 1 if self.intervalo == 0 else self.intervalo * 2
        else:
            # Se errou, volta para o início
            self.intervalo = 0

        self.proxima_revisao = datetime.now() + timedelta(days=self.intervalo)