import { useContext, useState, useEffect } from "react";
import { updateCurrentUser } from "../services/AuthService";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./EditProfile.css"

const EditUser = () => {
  const { user: currentUser, isAuthLoaded, getUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    userName: "",
    imgUrl: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setUser({
        userName: currentUser.userName,
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
    if (user.imgUrl instanceof File) {
      data.append("imgUrl", user.imgUrl);
    }

    updateCurrentUser(data)
      .then(user => {
        console.log("*******", user)
        return getUser()
          .then(() => navigate('/profile'))
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
    <div className="edit-user-background">
    <div className="edit-user-container">
      <form onSubmit={handleSubmit} className="edit-user-form">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Nombre</label>
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
          <label htmlFor="image" className="form-label">Imagen de perfil</label>
          <input 
            onChange={handleFileChange} 
            type="file" 
            className="form-control" 
            name="image" 
            id="image" 
            placeholder="Seleccionar archivo"
          />
        </div>

        <button type="submit" className="btn btn-primary3">Guardar cambios</button>
      </form>
    </div>
  </div>
  );
};

export default EditUser;
