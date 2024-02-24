from fastapi import APIRouter, Depends
from db import get_session
from sqlalchemy.orm import Session
from Repositorios.MesaExamenRepositorio import ExamenRepo
from typing import List
from Modelo.MesaExamenModelo import Examenbd, ExamenSchema
from fastapi.exceptions import HTTPException
from fastapi import HTTPException, status

examen_router = APIRouter(prefix='/examen', tags=['Examen'])
repositorio = ExamenRepo()

@examen_router.get('/')
def getAllExamen(s: Session = Depends(get_session)):
    return repositorio.getAllExamen(s)

@examen_router.get('/{id}')
def getExamenById(id: int, s: Session = Depends(get_session)):
    print("------------------<><<<<<<<<<---------",id)
    return repositorio.getExamenById(id, s)

@examen_router.post('/', response_model=ExamenSchema)
def agregarExamen(datos: ExamenSchema, s: Session = Depends(get_session)):
    try:
        examen = repositorio.agregarExamen(datos, s)
        return examen
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    
@examen_router.delete('/{id}')
def borrarExamen(id: int, s: Session = Depends(get_session)):
    repositorio.borrarExamen(int(id), s)
    return 'Examen borrado'

@examen_router.put('/{id}', response_model=ExamenSchema)
def actualizarExamen(id: int, datos: ExamenSchema, s: Session = Depends(get_session)):
    print(id)
    examen = repositorio.actualizarExamen(id, datos, s)
    return examen

