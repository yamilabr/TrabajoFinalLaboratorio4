import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AlumnosFormulario () {
    const [alumno, setAlumno] = useState ({
        legajo: 0,
        nombre: '',
        apellido: '',
        dni: 0
    })
    let history = useNavigate();
    const {idAlumno} = useParams();

    const {legajo, nombre, apellido, dni} = alumno

    const formChange = (e) => {
        setAlumno({
            ...alumno,
            [e.name]:e.value
        })
    }

    useEffect(()=>{
        if(idAlumno){
            async function get(){
                axios.get(`http://localhost:8000/alumno/${idAlumno}`)
                .then((data)=>{
                    const alumno = data?.data;
                    setAlumno({
                        legajo: idAlumno,
                        nombre: alumno?.nombre ?? '',
                        apellido: alumno?.apellido ?? '',
                        dni: alumno?.dni ?? 0
                    })
                })
                .catch(()=>{
                    alert('Error al traer datos de alumno');
                })
            }
            get()
        }
    },[idAlumno])

    const guardarAlumno = () => {
        if(alumno.nombre !== '' && alumno.apellido !== '' && alumno.dni !== null) {
            axios.get('http://localhost:8000/alumno')
            .then((response) => {
                const alumnos = response.data;
                let existeAlumno = false;
                Object.values(alumnos).forEach(alumnoExistente => {
                    if (String(alumnoExistente.dni) === String(alumno.dni)) {
                    existeAlumno = true;
                 }
                });
   
                if (existeAlumno===true) {
                    alert('Ya existe un alumno con este DNI');
                } else {
                    axios.post('http://localhost:8000/alumno', alumno)
                    .then(()=>{
                        alert('Se agrego correctamente');
                        history("../alumnos")
                    })
                    .catch(()=>{
                        alert('Error al agregar alumno');
                    })
                }
            })
            .catch(()=>{
                alert('Error al obtener la lista de alumnos');
            })
        } else {
            alert('Todos los campos son obligatorios')
        }
    }
    
    // FUNCION EDITAR
    async function editarAlumno(){
        axios.put(`http://localhost:8000/alumno/${alumno.legajo}`, alumno)
        .then(()=>{
            alert('Se modifico correctamente');
            history("../alumnos")
        })
        .catch(()=>{
            alert('Error al modificar alumno');
        })
    }
    
    return(
        <>
            <div className="container p-4 my-3 bg-dark text-white">
                <h1 className="text-uppercase">Agregar Alumno</h1>
            </div>
            <div className="container p-5 my-3 bg-dark text-white">
                <div className="container col-6 border border-2 border-success rounded">
                    <form className="p-4 form text-light">
                        <div className="form-group pb-2">
                            <label className="pb-2">Nombre:</label>
                            <input name="nombre" value={nombre} onChange={e=>formChange(e.target)} type="text" className="form-control" placeholder="Ingresar Nombre" id="nombre"/>
                        </div>
                        <div className="form-group pb-2">
                            <label className="pb-2">Apellido:</label>
                            <input name="apellido" value={apellido} onChange={e=>formChange(e.target)} type="text" className="form-control" placeholder="Ingresar Apellido" id="apellido"/>
                        </div>
                        <div className="form-group pb-2">
                            <label className="pb-2">DNI:</label>
                            <input name="dni" value={dni} onChange={e=>formChange(e.target)} type="number" className="form-control" placeholder="Ingresar DNI" id="dni"/>
                        </div>
                        <div className="form-group py-3">
                            <button onClick={()=>{idAlumno ? editarAlumno() : guardarAlumno()}} type="button" className="btn btn-success mx-1 col-4">Crear</button>
                            <button onClick={()=>{history("../alumnos")}} type="button" className="btn btn-danger col-4 mx-1">Cancelar</button>
                        </div>
                </form>
            </div>
        </div>
        </>
    )
}