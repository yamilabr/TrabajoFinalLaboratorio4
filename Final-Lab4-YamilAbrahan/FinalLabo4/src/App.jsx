import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {faPlane} from '@fortawesome/free-solid-svg-icons'
// import VuelosListado from './componentes/vuelos/VuelosListado.js'
// import AvionesListado from './componentes/aviones/AvionesListado';
// import AeropuertosListado from './componentes/aeropuertos/AeropuertosListado';
// import PasajesListado from './componentes/pasajes/PasajesListado';
import RouterComponent from './routes.jsx';
import NavBar from './NavBar.jsx';
// import Background from "./img/fondo.jpg";
// style={{ backgroundImage: `url(${Background})` }}

export default function App() {
  return (
    <div className="App">
      <div className='container'>
        <NavBar/>
        <RouterComponent/>
      </div>
    </div>
  );
}
