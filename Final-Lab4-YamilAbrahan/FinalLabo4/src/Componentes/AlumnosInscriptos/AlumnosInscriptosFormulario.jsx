import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function InscripcionFornulario () {
    const [examen, setExamen] = useState ({   
       id: 0,
        materia: '',
        fecha: '',
         
    })
    const [alumno, setAlumno] = useState ({
        legajo: 0,
        nombre: '',
        apellido: '',
        dni: 0
    })

    const [inscripcion, setInscripcion] = useState ({
        legajo: 0,
        idExamen: 0,
        materia: '',
        fecha: '',
        nombre: '',
        apellido: '',
        dni: 0
    })
    let history = useNavigate();
    const {legajo,idExamen} = useParams();

    const {materia, fecha} = examen
    const {nombre, apellido, dni} = alumno
    const formChange = (e) => {
        const { name, value } = e.target;

        if (name in examen) {
            setExamen({
                ...examen,
                [name]: value
            });
        } else if (name in alumno) {
            setAlumno({
                ...alumno,
                [name]: value
            });
        }
    };
     useEffect(() => {
        console.log(legajo, idExamen)
        if (legajo && idExamen) {
            async function get() {
                try {
                    // Obtener datos del examen
                    const examenResponse = await axios.get(`http://localhost:8000/examen/${idExamen}`);
                    const examenData = examenResponse?.data;
                    setExamen({
                        id: idExamen,
                        materia: examenData?.materia ?? '',
                        fecha: examenData?.fecha ?? ''
                    });

                    // Obtener datos del alumno
                    const alumnoResponse = await axios.get(`http://localhost:8000/alumno/${legajo}`);
                    const alumnoData = alumnoResponse?.data;
                    setAlumno({
                        legajo: legajo,
                        nombre: alumnoData?.nombre ?? '',
                        apellido: alumnoData?.apellido ?? '',
                        dni: alumnoData?.dni ?? 0
                    });
                } catch (error) {
                    alert('Error al traer datos de examen o alumno');
                }
            }
            get();
        }
    }, [legajo, idExamen]);


    const guardarInscripcion = async () => {
        try {
            const i = {
                legajo: legajo,
                examen_id: idExamen,
                materia: materia,
                fecha: fecha,
                nombre: nombre,
                apellido: apellido,
                dni: dni
            };
            console.log(i);
             await axios.post(`http://localhost:8000/inscripcion/`, i)
             .then((response)=>{
                alert('Se agrego correctamente');
                history("../inscripcion")
            })
        } catch (error) {
            alert('Error al guardar inscripción');
        }
    }

    return(
        <>
            <div className="container p-4 my-3 bg-dark text-white">
                <h1 className="text-uppercase">Inscribir alumno</h1>
            </div>
            <div className="container p-5 my-3 bg-dark text-white">
                <div className="container col-6 border border-2 border-success rounded">
                    <form className="p-4 form text-light">
                        <div className="form-group pb-2">
                            <label className="pb-2">Nombre Asignatura:</label>
                            <input name="materia" value={materia} onChange={e=>formChange(e.target)} type="text" className="form-control" placeholder="Ingresar Nombre" id="materia"/>
                        </div>
                        <div className="form-group pb-2">
                            <label className="pb-2">Fecha de Examen:</label>
                            <input name="fecha" value={fecha} onChange={e=>formChange(e.target)} type="date" className="form-control" placeholder="dd/mm/aaaa" id="fecha"/>

                        </div>

                        <div className="form-group pb-2">
                            <label className="pb-2">Nombre del Alumno:</label>
                            <input name="nombre" value={nombre} onChange={e=>formChange(e.target)} type="text" className="form-control" placeholder="Ingresar Nombre" id="nombre"/>
                        </div>

                        <div className="form-group pb-2">
                            <label className="pb-2">Apellido del alumno:</label>
                            <input name="apellido" value={apellido} onChange={e=>formChange(e.target)} type="text" className="form-control" placeholder="Ingresar Apellido" id="apellido"/>
                        </div>

                        <div className="form-group pb-2">
                            <label className="pb-2">Dni Alumno:</label>
                            <input name="dni" value={dni} onChange={e=>formChange(e.target)} type="text" className="form-control" placeholder="Ingresar DNI" id="dni"/>
                        </div>
                        
                        <div className="form-group py-3">
                        <button onClick={()=>{ guardarInscripcion()}} type="button" className="btn btn-success mx-1 col-4">Guardar</button>                       
                    <button onClick={()=>{history("../alumnos")}} type="button" className="btn btn-danger col-4 mx-1">Cancelar</button>
                        </div>
                </form>
            </div>
        </div>
        </>
    )
}