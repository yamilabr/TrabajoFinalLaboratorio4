from fastapi import FastAPI
import uvicorn
import db

from API.AlumnoAPI import alumno_router
from API.InscripcionAPI import inscripcion_router
from API.ExamenAPI import examen_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173"
] # ruta donde se esta ejecutando mi front


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Esto permite todas las solicitudes, en producción deberías especificar solo tus dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],  # Esto permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Esto permite todos los encabezados
)

app.include_router(alumno_router)
app.include_router(inscripcion_router)
app.include_router(examen_router)
#

#db.drop_all()
db.create_all()

if __name__=='__main__':
    uvicorn.run('App:app', reload=True)