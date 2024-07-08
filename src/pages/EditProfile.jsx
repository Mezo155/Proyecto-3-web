import { useContext, useState, useEffect } from "react";
import { updateUser } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const updatedUser = () => {
  const { user: currentUser, isAuthLoaded } = useContext(AuthContext);
  const [user, setUser] = useState({
    userName: "",
    email: "",  // Este campo se usa solo para mostrar el email actual, pero no se puede editar
    password: "",
    imgUrl: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUser({
        userName: currentUser.userName,
        email: currentUser.email,
        password: "",
        imgUrl: currentUser.imgUrl || ''
      });
    }
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    setUser({
      ...user,
      imgUrl: event.target.files[0]
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('userName', user.userName);
    data.append("password", user.password);
    if (user.imgUrl instanceof File) {
      data.append("imgUrl", user.imgUrl);
    }

    updateUser(data)
      .then(updatedUser => {
        navigate('/profile');
      })
      .catch(err => {
        console.error(err);
      });
  };

  if (!isAuthLoaded) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1 className="mb-3">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input 
            onChange={handleInputChange} 
            value={user.userName} 
            type="text" 
            className="form-control" 
            name="userName" 
            id="userName" 
            required 
            placeholder="Edit your username..." 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            value={user.email} 
            type="email" 
            className="form-control" 
            name="email" 
            id="email" 
            readOnly 
            placeholder="Your email..." 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            onChange={handleInputChange} 
            value={user.password} 
            type="password" 
            className="form-control" 
            name="password" 
            id="password" 
            placeholder="Change your password..." 
          />
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Profile Image</label>
          <input 
            onChange={handleFileChange} 
            type="file" 
            className="form-control" 
            name="image" 
            id="image" 
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
