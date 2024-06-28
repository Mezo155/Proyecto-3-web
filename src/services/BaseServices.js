import axios from "axios";
import { getAccessToken, logout } from "../stores/AccesTokenStore";

const INVALID_STATUS_CODES = [401];

const createHttp = (baseURL, useAccessToken = false) => {
  const http = axios.create({
    baseURL: baseURL,
  });

  if (useAccessToken) {
    http.interceptors.request.use(
      (config) => {
        // Si alguien crea una instancia de createHttp pasando useAccesToken a true, quiere decir que esa peticion requiere esta autenticada. Por lo que intento coger el token de la store y meterselo en la cabecera Authorization
        config.headers.Authorization = `Bearer ${getAccessToken()}`;

        return config;
      },
      (err) => Promise.reject(err)
    );
  }

  http.interceptors.response.use(
    function (response) {
      console.log(response);
      return response.data;
    },
    function (error) {
      // if (error && err.response && err.response.status) // Codigo equivalente
      
      if (
        error?.response?.status &&
        INVALID_STATUS_CODES.includes(error.response.status)
      ) {
        // Si tengo un error 401, probablemente movida de JWT. Borro el token y te llevo al login
        if (getAccessToken()) {
          logout();
        }
      }

      return Promise.reject(error.response ? error.response.data : error);
    }
  );

  return http;
};

export default createHttp;
