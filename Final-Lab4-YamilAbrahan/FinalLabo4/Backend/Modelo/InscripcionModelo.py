from datetime import date
from db import Base
from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship
from pydantic import BaseModel


class Inscripcion(Base):
    __tablename__ = 'inscripciones'
    id_inscripcion = Column(Integer, primary_key=True, autoincrement=True)
    examen_id = Column(Integer, ForeignKey('Examen.id'))
    legajo = Column(Integer, ForeignKey('Alumno.legajo'))
    nombre = Column(String)
    apellido = Column(String)
    dni = Column(Integer)
    materia = Column(String)
    fecha = Column(Date)

    alumno = relationship("AlumnoBd", back_populates="inscripciones")
    examen = relationship("Examenbd", back_populates="inscripciones")

    class Config:
        orm_mode = True

class InscripcionSinId(BaseModel):
    examen_id: int
    legajo: int
    nombre: str
    apellido: str
    dni: int
    materia: str
    fecha: date

    class Config:
        orm_mode = True
        #arbitrary_types_allowed = True 

class InscripcionAPI(InscripcionSinId):
    id: int