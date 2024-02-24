import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPen, faPlus, faList} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef,useEffect } from 'react';
import axios from 'axios';


const AlumnosListado = () => {
    const[alumnos, setAlumnos] = useState([]);
    const history = useNavigate();
    const inputNombre = useRef();
    let bandera = false;

    //Para que se cargue al cargar la pantalla
    useEffect(()=>{
        obtenerAlumnos()
    },[])

    const eliminarAlumno =(idAlumno)=>{        
        axios.delete(`http://localhost:8000/alumno/${idAlumno}`)
        .then(()=>{
            alert('El alumno se elimino')
            obtenerAlumnos()
        })
        .catch(()=>{
            alert('Hubo un error al eliminar')
        })
    }

    async function obtenerAlumnos(props){
        if(bandera === false)   // traer datos
        {
            axios.get(`http://localhost:8000/alumno/`)
            .then((result) => {
                setAlumnos(result.data);
            }).catch((err) => {
                console.log(err.message);
            });
        }
        else if(bandera === true)   // traer dato por busqueda
        {
            axios.get(`http://localhost:8000/alumno/${props}`)
            .then((result) => {
                setAlumnos([result.data.AlumnoBd]);
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }

    const buscar = () => {
        if (inputNombre.current.value === '') {
            obtenerAlumnos()
        } else {
            const alumnoFiltrado = alumnos.filter(alumno => inputNombre.current.value === alumno.dni.toString());
            console.log(inputNombre.current.value)
            console.log(alumnoFiltrado)
            if (alumnoFiltrado.length === 0) {
                alert('No se encontraron resultados');
            } else {
                bandera = false;
                setAlumnos(alumnoFiltrado);
                inputNombre.current.value = '';

            }
        }
    }



    return (
        <>
        <div className="container p-5 my-3 bg-dark text-white">
            <h1 className="text-uppercase">Alumnos</h1>
        </div>
        <div className="d-flex flex-row-reverse px-5 py-2 my-1 bg-dark">
            <form className="d-flex justify-center">
                <input className="form-control-sm ms-1" ref={inputNombre} type="text" placeholder="Buscar por DNI..."/>
                <button className="btn btn-outline-success ms-1" type="button" onClick={()=>{buscar()}}>Buscar</button>
            </form>

            <div ><a type="button" className="btn btn-success" href="/form-alumnos"><FontAwesomeIcon icon={faPlus}/> Nuevo registro</a></div>
        
        </div>
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope='col'>Legajo</th>
                <th  scope='col'>Nombre</th>
                <th  scope='col'>Apellido</th>
                <th  scope='col'>DNI</th>
                <th  scope='col'></th>
            </tr>
        </thead>
        <tbody>
        {               
            alumnos.map((x,index)=>{
                return(
                    <tr key={index}>
                        <td>{x.legajo}</td>
                        <td>{x.nombre}</td>
                        <td>{x.apellido}</td>
                        <td>{x.dni}</td>
                        <td>
                            <button onClick={()=>{history(`/examen/${x.legajo}`)}} type="button" className="btn btn-outline-success mx-1" title="Inscribirse a un examen"><FontAwesomeIcon icon={faPlus}/></button>
                            <button onClick={()=>{history(`/form-alumnos/${x.legajo}`)}} type="button" className="btn btn-outline-warning mx-1"><FontAwesomeIcon icon={faPen}/></button>
                            <button type="button" className="btn btn-outline-danger" onClick={() => {eliminarAlumno(x.legajo)}}><FontAwesomeIcon icon={faTrash}/></button>
                        </td>
                    </tr>
                );
            })             
        }
        </tbody>
    </table>
    </>
    )
}

export default AlumnosListado