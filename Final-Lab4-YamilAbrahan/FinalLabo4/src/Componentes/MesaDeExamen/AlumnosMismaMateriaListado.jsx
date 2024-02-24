import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPen, faPlus, faList} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AlumnoMateria = () => {
    
  const [inscriptos, setInscriptos] = useState([]);
    const history = useNavigate();

    const {idExamen} = useParams();

   useEffect(() => {
        if (idExamen) {
            console.log(idExamen);
            obtenerAlumnosInscritos(idExamen);
        }
    }, [idExamen]);

    const obtenerAlumnosInscritos = async () => {   

         await axios.get(`http://localhost:8000/inscripcion/${idExamen}`)
            .then((result) => {
                console.log(result.data);
                setInscriptos(result.data);
            }).catch((err) => {
                console.log(err.message);
            }); 
    }
   



    return (
        <>
        <div className="container p-5 my-3 bg-dark text-white">
            <h1 className="text-uppercase">Alumnos en un mismo examen</h1>
        </div>
        <div className="d-flex flex-row-reverse px-5 py-2 my-1 bg-dark">
           
        </div>
        <table className="table table-dark">
            <thead>
            <tr>
                <th scope='colr'>Materia</th>
                <th scope='col'>Nombre</th>
                <th  scope='col'>Apellido</th>
                <th  scope='col'>Dni</th>

                <th  scope='col'></th>
            </tr>
        </thead>
       <tbody>
        {               
            inscriptos.map((i,index)=>{
                return(
                    <tr key={index}>
                        <td>{i.materia}</td>
                        <td>{i.nombre}</td>
                        <td>{i.apellido}</td>
                        <td>{i.dni}</td>

                    </tr>
                );
            })             
        }
       </tbody>
    </table>
    </>
    )
}

export default AlumnoMateria