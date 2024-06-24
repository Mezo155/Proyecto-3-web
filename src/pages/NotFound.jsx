import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div>
      <h1>Not found</h1>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  )
}

export default NotFound;
