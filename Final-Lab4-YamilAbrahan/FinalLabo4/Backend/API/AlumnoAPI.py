from fastapi import APIRouter, Depends
from db import get_session
from sqlalchemy.orm import Session
from Repositorios.AlumnoRepositorio import Alumnorepo
from typing import List
from Modelo.AlumnoModelo import AlumnoBd, AlumnoSinLegajo, AlumnoApi
from fastapi.exceptions import HTTPException
from fastapi import HTTPException, status


alumno_router = APIRouter(prefix='/alumno', tags=['Alumno'])
repositorio = Alumnorepo()

@alumno_router.get('/')
def get_all_students(s: Session = Depends(get_session)):
    return repositorio.get_all_students(s)

@alumno_router.get('/{legajo}')
def get_student_by_id(legajo: int, s: Session = Depends(get_session)):
    return repositorio.get_student_by_id(legajo, s)


@alumno_router.post('/', response_model=AlumnoApi)
def agregar(datos: AlumnoSinLegajo, s: Session = Depends(get_session)):
    try:
        alumno = repositorio.agregar(datos, s)
        return alumno
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@alumno_router.delete('/{id}')
def borrar(id: int, s:Session = Depends(get_session)):
    repositorio.borrar(int(id), s)
    return 'Alumno borrado'

@alumno_router.put('/{id}', response_model=AlumnoApi)
def actualizar(id:int, datos:AlumnoSinLegajo, s:Session=Depends(get_session)):
    alumno =  repositorio.actualizar(id, datos, s)
    return alumno