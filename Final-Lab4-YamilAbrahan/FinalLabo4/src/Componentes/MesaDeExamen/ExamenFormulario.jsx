import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ExamenFormulario () {
    const [examen, setExamen] = useState ({   
       id: 0,
        materia: '',
        fecha: '',     
    })
    let history = useNavigate();
    const {idExamen} = useParams();

    const {materia, fecha} = examen

    const formChange = (e) => {
        setExamen({
            ...examen,
            [e.name]:e.value
        })
    }

    useEffect(()=>{
        if(idExamen){
            async function get(){
                axios.get(`http://localhost:8000/examen/${idExamen}`)
                .then((data)=>{
                    const examen = data?.data;
                    console.log(examen)
                    setExamen({
                        id: idExamen,
                        materia: examen?.materia ?? '',
                        fecha: examen?.fecha ?? ''
                    })
                })
                .catch(()=>{
                    alert('Error al traer datos de examen');
                })
            }
            get()
        }
    },[idExamen])

    const guardarExamen = () => {
        if(examen.materia !== '' && examen.fecha !== '') {
            console.log(examen.materia, examen.fecha)
            const datosExamen = {
                materia: examen.materia,
                fecha: examen.fecha
            };
        axios.post('http://localhost:8000/examen', datosExamen)
        .then(()=>{
            alert('Se agrego correctamente');
            history("../examen")
        })
        .catch(()=>{
            alert('Error al agregar examen');
        })
        } else {
            alert('Todos los campos son obligatorios')
        }
    }
    
    async function modificarExamen() {
        if(examen.materia !== '' && examen.fecha !== '') {
            axios.put(`http://localhost:8000/examen/${idExamen}`, examen)
            .then(()=>{
                alert('Se modifico correctamente');
                history("../examen")
            })
            .catch(()=>{
                alert('Error al modificar examen');
            })
        } else {
            alert('Todos los campos son obligatorios')
        }
    }
    return(
        <>
            <div className="container p-4 my-3 bg-dark text-white">
                <h1 className="text-uppercase">{idExamen ? 'Editar Examen' : 'Agregar Examen'}</h1>
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
                        
                        <div className="form-group py-3">
                        <button onClick={()=>{idExamen ? modificarExamen() : guardarExamen()}} type="button" className="btn btn-success mx-1 col-4" >
                         {idExamen ? 'Editar' : 'Crear'}
                            </button>                        
<button onClick={()=>{history("../examen")}} type="button" className="btn btn-danger col-4 mx-1">Cancelar</button>
                        </div>
                </form>
            </div>
        </div>
        </>
    )
}