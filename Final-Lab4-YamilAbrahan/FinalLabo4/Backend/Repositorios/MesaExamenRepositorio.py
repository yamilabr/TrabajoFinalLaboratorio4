from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select, column
from Modelo.MesaExamenModelo import Examenbd

class ExamenRepo():
    def getAllExamen(self, session: Session):
        print('Todos Los Examenes')
        return session.execute(select(Examenbd)).scalars().all()
    
    def getExamenById(self, id: int, session: Session):
        instancia_bd = session.query(Examenbd).filter(Examenbd.id == id).first()
        if instancia_bd is None:
            raise HTTPException(status_code=404, detail='Examen no encontrado')
        
        return {
            "id": instancia_bd.id,
            "materia": instancia_bd.materia,
            "fecha": instancia_bd.fecha,
        }
    
    def agregarExamen(self, datos:Examenbd, session:Session):
        instancia_bd = Examenbd(materia = datos.materia, fecha = datos.fecha)
        session.add(instancia_bd)
        session.commit()
        return instancia_bd
    
    def borrarExamen(self, id:int, session:Session):
        instancia_bd = session.get(Examenbd, id)
        if instancia_bd is None:
            raise HTTPException(status_code=400, detail='Examen no encontrado')
        try:
            session.delete(instancia_bd)
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede borrar el examen')
        
    def actualizarExamen(self, id:int, datos:Examenbd, session:Session):
        instancia_bd = session.get(Examenbd,id)
        if instancia_bd is None:
            raise HTTPException(status_code=400, detail='Examen no encontrado')
        try:
            instancia_bd.materia=datos.materia
            instancia_bd.fecha=datos.fecha
            session.commit()
        except:
            raise HTTPException(status_code=400, detail='No se puede actualizar el examen.')
        return instancia_bd
