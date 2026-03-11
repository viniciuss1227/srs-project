from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import Card
from pydantic import BaseModel

# Cria as tabelas assim que o app inicia
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Schemas Pydantic (Validação simple
class CardCreate(BaseModel):
    frente: str
    verso: str

class CardReview(BaseModel):
    acertou: bool

# ROTAS
@app.post("/cards")
def criar_card(obj: CardCreate, db: Session = Depends(get_db)):
    novo = Card(frente=obj.frente, verso=obj.verso)
    db.add(novo)
    db.commit()
    return {"status": "criado"}

@app.get("/cards/revisar")
def listar_para_revisar(db: Session = Depends(get_db)):
    # Retorna apenas o que venceu hoje ou antes
    from datetime import datetime
    return db.query(Card).filter(Card.proxima_revisao <= datetime.now()).all()

@app.post("/cards/{card_id}/revisar")
def revisar_card(card_id: int, review: CardReview, db: Session = Depends(get_db)):
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        raise HTTPException(status_code=404, detail="Não encontrado")
    
    card.revisar(review.acertou) # Chama a lógica que está no models.py
    db.commit()
    return {"status": "atualizado"}