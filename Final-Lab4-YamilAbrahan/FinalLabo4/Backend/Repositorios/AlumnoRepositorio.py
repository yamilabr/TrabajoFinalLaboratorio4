from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, column
from Modelo.AlumnoModelo import AlumnoBd, AlumnoSinLegajo


class Alumnorepo():
    def get_all_students(self, session: Session):
        print('Todos Los Alumnos')
        return session.execute(select(AlumnoBd)).scalars().all()
    
    def get_student_by_id(self, legajo:int, session:Session):
       # instancia_bd = session.execute(select(AlumnoBd).where(column('legajo') == legajo)).fetchone()
        instancia_bd = session.query(AlumnoBd).filter(AlumnoBd.legajo == legajo).first()

        if instancia_bd is None:
            raise HTTPException(status_code=400, detail='Alumno no encontrado')
        
        return {
            "legajo": instancia_bd.legajo,
            "nombre": instancia_bd.nombre,
            "apellido": instancia_bd.apellido,
            "dni": instancia_bd.dni,
        }

    def agregar(self, datos:AlumnoSinLegajo, session:Session):
        instancia_bd = AlumnoBd(nombre = datos.nombre, apellido = datos.apellido, dni = datos.dni)
        print("Datos: ",datos.nombre, datos.apellido, datos.dni)
        session.add(instancia_bd)
        session.commit()
        return instancia_bd

    def borrar(self, legajo:int, session:Session):
        instancia_bd = session.get(AlumnoBd, legajo)
        if instancia_bd is None:
            raise HTTPException(status_code=400, detail='Alumno no encontrado')
        try:
            session.delete(instancia_bd)
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede borrar el alumno')


    def actualizar(self, legajo:int, datos:AlumnoSinLegajo, session:Session):
        instancia_bd = session.get(AlumnoBd,legajo)
        if instancia_bd is None:
            raise HTTPException(status_code=400, detail='Alumno no encontrado')
        try:
            instancia_bd.nombre=datos.nombre
            instancia_bd.apellido=datos.apellido
            instancia_bd.dni=datos.dni
            session.commit()
            
        except:
            raise HTTPException(status_code=400, detail='No se puede actualizar el alumno.')

        return instancia_bd