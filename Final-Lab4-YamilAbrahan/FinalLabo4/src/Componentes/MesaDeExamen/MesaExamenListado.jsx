import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPen, faPlus, faList} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ExamenListado = () => {
    

    const [examenes, setExamenes] = useState([]);
    const history = useNavigate();
    const inputNombre = useRef();
    let bandera = false;
    const {legajo} = useParams();
    //Para que se cargue al cargar la pantalla
    useEffect(()=>{
        obtenerExamenes()
        console.log(legajo)
    },[legajo])

    const eliminarExamen =(idExamen)=>{
        axios.delete(`http://localhost:8000/examen/${idExamen}`)
        .then(()=>{
            alert('El examen se elimino')
            obtenerExamenes()
        })
        .catch(()=>{
            alert('Hubo un error al eliminar')
        }
        )
    }

    const obtenerExamenes = (props) => {
        if(bandera === false)   // traer datos
        {
            axios.get(`http://localhost:8000/examen/`)
            .then((result) => {
                setExamenes(result.data);
            }).catch((err) => {
                console.log(err.message);
            });
        }
        else if(bandera === true)   // traer dato por busqueda
        {
            console.log(props)
            axios.get(`http://localhost:8000/examen/${props}`)
            .then((result) => {
                setExamenes([result.data.ExamenBd]);
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }

    const buscar= () =>{
        if (inputNombre.current.value === '') {
            obtenerExamenes()
        } else {
            const examenFiltrado = examenes.filter(examen => inputNombre.current.value === examen.materia);
            if (examenFiltrado.length === 0) {
                alert('No se encontraron resultados');
            } else {
                setExamenes(examenFiltrado);
            }
            inputNombre.current.value = '';
        }
}
const inscribirAlumno = (idExamen) => {
    if (legajo) {
        console.log(legajo, idExamen)
        // Redirigir al formulario de inscripción y pasar los IDs del alumno y del examen
        history(`/form-inscripcion/${legajo}/${idExamen}`);
    }
};

    return (
        <>
        <div className="container p-5 my-3 bg-dark text-white">
            <h1 className="text-uppercase">Examen</h1>
        </div>
        <div className="d-flex flex-row-reverse px-5 py-2 my-1 bg-dark">
            <form className="d-flex justify-center">
                <input className="form-control-sm ms-1" ref={inputNombre} type="text" placeholder="Buscar por nombre.."  />
                <button className="btn btn-outline-success ms-1" type="button" onClick={()=>{buscar()}}>Buscar</button>
            </form>
            <div ><a type="button" className="btn btn-success" href="/form-examen/"><FontAwesomeIcon icon={faPlus}/> Nuevo registro</a></div>
        </div>
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope='colr'>Id</th>
                <th scope='col'>Materia</th>
                <th  scope='col'>Fecha</th>
               
                <th  scope='col'></th>
            </tr>
        </thead>
       <tbody>
       {examenes.map((examen)=>(
            <tr key={examen.id}>
                <td>{examen.id}</td>
                <td>{examen.materia}</td>
                <td>{examen.fecha}</td>
                <td>
                    <button onClick={()=>{history(`/form-examen/${examen.id}`)}} type="button" className="btn btn-outline-warning mx-1" tittle="Editar"><FontAwesomeIcon icon={faPen}/></button>
                    <button onClick={()=>{history(`/examen/alumno/${examen.id}`)}} type="button" className="btn btn-outline-info" title="Alumnos inscriptos a este examen"><FontAwesomeIcon icon={faList}/></button>
                    <button type="button" className="btn btn-outline-danger" onClick={() => {eliminarExamen(examen.id)}} tittle="Eliminar"><FontAwesomeIcon icon={faTrash}/></button>
                    {legajo && (
                     <button type='button' className='btn btn-outline-primary' onClick={() => { inscribirAlumno(examen.id) }}>
                         Inscribir a Examen
                      </button>
                    )}
                </td>
            </tr>
        ))}
       </tbody>
    </table>
    </>
    )
}

export default ExamenListado