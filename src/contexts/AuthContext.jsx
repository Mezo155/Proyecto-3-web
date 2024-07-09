import { createContext, useEffect, useState, useCallback } from "react";
import { getAccessToken, setAccessToken, logout } from "../stores/AccesTokenStore.js";
import { getCurrentUserService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  const navigate = useNavigate();

  const getUser = useCallback((cb) => {
    return getCurrentUserService()
      .then((user) => {
        setUser(user);
        setIsAuthLoaded(true);

        cb && cb();
      })
      .catch((err) => {
        console.error(err);// este da problemas

        if (err.message === "jwt expired") {//esto es nuevo
          logout();
        } else {
          setIsAuthLoaded(true);  // Make sure to set loading to true even if there's an error
        }//hasta aqui
      });
  }, []);

  const login = (token) => {
    setAccessToken(token);

    getUser(() => navigate("/profile"));
  };

  useEffect(() => {
    if (getAccessToken()) {
      getUser();
    } else {
      setIsAuthLoaded(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        user,
        isAuthLoaded,
        getUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
