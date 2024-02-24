import {Link} from 'react-router-dom'
import logo from './img/logo-utn.png'

export default function NavBar() {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="" href=""><img src={logo} className="bg-dark" /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav me-auto px-4">
        <li className="nav-item">
          <a className="nav-link" href="/examen">Mesa de Examen</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/alumnos">Alumnos</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/inscripcion">Inscripciones</a>
        </li>
        
       
      </ul>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="text" placeholder="Buscar"/>
        <button className="btn btn-outline-success" type="button">Buscar</button>
      </form> */}
    </div>
  </div>
</nav>
        </>
    )
}