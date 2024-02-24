from fastapi import APIRouter, Depends
from Modelo.InscripcionModelo import Inscripcion, InscripcionSinId, InscripcionAPI
from db import get_session
from sqlalchemy.orm import Session
from Repositorios.InscripcionRepositorio import InscripcionRepo
from typing import List
from Modelo.MesaExamenModelo import Examenbd, ExamenSchema
from fastapi.exceptions import HTTPException
from fastapi import HTTPException, status

from Modelo.MesaExamenModelo import Examenbd

inscripcion_router = APIRouter(prefix='/inscripcion', tags=['Inscripcion'])
repositorio = InscripcionRepo()

@inscripcion_router.get("/")
def get_inscripciones(session: Session = Depends(get_session)):
    inscripciones = repositorio.get_all_inscriptions(session)
    return inscripciones

@inscripcion_router.post("/", response_model=dict)
def create_inscripcion(inscripcion: InscripcionSinId, session: Session = Depends(get_session)): #aca modifique inscripcion
    try:
        nueva_inscripcion_data = repositorio.add_inscripcion(inscripcion, session)
        return  nueva_inscripcion_data
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@inscripcion_router.delete("/{id}")
def delete_inscripcion(id: int, session: Session = Depends(get_session)):
    try:
        repositorio.delete_inscripcion(int(id), session)
        return 'Eliminada con exito'
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
@inscripcion_router.get("/{id}") ##testear
def get_alumns_same_exam(id: int, session: Session = Depends(get_session)):
    try:
        inscripciones = repositorio.get_alumns_inSameExam(id, session)
        return inscripciones
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    
