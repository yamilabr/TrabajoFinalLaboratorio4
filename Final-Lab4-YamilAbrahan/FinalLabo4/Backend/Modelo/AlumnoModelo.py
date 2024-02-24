from db import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from pydantic import BaseModel


class AlumnoBd(Base):
    __tablename__ = 'Alumno'

    nombre = Column(String(80))
    apellido = Column(String(80))
    dni = Column(Integer)
    legajo = Column(Integer, primary_key=True, autoincrement=True)

#Relaciones
    inscripciones = relationship("Inscripcion", back_populates="alumno")


    class Config:
        orm_mode = True

class AlumnoSinLegajo(BaseModel):
    nombre: str
    apellido: str
    dni: int

    class Config:
        orm_mode = True

class AlumnoApi(AlumnoSinLegajo):
    legajo: int