from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, column
from Modelo.InscripcionModelo import Inscripcion, InscripcionSinId
from Modelo.AlumnoModelo import AlumnoBd
from Modelo.MesaExamenModelo import Examenbd


class InscripcionRepo():
    def get_all_inscriptions(self, session: Session):
        print('Todas las inscripciones')
        return session.execute(select(Inscripcion)).scalars().all()
    
    def get_inscription_by_id(self, id:int, session:Session):
        instancia_bd = session.query(Inscripcion).filter(Inscripcion.id == id).first()
        if instancia_bd is None:
            raise HTTPException(status_code=400, detail='Inscripcion no encontrada')
        return {
            "id": instancia_bd.id,
            "examen_id": instancia_bd.examen_id,
            "legajo": instancia_bd.legajo,
            "nombre": instancia_bd.nombre,
            "apellido": instancia_bd.apellido,
            "dni": instancia_bd.dni,
            "materia": instancia_bd.materia,
            "fecha": instancia_bd.fecha
        }
    #ESTA
    def add_inscripcion(self,inscripcion_data: InscripcionSinId, session: Session):
        examen = session.query(Examenbd).filter(Examenbd.id == inscripcion_data.examen_id).first()
        if not examen:
            raise HTTPException(status_code=400, detail="Examen no encontrado")

        alumno = session.query(AlumnoBd).filter(AlumnoBd.legajo == inscripcion_data.legajo).first()
        if not alumno:
            raise HTTPException(status_code=400, detail="Alumno no encontrado")

        nueva_inscripcion = Inscripcion(
        nombre=inscripcion_data.nombre,
        apellido=inscripcion_data.apellido,
        dni=inscripcion_data.dni,
        materia=inscripcion_data.materia,
        fecha=inscripcion_data.fecha,
        examen_id=inscripcion_data.examen_id,
        legajo=inscripcion_data.legajo
    )
        session.add(nueva_inscripcion)
        session.commit()
        return {
        "inscripcion": {
            "examen_id": nueva_inscripcion.examen_id,
            "legajo": nueva_inscripcion.legajo,
            "nombre": nueva_inscripcion.nombre,
            "apellido": nueva_inscripcion.apellido,
            "dni": nueva_inscripcion.dni,
            "materia": nueva_inscripcion.materia,
            "fecha": nueva_inscripcion.fecha
        }
    }
    
    def delete_inscripcion(self, id: int, session: Session):
        instanciaBd = session.get(Inscripcion, id)
        if instanciaBd is None:
            raise HTTPException(status_code=400, detail='Inscripcion no encontrada')
        try:
            session.delete(instanciaBd)
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede borrar la inscripcion')
        
    def get_alumns_inSameExam(self, id: int, session: Session):
        examen = session.query(Examenbd).filter(Examenbd.id == id).first()
        if not examen:
            raise HTTPException(status_code=400, detail="Examen no encontrado")
        inscripciones = session.query(Inscripcion).filter(Inscripcion.examen_id == id).all()
        return inscripciones