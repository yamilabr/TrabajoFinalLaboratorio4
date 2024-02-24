from datetime import date
from db import Base
from sqlalchemy import Column, Integer, String,Date
from sqlalchemy.orm import relationship
from pydantic import BaseModel

class Examenbd(Base):
    __tablename__ = 'Examen'

    id = Column(Integer, primary_key=True,autoincrement=True)
    materia = Column(String(80))
    fecha = Column(Date)
    # Relaciones
    inscripciones = relationship("Inscripcion", back_populates="examen")

class ExamenSchema(BaseModel):
    id: int = None
    materia: str
    fecha: date

    class Config:
        orm_mode = True
        #arbitrary_types_allowed = True 
