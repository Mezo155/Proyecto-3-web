import { useContext, useState } from "react";
import { createUser } from "../services/UserService";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const { user: currentUser, isAuthLoaded } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    createUser(user)
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
          <label htmlFor="title" className="form-label">Email</label>
          <input onChange={handleInputChange} value={user.email} type="email" className="form-control" name="email" id="email" required placeholder="Add a email..." />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Password</label>
          <input onChange={handleInputChange} value={user.password} type="password" className="form-control" name="password" id="password" required placeholder="Add a password..." />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>

    </div>
  );
};

export default Register;
