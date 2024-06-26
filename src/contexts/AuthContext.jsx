import { createContext, useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../stores/AccesTokenStore.js";
import { getCurrentUserService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  const navigate = useNavigate();

  const getUser = (cb) => {
    getCurrentUserService()
      .then((user) => {
        setUser(user);
        setIsAuthLoaded(true);

        cb && cb();
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
