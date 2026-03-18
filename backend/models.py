from sqlalchemy import Column, Integer, String, DateTime, Float
from datetime import datetime, timedelta
from .database import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    frente = Column(String)
    verso = Column(String)
    intervalo = Column(Integer, default=0) 
    facilidade = Column(Float, default=2.5)
    proxima_revisao = Column(DateTime, default=datetime.now)
    # Estas duas colunas são as que estão causando o erro:
    total_revisoes = Column(Integer, default=0) 
    acertos = Column(Integer, default=0)

    def calcular_proxima_revisao(self, dificuldade: int):
        if dificuldade == 0: # AGAIN
            self.intervalo = 1
            self.acertos = 0

        elif dificuldade == 1: # HARD
            self.intervalo = max(1, self.intervalo * 1.3)

        elif dificuldade == 2: # GOOD
            self.intervalo = self.intervalo * 2

        elif dificuldade == 3: # EASYX'
            self.intervalo = self.intervalo * 3.5
                 
        self.proxima_revisao = datetime.now() + timedelta(days=int(self.intervalo))
        self.total_revisoes +=1