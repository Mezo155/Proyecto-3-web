import { useContext, useState } from "react";
import { loginService } from "../services/LocalService";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login, user: currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    loginService(user)
      .then((token) => {
        login(token);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="login-container2">
      <div className="login-form-container2">
      
        <form onSubmit={handleSubmit}>
          <div className="mb-3-2">
            <label htmlFor="email" className="form-label2">Email</label>
            <input
              name="email"
              onChange={handleInputChange}
              value={user.email}
              type="email"
              className="form-control2"
              id="email"
              required
              placeholder="Add a email..."
            />
          </div>

          <div className="mb-3-2">
            <label htmlFor="password" className="form-label2">Password</label>
            <input
              name="password"
              onChange={handleInputChange}
              value={user.password}
              type="password"
              className="form-control2"
              id="password"
              required
              placeholder="Add a password..."
            />
          </div>
          {error && <p className="text-danger2">{error.message}</p>}
          <button type="submit" className="btn-primary2">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
