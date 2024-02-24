import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPen, faPlus, faList} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const inscriptosListado = () => {
    const [inscriptos, setInscriptos] = useState([]);
    const history = useNavigate();
    const inputNombre = useRef();

    let bandera = false;

    useEffect(()=>{
        obtenerInscriptos()
    },[])

    const obtenerInscriptos = async () => {
        if(bandera === false)   // traer datos
        {
         await axios.get(`http://localhost:8000/inscripcion/`)
            .then((result) => {
                setInscriptos(result.data);
            }).catch((err) => {
                console.log(err.message);
            });
        }
        else if(bandera === true)   // traer dato por busqueda
        {
           await axios.get(`http://localhost:8000/inscripcion/${props}`)
            .then((result) => {
                setInscriptos([result.data.Inscriptos]);
            }).catch((err) => {
                console.log(err.message);
            });
        }
    }
    const eliminarInscripcion =(id_inscripto)=>{    
        console.log(id_inscripto)    
        axios.delete(`http://localhost:8000/inscripcion/${id_inscripto}`)
        .then(()=>{
            alert('El inscripto se elimino')
            obtenerInscriptos()
        })
        .catch(()=>{
            alert('Hubo un error al eliminar')
        })
    }

    const buscar = () => {
        if (inputNombre.current.value === '') {
            obtenerInscriptos()
        } else {
            const inscriptoFiltrado = inscriptos.filter(inscripto => inputNombre.current.value === inscripto.dni.toString());
            console.log(inputNombre.current.value)
            console.log(inscriptoFiltrado)
            if (inscriptoFiltrado.length === 0) {
                alert('No se encontraron resultados');
            } else {
                setInscriptos(inscriptoFiltrado);
            }
        }
    }
    return <>
    
    <div className="container p-5 my-3 bg-dark text-white">
            <h1 className="text-uppercase">Inscripciones</h1>
        </div>
        <div className="d-flex flex-row-reverse px-5 py-2 my-1 bg-dark">
            <form className="d-flex justify-center">
                <input className="form-control-sm ms-1" ref={inputNombre} type="text" placeholder="Buscar por DNI..."/>
                <button className="btn btn-outline-success ms-1" type="button" onClick={()=>{buscar()}}>Buscar</button>
            </form>

        
        </div>
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope='col'>Id inscripcion</th>
                <th  scope='col'>Nombre</th>
                <th  scope='col'>Apellido</th>
                <th  scope='col'>DNI</th>
                <th  scope='col'>Materia</th>
                <th  scope='col'>Fecha</th>
                <th  scope='col'></th>

            </tr>
        </thead>
        <tbody>
        {               
            inscriptos.map((i,index)=>{
                return(
                    <tr key={index}>
                        <td>{i.id_inscripcion}</td>
                        <td>{i.nombre}</td>
                        <td>{i.apellido}</td>
                        <td>{i.dni}</td>
                        <td>{i.materia}</td>
                        <td>{i.fecha}</td>

                        <td>
                           
                            <button type="button" className="btn btn-outline-danger" onClick={() => {eliminarInscripcion(i.id_inscripcion)}}><FontAwesomeIcon icon={faTrash}/></button>
                        </td>
                    </tr>
                );
            })             
        }
        </tbody>
    </table>
    
    
    </>
}
export default inscriptosListado;