import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AlumnosListado from './Componentes/Alumnos/AlumnosListado.jsx';
import AlumnosFormulario from './Componentes/Alumnos/AlumnosFormulario.jsx'
import MesaExamenListado from './Componentes/MesaDeExamen/MesaExamenListado.jsx';
import ExamenFormulario from './Componentes/MesaDeExamen/ExamenFormulario.jsx';
import AlumnosInscriptosFormulario from './Componentes/AlumnosInscriptos/AlumnosInscriptosFormulario.jsx';
import AlumnosInscriptosListado from './Componentes/AlumnosInscriptos/AlumnosInscriptosListado.jsx';
import AlumnosMismaMateriaListado from './Componentes/MesaDeExamen/AlumnosMismaMateriaListado.jsx';
import App from './App.jsx';

const RouterComponent = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/alumnos/' element={<AlumnosListado/>}/>
                <Route exact path='/examen/' element={<MesaExamenListado/>}/>
                <Route exact path='/inscripcion/' element={<AlumnosInscriptosListado/>}/>
                <Route exact path='/form-examen/' element={<ExamenFormulario/>}/>
                <Route exact path='/form-examen/:idExamen' element={<ExamenFormulario/>}/>
                <Route exact path='/form-alumnos/' element={<AlumnosFormulario/>}/>
                <Route exact path='/form-alumnos/:idAlumno' element={<AlumnosFormulario/>}/>
                <Route path="/form-inscripcion/:legajo/:idExamen" element={< AlumnosInscriptosFormulario/>} />
                <Route exact path='/examen/:legajo' element={<MesaExamenListado/>}/>
                <Route exact path='/examen/alumno/:idExamen' element={<AlumnosMismaMateriaListado/>}/>
                <Route exact path='../' element={<App/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterComponent