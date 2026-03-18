from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from . import models, database
from .database import engine, Base, get_db
from .models import Card

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Vai permitir qualquer origem (CORS)
    allow_credentials=True, 
    allow_methods=["*"], # Permite todos os métodos (GET, POST, etc)
    allow_headers=["*"]) # Permite todos os cabeçalhos

# Cria as tabelas assim que o app inicia
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "API de SRS a funcionar perfeitamente!"}

# Schemas Pydantic (Validação simple
class CardCreate(BaseModel):
    frente: str
    verso: str

class CardReview(BaseModel):
    dificuldade: int # 0=Again, 1=Hard, 2=Good, 3=Easy

# ROTAS
@app.post("/cards/")
def criar_card(obj: CardCreate, db: Session = Depends(get_db)):
    novo = Card(frente=obj.frente, verso=obj.verso)
    db.add(novo)
    db.commit()
    return {"status": "criado"}

@app.get("/cards/") # Rota GET para listar todos os cards
def listar_cards(db: Session = Depends(get_db)):
    return db.query(Card).all()



@app.get("/cards/revisar")
def listar_para_revisar(db: Session = Depends(get_db)):
    # Retorna apenas o que venceu hoje ou antes
    from datetime import datetime
    return db.query(Card).filter(Card.proxima_revisao <= datetime.now()).all()

@app.post("/cards/{card_id}/revisar")
def revisar_card(card_id: int, revisao: CardReview, db: Session = Depends(get_db)):
    card = db.query(models.Card).filter(models.Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail={"erro": "Card não encontrado"})
    
    card.calcular_proxima_revisao(dificuldade=revisao.dificuldade)

    db.commit()    
    return {"msg": "Revisado!", "proxima": card.proxima_revisao}