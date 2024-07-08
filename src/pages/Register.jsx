import { useContext, useState } from "react";
import { createUser } from "../services/LocalService";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { user: currentUser, isAuthLoaded } = useContext(AuthContext);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    imgUrl: ''
  })

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleFileChange = (event) => {
    setUser({
      ...user,
      imgUrl: event.target.files[0]  // Guardamos el archivo de la imagen
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData()

    data.append('userName', user.userName);
    data.append("email", user.email);
    data.append("password", user.password);
    data.append("imgUrl", user.imgUrl)

    createUser(data)
      .then(user => {
        navigate('/login')
      })
      .catch(err => {
        console.error(err)
      })
  }

  if (!isAuthLoaded) {
    return <p>Loading...</p>
  }

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div>
      <h1 className="mb-3">Register</h1>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="userName" className="form-label">username</label>
          <input onChange={handleInputChange} value={user.userName} type="text" className="form-control" name="userName" id="userName" required placeholder="Add a username..." />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input onChange={handleInputChange} value={user.email} type="email" className="form-control" name="email" id="email" required placeholder="Add a email..." />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={handleInputChange} value={user.password} type="password" className="form-control" name="password" id="password" required placeholder="Add a password..." />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Profile Image</label>
          <input onChange={handleFileChange} type="file" className="form-control" name="image" id="image" />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>

    </div>
  );
};

export default Register;
