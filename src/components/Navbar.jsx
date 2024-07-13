import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { logout } from '../stores/AccesTokenStore';
import "./Navbar.css"; // Asegúrate de tener este archivo si usas CSS externo

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">FilmaPelis</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">/</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/register">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/movie/discover">Descubre</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Perfil
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/profile">Ver Perfil</Link></li>
                    <li><Link className="dropdown-item" to="/profile/edit">Editar Perfil</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-danger">Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
